import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AdminPageLayout } from "@/features/admin/components/admin-page-layout"
import { ProductsTable } from "@/features/products/components/products-table"
import { getProducts, getLeafCategories } from "@/features/products/api/actions"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon } from "@hugeicons/core-free-icons"
import type { FormOption } from "@/components/form/types"

export default async function ProductsPage() {
  const [products, leafCategories] = await Promise.all([
    getProducts(),
    getLeafCategories(),
  ])

  const categoryOptions: FormOption[] = leafCategories.map((cat) => ({
    label: cat.displayName,
    value: cat.displayName,
  }))

  return (
    <AdminPageLayout
      title="Products"
      actions={
        <Link href="/admin/auth/core/products/new">
          <Button size="sm">
            <HugeiconsIcon icon={Add01Icon} size={16} data-icon="inline-start" />
            Add Product
          </Button>
        </Link>
      }
    >
      <ProductsTable products={products} categoryOptions={categoryOptions} />
    </AdminPageLayout>
  )
}
