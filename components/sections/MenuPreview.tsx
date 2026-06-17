'use client';

// One job: tease 4 mains from the seasonal menu. Each card has a subtle
// per-card parallax on its image (desktop only) and staggered scroll reveal.

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MENU, type MenuItem } from '@/data/menu';
import { useIsDesktop } from '@/lib/useIsDesktop';
import { asset } from '@/lib/basePath';

// Pull the 4 mains to display.
const mainsSection = MENU.find((s) => s.label === 'Mains');
const PREVIEW_ITEMS = (mainsSection?.items ?? []).slice(0, 4);

// Maps item index to its hero dish image filename.
const DISH_IMAGES = [
  '/images/dish-beets.jpg',
  '/images/dish-pasta.jpg',
  '/images/dish-salmon.jpg',
  '/images/dish-bread.jpg',
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

function MenuCard({
  item,
  imageSrc,
}: {
  item: MenuItem;
  imageSrc: string;
}) {
  const isDesktop = useIsDesktop();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], ['0px', '-20px']);
  const imageY = useTransform(rawY, (v) => (isDesktop ? v : '0px'));

  return (
    <motion.article
      ref={ref}
      variants={cardVariants}
      className="group"
    >
      {/* Image container: overflow-hidden clips the parallax drift */}
      <div className="relative overflow-hidden rounded-sm aspect-video md:aspect-[4/3]">
        <motion.div
          style={{ y: imageY }}
          className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        >
          <Image
            src={asset(imageSrc)}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
            loading="lazy"
          />
        </motion.div>
        {/* Hover shimmer overlay */}
        <div className="absolute inset-0 bg-forest/0 transition-all duration-500 group-hover:bg-forest/10" />
        {/* Permanent bottom gradient for farm text legibility */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-forest/30 to-transparent" />
      </div>

      <div className="mt-3">
        {/* Farm attribution + seasonal badge on the same row */}
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-mono text-xs uppercase tracking-wide text-fog">
            {item.farmSource} / {item.farmLocation}
          </p>
          {item.seasonal && (
            <span className="rounded-full bg-gold px-2 py-0.5 font-mono text-xs text-forest">
              Seasonal
            </span>
          )}
        </div>

        <h3 className="mt-1 font-display text-2xl font-medium text-forest">
          {item.name}
        </h3>
        <p className="mt-1 line-clamp-2 font-sans text-sm text-fog md:line-clamp-none">
          {item.description}
        </p>
        <p className="mt-2 font-mono text-base text-ember">{item.price}</p>
      </div>
    </motion.article>
  );
}

export default function MenuPreview() {
  return (
    <section className="bg-linen py-16 md:py-24">
      <div className="mx-auto max-w-content px-5 md:px-8">
        {/* Section header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-fog">
              What&apos;s on the table
            </p>
            <h2 className="mt-3 font-display text-5xl font-semibold text-forest">
              This season&apos;s menu
            </h2>
          </div>
          <Link
            href="/menu"
            className="mt-4 inline-block font-sans text-sm font-medium text-ember underline underline-offset-4 transition-opacity hover:opacity-70 md:mt-0 md:pb-1"
          >
            View full menu &rarr;
          </Link>
        </div>

        {/* 2x2 card grid */}
        <motion.div
          className="grid grid-cols-1 gap-10 md:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {PREVIEW_ITEMS.map((item, i) => (
            <MenuCard
              key={item.name}
              item={item}
              imageSrc={DISH_IMAGES[i]}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}