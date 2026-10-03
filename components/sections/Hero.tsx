'use client';

// One job: full-bleed hero that answers the three questions every diner
// arrives with: what kind of food, where, and how to get a table. Video
// background (lighter encodes on phones, poster fallback), staggered entry animation.

import HeroVideoBackground from './HeroVideoBackground';
import { m, useScroll, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ButtonLink } from '@/components/ui/Button';
import { CONTACT, PHONE_HREF } from '@/data/restaurant';

const contentVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

export default function Hero() {
  const { scrollY } = useScroll();

  // Chevron hides once the user has scrolled 100px.
  const [showChevron, setShowChevron] = useState(true);
  useEffect(() => {
    return scrollY.on('change', (v) => setShowChevron(v < 100));
  }, [scrollY]);

  return (
    <section
      aria-label="Welcome"
      className="relative flex h-[calc(100svh-var(--seasonal-strip-height)-var(--nav-height))] min-h-[560px] items-center justify-center overflow-hidden"
    >
      <HeroVideoBackground />

      {/* Layered overlays: base dark wash, focused contrast scrim behind the
          copy (guards legibility regardless of which video frame is showing),
          and a subtle radial warmth accent */}
      <div className="absolute inset-0 bg-forest/60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_48%,rgba(10,14,10,0.45)_0%,transparent_72%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_45%,rgba(160,82,45,0.08)_0%,transparent_70%)]" />
      {/* Bottom vignette bleeds the hero into the Philosophy section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-forest/40" />

      {/* Content */}
      <m.div
        className="relative z-10 mx-auto w-full max-w-content px-5 text-center md:px-8"
        variants={contentVariants}
        initial="hidden"
        animate="visible"
      >
        <m.h1
          variants={fadeUp}
          className="font-display text-5xl font-semibold leading-[0.95] text-linen sm:text-6xl md:text-[clamp(4rem,9vw,6.5rem)]"
          style={{ textShadow: '0 2px 24px rgba(0,0,0,0.35)' }}
        >
          Honest food.
          <br />
          In season.
          <br />
          Right now.
        </m.h1>

        <m.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-md font-sans text-base leading-relaxed text-linen/85 md:text-lg"
          style={{ textShadow: '0 1px 12px rgba(0,0,0,0.3)' }}
        >
          Farm-to-table dining in downtown Lodi, sourced from farms within
          60 miles and changed when the land says so.
        </m.p>

        <m.div
          variants={fadeUp}
          className="mx-auto mt-8 flex max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center"
        >
          <ButtonLink href="/reservations" tone="dark">
            Reserve a Table
          </ButtonLink>
          <ButtonLink href="/menu" variant="outline" tone="dark">
            View the Menu
          </ButtonLink>
        </m.div>

        <m.div
          variants={fadeUp}
          className="mx-auto mt-10 flex max-w-[280px] flex-col items-center gap-1.5 rounded-2xl bg-forest/50 px-5 py-4 font-mono text-[11px] uppercase leading-relaxed tracking-[0.1em] text-linen/85 backdrop-blur-sm sm:max-w-none sm:flex-row sm:justify-center sm:gap-3 sm:rounded-full sm:bg-transparent sm:px-0 sm:py-0 sm:backdrop-blur-none"
        >
          <span>{CONTACT.address}, {CONTACT.locality}</span>
          <span className="hidden h-1 w-1 rotate-45 bg-gold/60 sm:inline-block" aria-hidden />
          <span>Dinner Tue to Sat · Brunch Sun</span>
          <span className="hidden h-1 w-1 rotate-45 bg-gold/60 sm:inline-block" aria-hidden />
          <a href={PHONE_HREF} className="inline-flex min-h-[32px] items-center transition-colors hover:text-gold">
            {CONTACT.phone}
          </a>
        </m.div>
      </m.div>

      {/* Scroll chevron */}
      <AnimatePresence>
        {showChevron && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 md:block"
            aria-hidden
          >
            <m.svg
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-linen/80"
            >
              <path d="M6 9l6 6 6-6" />
            </m.svg>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
}
