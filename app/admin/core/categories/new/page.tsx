import { getCategories } from "@/features-admin/categories/actions/get-categories"
import { CategoryForm } from "@/features-admin/categories/components/category-form"

export default async function NewCategoryPage() {
  const categories = await getCategories()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">New Category</h1>
      <CategoryForm parentOptions={categories} mode="create" />
    </div>
  )
}
