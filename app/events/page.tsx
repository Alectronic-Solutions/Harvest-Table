import type { Metadata } from 'next';
import EventsClient from './EventsClient';

export const metadata: Metadata = {
  title: 'Events',
  description:
    'Winemaker dinners, harvest suppers, workshops, and private gatherings at Harvest Table in Lodi, CA.',
};

export default function EventsPage() {
  return <EventsClient />;
}
