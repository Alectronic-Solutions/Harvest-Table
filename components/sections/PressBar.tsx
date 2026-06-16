'use client';

// One job: press credibility strip with pull quote and linked publication wordmarks.

import { motion } from 'framer-motion';

const PRESS = [
  {
    name: 'Eater',
    url: 'https://eater.com',
    style: 'font-sans text-base font-black uppercase tracking-[0.25em]',
  },
  {
    name: 'SF Chronicle',
    url: 'https://sfchronicle.com',
    style: 'font-display text-lg font-semibold italic tracking-tight',
  },
  {
    name: 'Sacramento Bee',
    url: 'https://sacbee.com',
    style: 'font-sans text-sm font-bold uppercase tracking-[0.2em]',
  },
  {
    name: 'Edible Central Valley',
    url: '',
    style: 'font-display text-base font-light italic tracking-wide',
  },
  {
    name: 'Sunset',
    url: 'https://sunset.com',
    style: 'font-sans text-base font-black uppercase tracking-[0.3em]',
  },
];

export default function PressBar() {
  return (
    <section className="relative bg-forest py-20 overflow-hidden">
      {/* Subtle radial warmth behind the quote */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(160,82,45,0.07) 0%, transparent 70%)' }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-content px-5 md:px-8">

        {/* Pull quote */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Opening mark */}
          <span
            className="block font-display text-7xl font-light leading-none text-gold/40 select-none"
            aria-hidden
          >
            &ldquo;
          </span>

          <p className="mx-auto -mt-3 max-w-2xl font-display text-2xl font-light leading-relaxed text-linen md:text-[1.75rem]">
            One of the most honest restaurants in the Central Valley. The kind
            of place you want to keep a secret.
          </p>

          {/* Closing mark */}
          <span
            className="block font-display text-7xl font-light leading-none text-gold/40 select-none -mt-2"
            aria-hidden
          >
            &rdquo;
          </span>

          {/* Gold ornament */}
          <div className="mt-5 flex items-center justify-center gap-3" aria-hidden>
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/40" />
            <div className="h-1.5 w-1.5 rotate-45 bg-gold/60" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/40" />
          </div>

          <p className="mt-4 font-mono text-xs uppercase tracking-widest text-gold/60">
            Sacramento Bee Food Section, March 2025
          </p>
        </motion.div>

        {/* Press wordmark strip */}
        <motion.div
          className="mt-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        >
          {/* Top rule */}
          <div className="mb-10 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

          <div className="flex flex-wrap items-center justify-center gap-y-6">
            {PRESS.map((pub, i) => (
              <div key={pub.name} className="flex items-center">
                {pub.url ? (
                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${pub.style} text-linen/35 transition-colors duration-300 hover:text-gold/80`}
                  >
                    {pub.name}
                  </a>
                ) : (
                  <span className={`${pub.style} text-linen/35`}>
                    {pub.name}
                  </span>
                )}
                {i < PRESS.length - 1 && (
                  <span
                    className="mx-6 inline-block h-1 w-1 rotate-45 bg-gold/20"
                    aria-hidden
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
