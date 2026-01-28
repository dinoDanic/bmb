"use server"

import { db } from "@/db"
import { productDetails } from "@/db/schema"
import { eq } from "drizzle-orm"
import type { NewProductDetails } from "@/db/types"

export async function updateProductDetail(data: { id: number } & Partial<Omit<NewProductDetails, "id">>) {
  const [detail] = await db
    .update(productDetails)
    .set({
      width: data.width || null,
      height: data.height || null,
      depth: data.depth || null,
      weight: data.weight || null,
      imageUrl: data.imageUrl || null,
    })
    .where(eq(productDetails.id, data.id))
    .returning()

  if (!detail) {
    throw new Error("Product details not found")
  }

  return detail
}
