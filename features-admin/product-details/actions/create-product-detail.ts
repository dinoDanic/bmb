"use server"

import { db } from "@/db"
import { productDetails } from "@/db/schema"
import type { NewProductDetails } from "@/db/types"

export async function createProductDetail(data: Omit<NewProductDetails, "id">) {
  const [detail] = await db
    .insert(productDetails)
    .values({
      width: data.width || null,
      height: data.height || null,
      depth: data.depth || null,
      weight: data.weight || null,
      imageUrl: data.imageUrl || null,
    })
    .returning()

  return detail
}
