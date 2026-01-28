"use server"

import { db } from "@/db"
import { categories } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function getCategory(id: number) {
  const [category] = await db
    .select()
    .from(categories)
    .where(eq(categories.id, id))

  if (!category) {
    throw new Error("Category not found")
  }

  return category
}
