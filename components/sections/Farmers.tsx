'use client';

// One job: introduce the three primary farm partners. Editorial card layout --
// no borders, no shadows, no rounded corners. Portrait images with per-card
// parallax (disabled on mobile). Atmosphere only, no links on cards.

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import { useIsDesktop } from '@/lib/useIsDesktop';
import { asset } from '@/lib/basePath';
import { FEATURED_FARMERS, FARMERS, type Farmer } from '@/data/farmers';

// First three core partners, each showing up to three crops.
const HOME_FARMERS = FEATURED_FARMERS.slice(0, 3);

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

function FarmerCard({ farmer }: { farmer: Farmer }) {
  const isDesktop = useIsDesktop();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Per-card parallax: image drifts up 30px as the card scrolls through view.
  // Disabled on mobile by zeroing the output.
  const rawY = useTransform(scrollYProgress, [0, 1], ['0px', '-30px']);
  const imageY = useTransform(rawY, (v) => (isDesktop ? v : '0px'));

  return (
    <m.article ref={ref} variants={cardVariants}>
      {/* Portrait image: fixed height on mobile so cards don't dominate the scroll,
          natural 3/4 ratio on desktop where they sit side by side. */}
      <div className="relative h-[320px] overflow-hidden md:h-auto md:aspect-[3/4]">
        <m.div style={{ y: imageY }} className="absolute inset-0 scale-110">
          <Image
            src={asset(farmer.image ?? '')}
            alt={`${farmer.name} of ${farmer.farm}`}
            fill
            className="object-cover object-top"
            sizes="(min-width: 1024px) 400px, (min-width: 768px) 33vw, 100vw"
          />
        </m.div>
      </div>

      <div className="mt-6">
        <h3 className="font-display text-2xl font-semibold text-forest">
          {farmer.farm}
        </h3>
        <p className="mt-1 font-sans text-sm text-fog-dark">{farmer.name}</p>
        <p className="mt-2 font-mono text-xs uppercase tracking-wide text-fog-dark">
          {farmer.location} · {farmer.distanceMiles} miles
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {farmer.grows.slice(0, 3).map((item) => (
            <span
              key={item}
              className="rounded-sm border border-fog/40 px-2 py-0.5 font-sans text-xs text-fog-dark"
            >
              {item}
            </span>
          ))}
        </div>

        <p className="mt-3 font-mono text-xs text-fog-dark">Partners since {farmer.partnerSince}</p>
      </div>
    </m.article>
  );
}

export default function Farmers() {
  return (
    <section aria-labelledby="farmers-heading" className="bg-linen py-16 md:py-24">
      <div className="mx-auto max-w-content px-5 md:px-8">
        {/* Section header */}
        <div className="mb-14 text-center md:text-left">
          <h2 id="farmers-heading" className="font-display text-4xl font-semibold text-forest md:text-5xl">
            Meet our farmers
          </h2>
          <p className="mx-auto mt-4 max-w-xs font-sans text-base text-fog-dark md:mx-0 md:max-w-xl">
            We visit every farm before we put it on the menu. These are the
            people who make this food possible.
          </p>
        </div>

        {/* Cards */}
        <m.div
          className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {HOME_FARMERS.map((farmer) => (
            <FarmerCard key={farmer.id} farmer={farmer} />
          ))}
        </m.div>

        {/* See more link */}
        <div className="mt-12 text-center">
          <Link
            href="/farmers"
            className="inline-flex min-h-[48px] items-center font-sans text-sm font-medium text-ember underline underline-offset-4 hover:opacity-80"
          >
            Meet all {FARMERS.length} of our farm partners &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}