import type { InferSelectModel, InferInsertModel } from "drizzle-orm"
import type { categories, products, productDetails, users } from "./schema"

export type Category = InferSelectModel<typeof categories>
export type NewCategory = InferInsertModel<typeof categories>

export type Product = InferSelectModel<typeof products>
export type NewProduct = InferInsertModel<typeof products>

export type ProductDetails = InferSelectModel<typeof productDetails>
export type NewProductDetails = InferInsertModel<typeof productDetails>

export type User = InferSelectModel<typeof users>
export type NewUser = InferInsertModel<typeof users>
