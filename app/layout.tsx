import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Cormorant_Garamond, DM_Mono, DM_Sans } from 'next/font/google';
import './globals.css';
import SeasonalStrip from '@/components/SeasonalStrip';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import GrainOverlay from '@/components/GrainOverlay';
import PageTransition from '@/components/PageTransition';
import { CONTACT } from '@/data/restaurant';
import { restaurantSchema } from '@/lib/schema';
import { SITE_URL, asset } from '@/lib/basePath';

// Custom cursor is a purely decorative, client-only effect that runs a
// persistent rAF loop. Keep it out of the critical initial bundle.
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false });

// Display face for headings only.
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-cormorant',
  display: 'swap',
});

// Mono for prices, labels, and seasonal indicators only.
const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-dm-mono',
  display: 'swap',
});

// Body face for all UI and paragraph text.
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Harvest Table | Farm-to-Table Restaurant in Lodi, CA',
    template: '%s | Harvest Table',
  },
  description:
    'Seasonal dining sourced within 60 miles. Named by the farmer. Cooked to order. Reservations open Tuesday through Sunday in Lodi, California.',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'Harvest Table | Farm-to-Table Restaurant in Lodi, CA',
    description:
      'Seasonal menus sourced from family farms within 60 miles. Reserve a table.',
    url: SITE_URL,
    siteName: CONTACT.name,
    type: 'website',
    locale: 'en_US',
    // Next auto-prepends basePath when resolving OG/twitter image URLs against
    // metadataBase, so this must stay un-prefixed. Prefixing it ourselves
    // (like the manifest/favicon links) would double up the base path.
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Harvest Table' }],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmMono.variable} ${dmSans.variable}`}
    >
      <head>
        <link rel="icon" type="image/svg+xml" href={asset('/favicon.svg')} />
        <link rel="manifest" href={asset('/manifest.webmanifest')} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(restaurantSchema()),
          }}
        />
      </head>
      <body id="top">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <CustomCursor />
        <GrainOverlay />
        <ScrollProgress />
        <SeasonalStrip />
        <Navbar />
        <PageTransition>
          <main id="main-content" tabIndex={-1}>{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}