"use server"

import { db } from "@/db"
import { products } from "@/db/schema"
import type { NewProduct } from "@/db/types"

export async function createProduct(data: Omit<NewProduct, "id">) {
  const [product] = await db
    .insert(products)
    .values({
      name: data.name,
      code: data.code,
      price: data.price,
      categoryId: data.categoryId || null,
      featured: data.featured ?? false,
      active: data.active ?? true,
      productDetailsId: data.productDetailsId || null,
    })
    .returning()

  return product
}
