// /data/restaurant.ts
// Single source of truth for all restaurant info.

export const CONTACT = {
  name: "Harvest Table",
  address: "214 Main Street",
  locality: "Lodi",
  region: "CA",
  postalCode: "95240",
  city: "Lodi, CA 95240",
  phone: "(209) 555-0182",
  email: "hello@harvesttable.com",
  reservationsEmail: "reservations@harvesttable.com",
}

/** Digits-only phone for tel: links. */
export const PHONE_HREF = `tel:+1${CONTACT.phone.replace(/\D/g, "")}`

export const MAPS_URL = "https://maps.google.com/maps?q=214+Main+Street+Lodi+CA+95240"
export const MAPS_EMBED_URL = `${MAPS_URL}&output=embed`

// Approximate coordinates for downtown Lodi, used by the Restaurant schema.
export const GEO = { latitude: 38.1341, longitude: -121.2722 }

export const PRICE_RANGE = "$$$"

export const HOURS = [
  { day: "Tuesday – Thursday", time: "5:00 pm – 9:00 pm" },
  { day: "Friday – Saturday", time: "5:00 pm – 10:00 pm" },
  { day: "Sunday", time: "10:00 am – 2:00 pm (Brunch)" },
  { day: "Monday", time: "Closed" },
]

// Machine-readable hours. Day index follows Date#getDay (0 = Sunday).
// Drives the JSON-LD schema, the "open now" status, and reservation slots.
export type ServicePeriod = {
  days: number[]
  opens: string
  closes: string
  label: "Dinner" | "Brunch"
}

export const SERVICE_PERIODS: ServicePeriod[] = [
  { days: [2, 3, 4], opens: "17:00", closes: "21:00", label: "Dinner" },
  { days: [5, 6], opens: "17:00", closes: "22:00", label: "Dinner" },
  { days: [0], opens: "10:00", closes: "14:00", label: "Brunch" },
]

export const DAY_NAMES = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
]

export function periodForDay(day: number): ServicePeriod | undefined {
  return SERVICE_PERIODS.find((p) => p.days.includes(day))
}

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number)
  return h * 60 + m
}

export function formatTime(hhmm: string): string {
  const mins = toMinutes(hhmm)
  const h = Math.floor(mins / 60)
  const m = mins % 60
  const suffix = h >= 12 ? "PM" : "AM"
  const h12 = h % 12 === 0 ? 12 : h % 12
  return `${h12}:${String(m).padStart(2, "0")} ${suffix}`
}

/**
 * Bookable 30-minute slots for a given weekday. The last seating is one hour
 * before close. Monday returns an empty list.
 */
export function reservationSlots(day: number): string[] {
  const period = periodForDay(day)
  if (!period) return []
  const slots: string[] = []
  const last = toMinutes(period.closes) - 60
  for (let t = toMinutes(period.opens); t <= last; t += 30) {
    const h = String(Math.floor(t / 60)).padStart(2, "0")
    const m = String(t % 60).padStart(2, "0")
    slots.push(formatTime(`${h}:${m}`))
  }
  return slots
}

/** Human-readable status line for a moment in time, e.g. "Open tonight until 10 pm". */
export function openStatus(now: Date): string {
  const today = periodForDay(now.getDay())
  const mins = now.getHours() * 60 + now.getMinutes()
  const short = (hhmm: string) => formatTime(hhmm).replace(":00", "").toLowerCase()

  if (today) {
    const when = today.label === "Brunch" ? "today" : "tonight"
    if (mins < toMinutes(today.opens)) return `${today.label} ${when} from ${short(today.opens)}`
    if (mins < toMinutes(today.closes)) return `Open now until ${short(today.closes)}`
  }
  // Closed for the day: find the next service.
  for (let offset = 1; offset <= 7; offset++) {
    const day = (now.getDay() + offset) % 7
    const next = periodForDay(day)
    if (next) {
      const dayLabel = offset === 1 ? "tomorrow" : DAY_NAMES[day]
      return `Closed now. ${next.label} ${dayLabel} at ${short(next.opens)}`
    }
  }
  return ""
}

export const SOCIAL = {
  instagram: "https://instagram.com/harvesttablelodi",
  facebook: "https://facebook.com/harvesttablelodi",
}

// ── Seasonality ──────────────────────────────────────────────────────────────
// BUILD_DATE is inlined at build time by next.config.mjs so the server render
// and the client bundle agree (no hydration mismatch at a season boundary).
// Rebuilding the site is what rolls the season forward.

export type Season = "Winter" | "Spring" | "Summer" | "Fall"

export function getSeason(date: Date): Season {
  const month = date.getMonth()
  if (month === 11 || month <= 1) return "Winter"
  if (month <= 4) return "Spring"
  if (month <= 7) return "Summer"
  return "Fall"
}

export const BUILD_DATE = new Date(process.env.NEXT_PUBLIC_BUILD_DATE ?? Date.now())

export const CURRENT_SEASON = `${getSeason(BUILD_DATE)} ${BUILD_DATE.getFullYear()}`
export const SEASONAL_STRIP_TEXT = `${CURRENT_SEASON} · Menu changes with the harvest`

/** e.g. "September 28, 2026" */
export const MENU_UPDATED = BUILD_DATE.toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "America/Los_Angeles",
})

/** "Last updated" date for the legal pages. Rolls forward with every build. */
export const SITE_UPDATED = MENU_UPDATED
