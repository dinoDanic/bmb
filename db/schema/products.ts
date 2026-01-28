import { pgTable, serial, text, real, integer, boolean } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { categories } from "./categories"
import { productDetails } from "./product-details"

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  code: text("code").notNull().unique(),
  price: real("price").notNull(),
  categoryId: integer("category_id").references(() => categories.id),
  featured: boolean("featured").default(false),
  active: boolean("active").default(true),
  productDetailsId: integer("product_details_id").references(() => productDetails.id),
})

export const productsRelations = relations(products, ({ one }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  details: one(productDetails, {
    fields: [products.productDetailsId],
    references: [productDetails.id],
  }),
}))
