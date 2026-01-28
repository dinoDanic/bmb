"use server"

import { db } from "@/db"
import { products } from "@/db/schema"
import { eq } from "drizzle-orm"
import type { NewProduct } from "@/db/types"

export async function updateProduct(data: { id: number } & Partial<Omit<NewProduct, "id">>) {
  const [product] = await db
    .update(products)
    .set({
      name: data.name,
      code: data.code,
      price: data.price,
      categoryId: data.categoryId || null,
      featured: data.featured ?? false,
      active: data.active ?? true,
      productDetailsId: data.productDetailsId || null,
    })
    .where(eq(products.id, data.id))
    .returning()

  if (!product) {
    throw new Error("Product not found")
  }

  return product
}
