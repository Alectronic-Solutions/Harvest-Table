import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { SITE_URL } from '@/lib/basePath';
import { pageOpenGraph } from '@/lib/metadata';
import Hero from '@/components/sections/Hero';
import PhilosophyStrip from '@/components/sections/PhilosophyStrip';

// Below-the-fold sections: still server-rendered into the static HTML (so
// content stays crawlable and there's no layout shift), but split into their
// own JS chunks instead of the initial page bundle.
const MenuPreview = dynamic(() => import('@/components/sections/MenuPreview'));
const Farmers = dynamic(() => import('@/components/sections/Farmers'));
const ReservationSection = dynamic(() => import('@/components/sections/ReservationSection'));
const TheSpace = dynamic(() => import('@/components/sections/TheSpace'));
const PrivateDining = dynamic(() => import('@/components/sections/PrivateDining'));
const PressBar = dynamic(() => import('@/components/sections/PressBar'));

const title = 'Harvest Table | Farm-to-Table Restaurant in Lodi, CA';
const description =
  'Seasonal dining sourced within 60 miles. Named by the farmer. Cooked to order. Reservations open Tuesday through Sunday in Lodi, California.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: SITE_URL },
  openGraph: pageOpenGraph({ title, description, path: '/' }),
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <PhilosophyStrip />
      <MenuPreview />
      <Farmers />
      <ReservationSection />
      <TheSpace />
      <PrivateDining />
      <PressBar />
    </>
  );
}
