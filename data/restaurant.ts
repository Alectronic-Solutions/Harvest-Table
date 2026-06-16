// /data/restaurant.ts
// Single source of truth for all restaurant info.

export const CONTACT = {
  name: "Harvest Table",
  address: "214 Main Street",
  city: "Lodi, CA 95240",
  phone: "(209) 555-0182",
  email: "hello@harvesttable.com",
  reservationsEmail: "reservations@harvesttable.com",
}

export const HOURS = [
  { day: "Tuesday – Thursday", time: "5:00 pm – 9:00 pm" },
  { day: "Friday – Saturday", time: "5:00 pm – 10:00 pm" },
  { day: "Sunday", time: "10:00 am – 2:00 pm (Brunch)" },
  { day: "Monday", time: "Closed" },
]

export const SOCIAL = {
  instagram: "https://instagram.com/",
  facebook: "https://facebook.com/",
}

export const CURRENT_SEASON = "Summer 2026"
export const SEASONAL_STRIP_TEXT = `${CURRENT_SEASON} — Menu changes with the harvest`
