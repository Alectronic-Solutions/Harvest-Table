import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/basePath';
import { pageOpenGraph } from '@/lib/metadata';
import { EVENTS } from '@/data/events';
import { eventsSchema } from '@/lib/schema';
import EventsClient from './EventsClient';

const description =
  'Winemaker dinners, harvest suppers, workshops, and private gatherings at Harvest Table in Lodi, CA.';

export const metadata: Metadata = {
  title: 'Events',
  description,
  alternates: { canonical: `${SITE_URL}/events` },
  openGraph: pageOpenGraph({ title: 'Events | Harvest Table', description, path: '/events' }),
};

export default function EventsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsSchema(EVENTS)) }}
      />
      <EventsClient />
    </>
  );
}
