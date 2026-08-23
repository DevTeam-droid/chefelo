// GET /api/subscription-status?email=...
//
// The client should call this on load and treat the result as the truth,
// only using localStorage as a cache for instant UI while this resolves —
// never as the actual gate. This is also how "restore purchases" works
// with no login system: ask for the email they used, look it up here.

import { db } from './db.js';

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();

  const rawEmail = req.query?.email;
  if (!rawEmail) return res.status(400).json({ error: "email is required" });
  const email = rawEmail.trim().toLowerCase();

  try {
    const result = await db.query(
      `SELECT status, plan, trial_end, next_billing_at FROM subscriptions WHERE email = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(200).json({ status: "none" });
    }

    const sub = result.rows[0];

    // Belt-and-suspenders: if a trial's end date has already passed but the
    // cron job hasn't run yet, don't report stale "trialing" access.
    if (sub.status === "trialing" && new Date(sub.trial_end) <= new Date()) {
      return res.status(200).json({ status: "trial_ended_pending_charge", plan: sub.plan, trialEnd: sub.trial_end });
    }

    return res.status(200).json({
      status: sub.status,
      plan: sub.plan,
      trialEnd: sub.trial_end,
      nextBillingAt: sub.next_billing_at,
    });
  } catch (err) {
    console.error("subscription-status error:", err);
    return res.status(500).json({ error: "Failed to check subscription status" });
  }
}
