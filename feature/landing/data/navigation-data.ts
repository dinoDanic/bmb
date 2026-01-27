import type { NavItem } from "@/lib/types"

export const COMPANY_NAME = "BMB"

export const navigationItems: NavItem[] = [
  {
    label: "Roštilji i ložišta",
    subcategories: [
      {
        label: "Roštilji na ugljen",
        href: "/rostilji/ugljen",
        description: "Tradicionalni roštilji za savršeno pečenje na ugljenu",
      },
      {
        label: "Roštilji na plin",
        href: "/rostilji/plin",
        description: "Praktični plinski roštilji za brzo zagrijavanje",
      },
      {
        label: "Vanjska ložišta",
        href: "/rostilji/lozista",
        description: "Dekorativna ložišta za ugodne večeri na otvorenom",
      },
    ],
  },
  {
    label: "Krušne peći",
    subcategories: [
      {
        label: "Tradicionalne peći",
        href: "/krusne-peci/tradicionalne",
        description: "Autentične krušne peći za savršen kruh",
      },
      {
        label: "Pizza peći",
        href: "/krusne-peci/pizza",
        description: "Specijalizirane peći za pizzu i focacciu",
      },
      {
        label: "Kombinirane peći",
        href: "/krusne-peci/kombinirane",
        description: "Višenamjenske peći za kruh, pizzu i roštilj",
      },
    ],
  },
  {
    label: "Uređenje okoliša",
    subcategories: [
      {
        label: "Vrtne fontane",
        href: "/uredjenje/fontane",
        description: "Elegantne fontane za opuštajući ambient",
      },
      {
        label: "Kameni elementi",
        href: "/uredjenje/kamen",
        description: "Dekorativni kameni elementi za vrtove",
      },
      {
        label: "Sjenice i nadstrešnice",
        href: "/uredjenje/sjenice",
        description: "Funkcionalne konstrukcije za hlad i zaštitu",
      },
      {
        label: "Vrtno osvjetljenje",
        href: "/uredjenje/osvjetljenje",
        description: "Ambijentalno osvjetljenje za eksterijer",
      },
    ],
  },
  {
    label: "Dekorativne ograde",
    subcategories: [
      {
        label: "Kovane ograde",
        href: "/ograde/kovane",
        description: "Ručno kovane ograde klasičnog dizajna",
      },
      {
        label: "Moderne ograde",
        href: "/ograde/moderne",
        description: "Minimalistične ograde suvremenog stila",
      },
      {
        label: "Vrtna vrata",
        href: "/ograde/vrata",
        description: "Ulazna i vrtna vrata po mjeri",
      },
    ],
  },
]
