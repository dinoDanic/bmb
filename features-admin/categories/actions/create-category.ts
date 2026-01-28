"use server"

import { db } from "@/db"
import { categories } from "@/db/schema"
import type { NewCategory } from "@/db/types"

export async function createCategory(data: Omit<NewCategory, "id">) {
  const [category] = await db
    .insert(categories)
    .values({
      name: data.name,
      categoryId: data.categoryId || null,
      description: data.description || null,
      imageUrl: data.imageUrl || null,
    })
    .returning()

  return category
}
