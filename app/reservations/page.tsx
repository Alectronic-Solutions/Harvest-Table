import { pageMetadata } from '@/lib/metadata';
import { RESERVATION_FAQS } from '@/data/faq';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import JsonLd from '@/components/JsonLd';
import ReservationsClient from './ReservationsClient';

export const metadata = pageMetadata({
  title: 'Reserve a Table',
  description:
    'Reserve a table at Harvest Table in Lodi, CA. Dinner Tuesday through Saturday from 5 pm, brunch Sunday 10 am to 2 pm. Walk-ins welcome at the bar.',
  path: '/reservations',
});

export default function ReservationsPage() {
  return (
    <>
      <JsonLd data={[faqSchema(RESERVATION_FAQS), breadcrumbSchema('Reservations', '/reservations')]} />
      <ReservationsClient />
    </>
  );
}
