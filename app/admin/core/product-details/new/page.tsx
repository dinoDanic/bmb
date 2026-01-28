import { ProductDetailForm } from "@/features-admin/product-details/components/product-detail-form"

export default function NewProductDetailsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">New Product Details</h1>
      <ProductDetailForm mode="create" />
    </div>
  )
}
