import { pageMetadata } from '@/lib/metadata';
import { breadcrumbSchema } from '@/lib/schema';
import JsonLd from '@/components/JsonLd';
import AboutClient from './AboutClient';

export const metadata = pageMetadata({
  title: 'About Our Restaurant',
  description:
    'Chef Daniel Park opened Harvest Table in Lodi, CA in 2019 to cook what the Central Valley grows. Forty seats, fifteen farm partners, and a menu that changes with the harvest.',
  path: '/about',
  image: { url: '/images/chef-daniel-park.webp', width: 864, height: 1080, alt: 'Chef Daniel Park in the Harvest Table kitchen' },
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema('About', '/about')} />
      <AboutClient />
    </>
  );
}
