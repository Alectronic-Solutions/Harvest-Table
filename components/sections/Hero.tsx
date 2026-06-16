'use client';

// One job: full-bleed hero with a parallax background image, staggered entry
// animations, and a scroll-progress chevron. Parallax is disabled on mobile.

import Image from 'next/image';
import Link from 'next/link';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import { useEffect, useState } from 'react';
import { useIsDesktop } from '@/lib/useIsDesktop';


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
  const isDesktop = useIsDesktop();
  const { scrollY } = useScroll();

  // Parallax: image drifts down at 0.4x scroll speed. Disabled on mobile by
  // multiplying the output by 0 when not on desktop, avoiding a conditional hook.
  const rawY = useTransform(scrollY, [0, 600], [0, 240]);
  const parallaxY = useTransform(rawY, (v) => (isDesktop ? v : 0));

  // Chevron hides once the user has scrolled 100px.
  const [showChevron, setShowChevron] = useState(true);
  useEffect(() => {
    return scrollY.on('change', (v) => setShowChevron(v < 100));
  }, [scrollY]);

  return (
    <section className="relative flex h-svh min-h-[600px] items-center justify-center overflow-hidden">
      {/* Background image with parallax wrapper */}
      <motion.div
        style={{ y: parallaxY }}
        className="absolute inset-0 scale-110"
      >
        <Image
          src="/images/hero-dining.jpg"
          alt="Warm candlelit dining room at Harvest Table"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {/* Layered overlays: base dark + subtle radial warmth around the copy */}
      <div className="absolute inset-0 bg-forest/55" />
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
        <motion.p
          variants={fadeIn(0.3)}
          className="font-mono text-xs uppercase tracking-widest text-linen/90"
        >
          Farm to Table / Lodi, California
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="mt-4 font-display text-4xl font-semibold leading-none text-linen md:text-[clamp(4rem,10vw,6rem)]"
          style={{ transitionDelay: '0.5s' }}
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
