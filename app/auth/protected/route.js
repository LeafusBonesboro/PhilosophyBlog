import { NextResponse } from "next/server";

export async function GET(req) {
  const user = req.cookies.get("user")?.value;

  if (!user) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  return NextResponse.json({ message: `Hello ${user}, you are logged in!` });
}
