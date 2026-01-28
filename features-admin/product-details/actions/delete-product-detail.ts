"use server"

import { db } from "@/db"
import { productDetails } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function deleteProductDetail(id: number) {
  const [detail] = await db
    .delete(productDetails)
    .where(eq(productDetails.id, id))
    .returning()

  if (!detail) {
    throw new Error("Product details not found")
  }

  return detail
}
