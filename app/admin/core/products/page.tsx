import { Suspense } from "react"
import { getProducts } from "@/features-admin/products/actions/get-products"
import { getCategories } from "@/features-admin/categories/actions/get-categories"
import { ProductsTable } from "@/features-admin/products/components/products-table"

async function ProductsData() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ])
  return <ProductsTable products={products} categories={categories} />
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsData />
    </Suspense>
  )
}
