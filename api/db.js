import { createClient } from '@supabase/supabase-js';
import pg from 'pg';

const { Pool } = pg;

const supabaseUrl = process.env.SUPABASE_URL || "https://emepmjgfmzvdrlhvezff.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

export const supabaseAdmin = (supabaseUrl && supabaseKey)
  ? createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } })
  : null;

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

let pool;

export function getPool() {
  if (!pool) {
    if (!connectionString) {
      throw new Error("DATABASE_URL (or POSTGRES_URL) is not set.");
    }
    pool = new Pool({
      connectionString,
      ssl: connectionString.includes("localhost") ? false : { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });

    pool.on("error", (err) => {
      console.error("Unexpected Postgres pool error:", err);
    });
  }
  return pool;
}

export const db = {
  query: async (text, params) => {
    try {
      const p = getPool();
      return await p.query(text, params);
    } catch (err) {
      console.warn("Direct pg pool query failed, falling back to Supabase client:", err.message);
      throw err;
    }
  }
};

export default db;