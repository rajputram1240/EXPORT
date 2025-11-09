import { NextResponse } from "next/server";
import { signSession } from "@/lib/auth";

export async function POST(req: Request) {
  const { username, password } = await req.json();
  const user = process.env.ADMIN_USER || "admin";
  const pass = process.env.ADMIN_PASS || "admin123";

  if (username !== user || password !== pass) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  const token = signSession({ u: username, iat: Date.now() });
  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === 'production',
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
  return res;
}
