// Single source of truth for event listings shown on /events.
// Ticketed events carry ISO start/end times (with the Pacific offset) so the
// page can hide anything already past at build time and the Event schema
// gets exact timestamps. Private dining has no date and always shows.

import { BUILD_DATE } from '@/data/restaurant';

export type EventCategory = 'wine' | 'chefs-table' | 'holiday' | 'private';

export type Event = {
  id: string;
  title: string;
  subtitle: string;
  /** ISO 8601 with offset. Omitted for by-arrangement listings. */
  startDate?: string;
  endDate?: string;
  /** Display strings. */
  date: string;
  time: string;
  price: string;
  seats: number;
  seatsRemaining: number;
  description: string;
  image: string;
  imageAlt: string;
  /** Off-site location. Omitted when the event is at the restaurant. */
  venue?: { name: string; locality: string };
  category: EventCategory;
  soldOut: boolean;
};

export const EVENTS: Event[] = [
  {
    id: 'harvest-moon-wine-dinner',
    title: 'Harvest Moon Wine Dinner',
    subtitle: 'Six courses. Six pours. One long table in the vines.',
    startDate: '2026-10-24T18:00:00-07:00',
    endDate: '2026-10-24T22:00:00-07:00',
    date: 'Saturday, October 24, 2026',
    time: '6:00 PM',
    price: '$150 per person',
    seats: 40,
    seatsRemaining: 9,
    description:
      'Dinner at Oak Row Cellars among Zinfandel vines planted in 1921. Six courses from the last of the fall harvest, each paired with a pour chosen alongside winemakers Dana and Luis Ferrante. Shuttle from the restaurant at 5:15 PM. Dietary accommodations available with two weeks notice.',
    image: '/images/event-harvest-moon.webp',
    imageAlt: 'A long candlelit table among autumn grapevines under a rising full moon',
    venue: { name: 'Oak Row Cellars', locality: 'Lodi' },
    category: 'wine',
    soldOut: false,
  },
  {
    id: 'chefs-table-november',
    title: "Chef's Table: November",
    subtitle: 'Eight seats. One night. No menu in advance.',
    startDate: '2026-11-12T19:00:00-08:00',
    endDate: '2026-11-12T22:00:00-08:00',
    date: 'Thursday, November 12, 2026',
    time: '7:00 PM',
    price: '$215 per person',
    seats: 8,
    seatsRemaining: 0,
    description:
      'Dinner at the pass. Chef Daniel Park builds the menu that morning from what arrives off the farm trucks. Eight courses, eight guests, and a kitchen view throughout. Wine pairing available for an additional $75 per person.',
    image: '/images/event-chefs-table.webp',
    imageAlt: 'A chef plating a tasting course in front of guests at an open kitchen counter',
    category: 'chefs-table',
    soldOut: true,
  },
  {
    id: 'thanksgiving-supper',
    title: 'Thanksgiving Family Supper',
    subtitle: 'Family style. Two seatings. Nobody does the dishes.',
    startDate: '2026-11-26T13:00:00-08:00',
    endDate: '2026-11-26T19:00:00-08:00',
    date: 'Thursday, November 26, 2026',
    time: '1:00 PM or 4:30 PM',
    price: '$95 per person, $40 under 12',
    seats: 80,
    seatsRemaining: 26,
    description:
      'A heritage turkey from Meadowlark Poultry, Valley Gold cornbread stuffing, roasted Riverbend squash, and apple and pear pie from Mercier Orchards, passed down long tables the way it should be. Vegetarian mains available on request.',
    image: '/images/event-thanksgiving.webp',
    imageAlt: 'A family-style Thanksgiving table with roast turkey, squash, stuffing, and pie',
    category: 'holiday',
    soldOut: false,
  },
  {
    id: 'winter-solstice-dinner',
    title: 'Winter Solstice Dinner',
    subtitle: 'The longest night of the year, by candlelight.',
    startDate: '2026-12-21T18:00:00-08:00',
    endDate: '2026-12-21T21:30:00-08:00',
    date: 'Monday, December 21, 2026',
    time: '6:00 PM',
    price: '$165 per person',
    seats: 40,
    seatsRemaining: 40,
    description:
      'We open on a Monday for one night only. Five courses built from the winter cellar: cured beans, stored squash, citrus from Cobblestone Gardens, and the first chicories of the new year. Lit entirely by beeswax candles from Bee Line Apiary.',
    image: '/images/event-solstice.webp',
    imageAlt: 'A dining table lit by dozens of taper candles with an evergreen and citrus garland',
    category: 'holiday',
    soldOut: false,
  },
  {
    id: 'private-dining-inquiry',
    title: 'Private Dining',
    subtitle: 'Your event. Your menu. Our room.',
    date: 'Year-round availability',
    time: 'By arrangement',
    price: 'Custom pricing',
    seats: 24,
    seatsRemaining: 24,
    description:
      'Our private dining room seats up to 24 guests with a fully custom menu, dedicated server, and curated wine list. Available for rehearsal dinners, corporate gatherings, milestone birthdays, and full buyouts. Inquire at least three weeks in advance.',
    image: '/images/private-dining.webp',
    imageAlt: 'The private dining room set for an intimate event',
    category: 'private',
    soldOut: false,
  },
];

/** Events that have not ended as of `now` (build time by default). */
export function upcomingEvents(now: Date = BUILD_DATE): Event[] {
  return EVENTS.filter((e) => !e.endDate || new Date(e.endDate) > now);
}
