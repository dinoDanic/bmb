"use server"

import { db } from "@/db"
import { productDetails } from "@/db/schema"

export async function getProductDetailsList() {
  return db.select().from(productDetails)
}
