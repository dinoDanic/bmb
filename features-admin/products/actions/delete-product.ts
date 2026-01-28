"use server"

import { db } from "@/db"
import { products } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function deleteProduct(id: number) {
  const [product] = await db
    .delete(products)
    .where(eq(products.id, id))
    .returning()

  if (!product) {
    throw new Error("Product not found")
  }

  return product
}
