"use server"

import { db } from "@/db"
import { categories } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function deleteCategory(id: number) {
  const [category] = await db
    .delete(categories)
    .where(eq(categories.id, id))
    .returning()

  if (!category) {
    throw new Error("Category not found")
  }

  return category
}
