// One job: the site's single call-to-action style. Every CTA is a rounded pill
// so buttons look the same on every page. `primary` is gold on any
// background, `outline` adapts to light or dark sections via `tone`.

import Link from 'next/link';
import type { ComponentProps } from 'react';

type Variant = 'primary' | 'outline';
type Tone = 'light' | 'dark';

const BASE =
  'inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full px-8 py-3 font-sans text-sm font-medium tracking-wide transition-all duration-300 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 md:text-base';

const VARIANTS: Record<Variant, Record<Tone, string>> = {
  primary: {
    light: 'bg-gold text-forest shadow-[0_8px_24px_-12px_rgba(44,59,45,0.45)] hover:bg-gold/90 focus-visible:ring-offset-linen',
    dark: 'bg-gold text-forest shadow-[0_0_32px_rgba(212,168,67,0.25)] hover:bg-gold/90 focus-visible:ring-offset-forest',
  },
  outline: {
    light: 'border border-forest/40 text-forest hover:border-forest hover:bg-forest hover:text-linen focus-visible:ring-offset-linen',
    dark: 'border border-linen bg-forest/40 text-linen backdrop-blur-sm hover:border-gold hover:bg-gold hover:text-forest focus-visible:ring-offset-forest',
  },
};

export function buttonClasses(variant: Variant = 'primary', tone: Tone = 'light', extra = '') {
  return `${BASE} ${VARIANTS[variant][tone]} ${extra}`.trim();
}

type ButtonLinkProps = ComponentProps<typeof Link> & { variant?: Variant; tone?: Tone };

export function ButtonLink({ variant = 'primary', tone = 'light', className = '', ...props }: ButtonLinkProps) {
  return <Link {...props} className={buttonClasses(variant, tone, className)} />;
}
