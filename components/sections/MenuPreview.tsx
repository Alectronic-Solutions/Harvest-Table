'use client';

// One job: tease four mains from the seasonal menu, each with its own dish
// photo and farm attribution. Per-card parallax on desktop only, staggered
// scroll reveal, and every card links into the full menu.

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import { MENU, DIETARY_LABELS, type MenuItem } from '@/data/menu';
import { CURRENT_SEASON } from '@/data/restaurant';
import { useIsDesktop } from '@/lib/useIsDesktop';
import { asset } from '@/lib/basePath';

// The first four mains that have a dish photo.
const PREVIEW_ITEMS = (MENU.find((s) => s.id === 'mains')?.items ?? [])
  .filter((item): item is MenuItem & { image: string } => Boolean(item.image))
  .slice(0, 4);

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

function MenuCard({ item }: { item: MenuItem & { image: string } }) {
  const isDesktop = useIsDesktop();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], ['0px', '-20px']);
  const imageY = useTransform(rawY, (v) => (isDesktop ? v : '0px'));

  return (
    <m.article ref={ref} variants={cardVariants} className="group">
      <Link
        href="/menu#mains"
        className="block rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-linen"
      >
        {/* Image container: overflow-hidden clips the parallax drift */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-forest/10">
          <m.div
            style={{ y: imageY }}
            className="absolute inset-[-12px] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          >
            <Image
              src={asset(item.image)}
              alt={`${item.name}: ${item.description}`}
              fill
              className="object-cover"
              sizes="(min-width: 1200px) 580px, (min-width: 768px) 50vw, 100vw"
            />
          </m.div>
          {item.seasonal && (
            <span className="absolute left-3 top-3 rounded-full bg-gold px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide text-forest">
              Seasonal
            </span>
          )}
        </div>

        <div className="mt-4 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-display text-2xl font-semibold leading-tight text-forest md:text-[1.75rem]">
              <span className="link-underline">{item.name}</span>
            </h3>
            <p className="mt-1 font-mono text-xs uppercase tracking-wide text-fog-dark">
              {item.farmSource}, {item.farmLocation}
            </p>
          </div>
          <p className="shrink-0 pt-1 font-mono text-lg text-ember">{item.price}</p>
        </div>

        <p className="mt-2 font-sans text-sm leading-relaxed text-fog-dark">
          {item.description}
        </p>

        {item.dietaryFlags && (
          <ul className="mt-3 flex gap-2" aria-label="Dietary information">
            {item.dietaryFlags.map((flag) => (
              <li
                key={flag}
                title={DIETARY_LABELS[flag]}
                className="rounded-full border border-fog/40 px-2 py-0.5 font-mono text-[11px] text-fog-dark"
              >
                <span aria-hidden>{flag}</span>
                <span className="sr-only">{DIETARY_LABELS[flag]}</span>
              </li>
            ))}
          </ul>
        )}
      </Link>
    </m.article>
  );
}

export default function MenuPreview() {
  return (
    <section aria-labelledby="menu-preview-heading" className="bg-linen py-16 md:py-24">
      <div className="mx-auto max-w-content px-5 md:px-8">
        {/* Section header */}
        <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 id="menu-preview-heading" className="font-display text-4xl font-semibold text-forest md:text-5xl">
              This season&apos;s menu
            </h2>
            <p className="mt-3 max-w-lg font-sans text-base text-fog-dark">
              A few of the mains on our {CURRENT_SEASON} menu. Every plate names the
              farm it came from.
            </p>
          </div>
          <Link
            href="/menu"
            className="inline-flex min-h-[48px] items-center font-sans text-sm font-medium text-ember underline underline-offset-4 transition-opacity hover:opacity-70 md:pb-1"
          >
            View the full menu &rarr;
          </Link>
        </div>

        {/* 2x2 card grid */}
        <m.div
          className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-x-10 md:gap-y-14"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {PREVIEW_ITEMS.map((item) => (
            <MenuCard key={item.name} item={item} />
          ))}
        </m.div>
      </div>
    </section>
  );
}
