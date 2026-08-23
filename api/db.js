import pg from 'pg';

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

let pool;

export function getPool() {
  if (!pool) {
    if (!connectionString) {
      // Fail loud, not quiet. A warning here gets lost in logs and the
      // real symptom shows up later as a confusing ECONNREFUSED to
      // localhost — pg's default when no connectionString is given —
      // which looks unrelated to the actual misconfiguration.
      throw new Error(
        "DATABASE_URL (or POSTGRES_URL) is not set. Refusing to start a " +
        "connection pool against pg's localhost default in a serverless " +
        "environment — set the env var in your Vercel project settings."
      );
    }

    // NOTE on serverless + connection limits: each warm Vercel function
    // instance holds its own pool. Under concurrent load, many instances
    // × `max` connections each can exceed your Postgres provider's
    // connection cap (often low on free/starter tiers) well before your
    // actual traffic looks like "a lot." If you hit "too many connections"
    // errors under load, don't just raise `max` here — point
    // DATABASE_URL at your provider's *pooled* connection string instead
    // (Neon: the "-pooler" host; Supabase: port 6543 / pgbouncer mode).
    // That's built for exactly this shape of traffic and won't need this
    // file to change.
    pool = new Pool({
      connectionString,
      ssl: connectionString.includes("localhost") ? false : { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });

    pool.on("error", (err) => {
      // Idle client errors (e.g. the DB terminating a connection) throw
      // async and crash the process if unhandled — pg's pool requires
      // this listener to exist even if it just logs.
      console.error("Unexpected Postgres pool error:", err);
    });
  }
  return pool;
}

export const db = {
  query: async (text, params) => {
    const p = getPool();
    return p.query(text, params);
  }
};

export default db;