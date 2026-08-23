// POST /api/check-free-usage
//
// Call this before running a free "decide" once the client-side free-use
// flag would normally block. Unlike localStorage, this can't be reset by
// clearing site data — it's keyed to the request's IP, hashed so we're not
// storing raw IPs at rest.
//
// This is a soft throttle, not a hard security boundary — shared IPs
// (office wifi, campus networks, some mobile carriers behind CGNAT) can
// make this over-restrict a handful of legitimate new users. That's an
// accepted tradeoff: this exists to raise the cost of casually farming
// free decides via cache-clearing, not to guarantee it's impossible.
// The thing that actually can't be gamed is the real trial/subscription
// check in trial-start.js (email + card fingerprint) — this endpoint is
// only protecting the free pre-paywall experience.

import crypto from 'crypto';
import { db } from './db.js';

const FREE_DECIDES_PER_DAY = 1; // 1 free decision allowed before paywall triggers on 2nd decision
const IP_HASH_SALT = process.env.IP_HASH_SALT || "elo_secure_ip_salt_2026_x8f";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const forwardedFor = req.headers['x-forwarded-for'];
  const realIp = req.headers['x-real-ip'];
  const ip = (Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor)?.split(',')[0]?.trim()
    || (Array.isArray(realIp) ? realIp[0] : realIp)?.trim()
    || req.socket?.remoteAddress
    || 'unknown';

  console.log(`[check-free-usage] Client IP detected: ${ip}`);

  const ipHash = crypto.createHash('sha256').update(ip + IP_HASH_SALT).digest('hex');
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  try {
    // Ensure table exists defensively
    await db.query(`
      CREATE TABLE IF NOT EXISTS free_usage (
        ip_hash TEXT NOT NULL,
        day     DATE NOT NULL,
        count   INTEGER NOT NULL DEFAULT 0,
        PRIMARY KEY (ip_hash, day)
      )
    `);

    const result = await db.query(
      `INSERT INTO free_usage (ip_hash, day, count)
       VALUES ($1, $2, 1)
       ON CONFLICT (ip_hash, day) DO UPDATE SET count = free_usage.count + 1
       RETURNING count`,
      [ipHash, today]
    );

    const count = result.rows[0].count;
    const allowed = count <= FREE_DECIDES_PER_DAY;

    console.log(`[check-free-usage] IP: ${ip}, count: ${count}, allowed: ${allowed}`);

    return res.status(200).json({
      allowed,
      count,
      remaining: Math.max(0, FREE_DECIDES_PER_DAY - count),
    });
  } catch (err) {
    console.error("check-free-usage database error:", err);
    // Fail open if database is down so users aren't completely crashed
    return res.status(200).json({ allowed: true, remaining: null, error: err.message });
  }
}
