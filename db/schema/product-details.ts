import { pgTable, serial, real, text } from "drizzle-orm/pg-core"

export const productDetails = pgTable("product_details", {
  id: serial("id").primaryKey(),
  width: real("width"),
  height: real("height"),
  depth: real("depth"),
  weight: real("weight"),
  imageUrl: text("image_url"),
})
