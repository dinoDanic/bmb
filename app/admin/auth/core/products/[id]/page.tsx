import { notFound } from "next/navigation"
import { AdminPageLayout } from "@/features/admin/components/admin-page-layout"
import { ProductForm } from "@/features/products/components/product-form"
import { getProduct, getLeafCategories } from "@/features/products/api/actions"

type EditProductPageProps = {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params

  const [product, categories] = await Promise.all([
    getProduct(Number(id)),
    getLeafCategories(),
  ])

  if (!product) notFound()

  return (
    <AdminPageLayout title="Edit Product">
      <ProductForm product={product} categories={categories} />
    </AdminPageLayout>
  )
}
