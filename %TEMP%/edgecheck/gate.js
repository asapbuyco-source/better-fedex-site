// netlify/edge-functions/_shared.ts
var enc = new TextEncoder();
async function hmacHex(data, secret) {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return Array.from(new Uint8Array(sig)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
var GATE_COOKIE = "ft_gate";
var GATE_TTL_SECONDS = 60 * 60 * 24;
var GATE_TTL_MS = GATE_TTL_SECONDS * 1e3;
function getCookies(request) {
  const raw = request.headers.get("cookie") || "";
  const out = {};
  for (const part of raw.split(";")) {
    const idx = part.indexOf("=");
    if (idx === -1) continue;
    out[part.slice(0, idx).trim()] = decodeURIComponent(part.slice(idx + 1).trim());
  }
  return out;
}

// netlify/edge-functions/gate.ts
async function isVerified(request, secret) {
  const gate = getCookies(request)[GATE_COOKIE];
  if (!gate) return false;
  const dot = gate.lastIndexOf(".");
  if (dot === -1) return false;
  const expiry = gate.slice(0, dot);
  const sig = gate.slice(dot + 1);
  if (!/^\d+$/.test(expiry)) return false;
  const expected = await hmacHex(expiry, secret);
  return sig === expected && Date.now() < Number(expiry);
}
function challengeHtml(siteKey) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Just a moment\u2026</title>
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #1d1f2f; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
  .wrap { display: flex; flex-direction: column; align-items: center; padding: 0 24px; text-align: center; }
  .ring { width: 96px; height: 96px; margin-bottom: 32px; border-radius: 50%; background: conic-gradient(from 0deg, transparent 0deg, transparent 60deg, #f48120 140deg, #f6a800 200deg, transparent 280deg, transparent 360deg); -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 6px), #000 calc(100% - 5px)); mask: radial-gradient(farthest-side, transparent calc(100% - 6px), #000 calc(100% - 5px)); animation: spin 1.1s linear infinite; }
  h1 { color: #fff; font-size: 20px; font-weight: 600; margin-bottom: 8px; }
  p.sub { color: #9ca3af; font-size: 14px; margin-bottom: 28px; max-width: 420px; line-height: 1.5; }
  .foot { color: #6b7280; font-size: 11px; margin-top: 44px; }
  @keyframes spin { to { transform: rotate(360deg); } }
</style>
</head>
<body>
  <div class="wrap">
    <div class="ring"></div>
    <h1>Verifying you are human</h1>
    <p class="sub">This may take a few seconds. This site needs to review the security of your connection before proceeding.</p>
    <div class="cf-turnstile" data-sitekey="${siteKey}" data-theme="dark" data-callback="onTurnstilePass"></div>
    <p class="foot">Performance &amp; security by FedEx Gate</p>
  </div>
  <script>
    window.onTurnstilePass = function (token) {
      sessionStorage.setItem("site_unlocked", "true");
      fetch("/__verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: token })
      })
        .then(function (r) {
          if (r.ok) { location.reload(); }
          else { setTimeout(function () { location.reload(); }, 1500); }
        })
        .catch(function () { setTimeout(function () { location.reload(); }, 1500); });
    };
  </script>
</body>
</html>`;
}
var gate_default = async (request, context) => {
  const url = new URL(request.url);
  if (url.pathname === "/__verify") {
    return context.next();
  }
  const secret = Netlify.env.get("TURNSTILE_SECRET_KEY");
  const siteKey = Netlify.env.get("TURNSTILE_SITE_KEY");
  if (!secret || !siteKey) {
    return context.next();
  }
  if (await isVerified(request, secret)) {
    return context.next();
  }
  return new Response(challengeHtml(siteKey), {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store"
    }
  });
};
export {
  gate_default as default
};
