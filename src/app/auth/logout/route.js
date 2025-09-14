import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ message: "Logged out" });
  res.cookies.set("user", "", { expires: new Date(0) }); // clear cookie
  return res;
}
