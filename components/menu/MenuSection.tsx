'use client';

// One job: render a single menu section (Starters, Mains, etc.): a banner
// photo, the section heading, and its item rows. Each row reveals on scroll
// and links its farm to that farm's profile. Desktop uses a 12-column grid;
// mobile stacks content vertically.

import Image from 'next/image';
import Link from 'next/link';
import { m } from 'framer-motion';
import { asset } from '@/lib/basePath';
import {
  DIETARY_LABELS,
  type MenuSection as MenuSectionType,
  type DietaryFlag,
} from '@/data/menu';

function DietaryBadge({ flag }: { flag: DietaryFlag }) {
  return (
    <span
      title={DIETARY_LABELS[flag]}
      className="rounded-full border border-fog/40 px-1.5 py-0.5 font-mono text-[10px] text-fog-dark"
    >
      <span aria-hidden>{flag}</span>
      <span className="sr-only">{DIETARY_LABELS[flag]}</span>
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
  const headingId = `${section.id}-heading`;
  const farmHref = (farmId: string) => `/farmers/#${farmId}`;

  return (
    <section
      id={section.id}
      aria-labelledby={headingId}
      className={`scroll-mt-[calc(var(--nav-height)+52px)] px-5 py-16 md:px-8 md:py-20 ${isEven ? 'bg-linen' : 'bg-white'}`}
    >
      <div className="mx-auto max-w-3xl">
        {/* Banner photo */}
        <div className="print-hide relative mb-10 aspect-[21/9] overflow-hidden rounded-sm">
          <Image
            src={asset(section.image)}
            alt={section.imageAlt}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 768px, 100vw"
          />
        </div>

        {/* Section heading + horizontal rule */}
        <div className="mb-8 flex items-center gap-6">
          <h2
            id={headingId}
            className="whitespace-nowrap font-display text-3xl font-semibold text-forest md:text-4xl"
          >
            {section.label}
          </h2>
          <div className="flex-1 border-t border-fog/25" />
        </div>

        {/* Item list */}
        <m.ul
          className="divide-y divide-fog/15"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {section.items.map((item) => (
            <m.li
              key={item.name}
              variants={rowVariants}
              className="print-avoid-break group -mx-3 rounded-sm px-3 py-6 transition-colors duration-200 hover:bg-forest/[0.04] md:py-7"
            >
              {/* Desktop: 12-col grid. Mobile: flex column. */}
              <div className="grid-cols-12 gap-4 md:grid md:items-start">

                {/* Left content block: col 1-7 */}
                <div className="md:col-span-7">
                  <div className="flex items-start justify-between gap-4 md:block">
                    <h3 className="font-display text-xl font-semibold text-forest md:text-2xl">
                      <span className="link-underline">{item.name}</span>
                    </h3>
                    {/* Price + dietary badges grouped together on mobile */}
                    <span className="flex shrink-0 items-center gap-1.5 md:hidden">
                      {item.dietaryFlags?.map((flag) => (
                        <DietaryBadge key={flag} flag={flag} />
                      ))}
                      <span className="font-mono text-base text-ember">{item.price}</span>
                    </span>
                  </div>
                  {/* Seasonal + dietary badges: desktop, next to the name */}
                  <div className="mt-1 hidden items-center gap-2 md:flex">
                    {item.seasonal && (
                      <span className="rounded-full bg-gold px-2 py-0.5 font-mono text-[11px] text-forest">
                        Seasonal
                      </span>
                    )}
                    {item.dietaryFlags?.map((flag) => (
                      <DietaryBadge key={flag} flag={flag} />
                    ))}
                  </div>
                  {/* Seasonal badge: mobile, below name */}
                  {item.seasonal && (
                    <span className="mt-1 inline-block rounded-full bg-gold px-2 py-0.5 font-mono text-[11px] text-forest md:hidden">
                      Seasonal
                    </span>
                  )}
                  <p className="mt-2 max-w-prose font-sans text-sm leading-relaxed text-fog-dark">
                    {item.description}
                  </p>
                  {/* Farm source: visible below description on mobile */}
                  <p className="mt-3 font-mono text-xs text-fog-dark md:hidden">
                    <Link href={farmHref(item.farmId)} className="inline-flex min-h-[32px] items-center underline decoration-fog/40 underline-offset-4 hover:text-forest">
                      {item.farmSource}, {item.farmLocation}
                    </Link>
                  </p>
                </div>

                {/* Farm source: desktop col 8-10 */}
                <div className="hidden md:col-span-3 md:block">
                  <Link
                    href={farmHref(item.farmId)}
                    className="link-underline font-mono text-xs leading-relaxed text-fog-dark hover:text-forest"
                  >
                    {item.farmSource}
                  </Link>
                  <p className="font-mono text-xs text-fog-dark">
                    {item.farmLocation}
                  </p>
                </div>

                {/* Price: col 11-12, right-aligned (desktop) */}
                <div className="hidden md:col-span-2 md:block md:text-right">
                  <span className="font-mono text-base text-ember">
                    {item.price}
                  </span>
                </div>

              </div>
            </m.li>
          ))}
        </m.ul>
      </div>
    </section>
  );
}
