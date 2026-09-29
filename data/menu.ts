// The menu. Every dish references its farm by id (see data/farmers.ts), so the
// farm name and town shown to guests always match the farm partner pages.
// Items flagged seasonal rotate off the menu as the harvest changes and render
// a "Seasonal" pill in the UI. This menu is written for fall.

import { getFarm, farmTown, type Farmer } from "@/data/farmers"

export type DietaryFlag = "V" | "VE" | "GF"

export const DIETARY_LABELS: Record<DietaryFlag, string> = {
  V: "Vegetarian",
  VE: "Vegan",
  GF: "Gluten-free",
}

type MenuItemInput = {
  name: string
  description: string
  farmId: string
  price: string
  seasonal: boolean
  dietaryFlags?: DietaryFlag[]
  /** Dish photo, used on the homepage preview cards. */
  image?: string
}

export interface MenuItem extends MenuItemInput {
  farm: Farmer
  /** Display name of the farm, e.g. "Sunnyside Farm". */
  farmSource: string
  /** Town the farm sits in, e.g. "Lodi". */
  farmLocation: string
}

export interface MenuSection {
  /** Kebab-case id used as the anchor href target. */
  id: string
  /** Full section label rendered as the section heading. */
  label: string
  /** Shorter label used in the sticky section nav. */
  navLabel: string
  /** Wide banner photo shown at the top of the section. */
  image: string
  imageAlt: string
  items: MenuItem[]
}

function item(input: MenuItemInput): MenuItem {
  const farm = getFarm(input.farmId)
  return { ...input, farm, farmSource: farm.farm, farmLocation: farmTown(farm) }
}

export const MENU: MenuSection[] = [
  {
    id: "starters",
    label: "Starters",
    navLabel: "To Start",
    image: "/images/menu-starters.webp",
    imageAlt: "Roasted delicata squash, chicory and persimmon salad, and blistered shishito peppers on a walnut table",
    items: [
      item({
        name: "Roasted Delicata Squash",
        description:
          "Brown butter, crisp sage, and toasted pepitas over whipped whole milk ricotta.",
        farmId: "riverbend",
        price: "$15",
        seasonal: true,
        dietaryFlags: ["V", "GF"],
      }),
      item({
        name: "Chicory & Fuyu Persimmon Salad",
        description:
          "Radicchio and frisée, sliced persimmon, candied walnut, and a sherry vinaigrette.",
        farmId: "sunnyside",
        price: "$14",
        seasonal: true,
        dietaryFlags: ["VE", "GF"],
      }),
      item({
        name: "Charred Shishito Peppers",
        description:
          "The last of the season, blistered over oak coals with flaky salt and Meyer lemon.",
        farmId: "cobblestone",
        price: "$12",
        seasonal: true,
        dietaryFlags: ["VE", "GF"],
      }),
      item({
        name: "Cranberry Bean Crostini",
        description:
          "Slow-stewed heirloom beans, rosemary, and new olive oil on grilled levain.",
        farmId: "valleygold",
        price: "$11",
        seasonal: false,
        dietaryFlags: ["VE"],
      }),
    ],
  },
  {
    id: "mains",
    label: "Mains",
    navLabel: "Mains",
    image: "/images/dish-ribeye.webp",
    imageAlt: "Sliced grass-fed ribeye with bone marrow butter, fingerling potatoes, and charred radicchio",
    items: [
      item({
        name: "Grass-Fed Ribeye",
        description:
          "Twelve ounces over oak coals, bone marrow butter, roasted fingerlings, and charred radicchio.",
        farmId: "fivemile",
        price: "$46",
        seasonal: false,
        dietaryFlags: ["GF"],
        image: "/images/dish-ribeye.webp",
      }),
      item({
        name: "Pan-Roasted Half Chicken",
        description:
          "Brined and crisped to order, over stone-ground heirloom polenta with maitake and pan jus.",
        farmId: "meadowlark",
        price: "$31",
        seasonal: false,
        dietaryFlags: ["GF"],
        image: "/images/dish-chicken.webp",
      }),
      item({
        name: "Wild Mushroom Risotto",
        description:
          "Carnaroli rice folded with chanterelles and maitake, aged parmesan, and fresh thyme.",
        farmId: "foggyhollow",
        price: "$28",
        seasonal: true,
        dietaryFlags: ["V", "GF"],
        image: "/images/dish-risotto.webp",
      }),
      item({
        name: "Seared White Sturgeon",
        description:
          "Basted in brown butter, set over braised cranberry beans and a bright salsa verde.",
        farmId: "tworivers",
        price: "$36",
        seasonal: true,
        dietaryFlags: ["GF"],
        image: "/images/dish-sturgeon.webp",
      }),
      item({
        name: "Heritage Pork Chop",
        description:
          "Double-cut and grilled, glazed with Mercier apple cider and stone-ground mustard.",
        farmId: "acornridge",
        price: "$34",
        seasonal: false,
        dietaryFlags: ["GF"],
      }),
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    navLabel: "To Finish",
    image: "/images/menu-desserts.webp",
    imageAlt: "Apple and pear galette with buttermilk gelato beside a dark chocolate pot de crème",
    items: [
      item({
        name: "Apple & Pear Galette",
        description:
          "Free-form butter crust, slow-roasted orchard fruit, and a scoop of buttermilk gelato.",
        farmId: "mercier",
        price: "$12",
        seasonal: true,
        dietaryFlags: ["V"],
      }),
      item({
        name: "Dark Chocolate Pot de Crème",
        description:
          "Silken custard under sea-salt cream, with a cocoa nib crumble for crunch.",
        farmId: "pasturegate",
        price: "$11",
        seasonal: false,
        dietaryFlags: ["V", "GF"],
      }),
      item({
        name: "Wildflower Honey Panna Cotta",
        description:
          "Set with farm cream and local honey, topped with poached Bartlett pear.",
        farmId: "beeline",
        price: "$11",
        seasonal: false,
        dietaryFlags: ["GF"],
      }),
      item({
        name: "Roasted Kabocha Tart",
        description:
          "Spiced squash custard in a brown sugar crust, with maple whipped cream.",
        farmId: "riverbend",
        price: "$11",
        seasonal: true,
        dietaryFlags: ["V"],
      }),
    ],
  },
  {
    id: "drinks",
    label: "Drinks",
    navLabel: "Drinks",
    image: "/images/menu-drinks.webp",
    imageAlt: "Old-vine Zinfandel, a smoked old fashioned, and a pear spritz on the bar",
    items: [
      item({
        name: "Pear & Verbena Spritz",
        description:
          "Lodi sparkling wine, spiced pear shrub, and a sprig of fresh lemon verbena.",
        farmId: "blueheron",
        price: "$14",
        seasonal: true,
        dietaryFlags: ["VE", "GF"],
      }),
      item({
        name: "Smoked Old Fashioned",
        description:
          "Valley rye, bitters, and demerara under an oak-smoke cloche, over a single cube.",
        farmId: "deltaspirit",
        price: "$16",
        seasonal: false,
      }),
      item({
        name: "Old-Vine Zinfandel, by the Glass",
        description:
          "Dry-farmed from vines planted in 1921. Dark fruit, black pepper, and a long finish.",
        farmId: "oakrow",
        price: "$14",
        seasonal: false,
      }),
      item({
        name: "Hot Spiced Cider",
        description:
          "Pressed from heirloom apples and mulled with cinnamon, clove, and orange peel.",
        farmId: "mercier",
        price: "$7",
        seasonal: true,
        dietaryFlags: ["VE", "GF"],
      }),
    ],
  },
]

/** Every menu item sourced from a given farm, for cross-links on /farmers. */
export function dishesFromFarm(farmId: string): (MenuItem & { sectionId: string })[] {
  return MENU.flatMap((s) => s.items.map((i) => ({ ...i, sectionId: s.id }))).filter(
    (i) => i.farmId === farmId,
  )
}
