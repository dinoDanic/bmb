import { getCategories } from "@/features-admin/categories/actions/get-categories"
import { getProductDetailsList } from "@/features-admin/product-details/actions/get-product-details"
import { ProductForm } from "@/features-admin/products/components/product-form"

export default async function NewProductPage() {
  const [categories, productDetailsList] = await Promise.all([
    getCategories(),
    getProductDetailsList(),
  ])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">New Product</h1>
      <ProductForm
        categories={categories}
        productDetailsList={productDetailsList}
        mode="create"
      />
    </div>
  )
}
