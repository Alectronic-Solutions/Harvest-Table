import type { Metadata } from 'next';
import ReservationsClient from './ReservationsClient';

export const metadata: Metadata = {
  title: 'Reserve a Table',
  description:
    'Reserve a table at Harvest Table in Lodi, CA. Dinner Tuesday through Sunday. Brunch on Sunday.',
};

export default function ReservationsPage() {
  return <ReservationsClient />;
}
