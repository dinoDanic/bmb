"use server"

import { eq, isNull } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { categories } from "@/db/schema"
import { CATEGORIES_DATA } from "@/db/data/categories-data"
import type { Category, NewCategory } from "@/db/types"

export type CategoryWithParent = Category & {
  parentName: string | null
}

const CATEGORIES_PATH = "/admin/auth/core/categories"

export async function getCategories(): Promise<CategoryWithParent[]> {
  const parent = db
    .select({
      id: categories.id,
      displayName: categories.displayName,
    })
    .from(categories)
    .where(isNull(categories.categoryId))
    .as("parent")

  const rows = await db
    .select({
      id: categories.id,
      displayName: categories.displayName,
      slug: categories.slug,
      categoryId: categories.categoryId,
      description: categories.description,
      imageUrl: categories.imageUrl,
      parentName: parent.displayName,
    })
    .from(categories)
    .leftJoin(parent, eq(categories.categoryId, parent.id))

  return rows
}

export async function getRootCategories(): Promise<Category[]> {
  return db
    .select()
    .from(categories)
    .where(isNull(categories.categoryId))
}

export async function createCategory(data: NewCategory) {
  await db.insert(categories).values(data)
  revalidatePath(CATEGORIES_PATH)
}

export async function updateCategory(id: number, data: Partial<NewCategory>) {
  await db.update(categories).set(data).where(eq(categories.id, id))
  revalidatePath(CATEGORIES_PATH)
}

export async function deleteCategory(id: number): Promise<{ error?: string }> {
  try {
    await db.delete(categories).where(eq(categories.id, id))
    revalidatePath(CATEGORIES_PATH)
    return {}
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    if (message.includes("violates foreign key constraint")) {
      return { error: "Cannot delete - category is assigned to products" }
    }
    return { error: "Failed to delete category" }
  }
}

export async function seedCategories(): Promise<number> {
  const existing = await db.select({ id: categories.id }).from(categories).limit(1)
  if (existing.length > 0) return 0

  let count = 0

  for (const group of CATEGORIES_DATA) {
    const [parent] = await db
      .insert(categories)
      .values({
        displayName: group.displayName,
        slug: group.slug,
      })
      .returning()
    count++

    if (group.children.length > 0) {
      await db.insert(categories).values(
        group.children.map((child) => ({
          displayName: child.displayName,
          slug: child.slug,
          categoryId: parent.id,
        }))
      )
      count += group.children.length
    }
  }

  revalidatePath(CATEGORIES_PATH)
  return count
}
