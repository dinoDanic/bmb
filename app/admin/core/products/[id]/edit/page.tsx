import { getProduct } from "@/features-admin/products/actions/get-product"
import { getCategories } from "@/features-admin/categories/actions/get-categories"
import { getProductDetailsList } from "@/features-admin/product-details/actions/get-product-details"
import { ProductForm } from "@/features-admin/products/components/product-form"

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params
  const [product, categories, productDetailsList] = await Promise.all([
    getProduct(Number(id)),
    getCategories(),
    getProductDetailsList(),
  ])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <ProductForm
        product={product}
        categories={categories}
        productDetailsList={productDetailsList}
        mode="edit"
      />
    </div>
  )
}
