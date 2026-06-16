import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';

export const metadata: Metadata = {
  title: 'Harvest Table | Farm-to-Table Restaurant in Lodi, CA',
  description:
    'Seasonal dining sourced within 60 miles. Named by the farmer. Cooked to order. Reservations open Tuesday through Sunday in Lodi, California.',
};
import PhilosophyStrip from '@/components/sections/PhilosophyStrip';
import MenuPreview from '@/components/sections/MenuPreview';
import Farmers from '@/components/sections/Farmers';
import ReservationSection from '@/components/sections/ReservationSection';
import TheSpace from '@/components/sections/TheSpace';
import PrivateDining from '@/components/sections/PrivateDining';
import PressBar from '@/components/sections/PressBar';

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
