// POST /api/webhook — configure this URL in the Flutterwave dashboard.
// After day 7, Flutterwave bills the Payment Plan automatically on its own
// schedule. This webhook is how you find out whether those later charges
// succeeded or failed — you can't poll for that, it has to be event-driven.

import { db } from './db.js';

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  // Verify the webhook is actually from Flutterwave before trusting it.
  const signature = req.headers["verif-hash"];
  if (process.env.FLW_WEBHOOK_SECRET_HASH && (!signature || signature !== process.env.FLW_WEBHOOK_SECRET_HASH)) {
    return res.status(401).json({ error: "Invalid webhook signature" });
  }

  const event = req.body;
  if (!event || !event.event) {
    return res.status(400).json({ error: "Invalid payload" });
  }

  try {
    const customerEmail = event.data?.customer?.email ? event.data.customer.email.trim().toLowerCase() : null;

    if (customerEmail) {
      if (event.event === "charge.completed" && event.data?.status === "successful") {
        // A recurring charge on an existing payment plan went through.
        await db.query(
          `UPDATE subscriptions SET
             status = 'active',
             last_charge_tx_id = $2,
             updated_at = now()
           WHERE email = $1`,
          [customerEmail, event.data?.id]
        );
      }

      if (event.event === "charge.completed" && event.data?.status === "failed") {
        await db.query(
          `UPDATE subscriptions SET status = 'past_due', updated_at = now()
           WHERE email = $1`,
          [customerEmail]
        );
      }
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error("webhook error:", err);
    return res.status(500).json({ error: "Error processing webhook" });
  }
}
