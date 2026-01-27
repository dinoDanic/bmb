import { HugeiconsIcon } from "@hugeicons/react"
import { SparklesIcon } from "@hugeicons/core-free-icons"

import type { Category, HeroStat, Product } from "@/lib/types"

export const heroStats: HeroStat[] = [
  { value: "35+", label: "kategorija proizvoda" },
  { value: "20 god.", label: "iskustva u betonu" },
  { value: "100%", label: "ručna završna obrada" },
]

export const categories: Category[] = [
  {
    name: "Roštilji i ložišta",
    description: "Vrtni roštilji, ložišta, pečenjare",
    image:
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1200&q=80",
    count: 18,
  },
  {
    name: "Krušne peći",
    description: "Tradicionalne i moderne peći",
    image:
      "https://images.unsplash.com/photo-1447279506476-3faec8071eee?auto=format&fit=crop&w=1200&q=80",
    count: 9,
  },
  {
    name: "Uređenje okoliša",
    description: "Žardinjere, rubnjaci, elementi",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    count: 24,
  },
  {
    name: "Dekorativne ograde",
    description: "Ograde, stupovi, završni blokovi",
    image:
      "https://images.unsplash.com/photo-1503185912284-5271ff81b9a8?auto=format&fit=crop&w=1200&q=80",
    count: 14,
  },
  {
    name: "Industrijska galanterija",
    description: "Betonski elementi za industriju",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    count: 11,
  },
  {
    name: "Ostali proizvodi",
    description: "Specijalni proizvodi po mjeri",
    image:
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
    count: 7,
  },
]

export const featuredProducts: Product[] = [
  {
    name: "Vrtni roštilj BMB 512",
    price: "€690",
    badge: {
      children: "Popularno",
    },
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Krušna peć Classic",
    price: "€1,250",
    badge: {
      variant: "outline",
      children: (
        <>
          <HugeiconsIcon
            icon={SparklesIcon}
            strokeWidth={2}
            data-icon="inline-start"
          />
          Novo
        </>
      ),
    },
    image:
      "https://images.unsplash.com/photo-1504386106331-3e4e71712b38?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Dekorativna ograda Stone",
    price: "€42 / kom",
    badge: {
      variant: "secondary",
      children: (
        <>
          <HugeiconsIcon
            icon={SparklesIcon}
            strokeWidth={2}
            data-icon="inline-start"
          />
          Popust
        </>
      ),
    },
    image:
      "https://images.unsplash.com/photo-1509600110300-21b9d5fedeb7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Žardinjera Urban",
    price: "€95",
    badge: {
      variant: "secondary",
      children: "Dostupno",
    },
    image:
      "https://images.unsplash.com/photo-1459666644539-a9755287d6b0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Pecenjara Family 900",
    price: "€1,390",
    badge: {
      variant: "outline",
      children: "Na akciji",
    },
    image:
      "https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Betonski rubnjak Terra",
    price: "€12 / kom",
    badge: {
      variant: "secondary",
      children: "Najprodavanije",
    },
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Stup ograde Classic",
    price: "€28",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Loziste Stone Krug 80",
    price: "€320",
    badge: {
      variant: "outline",
      children: "Limitirano",
    },
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
  },
]
