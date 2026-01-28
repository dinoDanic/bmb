"use server"

import { db } from "@/db"
import { productDetails } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function getProductDetail(id: number) {
  const [detail] = await db
    .select()
    .from(productDetails)
    .where(eq(productDetails.id, id))

  if (!detail) {
    throw new Error("Product details not found")
  }

  return detail
}
