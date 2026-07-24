'use client';

// One job: render a single menu section (Starters, Mains, etc.) with its
// item rows. Each row reveals on scroll. Desktop uses a 12-column grid;
// mobile stacks content vertically. Row hover is a faint forest wash.

import { motion } from 'framer-motion';
import type { MenuSection as MenuSectionType, DietaryFlag } from '@/data/menu';

const FLAG_LABEL: Record<DietaryFlag, string> = {
  V: 'V',
  VE: 'VE',
  GF: 'GF',
};

function DietaryBadge({ flag }: { flag: DietaryFlag }) {
  return (
    <span className="rounded-full border border-fog/40 px-1.5 py-0.5 font-mono text-[10px] text-fog-dark">
      {FLAG_LABEL[flag]}
    </span>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const rowVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

interface Props {
  section: MenuSectionType;
  isEven: boolean;
}

export default function MenuSection({ section, isEven }: Props) {
  return (
    <section
      id={section.id}
      className={`px-4 py-20 md:px-0 ${isEven ? 'bg-linen' : 'bg-white'}`}
    >
      <div className="mx-auto max-w-3xl">
        {/* Section label + horizontal rule */}
        <div className="mb-12 flex items-center gap-6">
          <span className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.2em] text-fog-dark">
            {section.label}
          </span>
          <div className="flex-1 border-t border-fog/25" />
        </div>

        {/* Item list */}
        <motion.div
          className="divide-y divide-fog/15"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {section.items.map((item) => (
            <motion.div
              key={item.name}
              variants={rowVariants}
              className="group py-6 transition-colors duration-200 hover:bg-forest/[0.04] md:py-7"
            >
              {/* Desktop: 12-col grid. Mobile: flex column. */}
              <div className="grid-cols-12 gap-4 md:grid md:items-start">

                {/* Left content block: col 1-8 */}
                <div className="md:col-span-8">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-xl font-medium text-forest">
                      {item.name}
                    </h3>
                    {item.seasonal && (
                      <span className="rounded-full bg-gold px-2 py-0.5 font-mono text-xs text-forest">
                        Seasonal
                      </span>
                    )}
                    {item.dietaryFlags?.map((flag) => (
                      <DietaryBadge key={flag} flag={flag} />
                    ))}
                  </div>
                  <p className="mt-2 max-w-prose font-sans text-sm leading-relaxed text-fog-dark">
                    {item.description}
                  </p>
                  {/* Farm source: visible below description on mobile */}
                  <p className="mt-3 font-mono text-xs text-fog-dark md:hidden">
                    {item.farmSource}
                    <span className="text-fog-dark/70"> / {item.farmLocation}</span>
                  </p>
                </div>

                {/* Farm source: desktop col 9-10 */}
                <div className="hidden md:col-span-2 md:block">
                  <p className="font-mono text-xs leading-relaxed text-fog-dark">
                    {item.farmSource}
                  </p>
                  <p className="font-mono text-xs text-fog-dark/70">
                    {item.farmLocation}
                  </p>
                </div>

                {/* Price: col 11-12, right-aligned */}
                <div className="mt-3 md:col-span-2 md:mt-0 md:text-right">
                  <span className="font-mono text-base text-ember">
                    {item.price}
                  </span>
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
