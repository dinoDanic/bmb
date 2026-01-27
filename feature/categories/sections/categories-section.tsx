import type { Category } from "@/lib/types"
import { ContentLayout } from "@/components/content-layout"
import { Button } from "@/components/ui/button"
import { CategoryCard } from "@/feature/categories/components/category-card"

type CategoriesSectionProps = {
  categories: Category[]
}

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  return (
    <section className="space-y-6">
      <ContentLayout
        note="Kategorije"
        title="Glavne kategorije"
        action={
          <Button variant="ghost" className="rounded-full">
            Sve kategorije
          </Button>
        }
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard key={category.name} category={category} />
        ))}
      </div>
    </section>
  )
}
