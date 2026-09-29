import { pageMetadata } from '@/lib/metadata';
import { MENU } from '@/data/menu';
import { CURRENT_SEASON } from '@/data/restaurant';
import { breadcrumbSchema, menuSchema } from '@/lib/schema';
import JsonLd from '@/components/JsonLd';
import MenuClient from './MenuClient';

export const metadata = pageMetadata({
  title: `${CURRENT_SEASON} Menu`,
  description: `Our ${CURRENT_SEASON} farm-to-table menu in Lodi, CA. Every dish names the farm it came from, all within 60 miles. Vegetarian, vegan, and gluten-free options marked.`,
  path: '/menu',
  image: { url: '/images/dish-ribeye.webp', width: 1440, height: 1080, alt: 'Grass-fed ribeye with bone marrow butter and charred radicchio' },
});

export default function MenuPage() {
  return (
    <>
      <JsonLd data={[menuSchema(MENU), breadcrumbSchema('Menu', '/menu')]} />
      <MenuClient />
    </>
  );
}
