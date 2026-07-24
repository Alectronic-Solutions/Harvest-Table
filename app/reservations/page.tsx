import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/basePath';
import { pageOpenGraph } from '@/lib/metadata';
import ReservationsClient from './ReservationsClient';

const description =
  'Reserve a table at Harvest Table in Lodi, CA. Dinner Tuesday through Sunday. Brunch on Sunday.';

export const metadata: Metadata = {
  title: 'Reserve a Table',
  description,
  alternates: { canonical: `${SITE_URL}/reservations` },
  openGraph: pageOpenGraph({
    title: 'Reserve a Table | Harvest Table',
    description,
    path: '/reservations',
  }),
};

export default function ReservationsPage() {
  return <ReservationsClient />;
}
