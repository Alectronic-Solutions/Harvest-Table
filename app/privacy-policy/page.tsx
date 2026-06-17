import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Harvest Table',
  description: 'Privacy Policy for Harvest Table restaurant.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-linen pt-24">
      <div className="mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-16">
        <h1 className="font-display text-3xl text-forest md:text-4xl">Privacy Policy</h1>
        <p className="mt-2 font-mono text-xs text-gold">Last updated: January 2025</p>

        <div className="prose prose-stone mt-8 font-sans text-forest/80">
          <section className="mb-8">
            <h2 className="font-display text-xl text-forest">1. Information We Collect</h2>
            <p className="mt-2">
              We collect information you provide directly to us when making reservations,
              including your name, email address, phone number, and any special requests
              or dietary restrictions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-xl text-forest">2. How We Use Your Information</h2>
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
            <h2 className="font-display text-xl text-forest">3. Information Sharing</h2>
            <p className="mt-2">
              We do not sell, trade, or rent your personal information to third parties.
              We may share your information with trusted service providers who assist us
              in operating our business, such as reservation platforms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-xl text-forest">4. Data Security</h2>
            <p className="mt-2">
              We implement reasonable security measures to protect your personal information.
              However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-xl text-forest">5. Your Rights</h2>
            <p className="mt-2">
              You have the right to access, correct, or delete your personal information.
              Contact us at{' '}
              <a href="mailto:hello@harvesttable.com" className="text-gold underline">
                hello@harvesttable.com
              </a>{' '}
              with any requests.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-xl text-forest">6. Cookies</h2>
            <p className="mt-2">
              Our website uses essential cookies to ensure proper functionality.
              We do not use tracking cookies for advertising purposes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="font-display text-xl text-forest">7. Contact Us</h2>
            <p className="mt-2">
              For questions about this Privacy Policy, please contact us at:{' '}
              <a href="mailto:hello@harvesttable.com" className="text-gold underline">
                hello@harvesttable.com
              </a>
            </p>
          </section>

          <div className="mt-12 border-t border-forest/10 pt-6">
            <Link href="/" className="text-sm text-gold hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}