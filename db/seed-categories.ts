import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import { categories } from "./schema/categories"
import { CATEGORIES_DATA } from "./data/categories-data"

async function seedCategories() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })

  const db = drizzle(pool)

  try {
    console.log("🌱 Seeding categories...")

    // Clear existing categories
    // console.log("  Clearing existing categories...")
    // await db.delete(categories)

    // Insert parent categories and their children
    let parentCount = 0
    let childCount = 0

    for (const categoryGroup of CATEGORIES_DATA) {
      const [parent] = await db
        .insert(categories)
        .values({
          displayName: categoryGroup.displayName,
          slug: categoryGroup.slug,
        })
        .returning()

      parentCount++

      if (categoryGroup.children.length > 0) {
        await db.insert(categories).values(
          categoryGroup.children.map((child) => ({
            displayName: child.displayName,
            slug: child.slug,
            categoryId: parent.id,
          }))
        )
        childCount += categoryGroup.children.length
      }
    }

    console.log("✅ Categories seeded successfully")
    console.log(`   Parents: ${parentCount}`)
    console.log(`   Children: ${childCount}`)
    console.log(`   Total: ${parentCount + childCount}`)
  } catch (error) {
    console.error("❌ Seeding failed:", error)
    throw error
  } finally {
    await pool.end()
  }
}

seedCategories()
