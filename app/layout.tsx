import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Mono, DM_Sans } from 'next/font/google';
import './globals.css';
import SeasonalStrip from '@/components/SeasonalStrip';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import GrainOverlay from '@/components/GrainOverlay';
import PageTransition from '@/components/PageTransition';
import CustomCursor from '@/components/CustomCursor';
import { CONTACT } from '@/data/restaurant';
import { restaurantSchema } from '@/lib/schema';

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

const SITE_URL = 'https://harvesttable.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Harvest Table | Farm-to-Table Restaurant in Lodi, CA',
    template: '%s | Harvest Table',
  },
  description:
    'Seasonal dining sourced within 60 miles. Named by the farmer. Cooked to order. Reservations open Tuesday through Sunday in Lodi, California.',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: '/logo.svg',
  },
  openGraph: {
    title: 'Harvest Table | Farm-to-Table Restaurant in Lodi, CA',
    description:
      'Seasonal menus sourced from family farms within 60 miles. Reserve a table.',
    url: SITE_URL,
    siteName: CONTACT.name,
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/logo.svg', width: 200, height: 200, alt: 'Harvest Table' }],
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
        <script
          type="application/ld+json"
          // Restaurant structured data for local SEO.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(restaurantSchema()),
          }}
        />
      </head>
      <body id="top">
        <CustomCursor />
        <GrainOverlay />
        <ScrollProgress />
        <SeasonalStrip />
        <Navbar />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
