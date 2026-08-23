-- One row per subscriber. There's no signup flow, so EMAIL is the identity —
-- it's already required to process any Flutterwave charge, so it doubles as
-- the account key. No separate user_id / password / login system needed.
--
-- This table is the SOURCE OF TRUTH. The client (localStorage) should only
-- ever mirror what this table says, never decide it.

CREATE TABLE IF NOT EXISTS subscriptions (
  email              TEXT PRIMARY KEY,             -- the identity. lowercase + trim before every lookup.

  status             TEXT NOT NULL DEFAULT 'none',
  -- 'none' | 'verifying' | 'trialing' | 'active' | 'past_due' | 'canceled'

  plan               TEXT,                         -- 'monthly' | 'annual'
  plan_amount        NUMERIC(10,2),                -- 4.99 or 29.99

  card_token         TEXT,                         -- Flutterwave card token (server-side only, never sent to client)
  card_fingerprint   TEXT,                         -- last4 + expiry + bin, used to block repeat trials on the same card

  trial_start        TIMESTAMPTZ,
  trial_end          TIMESTAMPTZ,                  -- trial_start + 7 days, computed on insert

  flw_payment_plan_id TEXT,                        -- set once day-7 charge succeeds and plan kicks in
  next_billing_at     TIMESTAMPTZ,

  verification_tx_id  TEXT,                        -- the $0.50 verification charge, refunded immediately
  last_charge_tx_id    TEXT,

  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_trial_end ON subscriptions (trial_end) WHERE status = 'trialing';

-- Enforces "one trial per card" even across different emails — someone can't
-- get a second free week by typing a new email address with the same card.
CREATE UNIQUE INDEX IF NOT EXISTS idx_subscriptions_card_fingerprint_trialed
  ON subscriptions (card_fingerprint)
  WHERE card_fingerprint IS NOT NULL;

-- Lightweight anonymous tracking for the free 24-hour teaser window only —
-- deliberately NOT used to gate anything paid. Low stakes if someone resets
-- their device UUID; worst case is one extra free day of the meal-decider,
-- not an extra free week of the paid feature.
CREATE TABLE IF NOT EXISTS device_seen (
  device_uuid   TEXT PRIMARY KEY,
  first_seen_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
