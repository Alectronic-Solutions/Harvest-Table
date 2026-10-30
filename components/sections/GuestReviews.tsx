'use client';

// One job: social proof from guests. Three short reviews with star ratings,
// attributed by first name and visit occasion. No publication names, so the
// demo never implies coverage a real outlet did not write.

import { m } from 'framer-motion';

const REVIEWS = [
  {
    quote:
      'The server told us which farm the squash came from and which week the chanterelles showed up. You can taste that someone cared about every plate.',
    name: 'Megan R.',
    context: 'Anniversary dinner',
  },
  {
    quote:
      'We drive in from Sacramento once a month because the menu is never the same. The ribeye and the apple galette are worth the trip on their own.',
    name: 'David and Lin T.',
    context: 'Regulars since 2022',
  },
  {
    quote:
      'Hosted my parents’ 40th in the private room. The team built a menu around my mom’s favorite peaches and nobody wanted to leave.',
    name: 'Carla M.',
    context: 'Private dining, 18 guests',
  },
];

function Stars() {
  return (
    <div className="flex gap-1 text-gold-dark" role="img" aria-label="Rated 5 out of 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={14} height={14} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8L12 2.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function GuestReviews() {
  return (
    <section aria-labelledby="reviews-heading" className="blend-top-paper relative bg-paper py-16 md:py-20">
      {/* Subtle radial warmth behind the quotes */}
      <div
        className="warmth-reviews pointer-events-none absolute inset-0"
        
        aria-hidden
      />

      <div className="relative mx-auto max-w-content px-5 md:px-8">
        <div className="text-left">
          <h2 id="reviews-heading" className="font-display text-4xl font-semibold text-forest md:text-5xl">
            From our guests
          </h2>
          {/* Gold ornament */}
          <div className="mt-5 flex items-center justify-start gap-3" aria-hidden>
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold/40" />
            <div className="h-1.5 w-1.5 rotate-45 bg-gold/60" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold/40" />
          </div>
        </div>

        <m.ul
          className="mt-10 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-3 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
        >
          {REVIEWS.map((r, i) => (
            <m.li
              key={r.name}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className={`${i >= 2 ? 'hidden md:flex' : 'flex'} flex-col items-start rounded-sm border border-fog/20 bg-linen p-7 text-left md:p-8`}
            >
              <Stars />
              <blockquote className="mt-5 flex-1">
                <p className="font-display text-xl font-normal italic leading-relaxed text-forest md:text-[1.35rem]">
                  &ldquo;{r.quote}&rdquo;
                </p>
              </blockquote>
              <p className="mt-6 font-sans text-sm font-medium text-forest">{r.name}</p>
              <p className="mt-0.5 font-mono text-label uppercase tracking-label text-gold-dark">{r.context}</p>
            </m.li>
          ))}
        </m.ul>

      </div>
    </section>
  );
}
