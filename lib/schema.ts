// Builds the JSON-LD Restaurant schema from the same constants the rest of the
// site uses, so structured data never contradicts what visitors see.

import { CONTACT } from '@/data/restaurant';
import { SITE_URL } from '@/lib/basePath';

export function restaurantSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: CONTACT.name,
    url: SITE_URL,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONTACT.address,
      addressLocality: 'Lodi',
      addressRegion: 'CA',
      postalCode: '95240',
      addressCountry: 'US',
    },
    servesCuisine: ['American', 'Farm-to-Table', 'Seasonal'],
    priceRange: '$$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday'],
        opens: '17:00',
        closes: '21:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Friday', 'Saturday'],
        opens: '17:00',
        closes: '22:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday'],
        opens: '10:00',
        closes: '14:00',
      },
    ],
    hasMenu: `${SITE_URL}/menu`,
    acceptsReservations: 'True',
    currenciesAccepted: 'USD',
    paymentAccepted: 'Cash, Credit Card',
  };
}

// Menu structured data (schema.org Menu) for /menu, built from the same MENU
// data the page renders so structured data can never drift from visible content.
export function menuSchema(sections: import('@/data/menu').MenuSection[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: `${CONTACT.name} Menu`,
    url: `${SITE_URL}/menu`,
    hasMenuSection: sections.map((section) => ({
      '@type': 'MenuSection',
      name: section.label,
      hasMenuItem: section.items.map((item) => ({
        '@type': 'MenuItem',
        name: item.name,
        description: item.description,
        offers: {
          '@type': 'Offer',
          price: item.price.replace('$', ''),
          priceCurrency: 'USD',
        },
      })),
    })),
  };
}

// Event structured data (schema.org Event) for /events, built from EVENTS data.
export function eventsSchema(events: import('@/data/events').Event[]) {
  return events
    .filter((event) => event.category !== 'private')
    .map((event) => ({
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: event.title,
      description: event.description,
      startDate: new Date(`${event.date} ${event.time}`).toISOString(),
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      eventStatus: 'https://schema.org/EventScheduled',
      location: {
        '@type': 'Place',
        name: CONTACT.name,
        address: {
          '@type': 'PostalAddress',
          streetAddress: CONTACT.address,
          addressLocality: 'Lodi',
          addressRegion: 'CA',
          postalCode: '95240',
          addressCountry: 'US',
        },
      },
      offers: {
        '@type': 'Offer',
        price: event.price.replace(/[^0-9.]/g, '') || '0',
        priceCurrency: 'USD',
        availability: event.soldOut
          ? 'https://schema.org/SoldOut'
          : 'https://schema.org/InStock',
        url: `${SITE_URL}/events`,
      },
    }));
}
