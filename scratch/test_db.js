import pg from 'pg';
import fs from 'fs';

const { Pool } = pg;

// Try pooler hostname: postgres.emepmjgfmzvdrlhvezff
const poolerUrl = "postgresql://postgres.emepmjgfmzvdrlhvezff:%40Kom391072419@aws-0-us-east-1.pooler.supabase.com:6543/postgres";
const directUrl = "postgresql://postgres:%40Kom391072419@db.emepmjgfmzvdrlhvezff.supabase.co:5432/postgres";

async function testConnection(url, name) {
  console.log(`Testing ${name}...`);
  const pool = new Pool({
    connectionString: url,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 5000,
  });

  try {
    const res = await pool.query('SELECT NOW()');
    console.log(`✅ SUCCESS on ${name}:`, res.rows[0]);
    await pool.end();
    return url;
  } catch (err) {
    console.error(`❌ FAILED on ${name}:`, err.message);
    await pool.end().catch(() => {});
    return null;
  }
}

async function main() {
  let workingUrl = await testConnection(poolerUrl, "Supabase Pooler (aws-0-us-east-1)");
  if (!workingUrl) {
    workingUrl = await testConnection(directUrl, "Direct DB Host");
  }

  if (workingUrl) {
    console.log("Working DATABASE_URL found:", workingUrl);
  } else {
    console.error("All connection strings failed!");
  }
}

main();
