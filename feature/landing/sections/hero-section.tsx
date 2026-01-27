import { Badge } from "@/components/ui/badge"
import type { HeroStat } from "@/lib/types"
import Image from "next/image"

type HeroSectionProps = {
  stats: HeroStat[]
}

const highlightBadges: string[] = ["Vrtni program", "Industrija", "Custom izrada"]

export function HeroSection({ stats }: HeroSectionProps) {
  return (
    <section className="pt-18 flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <h1 className="text-4xl font-semibold leading-tight text-foreground md:text-5xl">
          Betonski program za vrt, kuću i industriju.
        </h1>
        <p className="text-base text-muted-foreground">
          Izložbeni katalog s cijenama i dostupnošću. Naručivanje ide direktno s
          našim timom.
        </p>
      </div>
      <div className="relative overflow-hidden rounded-3xl bg-foreground">
        <div className="relative h-64 w-full md:h-80">
          <Image
            src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80"
            alt="Betonski proizvodi u izradi"
            fill
            className="object-cover opacity-80"
            sizes="(min-width: 768px) 896px, 100vw"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-r from-foreground/80 via-foreground/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end gap-3 p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-background/80">
            Katalog 2024
          </p>
          <p className="max-w-md text-2xl font-semibold text-background">
            Dizajniramo, lijevamo i isporučujemo betonske elemente po mjeri.
          </p>
          <div className="flex flex-wrap gap-2">
            {highlightBadges.map((badge) => (
              <Badge key={badge} variant="secondary">
                {badge}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <div className="grid max-w-md grid-cols-3 gap-4 text-sm text-muted-foreground">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-lg font-semibold text-foreground">
              {stat.value}
            </p>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
