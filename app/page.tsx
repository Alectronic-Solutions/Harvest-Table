import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { pageUrl } from '@/lib/basePath';
import { pageOpenGraph } from '@/lib/metadata';
import Hero from '@/components/sections/Hero';
import PhilosophyStrip from '@/components/sections/PhilosophyStrip';
import VisitStrip from '@/components/sections/VisitStrip';

// Below-the-fold sections: still server-rendered into the static HTML (so
// content stays crawlable and there's no layout shift), but split into their
// own JS chunks instead of the initial page bundle.
const MenuPreview = dynamic(() => import('@/components/sections/MenuPreview'));
const Farmers = dynamic(() => import('@/components/sections/Farmers'));
const ReservationSection = dynamic(() => import('@/components/sections/ReservationSection'));
const TheSpace = dynamic(() => import('@/components/sections/TheSpace'));
const PrivateDining = dynamic(() => import('@/components/sections/PrivateDining'));
const GuestReviews = dynamic(() => import('@/components/sections/GuestReviews'));

// The home page uses the layout's default title (no template suffix).
const title = 'Harvest Table | Farm-to-Table Restaurant in Lodi, CA';
const description =
  'Seasonal farm-to-table dining in downtown Lodi, California. Every ingredient sourced from farms within 60 miles, and every farm named on the menu. Dinner Tuesday to Saturday, brunch Sunday.';

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: pageUrl('/') },
  openGraph: pageOpenGraph({ title, description, path: '/' }),
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <PhilosophyStrip />
      <MenuPreview />
      <Farmers />
      <GuestReviews />
      <ReservationSection />
      <TheSpace />
      <PrivateDining />
      <VisitStrip />
    </>
  );
}
