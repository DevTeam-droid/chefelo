var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// api/db.js
import { createClient } from "file:///C:/Users/Charles%20Brown/Documents/Charles%20Goodluck/elo/node_modules/@supabase/supabase-js/dist/index.mjs";
import pg from "file:///C:/Users/Charles%20Brown/Documents/Charles%20Goodluck/elo/node_modules/pg/esm/index.mjs";
function getPool() {
  if (!pool) {
    if (!connectionString) {
      throw new Error("DATABASE_URL (or POSTGRES_URL) is not set.");
    }
    pool = new Pool({
      connectionString,
      ssl: connectionString.includes("localhost") ? false : { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 3e4,
      connectionTimeoutMillis: 5e3
    });
    pool.on("error", (err) => {
      console.error("Unexpected Postgres pool error:", err);
    });
  }
  return pool;
}
var Pool, supabaseUrl, supabaseKey, supabaseAdmin, connectionString, pool, db;
var init_db = __esm({
  "api/db.js"() {
    ({ Pool } = pg);
    supabaseUrl = process.env.SUPABASE_URL || "https://emepmjgfmzvdrlhvezff.supabase.co";
    supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
    supabaseAdmin = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } }) : null;
    connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
    db = {
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
  }
});

// api/check-free-usage.js
var check_free_usage_exports = {};
__export(check_free_usage_exports, {
  default: () => handler
});
import crypto from "crypto";
async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const forwardedFor = req.headers["x-forwarded-for"];
  const realIp = req.headers["x-real-ip"];
  const ip = (Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor)?.split(",")[0]?.trim() || (Array.isArray(realIp) ? realIp[0] : realIp)?.trim() || req.socket?.remoteAddress || "unknown";
  console.log(`[check-free-usage] Client IP detected: ${ip}`);
  const ipHash = crypto.createHash("sha256").update(ip + IP_HASH_SALT).digest("hex");
  const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  try {
    let count = 1;
    if (supabaseAdmin) {
      const { data: existingRows } = await supabaseAdmin.from("free_usage").select("count").eq("ip_hash", ipHash).eq("day", today);
      if (existingRows && existingRows.length > 0) {
        count = (existingRows[0].count || 0) + 1;
      }
      await supabaseAdmin.from("free_usage").upsert({ ip_hash: ipHash, day: today, count }, { onConflict: "ip_hash,day" });
    } else {
      const result = await db.query(
        `INSERT INTO free_usage (ip_hash, day, count)
         VALUES ($1, $2, 1)
         ON CONFLICT (ip_hash, day) DO UPDATE SET count = free_usage.count + 1
         RETURNING count`,
        [ipHash, today]
      );
      count = result.rows[0].count;
    }
    const allowed = count <= FREE_DECIDES_PER_DAY;
    console.log(`[check-free-usage] IP: ${ip}, count in Supabase: ${count}, allowed: ${allowed}`);
    return res.status(200).json({
      allowed,
      count,
      remaining: Math.max(0, FREE_DECIDES_PER_DAY - count)
    });
  } catch (err) {
    console.error("check-free-usage error:", err);
    return res.status(200).json({ allowed: true, remaining: null, error: err.message });
  }
}
var FREE_DECIDES_PER_DAY, IP_HASH_SALT;
var init_check_free_usage = __esm({
  "api/check-free-usage.js"() {
    init_db();
    FREE_DECIDES_PER_DAY = 1;
    IP_HASH_SALT = process.env.IP_HASH_SALT || "elo_secure_ip_salt_2026_x8f";
  }
});

// vite.config.js
import { defineConfig } from "file:///C:/Users/Charles%20Brown/Documents/Charles%20Goodluck/elo/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Charles%20Brown/Documents/Charles%20Goodluck/elo/node_modules/@vitejs/plugin-react/dist/index.js";
import fs from "fs";
if (fs.existsSync(".env")) {
  const envConfig = fs.readFileSync(".env", "utf8");
  for (const line of envConfig.split("\n")) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const [key, ...vals] = trimmed.split("=");
      let val = vals.join("=").trim();
      if (val.startsWith('"') && val.endsWith('"') || val.startsWith("'") && val.endsWith("'")) {
        val = val.slice(1, -1);
      }
      if (key && !process.env[key.trim()]) {
        process.env[key.trim()] = val;
      }
    }
  }
}
var vite_config_default = defineConfig({
  plugins: [
    react(),
    {
      name: "api-dev-server",
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url && req.url.startsWith("/api/check-free-usage")) {
            try {
              const { default: handler2 } = await Promise.resolve().then(() => (init_check_free_usage(), check_free_usage_exports));
              let body = "";
              req.on("data", (chunk) => body += chunk);
              req.on("end", async () => {
                try {
                  req.body = body ? JSON.parse(body) : {};
                } catch {
                  req.body = {};
                }
                const mockRes = {
                  status(code) {
                    res.statusCode = code;
                    return this;
                  },
                  json(data) {
                    res.setHeader("Content-Type", "application/json");
                    res.end(JSON.stringify(data));
                    return this;
                  },
                  end() {
                    res.end();
                    return this;
                  }
                };
                await handler2(req, mockRes);
              });
              return;
            } catch (err) {
              console.error("Local API dev error:", err);
            }
          }
          next();
        });
      }
    }
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYXBpL2RiLmpzIiwgImFwaS9jaGVjay1mcmVlLXVzYWdlLmpzIiwgInZpdGUuY29uZmlnLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcQ2hhcmxlcyBCcm93blxcXFxEb2N1bWVudHNcXFxcQ2hhcmxlcyBHb29kbHVja1xcXFxlbG9cXFxcYXBpXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxDaGFybGVzIEJyb3duXFxcXERvY3VtZW50c1xcXFxDaGFybGVzIEdvb2RsdWNrXFxcXGVsb1xcXFxhcGlcXFxcZGIuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL0NoYXJsZXMlMjBCcm93bi9Eb2N1bWVudHMvQ2hhcmxlcyUyMEdvb2RsdWNrL2Vsby9hcGkvZGIuanNcIjtpbXBvcnQgeyBjcmVhdGVDbGllbnQgfSBmcm9tICdAc3VwYWJhc2Uvc3VwYWJhc2UtanMnO1xuaW1wb3J0IHBnIGZyb20gJ3BnJztcblxuY29uc3QgeyBQb29sIH0gPSBwZztcblxuY29uc3Qgc3VwYWJhc2VVcmwgPSBwcm9jZXNzLmVudi5TVVBBQkFTRV9VUkwgfHwgXCJodHRwczovL2VtZXBtamdmbXp2ZHJsaHZlemZmLnN1cGFiYXNlLmNvXCI7XG5jb25zdCBzdXBhYmFzZUtleSA9IHByb2Nlc3MuZW52LlNVUEFCQVNFX1NFUlZJQ0VfUk9MRV9LRVkgfHwgcHJvY2Vzcy5lbnYuU1VQQUJBU0VfQU5PTl9LRVk7XG5cbmV4cG9ydCBjb25zdCBzdXBhYmFzZUFkbWluID0gKHN1cGFiYXNlVXJsICYmIHN1cGFiYXNlS2V5KVxuICA/IGNyZWF0ZUNsaWVudChzdXBhYmFzZVVybCwgc3VwYWJhc2VLZXksIHsgYXV0aDogeyBwZXJzaXN0U2Vzc2lvbjogZmFsc2UgfSB9KVxuICA6IG51bGw7XG5cbmNvbnN0IGNvbm5lY3Rpb25TdHJpbmcgPSBwcm9jZXNzLmVudi5EQVRBQkFTRV9VUkwgfHwgcHJvY2Vzcy5lbnYuUE9TVEdSRVNfVVJMO1xuXG5sZXQgcG9vbDtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFBvb2woKSB7XG4gIGlmICghcG9vbCkge1xuICAgIGlmICghY29ubmVjdGlvblN0cmluZykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiREFUQUJBU0VfVVJMIChvciBQT1NUR1JFU19VUkwpIGlzIG5vdCBzZXQuXCIpO1xuICAgIH1cbiAgICBwb29sID0gbmV3IFBvb2woe1xuICAgICAgY29ubmVjdGlvblN0cmluZyxcbiAgICAgIHNzbDogY29ubmVjdGlvblN0cmluZy5pbmNsdWRlcyhcImxvY2FsaG9zdFwiKSA/IGZhbHNlIDogeyByZWplY3RVbmF1dGhvcml6ZWQ6IGZhbHNlIH0sXG4gICAgICBtYXg6IDEwLFxuICAgICAgaWRsZVRpbWVvdXRNaWxsaXM6IDMwMDAwLFxuICAgICAgY29ubmVjdGlvblRpbWVvdXRNaWxsaXM6IDUwMDAsXG4gICAgfSk7XG5cbiAgICBwb29sLm9uKFwiZXJyb3JcIiwgKGVycikgPT4ge1xuICAgICAgY29uc29sZS5lcnJvcihcIlVuZXhwZWN0ZWQgUG9zdGdyZXMgcG9vbCBlcnJvcjpcIiwgZXJyKTtcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gcG9vbDtcbn1cblxuZXhwb3J0IGNvbnN0IGRiID0ge1xuICBxdWVyeTogYXN5bmMgKHRleHQsIHBhcmFtcykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBwID0gZ2V0UG9vbCgpO1xuICAgICAgcmV0dXJuIGF3YWl0IHAucXVlcnkodGV4dCwgcGFyYW1zKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUud2FybihcIkRpcmVjdCBwZyBwb29sIHF1ZXJ5IGZhaWxlZCwgZmFsbGluZyBiYWNrIHRvIFN1cGFiYXNlIGNsaWVudDpcIiwgZXJyLm1lc3NhZ2UpO1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgZGI7IiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxDaGFybGVzIEJyb3duXFxcXERvY3VtZW50c1xcXFxDaGFybGVzIEdvb2RsdWNrXFxcXGVsb1xcXFxhcGlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXENoYXJsZXMgQnJvd25cXFxcRG9jdW1lbnRzXFxcXENoYXJsZXMgR29vZGx1Y2tcXFxcZWxvXFxcXGFwaVxcXFxjaGVjay1mcmVlLXVzYWdlLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9DaGFybGVzJTIwQnJvd24vRG9jdW1lbnRzL0NoYXJsZXMlMjBHb29kbHVjay9lbG8vYXBpL2NoZWNrLWZyZWUtdXNhZ2UuanNcIjsvLyBQT1NUIC9hcGkvY2hlY2stZnJlZS11c2FnZVxuLy9cbi8vIENhbGwgdGhpcyBiZWZvcmUgcnVubmluZyBhIGZyZWUgXCJkZWNpZGVcIiBvbmNlIHRoZSBjbGllbnQtc2lkZSBmcmVlLXVzZVxuLy8gZmxhZyB3b3VsZCBub3JtYWxseSBibG9jay4gVW5saWtlIGxvY2FsU3RvcmFnZSwgdGhpcyBjYW4ndCBiZSByZXNldCBieVxuLy8gY2xlYXJpbmcgc2l0ZSBkYXRhIFx1MjAxNCBpdCdzIGtleWVkIHRvIHRoZSByZXF1ZXN0J3MgSVAsIGhhc2hlZCBzbyB3ZSdyZSBub3Rcbi8vIHN0b3JpbmcgcmF3IElQcyBhdCByZXN0LlxuLy9cbi8vIFRoaXMgaXMgYSBzb2Z0IHRocm90dGxlLCBub3QgYSBoYXJkIHNlY3VyaXR5IGJvdW5kYXJ5IFx1MjAxNCBzaGFyZWQgSVBzXG4vLyAob2ZmaWNlIHdpZmksIGNhbXB1cyBuZXR3b3Jrcywgc29tZSBtb2JpbGUgY2FycmllcnMgYmVoaW5kIENHTkFUKSBjYW5cbi8vIG1ha2UgdGhpcyBvdmVyLXJlc3RyaWN0IGEgaGFuZGZ1bCBvZiBsZWdpdGltYXRlIG5ldyB1c2Vycy4gVGhhdCdzIGFuXG4vLyBhY2NlcHRlZCB0cmFkZW9mZjogdGhpcyBleGlzdHMgdG8gcmFpc2UgdGhlIGNvc3Qgb2YgY2FzdWFsbHkgZmFybWluZ1xuLy8gZnJlZSBkZWNpZGVzIHZpYSBjYWNoZS1jbGVhcmluZywgbm90IHRvIGd1YXJhbnRlZSBpdCdzIGltcG9zc2libGUuXG4vLyBUaGUgdGhpbmcgdGhhdCBhY3R1YWxseSBjYW4ndCBiZSBnYW1lZCBpcyB0aGUgcmVhbCB0cmlhbC9zdWJzY3JpcHRpb25cbi8vIGNoZWNrIGluIHRyaWFsLXN0YXJ0LmpzIChlbWFpbCArIGNhcmQgZmluZ2VycHJpbnQpIFx1MjAxNCB0aGlzIGVuZHBvaW50IGlzXG4vLyBvbmx5IHByb3RlY3RpbmcgdGhlIGZyZWUgcHJlLXBheXdhbGwgZXhwZXJpZW5jZS5cblxuaW1wb3J0IGNyeXB0byBmcm9tICdjcnlwdG8nO1xuaW1wb3J0IHsgc3VwYWJhc2VBZG1pbiwgZGIgfSBmcm9tICcuL2RiLmpzJztcblxuY29uc3QgRlJFRV9ERUNJREVTX1BFUl9EQVkgPSAxOyAvLyAxIGZyZWUgZGVjaXNpb24gYWxsb3dlZCBiZWZvcmUgcGF5d2FsbCB0cmlnZ2VycyBvbiAybmQgZGVjaXNpb25cbmNvbnN0IElQX0hBU0hfU0FMVCA9IHByb2Nlc3MuZW52LklQX0hBU0hfU0FMVCB8fCBcImVsb19zZWN1cmVfaXBfc2FsdF8yMDI2X3g4ZlwiO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKHJlcSwgcmVzKSB7XG4gIGlmIChyZXEubWV0aG9kICE9PSBcIlBPU1RcIikgcmV0dXJuIHJlcy5zdGF0dXMoNDA1KS5lbmQoKTtcblxuICBjb25zdCBmb3J3YXJkZWRGb3IgPSByZXEuaGVhZGVyc1sneC1mb3J3YXJkZWQtZm9yJ107XG4gIGNvbnN0IHJlYWxJcCA9IHJlcS5oZWFkZXJzWyd4LXJlYWwtaXAnXTtcbiAgY29uc3QgaXAgPSAoQXJyYXkuaXNBcnJheShmb3J3YXJkZWRGb3IpID8gZm9yd2FyZGVkRm9yWzBdIDogZm9yd2FyZGVkRm9yKT8uc3BsaXQoJywnKVswXT8udHJpbSgpXG4gICAgfHwgKEFycmF5LmlzQXJyYXkocmVhbElwKSA/IHJlYWxJcFswXSA6IHJlYWxJcCk/LnRyaW0oKVxuICAgIHx8IHJlcS5zb2NrZXQ/LnJlbW90ZUFkZHJlc3NcbiAgICB8fCAndW5rbm93bic7XG5cbiAgY29uc29sZS5sb2coYFtjaGVjay1mcmVlLXVzYWdlXSBDbGllbnQgSVAgZGV0ZWN0ZWQ6ICR7aXB9YCk7XG5cbiAgY29uc3QgaXBIYXNoID0gY3J5cHRvLmNyZWF0ZUhhc2goJ3NoYTI1NicpLnVwZGF0ZShpcCArIElQX0hBU0hfU0FMVCkuZGlnZXN0KCdoZXgnKTtcbiAgY29uc3QgdG9kYXkgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc2xpY2UoMCwgMTApOyAvLyBZWVlZLU1NLUREXG5cbiAgdHJ5IHtcbiAgICBsZXQgY291bnQgPSAxO1xuXG4gICAgaWYgKHN1cGFiYXNlQWRtaW4pIHtcbiAgICAgIC8vIDEuIFF1ZXJ5IFN1cGFiYXNlIFJFU1QgQVBJIGZvciBjdXJyZW50IGNvdW50XG4gICAgICBjb25zdCB7IGRhdGE6IGV4aXN0aW5nUm93cyB9ID0gYXdhaXQgc3VwYWJhc2VBZG1pblxuICAgICAgICAuZnJvbSgnZnJlZV91c2FnZScpXG4gICAgICAgIC5zZWxlY3QoJ2NvdW50JylcbiAgICAgICAgLmVxKCdpcF9oYXNoJywgaXBIYXNoKVxuICAgICAgICAuZXEoJ2RheScsIHRvZGF5KTtcblxuICAgICAgaWYgKGV4aXN0aW5nUm93cyAmJiBleGlzdGluZ1Jvd3MubGVuZ3RoID4gMCkge1xuICAgICAgICBjb3VudCA9IChleGlzdGluZ1Jvd3NbMF0uY291bnQgfHwgMCkgKyAxO1xuICAgICAgfVxuXG4gICAgICAvLyAyLiBVcHNlcnQgY291bnQgaW50byBTdXBhYmFzZSBmcmVlX3VzYWdlIHRhYmxlXG4gICAgICBhd2FpdCBzdXBhYmFzZUFkbWluXG4gICAgICAgIC5mcm9tKCdmcmVlX3VzYWdlJylcbiAgICAgICAgLnVwc2VydCh7IGlwX2hhc2g6IGlwSGFzaCwgZGF5OiB0b2RheSwgY291bnQ6IGNvdW50IH0sIHsgb25Db25mbGljdDogJ2lwX2hhc2gsZGF5JyB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRGlyZWN0IFBvc3RncmVzIGZhbGxiYWNrXG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBkYi5xdWVyeShcbiAgICAgICAgYElOU0VSVCBJTlRPIGZyZWVfdXNhZ2UgKGlwX2hhc2gsIGRheSwgY291bnQpXG4gICAgICAgICBWQUxVRVMgKCQxLCAkMiwgMSlcbiAgICAgICAgIE9OIENPTkZMSUNUIChpcF9oYXNoLCBkYXkpIERPIFVQREFURSBTRVQgY291bnQgPSBmcmVlX3VzYWdlLmNvdW50ICsgMVxuICAgICAgICAgUkVUVVJOSU5HIGNvdW50YCxcbiAgICAgICAgW2lwSGFzaCwgdG9kYXldXG4gICAgICApO1xuICAgICAgY291bnQgPSByZXN1bHQucm93c1swXS5jb3VudDtcbiAgICB9XG5cbiAgICBjb25zdCBhbGxvd2VkID0gY291bnQgPD0gRlJFRV9ERUNJREVTX1BFUl9EQVk7XG4gICAgY29uc29sZS5sb2coYFtjaGVjay1mcmVlLXVzYWdlXSBJUDogJHtpcH0sIGNvdW50IGluIFN1cGFiYXNlOiAke2NvdW50fSwgYWxsb3dlZDogJHthbGxvd2VkfWApO1xuXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHtcbiAgICAgIGFsbG93ZWQsXG4gICAgICBjb3VudCxcbiAgICAgIHJlbWFpbmluZzogTWF0aC5tYXgoMCwgRlJFRV9ERUNJREVTX1BFUl9EQVkgLSBjb3VudCksXG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJjaGVjay1mcmVlLXVzYWdlIGVycm9yOlwiLCBlcnIpO1xuICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbih7IGFsbG93ZWQ6IHRydWUsIHJlbWFpbmluZzogbnVsbCwgZXJyb3I6IGVyci5tZXNzYWdlIH0pO1xuICB9XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXENoYXJsZXMgQnJvd25cXFxcRG9jdW1lbnRzXFxcXENoYXJsZXMgR29vZGx1Y2tcXFxcZWxvXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxDaGFybGVzIEJyb3duXFxcXERvY3VtZW50c1xcXFxDaGFybGVzIEdvb2RsdWNrXFxcXGVsb1xcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvQ2hhcmxlcyUyMEJyb3duL0RvY3VtZW50cy9DaGFybGVzJTIwR29vZGx1Y2svZWxvL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCBmcyBmcm9tICdmcydcblxuLy8gTG9hZCAuZW52IHZhcmlhYmxlcyBmb3IgbG9jYWwgZGV2IGVudmlyb25tZW50XG5pZiAoZnMuZXhpc3RzU3luYygnLmVudicpKSB7XG4gIGNvbnN0IGVudkNvbmZpZyA9IGZzLnJlYWRGaWxlU3luYygnLmVudicsICd1dGY4Jyk7XG4gIGZvciAoY29uc3QgbGluZSBvZiBlbnZDb25maWcuc3BsaXQoJ1xcbicpKSB7XG4gICAgY29uc3QgdHJpbW1lZCA9IGxpbmUudHJpbSgpO1xuICAgIGlmICh0cmltbWVkICYmICF0cmltbWVkLnN0YXJ0c1dpdGgoJyMnKSkge1xuICAgICAgY29uc3QgW2tleSwgLi4udmFsc10gPSB0cmltbWVkLnNwbGl0KCc9Jyk7XG4gICAgICBsZXQgdmFsID0gdmFscy5qb2luKCc9JykudHJpbSgpO1xuICAgICAgaWYgKCh2YWwuc3RhcnRzV2l0aCgnXCInKSAmJiB2YWwuZW5kc1dpdGgoJ1wiJykpIHx8ICh2YWwuc3RhcnRzV2l0aChcIidcIikgJiYgdmFsLmVuZHNXaXRoKFwiJ1wiKSkpIHtcbiAgICAgICAgdmFsID0gdmFsLnNsaWNlKDEsIC0xKTtcbiAgICAgIH1cbiAgICAgIGlmIChrZXkgJiYgIXByb2Nlc3MuZW52W2tleS50cmltKCldKSB7XG4gICAgICAgIHByb2Nlc3MuZW52W2tleS50cmltKCldID0gdmFsO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3QoKSxcbiAgICB7XG4gICAgICBuYW1lOiAnYXBpLWRldi1zZXJ2ZXInLFxuICAgICAgY29uZmlndXJlU2VydmVyKHNlcnZlcikge1xuICAgICAgICBzZXJ2ZXIubWlkZGxld2FyZXMudXNlKGFzeW5jIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgICAgICAgIGlmIChyZXEudXJsICYmIHJlcS51cmwuc3RhcnRzV2l0aCgnL2FwaS9jaGVjay1mcmVlLXVzYWdlJykpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGNvbnN0IHsgZGVmYXVsdDogaGFuZGxlciB9ID0gYXdhaXQgaW1wb3J0KCcuL2FwaS9jaGVjay1mcmVlLXVzYWdlLmpzJyk7XG4gICAgICAgICAgICAgIGxldCBib2R5ID0gJyc7XG4gICAgICAgICAgICAgIHJlcS5vbignZGF0YScsIGNodW5rID0+IGJvZHkgKz0gY2h1bmspO1xuICAgICAgICAgICAgICByZXEub24oJ2VuZCcsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgcmVxLmJvZHkgPSBib2R5ID8gSlNPTi5wYXJzZShib2R5KSA6IHt9O1xuICAgICAgICAgICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgICAgICAgcmVxLmJvZHkgPSB7fTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgbW9ja1JlcyA9IHtcbiAgICAgICAgICAgICAgICAgIHN0YXR1cyhjb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0dXNDb2RlID0gY29kZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAganNvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5zZXRIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBlbmQoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcy5lbmQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBhd2FpdCBoYW5kbGVyKHJlcSwgbW9ja1Jlcyk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkxvY2FsIEFQSSBkZXYgZXJyb3I6XCIsIGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICBdLFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7O0FBQTZWLFNB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
