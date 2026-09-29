// /data/farmers.ts
// Source of truth for every farm, ranch, and producer we buy from. The menu
// references farms by id, so a farm's name and town can never drift between
// the menu, the homepage, and the /farmers page. Featured farms carry a
// portrait and a story; the rest render as compact partner rows.

export type Farmer = {
  id: string
  name: string
  farm: string
  location: string
  distanceMiles: number
  grows: string[]
  partnerSince: number
  story: string
  image?: string
  featured: boolean
}

export const FARMERS: Farmer[] = [
  // ── Core partners (featured, with portraits) ────────────────────────────────
  {
    id: "sunnyside",
    name: "Tom Reyes",
    farm: "Sunnyside Farm",
    location: "Lodi, CA",
    distanceMiles: 12,
    grows: ["Chioggia beets", "Radicchio and chicories", "Edible flowers", "Arugula"],
    partnerSince: 2019,
    story:
      "Tom and his wife Linda converted their conventional row crop operation to certified organic in 2015. They were the first farm we called when we opened, and they have never missed a delivery. In the fall their chicory beds turn every shade of red and cream, and so does our salad course.",
    image: "/images/farmer-portrait-1.webp",
    featured: true,
  },
  {
    id: "riverbend",
    name: "Maria Gonzalez",
    farm: "Riverbend Organics",
    location: "Elk Grove, CA",
    distanceMiles: 35,
    grows: ["Delicata squash", "Kabocha squash", "Rainbow chard", "Shishito peppers"],
    partnerSince: 2021,
    story:
      "Maria farms four acres along the Cosumnes River on land her family has worked for three generations. She texts us every Tuesday with what is ready to pick that week. Our kitchen plans around her message.",
    image: "/images/farmer-portrait-2.webp",
    featured: true,
  },
  {
    id: "mercier",
    name: "James Whitfield",
    farm: "Mercier Orchards",
    location: "Newcastle, CA",
    distanceMiles: 52,
    grows: ["Heirloom apples", "Bartlett pears", "Fuyu persimmons", "Cider varieties"],
    partnerSince: 2020,
    story:
      "James took over the Mercier family orchard in 2012 and kept the name out of respect for the trees they planted. He grows at 1,800 feet in the Sierra foothills, where cold nights make the apples sharp and the persimmons sweet. Our fall galette exists because of his harvest.",
    image: "/images/farmer-portrait-3.webp",
    featured: true,
  },
  {
    id: "valleygold",
    name: "The Nakamura Family",
    farm: "Valley Gold Farms",
    location: "Stockton, CA",
    distanceMiles: 18,
    grows: ["Cranberry beans", "Heirloom polenta corn", "Sunflowers", "Pie pumpkins"],
    partnerSince: 2022,
    story:
      "Three generations of the Nakamura family farm 80 acres in the San Joaquin Delta. We buy their entire dry bean harvest every October and cure it through winter. Their stone-ground heirloom corn is the polenta under our roast chicken.",
    image: "/images/farmer-portrait-4.webp",
    featured: true,
  },
  {
    id: "blueheron",
    name: "Sofia and Andre Petit",
    farm: "Blue Heron Farm",
    location: "Winters, CA",
    distanceMiles: 58,
    grows: ["Lemon verbena", "Culinary lavender", "Chamomile", "Garden herbs"],
    partnerSince: 2023,
    story:
      "Sofia trained as a perfumer in Lyon before returning to California to farm botanicals with her husband Andre. Their lemon verbena goes into our pear spritz, and their dried chamomile finishes the dessert tea service.",
    image: "/images/farmer-portrait-5.webp",
    featured: true,
  },

  // ── Additional partners ─────────────────────────────────────────────────────
  {
    id: "fivemile",
    name: "The Albright Family",
    farm: "Five Mile Cattle Co.",
    location: "Galt, CA",
    distanceMiles: 15,
    grows: ["Grass-fed beef"],
    partnerSince: 2019,
    story: "Grass-fed and grass-finished Angus raised on irrigated pasture along the Dry Creek.",
    featured: false,
  },
  {
    id: "meadowlark",
    name: "Ben and Priya Castellanos",
    farm: "Meadowlark Poultry",
    location: "Dixon, CA",
    distanceMiles: 45,
    grows: ["Pasture-raised chicken", "Duck eggs"],
    partnerSince: 2020,
    story: "Heritage-breed birds moved to fresh pasture every day in mobile coops.",
    featured: false,
  },
  {
    id: "foggyhollow",
    name: "Eli Brandt",
    farm: "Foggy Hollow Mushrooms",
    location: "Placerville, CA",
    distanceMiles: 55,
    grows: ["Chanterelles", "Maitake", "Oyster mushrooms"],
    partnerSince: 2021,
    story: "Cultivated oysters and maitake, plus chanterelles foraged on private oak land after the first rains.",
    featured: false,
  },
  {
    id: "tworivers",
    name: "Grace Oduya",
    farm: "Two Rivers Aquafarm",
    location: "Elverta, CA",
    distanceMiles: 42,
    grows: ["White sturgeon"],
    partnerSince: 2022,
    story: "Sustainably farmed California white sturgeon raised in cold, recirculating river water.",
    featured: false,
  },
  {
    id: "acornridge",
    name: "Walt and June Pruitt",
    farm: "Acorn Ridge Farm",
    location: "Wilton, CA",
    distanceMiles: 25,
    grows: ["Heritage pork"],
    partnerSince: 2020,
    story: "Red Wattle and Berkshire hogs finished on acorns from the ridge's valley oaks.",
    featured: false,
  },
  {
    id: "cobblestone",
    name: "Hana Lee",
    farm: "Cobblestone Gardens",
    location: "Clarksburg, CA",
    distanceMiles: 30,
    grows: ["Peppers", "Meyer lemons", "Microgreens"],
    partnerSince: 2021,
    story: "A two-acre market garden on Delta river loam, picked the morning it is delivered.",
    featured: false,
  },
  {
    id: "pasturegate",
    name: "The Silveira Family",
    farm: "Pasture Gate Creamery",
    location: "Galt, CA",
    distanceMiles: 16,
    grows: ["Cream", "Butter", "Whole milk ricotta"],
    partnerSince: 2019,
    story: "A fourth-generation Portuguese dairy bottling low-temperature pasteurized milk and cream.",
    featured: false,
  },
  {
    id: "beeline",
    name: "Marcus Hale",
    farm: "Bee Line Apiary",
    location: "Lockeford, CA",
    distanceMiles: 10,
    grows: ["Wildflower honey", "Beeswax"],
    partnerSince: 2022,
    story: "Hives kept in local orchards and vineyards, pollinating the same farms we buy from.",
    featured: false,
  },
  {
    id: "oakrow",
    name: "Dana and Luis Ferrante",
    farm: "Oak Row Cellars",
    location: "Lodi, CA",
    distanceMiles: 6,
    grows: ["Old-vine Zinfandel", "Sparkling wine"],
    partnerSince: 2019,
    story: "Dry-farmed Zinfandel from head-trained vines planted in 1921 on Mokelumne River sand.",
    featured: false,
  },
  {
    id: "deltaspirit",
    name: "Owen Marsh",
    farm: "Delta Spirit Works",
    location: "Sacramento, CA",
    distanceMiles: 38,
    grows: ["Rye whiskey", "Apple brandy"],
    partnerSince: 2023,
    story: "A small distillery making rye from Yolo County grain and brandy from Mercier Orchards cider apples.",
    featured: false,
  },
]

export const FEATURED_FARMERS = FARMERS.filter((f) => f.featured)
export const PARTNER_FARMERS = FARMERS.filter((f) => !f.featured)

export function getFarm(id: string): Farmer {
  const farm = FARMERS.find((f) => f.id === id)
  if (!farm) throw new Error(`Unknown farm id: ${id}`)
  return farm
}

/** Town only, e.g. "Lodi" from "Lodi, CA". */
export function farmTown(farm: Farmer): string {
  return farm.location.split(",")[0]
}
