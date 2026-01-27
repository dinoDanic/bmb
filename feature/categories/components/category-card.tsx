import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Category } from "@/lib/types"
import Image from "next/image"

type CategoryCardProps = {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Card className="border-0 bg-card/80 pt-0">
      <div className="relative h-40 w-full">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 320px, (min-width: 768px) 50vw, 100vw"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{category.name}</CardTitle>
        <CardDescription>{category.description}</CardDescription>
      </CardHeader>
      <CardFooter className="justify-between">
        <span className="text-sm text-muted-foreground">
          {category.count} proizvoda
        </span>
        <Button size="sm" variant="outline" className="rounded-full">
          Pregledaj
        </Button>
      </CardFooter>
    </Card>
  )
}
