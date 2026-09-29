import { pageMetadata } from '@/lib/metadata';
import { upcomingEvents } from '@/data/events';
import { breadcrumbSchema, eventsSchema } from '@/lib/schema';
import JsonLd from '@/components/JsonLd';
import EventsClient from './EventsClient';

export const metadata = pageMetadata({
  title: 'Wine Dinners & Seasonal Events',
  description:
    'Vineyard wine dinners, chef\'s table nights, holiday suppers, and private dining at Harvest Table in Lodi, CA. Small, seasonal, and they sell out.',
  path: '/events',
  image: { url: '/images/event-harvest-moon.webp', width: 1440, height: 1080, alt: 'A candlelit dinner table among autumn grapevines under a full moon' },
});

export default function EventsPage() {
  const events = upcomingEvents();
  return (
    <>
      <JsonLd data={[...eventsSchema(events), breadcrumbSchema('Events', '/events')]} />
      <EventsClient events={events} />
    </>
  );
}
