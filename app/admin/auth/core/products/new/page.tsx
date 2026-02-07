import { AdminPageLayout } from "@/features/admin/components/admin-page-layout"
import { ProductForm } from "@/features/products/components/product-form"
import { getLeafCategories } from "@/features/products/api/actions"

export default async function NewProductPage() {
  const categories = await getLeafCategories()

  return (
    <AdminPageLayout title="New Product">
      <ProductForm categories={categories} />
    </AdminPageLayout>
  )
}
