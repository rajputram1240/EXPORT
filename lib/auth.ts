import crypto from "crypto";

const SECRET = process.env.AUTH_SECRET || "dev_secret";

function b64url(input: Buffer) {
  return input.toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

export type SessionPayload = { u: string; iat: number };

export function signSession(payload: SessionPayload) {
  const body = Buffer.from(JSON.stringify(payload));
  const b = b64url(body);
  const sig = b64url(crypto.createHmac("sha256", SECRET).update(b).digest());
  return `${b}.${sig}`;
}

export function verifySession(token?: string): SessionPayload | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [b, sig] = parts;
  const expected = b64url(crypto.createHmac("sha256", SECRET).update(b).digest());
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  try {
    const json = Buffer.from(b.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8");
    const payload = JSON.parse(json) as SessionPayload;
    return payload;
  } catch {
    return null;
  }
}
