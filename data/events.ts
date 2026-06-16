// Single source of truth for event listings shown on /events.

export type EventCategory = 'wine' | 'chefs-table' | 'harvest' | 'private';

export type Event = {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  price: string;
  seats: number;
  seatsRemaining: number;
  description: string;
  image: string;
  category: EventCategory;
  soldOut: boolean;
};

export const EVENTS: Event[] = [
  {
    id: 'summer-wine-july',
    title: 'Summer Wine Pairing Dinner',
    subtitle: 'Six courses. Six pours. One long table.',
    date: 'July 18, 2026',
    time: '6:30 PM',
    price: '$145 per person',
    seats: 24,
    seatsRemaining: 8,
    description:
      'An evening built around California natural wine. Chef pairs each course to a small-production pour selected by our sommelier. Wines are sourced within 150 miles. Dietary accommodations available with two weeks notice.',
    image: '/images/event-wine.jpg',
    category: 'wine',
    soldOut: false,
  },
  {
    id: 'chefs-table-august',
    title: "Chef's Table — August",
    subtitle: 'Eight seats. One night. No menu in advance.',
    date: 'August 6, 2026',
    time: '7:00 PM',
    price: '$210 per person',
    seats: 8,
    seatsRemaining: 3,
    description:
      'Dinner at the pass. Chef builds the menu that morning based on what arrives from the farms. Eight courses, eight guests, a kitchen view throughout. Wine pairing available for an additional $75 per person.',
    image: '/images/event-chefs-table.jpg',
    category: 'chefs-table',
    soldOut: false,
  },
  {
    id: 'harvest-dinner-september',
    title: 'Harvest Dinner',
    subtitle: 'One night a year. Outside. On the farm.',
    date: 'September 12, 2026',
    time: '5:30 PM',
    price: '$185 per person',
    seats: 60,
    seatsRemaining: 0,
    description:
      'Our annual dinner held at Sunnyside Farm in Lodi. Long tables in the field, dishes built from what was picked that morning, live music after dark. This is the night Harvest Table exists for. Transportation from the restaurant provided.',
    image: '/images/event-harvest.jpg',
    category: 'harvest',
    soldOut: true,
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
    image: '/images/space-wide.jpg',
    category: 'private',
    soldOut: false,
  },
];
