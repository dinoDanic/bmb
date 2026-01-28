"use server"

import { db } from "@/db"
import { products } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function getProduct(id: number) {
  const [product] = await db
    .select()
    .from(products)
    .where(eq(products.id, id))

  if (!product) {
    throw new Error("Product not found")
  }

  return product
}
