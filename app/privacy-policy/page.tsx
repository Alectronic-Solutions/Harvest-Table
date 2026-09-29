import Link from 'next/link';
import { CONTACT, SITE_UPDATED, BUILD_DATE } from '@/data/restaurant';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  title: 'Privacy Policy',
  description: 'How Harvest Table collects and uses information from reservations and inquiries.',
  path: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-linen">
      <div className="mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-16">
        <h1 className="font-display text-4xl font-semibold text-forest md:text-5xl">Privacy Policy</h1>
        <p className="mt-2 font-mono text-xs text-gold-dark">
          Last updated: <time dateTime={BUILD_DATE.toISOString().slice(0, 10)}>{SITE_UPDATED}</time>
        </p>

        <div className="mt-10 font-sans text-base leading-relaxed text-ink/80">
          <section className="mb-8">
            <h2 className="font-display text-2xl font-semibold text-forest">1. Information We Collect</h2>
            <p className="mt-2">
              We collect information you provide directly to us when making reservations,
              including your name, email address, phone number, and any special requests
              or dietary restrictions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-2xl font-semibold text-forest">2. How We Use Your Information</h2>
            <p className="mt-2">
              We use the information we collect to:
            </p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Process and confirm your reservations</li>
              <li>Communicate with you about your visit</li>
              <li>Send promotional communications (with your consent)</li>
              <li>Improve our services and customer experience</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-2xl font-semibold text-forest">3. Information Sharing</h2>
            <p className="mt-2">
              We do not sell, trade, or rent your personal information to third parties.
              We share it only with the service providers that help us run the website and
              the restaurant:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>
                <strong className="font-medium text-forest">FormSubmit</strong> delivers reservation,
                contact, and newsletter form submissions to our inbox.
              </li>
              <li>
                <strong className="font-medium text-forest">Google Maps</strong> powers the embedded
                map on our home and contact pages. Google may set its own cookies when the map loads.
              </li>
              <li>
                <strong className="font-medium text-forest">GitHub Pages</strong> hosts this website
                and may log basic request data such as IP address for security.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-2xl font-semibold text-forest">4. Data Security</h2>
            <p className="mt-2">
              We implement reasonable security measures to protect your personal information.
              However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-2xl font-semibold text-forest">5. Your Rights</h2>
            <p className="mt-2">
              You have the right to access, correct, or delete your personal information.
              Contact us at{' '}
              <a href={`mailto:${CONTACT.email}`} className="text-gold-dark underline">
                {CONTACT.email}
              </a>{' '}
              with any requests. California residents have additional rights under the
              California Consumer Privacy Act, including the right to know what we collect
              and to request deletion.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-2xl font-semibold text-forest">6. Cookies</h2>
            <p className="mt-2">
              Our own pages do not set cookies, and we do not use advertising or tracking
              cookies. The embedded Google map may set cookies governed by Google&apos;s
              privacy policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-2xl font-semibold text-forest">7. Contact Us</h2>
            <p className="mt-2">
              For questions about this Privacy Policy, email{' '}
              <a href={`mailto:${CONTACT.email}`} className="text-gold-dark underline">
                {CONTACT.email}
              </a>{' '}
              or write to {CONTACT.name}, {CONTACT.address}, {CONTACT.city}.
            </p>
          </section>

          <div className="mt-12 border-t border-forest/10 pt-6">
            <Link href="/" className="inline-flex min-h-[44px] items-center text-sm text-gold-dark underline-offset-4 hover:underline">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}