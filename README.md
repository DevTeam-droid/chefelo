# Chef Elo — Real 7-Day Trial with Flutterwave

## Why this exists
Flutterwave's Payment Plans charge the customer the moment they're subscribed —
there's no built-in "$0 now, real charge in 7 days" the way Stripe's
`trial_period_days` works. This backend fakes that behavior safely:

1. **Day 0** — user enters card and email. We run a small verification charge
   (`$0.50`), immediately refund it, and keep the reusable card token.
   No real subscription price is ever taken here.
2. **Days 0–6** — a row in `subscriptions` sits with `status = 'trialing'`.
   Nothing charges during this window.
3. **Day 7** — a scheduled job (`cron-charge-trials.js`) finds trials whose
   window is up, charges the saved token the *real* plan price, and attaches
   a Flutterwave Payment Plan in that same call — so Flutterwave takes over
   automatic recurring billing from that point on.
4. **Day 7 onward** — Flutterwave bills automatically per the plan. A
   webhook (`webhook.js`) tells your DB whether each of those charges
   succeeded, so you can flag `past_due` if a card gets declined later.

## Identity: no signup, so email is the account
There's no login system, so **email is the identity** — it's already
required to process any Flutterwave charge, so it does double duty as the
account key. `subscriptions.email` is the primary key; there's no separate
`user_id` anywhere. "Restore purchases" is just: ask for the email they used,
call `GET /api/subscription-status?email=...`, done.

One trial per card is enforced separately from one trial per email — see
`card_fingerprint` in the schema. Without it, someone could get a second
free week just by typing a different email address with the same physical
card. A device UUID (`device_seen` table) is kept around only for the
free 24-hour teaser window, deliberately not used to gate anything paid —
low stakes if someone resets it.

## Required environment variables
- `DATABASE_URL` — PostgreSQL connection string (Vercel Postgres, Supabase, Neon, etc.)
- `FLW_SECRET_KEY` — Flutterwave secret key (server-side only)
- `FLW_PUBLIC_KEY` — Flutterwave public key
- `FLW_WEBHOOK_SECRET_HASH` — the hash you set in the Flutterwave dashboard's webhook config
- `FLW_MONTHLY_PLAN_ID` / `FLW_ANNUAL_PLAN_ID` — create these once via the
  Flutterwave dashboard or Payment Plans API
- `CRON_SECRET` — random string, checked in `cron-charge-trials.js` so only
  Vercel's cron can trigger the real charges
