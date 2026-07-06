'use client';

// One job: tell the founding story, values, team photo, and closing CTA.
// Hero content is bottom-left aligned. Chef photo has no parallax.

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useIsDesktop } from '@/lib/useIsDesktop';
import { asset } from '@/lib/basePath';

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
    body: 'Forty seats. Four nights a week. We are not trying to scale. We are trying to get dinner right, every night, for the people who show up.',
  },
];

// ── Hero ──────────────────────────────────────────────────────────────────────

function AboutHero() {
  const isDesktop = useIsDesktop();
  const { scrollY } = useScroll();
  const rawY = useTransform(scrollY, [0, 400], [0, 120]);
  const imageY = useTransform(rawY, (v) => (isDesktop ? v : 0));

  return (
    <section className="relative flex h-[300px] items-end overflow-hidden md:h-[420px]">
      <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110">
        <Image
          src={asset('/images/hero-dining.jpg')}
          alt="Harvest Table dining room"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: 'center 25%' }}
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-forest/55" />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-16 text-center md:text-left">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="font-display text-6xl font-light leading-none text-white md:text-7xl"
        >
          We opened
          <br />
          because we were
          <br />
          hungry.
        </motion.h1>
      </div>
    </section>
  );
}

// ── Origin story ──────────────────────────────────────────────────────────────

function OriginStory() {
  return (
    <section className="bg-linen py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12">
          {/* Left: story text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6 md:col-span-7"
          >
            <p className="font-display text-xl leading-relaxed text-forest">
              Harvest Table opened in 2019 with eight tables, a wood-fired oven, and a handshake
              agreement with two farms down the road. The plan was simple: cook what was ripe, name
              where it came from, and get out of the way.
            </p>
            <p className="font-sans text-base leading-loose text-fog">
              Our chef and founder, Daniel Park, spent twelve years in restaurant kitchens in San
              Francisco and Portland before moving to the Central Valley. He did not come here for
              the restaurant scene. He came because the farms were here.
            </p>
            <p className="font-sans text-base leading-loose text-fog">
              The menu has never been the same two weeks in a row. We have served dishes we could
              not repeat if we tried, because the ingredient that made them possible was gone by the
              following Tuesday. That is not a problem. That is the point.
            </p>
            <p className="font-sans text-base leading-loose text-fog">
              We are now partners with twelve farms. We seat forty guests per night, four nights a
              week. We have never put a dish on the menu that we were not proud of. We intend to
              keep it that way.
            </p>
          </motion.div>

          {/* Right: chef photo + pull quote */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="md:col-span-5"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={asset('/images/farmer-portrait-1.jpg')}
                alt="Daniel Park, Chef and Founder"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 42vw"
              />
            </div>
            <blockquote className="mt-8 border-l-2 border-gold pl-5">
              <p className="font-display text-xl font-light italic leading-relaxed text-forest">
                &ldquo;The best ingredient is always the one you did not plan for. That is why we do
                not lock our menu in advance.&rdquo;
              </p>
              <footer className="mt-3 font-mono text-xs uppercase tracking-wide text-fog">
                Daniel Park, Chef and Founder
              </footer>
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Values ────────────────────────────────────────────────────────────────────

function ValuesSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-12 flex items-center gap-6">
          <span className="font-mono text-xs uppercase tracking-widest text-fog">How we cook</span>
          <div className="h-px flex-1 bg-fog/20" />
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="border-t-2 border-gold pt-8"
            >
              <h3 className="font-display text-2xl font-medium text-forest">{v.headline}</h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-fog">{v.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Team photo ────────────────────────────────────────────────────────────────

function TeamPhoto() {
  const isDesktop = useIsDesktop();
  const { scrollY } = useScroll();
  const rawY = useTransform(scrollY, [400, 1200], [0, 80]);
  const imageY = useTransform(rawY, (v) => (isDesktop ? v : 0));

  return (
    <section className="relative h-[280px] overflow-hidden md:h-[400px]">
      <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110">
        <Image
          src={asset('/images/space-wide.jpg')}
          alt="The Harvest Table team"
          fill
          className="object-cover"
          style={{ objectPosition: 'center 30%' }}
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-forest/20" />
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────────────────────────────

function BottomCta() {
  return (
    <section className="bg-forest py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="px-6"
      >
        <h2 className="font-display text-4xl font-normal text-white">
          Come see what is on the menu tonight.
        </h2>
        <Link
          href="/reservations"
          className="mt-8 inline-flex min-h-[48px] items-center rounded-full bg-gold px-10 py-4 font-sans text-base font-medium text-forest transition-opacity hover:opacity-90"
        >
          Reserve a Table
        </Link>
      </motion.div>
    </section>
  );
}

// ── Page root ─────────────────────────────────────────────────────────────────

export default function AboutClient() {
  return (
    <main>
      <AboutHero />
      <OriginStory />
      <ValuesSection />
      <TeamPhoto />
      <BottomCta />
    </main>
  );
}
