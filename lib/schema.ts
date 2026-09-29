// Builds JSON-LD from the same constants the rest of the site uses, so
// structured data never contradicts what visitors see.

import {
  CONTACT,
  DAY_NAMES,
  GEO,
  MAPS_URL,
  PRICE_RANGE,
  SERVICE_PERIODS,
  SOCIAL,
} from '@/data/restaurant';
import type { DietaryFlag, MenuSection } from '@/data/menu';
import type { Event } from '@/data/events';
import type { Faq } from '@/data/faq';
import { SITE_URL, assetUrl, pageUrl } from '@/lib/basePath';

const RESTAURANT_ID = `${SITE_URL}/#restaurant`;

const POSTAL_ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: CONTACT.address,
  addressLocality: CONTACT.locality,
  addressRegion: CONTACT.region,
  postalCode: CONTACT.postalCode,
  addressCountry: 'US',
};

/** "(209) 555-0182" -> "+1-209-555-0182" */
function e164ish(phone: string): string {
  const d = phone.replace(/\D/g, '');
  return `+1-${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
}

export function restaurantSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': RESTAURANT_ID,
    name: CONTACT.name,
    description:
      'Farm-to-table restaurant in Lodi, California. Seasonal menus sourced from family farms within 60 miles, with the farm named on every dish.',
    url: pageUrl('/'),
    telephone: e164ish(CONTACT.phone),
    email: CONTACT.email,
    image: [
      assetUrl('/images/hero-dining.webp'),
      assetUrl('/images/restaurant-interior.webp'),
      assetUrl('/images/dish-ribeye.webp'),
    ],
    logo: assetUrl('/icon-512.png'),
    address: POSTAL_ADDRESS,
    geo: { '@type': 'GeoCoordinates', latitude: GEO.latitude, longitude: GEO.longitude },
    hasMap: MAPS_URL,
    sameAs: [SOCIAL.instagram, SOCIAL.facebook],
    servesCuisine: ['American', 'Farm-to-Table', 'Californian', 'Seasonal'],
    priceRange: PRICE_RANGE,
    openingHoursSpecification: SERVICE_PERIODS.map((p) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: p.days.map((d) => DAY_NAMES[d]),
      opens: p.opens,
      closes: p.closes,
    })),
    hasMenu: pageUrl('/menu'),
    acceptsReservations: true,
    currenciesAccepted: 'USD',
    paymentAccepted: 'Cash, Credit Card',
  };
}

const DIET_URLS: Record<DietaryFlag, string> = {
  V: 'https://schema.org/VegetarianDiet',
  VE: 'https://schema.org/VeganDiet',
  GF: 'https://schema.org/GlutenFreeDiet',
};

// Menu structured data (schema.org Menu) for /menu, built from the same MENU
// data the page renders so structured data can never drift from visible content.
export function menuSchema(sections: MenuSection[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    name: `${CONTACT.name} Seasonal Menu`,
    url: pageUrl('/menu'),
    inLanguage: 'en-US',
    hasMenuSection: sections.map((section) => ({
      '@type': 'MenuSection',
      name: section.label,
      image: assetUrl(section.image),
      hasMenuItem: section.items.map((item) => ({
        '@type': 'MenuItem',
        name: item.name,
        description: `${item.description} From ${item.farmSource}, ${item.farmLocation}.`,
        ...(item.image ? { image: assetUrl(item.image) } : {}),
        ...(item.dietaryFlags?.length
          ? { suitableForDiet: item.dietaryFlags.map((f) => DIET_URLS[f]) }
          : {}),
        offers: {
          '@type': 'Offer',
          price: item.price.replace('$', ''),
          priceCurrency: 'USD',
        },
      })),
    })),
  };
}

// Event structured data (schema.org Event) for dated, ticketed events only.
export function eventsSchema(events: Event[]) {
  return events
    .filter((event): event is Event & { startDate: string } => Boolean(event.startDate))
    .map((event) => ({
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: event.title,
      description: event.description,
      image: [assetUrl(event.image)],
      startDate: event.startDate,
      ...(event.endDate ? { endDate: event.endDate } : {}),
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      eventStatus: 'https://schema.org/EventScheduled',
      location: event.venue
        ? {
            '@type': 'Place',
            name: event.venue.name,
            address: {
              '@type': 'PostalAddress',
              addressLocality: event.venue.locality,
              addressRegion: CONTACT.region,
              addressCountry: 'US',
            },
          }
        : { '@type': 'Place', name: CONTACT.name, address: POSTAL_ADDRESS },
      organizer: { '@type': 'Organization', name: CONTACT.name, url: pageUrl('/') },
      offers: {
        '@type': 'Offer',
        price: event.price.match(/\d+(\.\d+)?/)?.[0] ?? '0',
        priceCurrency: 'USD',
        availability: event.soldOut
          ? 'https://schema.org/SoldOut'
          : 'https://schema.org/InStock',
        url: `${pageUrl('/events')}#${event.id}`,
      },
    }));
}

export function faqSchema(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

/** Home > Page breadcrumb for interior pages. */
export function breadcrumbSchema(name: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: pageUrl('/') },
      { '@type': 'ListItem', position: 2, name, item: pageUrl(path) },
    ],
  };
}
