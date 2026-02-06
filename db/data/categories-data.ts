import type { InferInsertModel } from "drizzle-orm"
import { categories } from "../schema/categories"

type CategoryInsert = InferInsertModel<typeof categories>

type CategoryWithChildren = Pick<CategoryInsert, "displayName" | "slug"> & {
  children: Pick<CategoryInsert, "displayName" | "slug">[]
}

export const CATEGORIES_DATA: CategoryWithChildren[] = [
  {
    displayName: "Roštilji i pečenjare",
    slug: "rostilji-i-pecenjare",
    children: [
      { displayName: "Mini kamini", slug: "mini-kamini" },
      { displayName: "Roštilji", slug: "rostilji" },
      { displayName: "Mini pečenjare", slug: "mini-pecenjare" },
      { displayName: "Pečenjare", slug: "pecenjare" },
      { displayName: "Roštilj oprema", slug: "rostilj-oprema" },
    ],
  },
  {
    displayName: "Krušne peći",
    slug: "krusne-peci",
    children: [
      { displayName: "Krušne Peći Hobby", slug: "krusne-peci-hobby" },
      { displayName: "Krušne peći Profi", slug: "krusne-peci-profi" },
      { displayName: "Oprema za krušne peći", slug: "oprema-za-krusne-peci" },
    ],
  },
  {
    displayName: "Uređenje okoliša",
    slug: "uredenje-okolisa",
    children: [
      { displayName: "Žardinjere", slug: "zardinjere" },
      { displayName: "Fontane", slug: "fontane" },
      { displayName: "Vrtne figure i statue", slug: "vrtne-figure-i-statue" },
      { displayName: "Zdenčeki, bunari...", slug: "zdenceki-bunari" },
      { displayName: "Škarpni elementi", slug: "skarpni-elementi" },
      { displayName: "Stolovi i klupe", slug: "stolovi-i-klupe" },
      { displayName: "Stalci za suncobrane", slug: "stalci-za-suncobrane" },
      { displayName: "Ostali betonski elementi", slug: "ostali-betonski-elementi" },
    ],
  },
  {
    displayName: "Dekorativne obloge",
    slug: "dekorativne-obloge",
    children: [],
  },
  {
    displayName: "Industrijska galanterija",
    slug: "industrijska-galanterija",
    children: [
      { displayName: "Rubnjaci, kanalice...", slug: "rubnjaci-kanalice" },
      { displayName: "Šaht, septička jama...", slug: "saht-septicka-jama" },
      { displayName: "Kape za dimnjak", slug: "kape-za-dimnjak" },
      { displayName: "Uglovni elementi", slug: "uglovni-elementi" },
      { displayName: "Parking elementi", slug: "parking-elementi" },
    ],
  },
  {
    displayName: "Ostali proizvodi",
    slug: "ostali-proizvodi",
    children: [
      { displayName: "Izolacija", slug: "izolacija" },
      { displayName: "Ljepila", slug: "ljepila" },
      { displayName: "Šamotne ploče", slug: "samotne-ploce" },
    ],
  },
]
