'use client';

// One job: tell the founding story: origin, chef, values, a short timeline,
// the kitchen team, and a closing CTA. Hero content is bottom-left aligned.
// Chef photo has no parallax.

import Image from 'next/image';
import { m, useScroll, useTransform } from 'framer-motion';
import { useIsDesktop } from '@/lib/useIsDesktop';
import { asset } from '@/lib/basePath';
import { FARMERS } from '@/data/farmers';
import { ButtonLink } from '@/components/ui/Button';

const VALUES = [
  {
    id: 'seasonal',
    headline: 'No dish lives forever',
    body: 'When an ingredient goes out of season it comes off the menu. We do not source from outside California to extend a dish. When it is gone, it is gone until next year.',
  },
  {
    id: 'transparency',
    headline: 'You will know the farmer',
    body: 'Every dish names its source. We visit every farm personally before we list it on the menu. If we would not eat there, it does not appear on your plate.',
  },
  {
    id: 'scale',
    headline: 'Small on purpose',
    body: 'Forty seats. Five dinners and one brunch a week. We are not trying to scale. We are trying to get dinner right, every night, for the people who show up.',
  },
];

// ── Hero ──────────────────────────────────────────────────────────────────────

function AboutHero() {
  const isDesktop = useIsDesktop();
  const { scrollY } = useScroll();
  const rawY = useTransform(scrollY, [0, 400], [0, 120]);
  const imageY = useTransform(rawY, (v) => (isDesktop ? v : 0));

  return (
    <section className="relative flex h-[340px] items-end overflow-hidden md:h-[440px]">
      <m.div style={{ y: imageY }} className="absolute inset-0 scale-110">
        <Image
          src={asset('/images/hero-dining.webp')}
          alt="Dinner service in the Harvest Table dining room"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: 'center 25%' }}
          sizes="100vw"
        />
      </m.div>
      <div className="absolute inset-0 bg-forest/55" />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 pb-12 text-center md:px-6 md:pb-16 md:text-left">
        <m.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="font-display text-5xl font-light leading-none text-linen sm:text-6xl md:text-7xl"
        >
          We opened
          <br />
          because we were
          <br />
          hungry.
        </m.h1>
      </div>
    </section>
  );
}

// ── Origin story ──────────────────────────────────────────────────────────────

function OriginStory() {
  return (
    <section aria-label="Our story" className="bg-linen py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-5 md:px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          {/* Left: story text */}
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6 text-center md:col-span-7 md:text-left"
          >
            <p className="font-display text-xl leading-relaxed text-forest">
              Harvest Table opened in 2019 with eight tables, a wood-fired oven, and a handshake
              agreement with two farms down the road. The plan was simple: cook what was ripe, name
              where it came from, and get out of the way.
            </p>
            <p className="font-sans text-base leading-loose text-fog-dark">
              Our chef and founder, Daniel Park, spent twelve years in restaurant kitchens in San
              Francisco and Portland before moving to the Central Valley. He did not come here for
              the restaurant scene. He came because the farms were here.
            </p>
            <p className="font-sans text-base leading-loose text-fog-dark">
              The menu has never been the same two weeks in a row. We have served dishes we could
              not repeat if we tried, because the ingredient that made them possible was gone by the
              following Tuesday. That is not a problem. That is the point.
            </p>
            <p className="font-sans text-base leading-loose text-fog-dark">
              We now buy from {FARMERS.length} farms and makers. We seat forty guests a night for
              dinner Tuesday through Saturday, plus Sunday brunch. We have never put a dish on the
              menu that we were not proud of. We intend to keep it that way.
            </p>
          </m.div>

          {/* Right: chef photo + pull quote */}
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="md:col-span-5"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={asset('/images/chef-daniel-park.webp')}
                alt="Chef and founder Daniel Park preparing a dish in the Harvest Table kitchen"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 42vw"
              />
            </div>
            <blockquote className="mt-8 border-l-2 border-gold pl-5 text-center md:text-left">
              <p className="font-display text-xl font-light italic leading-relaxed text-forest">
                &ldquo;The best ingredient is always the one you did not plan for. That is why we do
                not lock our menu in advance.&rdquo;
              </p>
              <footer className="mt-3 font-mono text-xs uppercase tracking-wide text-fog-dark">
                Daniel Park, Chef and Founder
              </footer>
            </blockquote>
          </m.div>
        </div>
      </div>
    </section>
  );
}

// ── Values ────────────────────────────────────────────────────────────────────

function ValuesSection() {
  return (
    <section aria-labelledby="values-heading" className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-5 md:px-6">
        <div className="mb-12 flex items-center gap-6">
          <h2 id="values-heading" className="whitespace-nowrap font-display text-3xl font-semibold text-forest md:text-4xl">How we cook</h2>
          <div className="h-px flex-1 bg-fog/20" />
        </div>

        <div className="grid grid-cols-1 gap-12 text-center md:grid-cols-3 md:text-left">
          {VALUES.map((v, i) => (
            <m.div
              key={v.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="border-t-2 border-gold pt-8"
            >
              <h3 className="font-display text-2xl font-medium text-forest">{v.headline}</h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-fog-dark">{v.body}</p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Timeline ──────────────────────────────────────────────────────────────────

const MILESTONES = [
  { year: '2019', text: 'Opened on Main Street with eight tables and two farm partners down the road.' },
  { year: '2021', text: 'Grew to forty seats and started buying whole animals from local ranches.' },
  { year: '2023', text: 'Opened the private dining room and hosted our first dinner in the vineyard.' },
  { year: '2026', text: `${FARMERS.length} farm partners, all within 60 miles of the kitchen.` },
];

function Timeline() {
  return (
    <section aria-labelledby="timeline-heading" className="bg-linen py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-5 md:px-6">
        <h2 id="timeline-heading" className="text-center font-display text-3xl font-semibold text-forest md:text-left md:text-4xl">
          Along the way
        </h2>
        <ol className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {MILESTONES.map((milestone) => (
            <li key={milestone.year} className="border-l-2 border-gold/60 pl-5">
              <p className="font-mono text-sm text-ember">{milestone.year}</p>
              <p className="mt-2 font-sans text-sm leading-relaxed text-fog-dark">{milestone.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ── Team photo ────────────────────────────────────────────────────────────────

function TeamPhoto() {
  const isDesktop = useIsDesktop();
  const { scrollY } = useScroll();
  const rawY = useTransform(scrollY, [400, 1600], [0, 80]);
  const imageY = useTransform(rawY, (v) => (isDesktop ? v : 0));

  return (
    <section aria-label="Our kitchen team" className="relative h-[300px] overflow-hidden md:h-[480px]">
      <m.div style={{ y: imageY }} className="absolute inset-0 scale-110">
        <Image
          src={asset('/images/team-kitchen.webp')}
          alt="The Harvest Table kitchen team plating dishes together at the pass during dinner service"
          fill
          className="object-cover"
          style={{ objectPosition: 'center 40%' }}
          sizes="100vw"
        />
      </m.div>
      <div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-forest/10 to-transparent" />
      <p className="absolute bottom-6 left-5 right-5 font-display text-2xl font-light italic text-linen md:bottom-10 md:left-10 md:text-3xl">
        One kitchen, one pass, and whatever came off the farm trucks this morning.
      </p>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────────────────────────────

function BottomCta() {
  return (
    <section className="bg-forest py-20 text-center">
      <m.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="px-6"
      >
        <h2 className="font-display text-4xl font-normal text-linen md:text-5xl">
          Come see what is on the menu tonight.
        </h2>
        <ButtonLink href="/reservations" tone="dark" className="mt-8">
          Reserve a Table
        </ButtonLink>
      </m.div>
    </section>
  );
}

// ── Page root ─────────────────────────────────────────────────────────────────

export default function AboutClient() {
  return (
    <>
      <AboutHero />
      <OriginStory />
      <ValuesSection />
      <Timeline />
      <TeamPhoto />
      <BottomCta />
    </>
  );
}
