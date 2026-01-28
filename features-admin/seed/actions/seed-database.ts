"use server"

import { faker } from "@faker-js/faker"
import { db } from "@/db"
import { categories, products, productDetails } from "@/db/schema"

const PARENT_CATEGORIES = [
  "Electronics",
  "Clothing",
  "Home & Garden",
  "Sports",
  "Books",
  "Toys",
]

const SUB_CATEGORIES: Record<string, string[]> = {
  Electronics: ["Smartphones", "Laptops", "Tablets", "Accessories", "Audio"],
  Clothing: ["Men's", "Women's", "Kids", "Shoes", "Accessories"],
  "Home & Garden": ["Furniture", "Kitchen", "Decor", "Garden", "Lighting", "Bedding"],
  Sports: ["Fitness", "Outdoor", "Team Sports", "Water Sports"],
  Books: ["Fiction", "Non-Fiction", "Children's", "Comics", "Educational"],
  Toys: ["Action Figures", "Board Games", "Puzzles", "Outdoor Toys", "Educational"],
}

export async function seedDatabase() {
  // Clear existing data
  await db.delete(products)
  await db.delete(productDetails)
  await db.delete(categories)

  // Create parent categories
  const parentCategories = await db
    .insert(categories)
    .values(
      PARENT_CATEGORIES.map((name) => ({
        name,
        description: faker.commerce.department(),
        imageUrl: `https://images.unsplash.com/photo-${faker.string.numeric(10)}?w=400`,
      }))
    )
    .returning()

  // Create sub-categories
  const allSubCategories: typeof parentCategories = []
  for (const parent of parentCategories) {
    const subNames = SUB_CATEGORIES[parent.name] || []
    const subs = await db
      .insert(categories)
      .values(
        subNames.map((name) => ({
          name,
          categoryId: parent.id,
          description: faker.commerce.productDescription(),
          imageUrl: `https://images.unsplash.com/photo-${faker.string.numeric(10)}?w=400`,
        }))
      )
      .returning()
    allSubCategories.push(...subs)
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
    parentCategories: parentCategories.length,
    subCategories: allSubCategories.length,
    products: createdProducts.length,
    productDetails: createdDetails.length,
  }
}
