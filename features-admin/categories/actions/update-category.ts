"use server"

import { db } from "@/db"
import { categories } from "@/db/schema"
import { eq } from "drizzle-orm"
import type { NewCategory } from "@/db/types"

export async function updateCategory(data: { id: number } & Partial<Omit<NewCategory, "id">>) {
  const [category] = await db
    .update(categories)
    .set({
      name: data.name,
      categoryId: data.categoryId || null,
      description: data.description || null,
      imageUrl: data.imageUrl || null,
    })
    .where(eq(categories.id, data.id))
    .returning()

  if (!category) {
    throw new Error("Category not found")
  }

  return category
}
