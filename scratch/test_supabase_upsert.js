import fs from 'fs';

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

async function testUpsert() {
  const testIpHash = "test_ip_hash_123456";
  const today = new Date().toISOString().slice(0, 10);

  console.log(`Testing free_usage check/increment for IP hash: ${testIpHash}, day: ${today}...`);

  // 1. Fetch current usage for this ip_hash and day
  const fetchUrl = `${SUPABASE_URL}/rest/v1/free_usage?ip_hash=eq.${testIpHash}&day=eq.${today}&select=*`;
  const fetchRes = await fetch(fetchUrl, {
    headers: {
      "apikey": SUPABASE_SERVICE_ROLE_KEY,
      "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`
    }
  });

  const existingRows = await fetchRes.json();
  console.log("Existing row:", existingRows);

  let count = 1;
  if (existingRows && existingRows.length > 0) {
    count = existingRows[0].count + 1;
  }

  // 2. Upsert count into free_usage table
  const upsertRes = await fetch(`${SUPABASE_URL}/rest/v1/free_usage`, {
    method: "POST",
    headers: {
      "apikey": SUPABASE_SERVICE_ROLE_KEY,
      "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      "Prefer": "resolution=merge-duplicates,return=representation"
    },
    body: JSON.stringify({
      ip_hash: testIpHash,
      day: today,
      count: count
    })
  });

  console.log("Upsert response status:", upsertRes.status);
  const updatedData = await upsertRes.json();
  console.log("Updated data in Supabase:", updatedData);
}

testUpsert();
