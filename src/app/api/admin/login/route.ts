import { NextResponse } from "next/server";
import { verifyPassword, makeSessionToken, ADMIN_COOKIE } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const { password } = await request.json();

  if (typeof password !== "string" || !verifyPassword(password)) {
    return NextResponse.json({ error: "Sai mật khẩu" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, makeSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}
