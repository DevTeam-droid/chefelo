import fs from 'fs';

// Parse .env manually
const envConfig = fs.readFileSync('.env', 'utf8');
const env = {};
for (const line of envConfig.split('\n')) {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const [key, ...vals] = trimmed.split('=');
    let val = vals.join('=').trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    env[key.trim()] = val;
  }
}

const SUPABASE_URL = env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;

console.log("Testing Supabase REST API connection...");
console.log("URL:", SUPABASE_URL);

async function testRestApi() {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/free_usage?select=*&limit=5`, {
      headers: {
        "apikey": SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`
      }
    });

    console.log("REST API Response status:", res.status);
    const data = await res.json();
    console.log("REST API Data:", data);
  } catch (err) {
    console.error("REST API Error:", err);
  }
}

testRestApi();
