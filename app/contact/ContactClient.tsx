'use client';

// One job: contact page. Hero, three-column layout (visit info / map / form),
// and a careers + press strip. Form pre-selects inquiry type from URL params.

import Image from 'next/image';
import { asset } from '@/lib/basePath';
import { Suspense } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { useIsDesktop } from '@/lib/useIsDesktop';
import { CONTACT, HOURS } from '@/data/restaurant';
import { useDemoForm } from '@/components/DemoModal';

// ── Hero ──────────────────────────────────────────────────────────────────────

function ContactHero() {
  const isDesktop = useIsDesktop();
  const { scrollY } = useScroll();
  const rawY = useTransform(scrollY, [0, 400], [0, 120]);
  const imageY = useTransform(rawY, (v) => (isDesktop ? v : 0));

  return (
    <section className="relative flex h-[200px] items-center justify-center overflow-hidden md:h-[260px]">
      <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110">
        <Image
          src={asset('/images/restaurant-interior.jpg')}
          alt="Harvest Table dining room"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: 'center 40%' }}
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-forest/60" />
      <div className="relative z-10 text-center">
        <h1 className="font-display text-5xl font-semibold text-white">Get in Touch</h1>
      </div>
    </section>
  );
}

// ── Inquiry form (reads URL params) ───────────────────────────────────────────

const INQUIRY_OPTIONS = [
  { value: 'general', label: 'General question' },
  { value: 'press', label: 'Press or media' },
  { value: 'private-dining', label: 'Private dining' },
  { value: 'careers', label: 'Careers' },
  { value: 'farm-partnership', label: 'Farm partnership' },
  { value: 'other', label: 'Other' },
];

function InquiryForm() {
  const { handleSubmit, modal } = useDemoForm();
  const params = useSearchParams();
  const rawInquiry = params.get('inquiry') ?? '';

  const matchedOption = INQUIRY_OPTIONS.find(
    (o) => o.value === rawInquiry || rawInquiry.startsWith(o.value)
  );
  const defaultInquiry = rawInquiry === 'private-dining'
    ? 'private-dining'
    : matchedOption
    ? matchedOption.value
    : '';

  return (
    <div>
      {modal}
      <p className="font-mono text-xs uppercase tracking-widest text-gold">Send a message</p>
      <div className="mt-3 mb-6 border-t border-fog/25" />

      <form onSubmit={handleSubmit} className="space-y-6">

        <div>
          <label className="block font-mono text-xs uppercase tracking-widest text-fog mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            required
            className="w-full border-0 border-b border-fog/40 bg-transparent py-2 font-sans text-sm text-ink focus:border-forest focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block font-mono text-xs uppercase tracking-widest text-fog mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full border-0 border-b border-fog/40 bg-transparent py-2 font-sans text-sm text-ink focus:border-forest focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block font-mono text-xs uppercase tracking-widest text-fog mb-2">
            Inquiry type
          </label>
          <select
            name="inquiry_type"
            defaultValue={defaultInquiry}
            className="w-full appearance-none border-0 border-b border-fog/40 bg-transparent py-2 font-sans text-sm text-ink focus:border-forest focus:outline-none transition-colors"
          >
            <option value="">Select one</option>
            {INQUIRY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-mono text-xs uppercase tracking-widest text-fog mb-2">
            Message
          </label>
          <textarea
            name="message"
            rows={5}
            required
            className="w-full resize-none border-0 border-b border-fog/40 bg-transparent py-2 font-sans text-sm text-ink focus:border-forest focus:outline-none transition-colors"
          />
        </div>

        <button
          type="submit"
          className="w-full min-h-[48px] bg-gold py-4 font-sans text-sm font-medium text-forest transition-opacity hover:opacity-90"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

// ── Contact content (3 columns) ───────────────────────────────────────────────

function ContactContent() {
  return (
    <section className="bg-linen py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-3">

          {/* Column 1: Visit info */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-xs uppercase tracking-widest text-gold">Find us</p>
            <div className="mt-3 mb-6 border-t border-fog/25" />

            <address className="not-italic font-sans text-base leading-relaxed text-forest">
              {CONTACT.address}
              <br />
              {CONTACT.city}
            </address>

            <div className="mt-4">
              <p className="font-mono text-xs uppercase tracking-wide text-fog">Reservations</p>
              <a
                href={`tel:${CONTACT.phone.replace(/\D/g, '')}`}
                className="mt-1 block font-sans text-base text-forest transition-colors hover:text-ember"
              >
                {CONTACT.phone}
              </a>
            </div>

            <div className="mt-4">
              <p className="font-mono text-xs uppercase tracking-wide text-fog">General inquiries</p>
              <a
                href={`mailto:${CONTACT.email}`}
                className="mt-1 block font-sans text-sm text-forest transition-colors hover:text-ember"
              >
                {CONTACT.email}
              </a>
            </div>

            <div className="mt-8">
              <p className="mb-3 font-mono text-xs uppercase tracking-wide text-fog">Hours</p>
              {HOURS.map((h) => (
                <div
                  key={h.day}
                  className="flex justify-between border-b border-fog/15 py-2"
                >
                  <span className="font-sans text-sm text-forest">{h.day}</span>
                  <span className="font-mono text-xs text-fog">{h.time}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Map */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="font-mono text-xs uppercase tracking-widest text-gold">Location</p>
            <div className="mt-3 mb-6 border-t border-fog/25" />

            <iframe
              src="https://maps.google.com/maps?q=214+Main+Street+Lodi+CA&output=embed"
              width="100%"
              className="h-[220px] md:h-[300px]"
              style={{ border: 0, filter: 'grayscale(30%) contrast(1.1)' }}
              allowFullScreen
              loading="lazy"
              title="Harvest Table location"
            />

            <p className="mt-4 font-sans text-xs text-fog">214 Main Street, Lodi CA 95240</p>
            <a
              href="https://maps.google.com/maps?q=214+Main+Street+Lodi+CA"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block font-sans text-xs text-ember underline"
            >
              Get directions &rarr;
            </a>
          </motion.div>

          {/* Column 3: Inquiry form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Suspense fallback={<div className="h-96" />}>
              <InquiryForm />
            </Suspense>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ── Careers + Press strip ─────────────────────────────────────────────────────

function CareersAndPress() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 divide-y divide-fog/20 md:grid-cols-2 md:divide-x md:divide-y-0">

          {/* Careers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="py-10 md:py-0 md:pr-12"
          >
            <h2 className="font-display text-2xl font-medium text-forest">
              We are always looking for people who care about food.
            </h2>
            <p className="mt-3 font-sans text-sm leading-relaxed text-fog">
              Send your resume and a note about why you want to cook or serve at Harvest Table.
              We read every message.
            </p>
            <a
              href="mailto:careers@harvesttable.com"
              className="mt-4 block font-sans text-sm text-ember underline"
            >
              careers@harvesttable.com
            </a>
          </motion.div>

          {/* Press */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="py-10 md:py-0 md:pl-12"
          >
            <h2 className="font-display text-2xl font-medium text-forest">
              We are happy to speak with food writers and journalists.
            </h2>
            <p className="mt-3 font-sans text-sm leading-relaxed text-fog">
              For recipe requests, photography access, chef interviews, or event coverage, reach
              out directly. We respond within three business days.
            </p>
            <a
              href="mailto:press@harvesttable.com"
              className="mt-4 block font-sans text-sm text-ember underline"
            >
              press@harvesttable.com
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ── Page root ─────────────────────────────────────────────────────────────────

export default function ContactClient() {
  return (
    <main>
      <ContactHero />
      <ContactContent />
      <CareersAndPress />
    </main>
  );
}
