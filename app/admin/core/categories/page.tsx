import { Suspense } from "react"
import { getCategories } from "@/features-admin/categories/actions/get-categories"
import { CategoriesTable } from "@/features-admin/categories/components/categories-table"

async function CategoriesData() {
  const categories = await getCategories()
  return <CategoriesTable categories={categories} />
}

export default function CategoriesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoriesData />
    </Suspense>
  )
}
