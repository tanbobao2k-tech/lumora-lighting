import "server-only";
import crypto from "node:crypto";

export const ADMIN_COOKIE = "lumora_admin_session";

function getSecret(): string {
  return process.env.ADMIN_PASSWORD ?? "";
}

export function verifyPassword(input: string): boolean {
  const secret = getSecret();
  if (!secret) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(secret);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function makeSessionToken(): string {
  return crypto.createHash("sha256").update(`lumora:${getSecret()}`).digest("hex");
}

export function isValidSessionToken(token: string | undefined): boolean {
  if (!token || !getSecret()) return false;
  return token === makeSessionToken();
}
