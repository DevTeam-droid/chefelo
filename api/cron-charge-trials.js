// Runs on a schedule (see vercel.json). Finds every trial whose 7 days are
// up and hasn't been converted yet, charges the saved card token for the
// real plan price, and attaches a Flutterwave Payment Plan so future
// billing cycles are handled by Flutterwave automatically from here on.
//
// This is the ONLY place a user's card should ever be charged the real
// subscription amount for the first time.

import { db } from './db.js';

const FLW_SECRET_KEY = process.env.FLW_SECRET_KEY;
const FLW_BASE = "https://api.flutterwave.com/v3";

const PAYMENT_PLAN_IDS = {
  monthly: process.env.FLW_MONTHLY_PLAN_ID,
  annual: process.env.FLW_ANNUAL_PLAN_ID,
};

export default async function handler(req, res) {
  // Vercel Cron sends a secret authorization header — verify it so this endpoint can't be
  // triggered by unauthorized third parties.
  const authHeader = req.headers.authorization;
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const dueTrials = await db.query(
      `SELECT * FROM subscriptions WHERE status = 'trialing' AND trial_end <= now()`
    );

    const results = [];

    for (const sub of dueTrials.rows) {
      try {
        const paymentPlanId = PAYMENT_PLAN_IDS[sub.plan];
        const txRef = `elo_convert_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

        const chargePayload = {
          token: sub.card_token,
          currency: "USD",
          amount: parseFloat(sub.plan_amount),
          email: sub.email,
          tx_ref: txRef,
        };

        if (paymentPlanId) {
          chargePayload.payment_plan = paymentPlanId;
        }

        const chargeRes = await fetch(`${FLW_BASE}/tokenized-charges`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${FLW_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(chargePayload),
        });
        const chargeData = await chargeRes.json();

        if (chargeData.status === "success") {
          await db.query(
            `UPDATE subscriptions SET
               status = 'active',
               flw_payment_plan_id = $2,
               last_charge_tx_id = $3,
               next_billing_at = $4,
               updated_at = now()
             WHERE email = $1`,
            [
              sub.email,
              paymentPlanId || null,
              chargeData.data?.id || null,
              sub.plan === "monthly"
                ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
            ]
          );
          results.push({ email: sub.email, result: "charged" });
        } else {
          // Card declined on conversion — mark past_due
          await db.query(
            `UPDATE subscriptions SET status = 'past_due', updated_at = now() WHERE email = $1`,
            [sub.email]
          );
          results.push({ email: sub.email, result: "declined", detail: chargeData });
        }
      } catch (err) {
        console.error(`Trial conversion failed for ${sub.email}:`, err);
        results.push({ email: sub.email, result: "error", error: err.message });
      }
    }

    return res.status(200).json({ processed: results.length, results });
  } catch (err) {
    console.error("cron-charge-trials error:", err);
    return res.status(500).json({ error: "Internal error executing cron charges" });
  }
}
