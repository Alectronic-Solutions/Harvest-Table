'use client';

// One job: introduce the three primary farm partners. Editorial card layout --
// no borders, no shadows, no rounded corners. Portrait images with per-card
// parallax (disabled on mobile). Atmosphere only, no links on cards.

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useIsDesktop } from '@/lib/useIsDesktop';
import { asset } from '@/lib/basePath';

interface Farmer {
  name: string;
  farm: string;
  location: string;
  grows: string[];
  since: string;
  image: string;
}

const FARMERS: Farmer[] = [
  {
    name: 'Tom and Linda Reyes',
    farm: 'Sunnyside Farm',
    location: 'Lodi, CA / 12 miles',
    grows: ['Heirloom beets', 'Specialty lettuces', 'Edible flowers'],
    since: 'Partners since 2019',
    image: '/images/farmer-portrait-1.webp',
  },
  {
    name: 'Maria Gonzalez',
    farm: 'Riverbend Organics',
    location: 'Elk Grove, CA / 35 miles',
    grows: ['Summer squash', 'Zucchini blossoms', 'Peppers'],
    since: 'Partners since 2021',
    image: '/images/farmer-portrait-2.webp',
  },
  {
    name: 'James Whitfield',
    farm: 'Mercier Orchards',
    location: 'Newcastle, CA / 52 miles',
    grows: ['Stone fruit', 'Pears', 'Cider apples'],
    since: 'Partners since 2020',
    image: '/images/farmer-portrait-3.webp',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
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
    <motion.article ref={ref} variants={cardVariants}>
      {/* Portrait image: fixed height on mobile so cards don't dominate the scroll,
          natural 3/4 ratio on desktop where they sit side by side. */}
      <div className="relative h-[320px] overflow-hidden md:h-auto md:aspect-[3/4]">
        <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110">
          <Image
            src={asset(farmer.image)}
            alt={`${farmer.name} of ${farmer.farm}`}
            fill
            className="object-cover object-top"
            sizes="(min-width: 1024px) 33vw, 100vw"
            loading="lazy"
          />
        </motion.div>
      </div>

      <div className="mt-6">
        <p className="font-display text-xl font-medium text-forest">
          {farmer.farm}
        </p>
        <p className="mt-1 font-sans text-sm text-fog-dark">{farmer.name}</p>
        <p className="mt-2 font-mono text-xs uppercase tracking-wide text-fog-dark">
          {farmer.location}
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {farmer.grows.map((item) => (
            <span
              key={item}
              className="rounded-sm border border-fog/40 px-2 py-0.5 font-sans text-xs text-fog-dark"
            >
              {item}
            </span>
          ))}
        </div>

        <p className="mt-3 font-mono text-xs text-fog-dark">{farmer.since}</p>
      </div>
    </motion.article>
  );
}

export default function Farmers() {
  return (
    <section className="bg-linen py-16 md:py-24">
      <div className="mx-auto max-w-content px-5 md:px-8">
        {/* Section header */}
        <div className="mb-14">
          <h2 className="font-display text-5xl font-semibold text-forest">
            Meet our farmers
          </h2>
          <p className="mt-4 max-w-xl font-sans text-base text-fog-dark">
            We visit every farm before we put it on the menu. These are the
            people who make this food possible.
          </p>
        </div>

        {/* Cards */}
        <motion.div
          className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {FARMERS.map((farmer) => (
            <FarmerCard key={farmer.farm} farmer={farmer} />
          ))}
        </motion.div>

        {/* See more link */}
        <div className="mt-12 text-center">
          <Link
            href="/farmers"
            className="font-sans text-sm text-ember underline underline-offset-4 hover:opacity-80"
          >
            Meet all of our farm partners &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}