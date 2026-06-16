'use client';

// One job: impact section directly below the hero. Top half: four animated
// stat counters that tick up on scroll entry. Bottom half: three philosophy
// pillars with stronger typography.

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

// ── Stat counter ─────────────────────────────────────────────────────────────

const STATS = [
  { value: 60,  suffix: ' mi',  label: 'Sourcing radius',      decimals: 0 },
  { value: 12,  suffix: '+',    label: 'Farm partners',         decimals: 0 },
  { value: 98,  suffix: '%',    label: 'Locally sourced',       decimals: 0 },
  { value: 4,   suffix: '',     label: 'Seasons on the menu',   decimals: 0 },
];

function useCounter(target: number, decimals: number, active: boolean, duration = 1400) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * target).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [active, target, decimals, duration]);

  return count;
}

function StatItem({ value, suffix, label, decimals, active }: typeof STATS[number] & { active: boolean }) {
  const count = useCounter(value, decimals, active);
  return (
    <div className="flex flex-col items-center text-center">
      <p className="font-display text-5xl font-semibold leading-none text-gold md:text-6xl">
        {decimals > 0 ? count.toFixed(decimals) : Math.round(count)}
        <span className="text-3xl md:text-4xl">{suffix}</span>
      </p>
      <p className="mt-3 font-mono text-xs uppercase tracking-widest text-linen/70">{label}</p>
    </div>
  );
}

// ── Pillars ───────────────────────────────────────────────────────────────────

const pillars = [
  {
    headline: 'Sourced within 60 miles',
    body: 'Every ingredient on this menu has a farm, a face, and a story behind it. We list them all.',
    Icon: LeafIcon,
  },
  {
    headline: 'Named by the farmer',
    body: 'You will see the farm name on every dish. We think you should know where your food comes from.',
    Icon: CompassIcon,
  },
  {
    headline: 'Cooked to order',
    body: 'We do not hold food under heat lamps. Your plate leaves the kitchen the moment it is ready.',
    Icon: FlameIcon,
  },
];

// ── Section ───────────────────────────────────────────────────────────────────

export default function PhilosophyStrip() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-60px' });

  return (
    <section className="bg-forest">

      {/* Stat counters */}
      <div
        ref={statsRef}
        className="mx-auto grid max-w-content grid-cols-2 gap-x-6 gap-y-10 px-8 py-16 md:grid-cols-4 md:gap-0 md:py-20"
      >
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex justify-center ${
              i < STATS.length - 1 ? 'md:border-r md:border-fog/20' : ''
            }`}
          >
            <StatItem {...stat} active={statsInView} />
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="mx-auto max-w-content px-8">
        <div className="h-px bg-fog/20" />
      </div>

      {/* Philosophy pillars */}
      <motion.div
        className="mx-auto grid max-w-content grid-cols-1 gap-0 px-5 py-16 md:grid-cols-3 md:px-8 md:py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
      >
        {pillars.map(({ headline, body, Icon }, i) => (
          <motion.div
            key={headline}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
            }}
            className={`flex flex-col gap-4 px-0 py-10 md:py-0 md:px-10 ${
              i < pillars.length - 1
                ? 'border-b border-fog/20 md:border-b-0 md:border-r'
                : ''
            }`}
          >
            <h2 className="font-display text-2xl font-semibold text-linen">
              {headline}
            </h2>
            <p className="font-sans text-sm leading-relaxed text-linen/80">
              {body}
            </p>
          </motion.div>
        ))}
      </motion.div>

    </section>
  );
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function LeafIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none"
      stroke="#D4A843" strokeWidth={1.5} strokeLinecap="round"
      strokeLinejoin="round" aria-hidden>
      <path d="M12 22C6.477 22 2 17.523 2 12 2 6.477 6.477 2 12 2c0 5.523-4.477 10-10 10" />
      <path d="M12 22V12" />
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none"
      stroke="#D4A843" strokeWidth={1.5} strokeLinecap="round"
      strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

function FlameIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none"
      stroke="#D4A843" strokeWidth={1.5} strokeLinecap="round"
      strokeLinejoin="round" aria-hidden>
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}
