// Builds the JSON-LD Restaurant schema from the same constants the rest of the
// site uses, so structured data never contradicts what visitors see.

import { CONTACT } from '@/data/restaurant';

export function restaurantSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: CONTACT.name,
    url: 'https://harvesttable.com',
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
    hasMenu: 'https://harvesttable.com/menu',
    acceptsReservations: 'True',
    currenciesAccepted: 'USD',
    paymentAccepted: 'Cash, Credit Card',
  };
}
