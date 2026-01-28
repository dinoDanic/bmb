import { Suspense } from "react"
import { getProductDetailsList } from "@/features-admin/product-details/actions/get-product-details"
import { ProductDetailsTable } from "@/features-admin/product-details/components/product-details-table"

async function ProductDetailsData() {
  const productDetails = await getProductDetailsList()
  return <ProductDetailsTable productDetails={productDetails} />
}

export default function ProductDetailsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductDetailsData />
    </Suspense>
  )
}
