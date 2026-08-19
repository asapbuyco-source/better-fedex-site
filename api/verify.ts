export const config = { runtime: "edge" };

const GATE_COOKIE = "ft_gate";
const GATE_TTL_SECONDS = 60 * 60 * 24;
const GATE_TTL_MS = GATE_TTL_SECONDS * 1000;

const enc = new TextEncoder();

async function hmacHex(data: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default async function handler(request: Request) {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    return new Response(JSON.stringify({ ok: false, error: "not_configured" }), {
      status: 500,
      headers: { "content-type": "application/json" }
    });
  }

  let token = "";
  try {
    const body = await request.json();
    if (typeof body?.token === "string") token = body.token;
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "invalid_body" }), {
      status: 400,
      headers: { "content-type": "application/json" }
    });
  }

  if (!token) {
    return new Response(JSON.stringify({ ok: false, error: "missing_token" }), {
      status: 400,
      headers: { "content-type": "application/json" }
    });
  }

  const form = new URLSearchParams();
  form.set("secret", secret);
  form.set("response", token);

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (ip) form.set("remoteip", ip);

  const verify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: form.toString()
  });

  const data = await verify.json();
  if (!data.success) {
    return new Response(JSON.stringify({ ok: false, error: "challenge_failed" }), {
      status: 403,
      headers: { "content-type": "application/json" }
    });
  }

  const expiry = Date.now() + GATE_TTL_MS;
  const sig = await hmacHex(String(expiry), secret);
  const cookie = `${GATE_COOKIE}=${expiry}.${sig}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${GATE_TTL_SECONDS}`;

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "content-type": "application/json",
      "set-cookie": cookie
    }
  });
}
