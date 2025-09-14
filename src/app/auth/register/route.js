import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import prisma from "@/lib/prisma"; // we'll set this up

export async function POST(req) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ error: "Username and password required" }, { status: 400 });
  }

  const existingUser = await prisma.user.findUnique({ where: { username } });
  if (existingUser) {
    return NextResponse.json({ error: "Username already exists" }, { status: 409 });
  }

  const hashedPassword = await hash(password, 10);
  await prisma.user.create({
    data: { username, passwordHash: hashedPassword }
  });

  return NextResponse.json({ message: "Registration successful!" }, { status: 201 });
}
