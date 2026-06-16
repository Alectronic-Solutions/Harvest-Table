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
    <section className="bg-forest py-16">
      <div className="mx-auto max-w-content px-5 md:px-8">
        {/* Pull quote */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span
            className="font-display text-6xl font-semibold leading-none text-gold"
            aria-hidden
          >
            &ldquo;
          </span>
          <p className="mx-auto max-w-2xl font-display text-2xl font-light leading-relaxed text-white md:text-3xl">
            One of the most honest restaurants in the Central Valley. The kind
            of place you want to keep a secret.
          </p>
          <p className="mt-4 font-mono text-xs uppercase tracking-widest text-gold/70">
            Sacramento Bee Food Section, March 2025
          </p>
        </motion.div>

        {/* Press wordmark strip */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        >
          <div className="flex flex-wrap items-center justify-center gap-y-6">
            {PRESS.map((pub, i) => (
              <div key={pub.name} className="flex items-center">
                {pub.url ? (
                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${pub.style} text-white/50 transition-colors duration-300 hover:text-gold/90`}
                  >
                    {pub.name}
                  </a>
                ) : (
                  <span className={`${pub.style} text-white/50`}>
                    {pub.name}
                  </span>
                )}
                {i < PRESS.length - 1 && (
                  <span
                    className="mx-6 inline-block h-4 border-r border-fog/20"
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
