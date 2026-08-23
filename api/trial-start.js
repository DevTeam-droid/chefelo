// POST /api/trial-start
// Body: { email, plan: 'monthly' | 'annual', cardDetails: { token, flw_ref, tx_ref } }
//
// No signup flow exists, so email IS the identity — it's already required
// to process a Flutterwave charge, so it doubles as the account key.
//
// IMPORTANT: this does NOT run its own charge. The frontend already
// charged $0.50 via Flutterwave's inline Checkout widget before calling
// this endpoint — `cardDetails.token` here is that transaction's ID, not
// raw card data. This endpoint's job is to VERIFY that transaction
// actually succeeded, pull the reusable card token off of it, refund it,
// and record the trial. Attempting a second charge here would either fail
// outright (no real card fields were sent) or double-charge the user —
// both were bugs in earlier versions of this file. Don't reintroduce them.

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
  const transactionId = cardDetails?.token; // the widget's transaction_id, despite the field name

  if (!rawEmail || !PLAN_PRICES[plan] || !transactionId) {
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

    // 1. Verify the transaction the widget already ran. Never trust the
    //    client's word that a charge succeeded — Flutterwave is the source
    //    of truth for whether money actually moved.
    const verifyRes = await fetch(`${FLW_BASE}/transactions/${transactionId}/verify`, {
      headers: { Authorization: `Bearer ${FLW_SECRET_KEY}` },
    });
    const verifyData = await verifyRes.json();

    if (verifyData.status !== "success" || !verifyData.data) {
      return res.status(402).json({ error: "Could not verify card check", detail: verifyData });
    }

    const tx = verifyData.data;

    if (tx.status !== "successful") {
      return res.status(402).json({ error: "Card check was not successful", detail: tx.status });
    }
    if (tx.currency !== "USD" || Number(tx.amount) !== VERIFICATION_AMOUNT) {
      // Guards against a stale or mismatched transaction ID being replayed.
      return res.status(402).json({ error: "Verification amount mismatch" });
    }
    if (tx.customer?.email && tx.customer.email.trim().toLowerCase() !== email) {
      return res.status(402).json({ error: "Verification email mismatch" });
    }

    const txId = tx.id;
    const card = tx.card || {};
    const cardToken = card.token;

    if (!cardToken) {
      // Refund what we can even though we can't keep going — the user
      // shouldn't be out $0.50 just because tokenization wasn't returned.
      await fetch(`${FLW_BASE}/transactions/${txId}/refund`, {
        method: "POST",
        headers: { Authorization: `Bearer ${FLW_SECRET_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({ amount: VERIFICATION_AMOUNT }),
      });
      return res.status(500).json({ error: "No reusable token returned — card verification could not complete" });
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
        // Refund before bailing — we're not keeping this $0.50 either way.
        await fetch(`${FLW_BASE}/transactions/${txId}/refund`, {
          method: "POST",
          headers: { Authorization: `Bearer ${FLW_SECRET_KEY}`, "Content-Type": "application/json" },
          body: JSON.stringify({ amount: VERIFICATION_AMOUNT }),
        });
        return res.status(409).json({ error: "This card has already been used for a trial" });
      }
    }

    // 2. Refund the verification charge — this is the SAME transaction the
    //    widget created, not a new one. The user should never actually
    //    keep the $0.50 taken from them.
    const refundRes = await fetch(`${FLW_BASE}/transactions/${txId}/refund`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${FLW_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: VERIFICATION_AMOUNT }),
    });
    const refundData = await refundRes.json();

    if (refundData.status !== "success") {
      // Don't silently swallow this — if the refund failed, the user is
      // genuinely out $0.50 and support will need to know why.
      console.error("Verification refund failed:", refundData);
    }

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

    return res.status(200).json({ status: "trialing", trialEnd, refunded: refundData.status === "success" });
  } catch (err) {
    console.error("trial-start error:", err);
    return res.status(500).json({ error: "Internal error starting trial" });
  }
}