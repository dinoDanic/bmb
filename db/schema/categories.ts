import { pgTable, serial, text, integer } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  categoryId: integer("category_id"),
  description: text("description"),
  imageUrl: text("image_url"),
})

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  parent: one(categories, {
    fields: [categories.categoryId],
    references: [categories.id],
    relationName: "parentChild",
  }),
  children: many(categories, {
    relationName: "parentChild",
  }),
}))
