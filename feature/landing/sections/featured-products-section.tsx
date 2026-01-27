import type { Product } from "@/lib/types"
import { ContentLayout } from "@/components/content-layout"
import { ProductCard } from "@/feature/products/components/product-card"

type FeaturedProductsSectionProps = {
  products: Product[]
}

export function FeaturedProductsSection({
  products,
}: FeaturedProductsSectionProps) {
  return (
    <section className="space-y-6">
      <ContentLayout note="Izdvojeno" title="Popularni proizvodi" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </section>
  )
}
