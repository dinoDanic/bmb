import { getProductDetail } from "@/features-admin/product-details/actions/get-product-detail"
import { ProductDetailForm } from "@/features-admin/product-details/components/product-detail-form"

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditProductDetailsPage({ params }: Props) {
  const { id } = await params
  const productDetail = await getProductDetail(Number(id))

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Product Details</h1>
      <ProductDetailForm productDetail={productDetail} mode="edit" />
    </div>
  )
}
