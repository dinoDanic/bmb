"use server"

import { faker } from "@faker-js/faker"
import { db } from "@/db"
import { categories, products, productDetails } from "@/db/schema"
import { CATEGORIES_DATA } from "@/db/data/categories-data"

export async function seedDatabase() {
  // Clear existing data
  await db.delete(products)
  await db.delete(productDetails)
  await db.delete(categories)

  // Create categories from real data
  const allSubCategories: (typeof categories.$inferSelect)[] = []

  for (const categoryGroup of CATEGORIES_DATA) {
    const [parent] = await db
      .insert(categories)
      .values({
        displayName: categoryGroup.displayName,
        slug: categoryGroup.slug,
      })
      .returning()

    if (categoryGroup.children.length > 0) {
      const subs = await db
        .insert(categories)
        .values(
          categoryGroup.children.map((child) => ({
            displayName: child.displayName,
            slug: child.slug,
            categoryId: parent.id,
          }))
        )
        .returning()
      allSubCategories.push(...subs)
    }
  }

  // Create product details
  const detailsCount = 100
  const createdDetails = await db
    .insert(productDetails)
    .values(
      Array.from({ length: detailsCount }, () => ({
        width: faker.number.float({ min: 5, max: 100, fractionDigits: 1 }),
        height: faker.number.float({ min: 5, max: 100, fractionDigits: 1 }),
        depth: faker.number.float({ min: 1, max: 50, fractionDigits: 1 }),
        weight: faker.number.float({ min: 0.1, max: 20, fractionDigits: 2 }),
        imageUrl: `https://images.unsplash.com/photo-${faker.string.numeric(10)}?w=800`,
      }))
    )
    .returning()

  // Create products
  const createdProducts = await db
    .insert(products)
    .values(
      Array.from({ length: 100 }, (_, i) => {
        const category = faker.helpers.arrayElement(allSubCategories)
        return {
          name: faker.commerce.productName(),
          code: `PRD-${faker.string.alphanumeric(8).toUpperCase()}`,
          price: faker.number.float({ min: 9.99, max: 999.99, fractionDigits: 2 }),
          categoryId: category.id,
          featured: faker.datatype.boolean({ probability: 0.1 }),
          active: faker.datatype.boolean({ probability: 0.9 }),
          productDetailsId: createdDetails[i].id,
        }
      })
    )
    .returning()

  return {
    parentCategories: CATEGORIES_DATA.length,
    subCategories: allSubCategories.length,
    products: createdProducts.length,
    productDetails: createdDetails.length,
  }
}
