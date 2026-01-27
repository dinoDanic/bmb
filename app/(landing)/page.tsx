import { CategoriesSection } from "@/feature/categories/sections/categories-section"
import { FeaturedProductsSection } from "@/feature/landing/sections/featured-products-section"
import { HeroSection } from "@/feature/landing/sections/hero-section"
import {
  categories,
  featuredProducts,
  heroStats,
} from "@/feature/landing/data/landing-data"

export default function Page() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-16">
      <HeroSection stats={heroStats} />
      <CategoriesSection categories={categories} />
      <FeaturedProductsSection products={featuredProducts} />
    </main>
  )
}
