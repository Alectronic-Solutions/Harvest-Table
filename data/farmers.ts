// /data/farmers.ts
// Source of truth for farm partner profiles shown on the /farmers page.

export type Farmer = {
  id: string
  name: string
  farm: string
  location: string
  distanceMiles: number
  grows: string[]
  partnerSince: number
  story: string
  image: string
  featured: boolean
}

export const FARMERS: Farmer[] = [
  {
    id: "sunnyside",
    name: "Tom and Linda Reyes",
    farm: "Sunnyside Farm",
    location: "Lodi, CA",
    distanceMiles: 12,
    grows: ["Heirloom beets", "Specialty lettuces", "Edible flowers", "Radishes", "Arugula"],
    partnerSince: 2019,
    story:
      "Tom and Linda converted their conventional row crop operation to certified organic in 2015. They were the first farm we called when we opened, and they have never missed a delivery. Their edible flowers go on almost every plate we serve.",
    image: "/images/farmer-portrait-1.jpg",
    featured: true,
  },
  {
    id: "riverbend",
    name: "Maria Gonzalez",
    farm: "Riverbend Organics",
    location: "Elk Grove, CA",
    distanceMiles: 35,
    grows: ["Summer squash", "Zucchini blossoms", "Shishito peppers", "Patty pan squash", "Armenian cucumber"],
    partnerSince: 2021,
    story:
      "Maria farms four acres along the Cosumnes River on land her family has worked for three generations. She texts us every Tuesday with what is ready to pick that week. Our kitchen plans around her message.",
    image: "/images/farmer-portrait-2.jpg",
    featured: true,
  },
  {
    id: "mercier",
    name: "James Whitfield",
    farm: "Mercier Orchards",
    location: "Newcastle, CA",
    distanceMiles: 52,
    grows: ["White peaches", "Nectarines", "Bartlett pears", "Fuji apples", "Cider varieties"],
    partnerSince: 2020,
    story:
      "James grows stone fruit at 1,800 feet in the Sierra Nevada foothills. The elevation gives his peaches an intensity you cannot find at lower altitudes. Our summer galette exists entirely because of his harvest.",
    image: "/images/farmer-portrait-3.jpg",
    featured: true,
  },
  {
    id: "valleygold",
    name: "The Nakamura Family",
    farm: "Valley Gold Farms",
    location: "Stockton, CA",
    distanceMiles: 28,
    grows: ["Sweet corn", "Dry beans", "Winter squash", "Sunflowers", "Sorghum"],
    partnerSince: 2022,
    story:
      "Three generations of the Nakamura family farm 80 acres in the San Joaquin delta. Their sweet corn is the basis of our summer bisque. We buy their entire dry bean harvest every fall and cure it through winter.",
    image: "/images/farmer-portrait-1.jpg",
    featured: false,
  },
  {
    id: "blueheron",
    name: "Sofia and Andre Petit",
    farm: "Blue Heron Farm",
    location: "Winters, CA",
    distanceMiles: 60,
    grows: ["Culinary lavender", "Lemon verbena", "Chamomile", "Herbs", "Edible botanicals"],
    partnerSince: 2023,
    story:
      "Sofia trained as a perfumer in Lyon before returning to California to farm botanicals with her husband Andre. Their lavender syrup goes into our lemonade and their dried chamomile finishes our dessert tea service.",
    image: "/images/farmer-portrait-2.jpg",
    featured: false,
  },
]
