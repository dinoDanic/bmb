"use server"

import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import bcrypt from "bcryptjs"
import { users } from "./schema/users"

export async function seedAdmin() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })

  const db = drizzle(pool)

  const email = "admin@example.com"
  const password = "admin"
  const passwordHash = await bcrypt.hash(password, 10)

  try {
    await db.insert(users).values({
      email,
      passwordHash,
    }).onConflictDoNothing()

    console.log("Admin user created successfully")
    console.log("Email:", email)
    console.log("Password:", password)
  } catch (error) {
    console.error("Error creating admin user:", error)
  } finally {
    await pool.end()
  }
}

