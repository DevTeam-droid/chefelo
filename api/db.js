import pg from 'pg';

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

let pool;

export function getPool() {
  if (!pool) {
    if (!connectionString) {
      console.warn("No DATABASE_URL or POSTGRES_URL environment variable provided.");
    }
    pool = new Pool({
      connectionString,
      ssl: connectionString && !connectionString.includes("localhost") ? { rejectUnauthorized: false } : false,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
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
