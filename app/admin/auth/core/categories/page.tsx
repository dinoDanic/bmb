import { Button } from "@/components/ui/button"
import { getCategories, getRootCategories } from "@/features/categories/api/actions"
import { CategoriesTable } from "@/features/categories/components/categories-table"
import { CategoryFormDialog } from "@/features/categories/components/category-form-dialog"
import { SeedCategoriesButton } from "@/features/categories/components/seed-categories-button"
import { AdminPageLayout } from "@/features/admin/components/admin-page-layout"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon } from "@hugeicons/core-free-icons"

export default async function CategoriesPage() {
  const [allCategories, parentCategories] = await Promise.all([
    getCategories(),
    getRootCategories(),
  ])

  return (
    <AdminPageLayout
      title="Categories"
      actions={
        <CategoryFormDialog
          parentCategories={parentCategories}
          trigger={
            <Button size="sm">
              <HugeiconsIcon icon={Add01Icon} size={16} data-icon="inline-start" />
              Add Category
            </Button>
          }
        />
      }
    >
      {allCategories.length === 0 ? (
        <SeedCategoriesButton />
      ) : (
        <CategoriesTable categories={allCategories} parentCategories={parentCategories} />
      )}
    </AdminPageLayout>
  )
}
