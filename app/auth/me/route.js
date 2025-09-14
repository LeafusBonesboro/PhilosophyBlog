import { NextResponse } from "next/server";

export async function GET(req) {
  const cookie = req.cookies.get("user");
  if (!cookie) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  return NextResponse.json({ username: cookie.value });
}
