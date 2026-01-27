import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardFooter } from "@/components/ui/card"
import type { Product } from "@/lib/types"
import { cn } from "@/lib/utils"
import Image from "next/image"

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const badgeProps = product.badge

  return (
    <Card className="pt-0 relative">
      {badgeProps ? (
        <Badge
          {...badgeProps}
          className={cn("absolute z-10 right-2 top-2", badgeProps.className)}
        />
      ) : null}
      <div className="relative h-40 w-full">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 220px, (min-width: 768px) 50vw, 100vw"
        />
      </div>
      <CardContent>
        <CardAction>
        </CardAction>
        <div>
          <p className="text-base font-semibold">{product.name}</p>
          <p className="text-sm text-muted-foreground">{product.price}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button size="sm" variant='secondary' className="w-full rounded-full">
          Vise
        </Button>
      </CardFooter>
    </Card>
  )
}
