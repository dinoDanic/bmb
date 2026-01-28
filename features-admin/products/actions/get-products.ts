"use server"

import { db } from "@/db"
import { products } from "@/db/schema"

export async function getProducts() {
  return db.select().from(products)
}
