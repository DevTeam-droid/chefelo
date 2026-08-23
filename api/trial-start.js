// POST /api/trial-start
// Body: { email, plan: 'monthly' | 'annual', cardDetails: {...} }
//
// No signup flow exists, so email IS the identity — it's already required
// to process a Flutterwave charge, so it doubles as the account key.
//
// This does NOT charge the real subscription price. It runs a small
// verification charge (e.g. $0.50), immediately refunds it, and keeps
// the resulting card token so the real charge can happen on day 7.
//
// IMPORTANT: never do this card-details step directly from the browser to
// your backend in plain JSON — use Flutterwave's client-side encryption
// (their inline.js / v3 encryption helper) so raw PAN never touches your
// server. This file assumes `cardDetails` already arrives pre-encrypted
// per Flutterwave's charge-card documentation.

import { db } from './db.js';

const FLW_SECRET_KEY = process.env.FLW_SECRET_KEY; // server-side only, never expose to client
const FLW_BASE = "https://api.flutterwave.com/v3";

const PLAN_PRICES = { monthly: 4.99, annual: 29.99 };
const VERIFICATION_AMOUNT = 0.5;

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const rawEmail = req.body?.email;
  const plan = req.body?.plan;
  const cardDetails = req.body?.cardDetails;

  if (!rawEmail || !PLAN_PRICES[plan] || !cardDetails) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const email = rawEmail.trim().toLowerCase();

  try {
    // 0. Has this exact email already had a trial? Don't re-verify a card,
    //    just tell them their existing status.
    const existing = await db.query(`SELECT status FROM subscriptions WHERE email = $1`, [email]);
    if (existing.rows.length > 0 && existing.rows[0].status !== "none") {
      return res.status(409).json({ error: "This email already has an active trial or subscription", status: existing.rows[0].status });
    }

    // 1. Run a small verification charge to capture a reusable token.
    const txRef = `elo_verify_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const chargeRes = await fetch(`${FLW_BASE}/charges?type=card`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${FLW_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...cardDetails, // pre-encrypted card fields per Flutterwave's spec
        amount: VERIFICATION_AMOUNT,
        currency: "USD",
        email,
        tx_ref: txRef,
      }),
    });
    const chargeData = await chargeRes.json();

    if (chargeData.status !== "success" || !chargeData.data) {
      // Flow may require OTP/3DS — handle chargeData.meta.authorization
      // per Flutterwave's card charge docs before treating this as a failure.
      return res.status(402).json({ error: chargeData.message || "Card verification failed", detail: chargeData });
    }

    const txId = chargeData.data.id;
    const cardToken = chargeData.data.card?.token;
    const card = chargeData.data.card || {};

    if (!cardToken) {
      return res.status(500).json({ error: "No reusable token returned from verification charge" });
    }

    // Build a fingerprint from whatever card metadata Flutterwave returns
    // (typically first 6 / last 4 digits + expiry). This is what stops
    // someone from getting a second free trial just by typing a new email
    // with the same physical card.
    const cardFingerprint = `${card.first_6digits || ""}_${card.last_4digits || ""}_${card.expiry || ""}`;

    if (cardFingerprint !== "__") {
      const cardUsed = await db.query(
        `SELECT email FROM subscriptions WHERE card_fingerprint = $1`,
        [cardFingerprint]
      );
      if (cardUsed.rows.length > 0 && cardUsed.rows[0].email !== email) {
        // Refund the verification charge before bailing — we're not keeping
        // this $0.50 either way.
        await fetch(`${FLW_BASE}/transactions/${txId}/refund`, {
          method: "POST",
          headers: { Authorization: `Bearer ${FLW_SECRET_KEY}`, "Content-Type": "application/json" },
          body: JSON.stringify({ amount: VERIFICATION_AMOUNT }),
        });
        return res.status(409).json({ error: "This card has already been used for a trial" });
      }
    }

    // 2. Refund the verification charge immediately — the user should never
    //    actually keep this $0.50 taken from them.
    await fetch(`${FLW_BASE}/transactions/${txId}/refund`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${FLW_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: VERIFICATION_AMOUNT }),
    });

    // 3. Record the trial in our own DB, keyed by email.
    const trialStart = new Date();
    const trialEnd = new Date(trialStart.getTime() + 7 * 24 * 60 * 60 * 1000);

    await db.query(
      `INSERT INTO subscriptions
         (email, status, plan, plan_amount, card_token, card_fingerprint,
          trial_start, trial_end, verification_tx_id)
       VALUES ($1,'trialing',$2,$3,$4,$5,$6,$7,$8)
       ON CONFLICT (email) DO UPDATE SET
         status = 'trialing', plan = $2, plan_amount = $3, card_token = $4,
         card_fingerprint = $5, trial_start = $6, trial_end = $7,
         verification_tx_id = $8, updated_at = now()`,
      [email, plan, PLAN_PRICES[plan], cardToken, cardFingerprint, trialStart, trialEnd, txId]
    );

    return res.status(200).json({ status: "trialing", trialEnd });
  } catch (err) {
    console.error("trial-start error:", err);
    return res.status(500).json({ error: "Internal error starting trial" });
  }
}
