import { NextResponse } from "next/server";
import { compare } from "bcrypt";
import prisma from "../../../lib/prisma";

export async function POST(req) {
  const { username, password } = await req.json();
  const user = await prisma.user.findUnique({ where: { username } });

  if (!user || !(await compare(password, user.passwordHash))) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // fake cookie-based session
  const res = NextResponse.json({ message: "Login successful", username });
  res.cookies.set("user", username, { httpOnly: true, path: "/" });
  return res;
}
