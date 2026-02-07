"use server"

import { eq, notInArray, isNotNull } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { db } from "@/db"
import { products, categories, productDetails } from "@/db/schema"
import type { Product, NewProduct, ProductDetails, NewProductDetails, Category } from "@/db/types"

export type ProductWithCategory = Product & {
  categoryName: string | null
}

export type ProductWithDetails = Product & {
  categoryName: string | null
  details: ProductDetails | null
}

const PRODUCTS_PATH = "/admin/auth/core/products"

export async function getProducts(): Promise<ProductWithCategory[]> {
  const rows = await db
    .select({
      id: products.id,
      name: products.name,
      code: products.code,
      price: products.price,
      categoryId: products.categoryId,
      featured: products.featured,
      active: products.active,
      productDetailsId: products.productDetailsId,
      categoryName: categories.displayName,
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))

  return rows
}

export async function getProduct(id: number): Promise<ProductWithDetails | null> {
  const rows = await db
    .select({
      id: products.id,
      name: products.name,
      code: products.code,
      price: products.price,
      categoryId: products.categoryId,
      featured: products.featured,
      active: products.active,
      productDetailsId: products.productDetailsId,
      categoryName: categories.displayName,
      details: {
        id: productDetails.id,
        width: productDetails.width,
        height: productDetails.height,
        depth: productDetails.depth,
        weight: productDetails.weight,
        imageUrl: productDetails.imageUrl,
      },
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .leftJoin(productDetails, eq(products.productDetailsId, productDetails.id))
    .where(eq(products.id, id))

  if (rows.length === 0) return null

  const row = rows[0]
  return {
    ...row,
    details: row.details?.id ? (row.details as ProductDetails) : null,
  }
}

export async function getLeafCategories(): Promise<Category[]> {
  const parentIds = db
    .select({ categoryId: categories.categoryId })
    .from(categories)
    .where(isNotNull(categories.categoryId))

  return db
    .select()
    .from(categories)
    .where(notInArray(categories.id, parentIds))
}

export async function createProduct(
  data: NewProduct,
  details: NewProductDetails | null
) {
  let productDetailsId: number | null = null

  if (details && hasDetailValues(details)) {
    const [inserted] = await db
      .insert(productDetails)
      .values(details)
      .returning({ id: productDetails.id })
    productDetailsId = inserted.id
  }

  await db.insert(products).values({
    ...data,
    productDetailsId,
  })

  revalidatePath(PRODUCTS_PATH)
}

export async function updateProduct(
  id: number,
  data: Partial<NewProduct>,
  details: NewProductDetails | null
) {
  const existing = await db
    .select({ productDetailsId: products.productDetailsId })
    .from(products)
    .where(eq(products.id, id))

  if (existing.length === 0) return

  const existingDetailsId = existing[0].productDetailsId

  let productDetailsId: number | null = existingDetailsId

  if (details && hasDetailValues(details)) {
    if (existingDetailsId) {
      await db
        .update(productDetails)
        .set(details)
        .where(eq(productDetails.id, existingDetailsId))
    } else {
      const [inserted] = await db
        .insert(productDetails)
        .values(details)
        .returning({ id: productDetails.id })
      productDetailsId = inserted.id
    }
  } else if (existingDetailsId) {
    productDetailsId = null
    await db.delete(productDetails).where(eq(productDetails.id, existingDetailsId))
  }

  await db
    .update(products)
    .set({ ...data, productDetailsId })
    .where(eq(products.id, id))

  revalidatePath(PRODUCTS_PATH)
}

export async function deleteProduct(id: number): Promise<{ error?: string }> {
  try {
    const existing = await db
      .select({ productDetailsId: products.productDetailsId })
      .from(products)
      .where(eq(products.id, id))

    if (existing.length === 0) return { error: "Product not found" }

    const detailsId = existing[0].productDetailsId

    await db.delete(products).where(eq(products.id, id))

    if (detailsId) {
      await db.delete(productDetails).where(eq(productDetails.id, detailsId))
    }

    revalidatePath(PRODUCTS_PATH)
    return {}
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return { error: message }
  }
}

function hasDetailValues(details: NewProductDetails): boolean {
  return !!(details.width || details.height || details.depth || details.weight || details.imageUrl)
}
