import { getCategory } from "@/features-admin/categories/actions/get-category"
import { getCategories } from "@/features-admin/categories/actions/get-categories"
import { CategoryForm } from "@/features-admin/categories/components/category-form"

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditCategoryPage({ params }: Props) {
  const { id } = await params
  const [category, allCategories] = await Promise.all([
    getCategory(Number(id)),
    getCategories(),
  ])

  const parentOptions = allCategories.filter((c) => c.id !== Number(id))

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Category</h1>
      <CategoryForm
        category={category}
        parentOptions={parentOptions}
        mode="edit"
      />
    </div>
  )
}
