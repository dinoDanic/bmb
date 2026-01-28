"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"
import { SignJWT } from "jose"

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "default-secret-change-in-production"
)

export async function login(data: { email: string; password: string }) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, data.email))

  if (!user || !(await bcrypt.compare(data.password, user.passwordHash))) {
    return { error: "Invalid credentials" }
  }

  const token = await new SignJWT({ userId: user.id, email: user.email })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .sign(JWT_SECRET)

  const cookieStore = await cookies()
  cookieStore.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  })

  redirect("/admin")
}
