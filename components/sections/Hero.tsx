'use client';

// One job: full-bleed hero with a crossfading video background, staggered
// entry animations, and a scroll-progress chevron.

import Link from 'next/link';
import HeroVideoBackground from './HeroVideoBackground';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';


const contentVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const fadeIn = (delay: number) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: 'easeOut', delay } },
});

export default function Hero() {
  const { scrollY } = useScroll();

  // Chevron hides once the user has scrolled 100px.
  const [showChevron, setShowChevron] = useState(true);
  useEffect(() => {
    return scrollY.on('change', (v) => setShowChevron(v < 100));
  }, [scrollY]);

  return (
    <section className="relative flex h-[calc(100svh-100px)] min-h-[520px] items-center justify-center overflow-hidden md:h-[calc(100svh-116px)]">
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
      <motion.div
        className="relative z-10 mx-auto max-w-content px-5 text-center md:px-8"
        variants={contentVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={fadeUp}
          className="font-display text-4xl font-semibold leading-none text-linen md:text-[clamp(4rem,10vw,6rem)]"
          style={{ transitionDelay: '0.5s', textShadow: '0 2px 24px rgba(0,0,0,0.35)' }}
        >
          Honest food.
          <br />
          In season.
          <br />
          Right now.
        </motion.h1>

        <motion.p
          variants={fadeIn(1.2)}
          className="mx-auto mt-6 max-w-md font-sans text-lg leading-relaxed text-linen/80"
          style={{ textShadow: '0 1px 12px rgba(0,0,0,0.3)' }}
        >
          Sourced from farms within 60 miles.
          <br />
          Changed when the land says so.
        </motion.p>

        <motion.div variants={fadeIn(1.5)}>
          <Link
            href="/reservations"
            className="mt-8 flex w-full min-h-[48px] items-center justify-center rounded-full bg-gold px-8 py-4 font-sans text-base font-medium text-forest transition-all duration-300 hover:opacity-95 hover:scale-[1.02] md:inline-flex md:w-auto"
            style={{ boxShadow: '0 0 32px rgba(212,168,67,0.35), inset 0 1px 0 rgba(255,255,255,0.2)' }}
          >
            Reserve a Table
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll chevron */}
      <AnimatePresence>
        {showChevron && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
            aria-hidden
          >
            <motion.svg
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
            </motion.svg>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
