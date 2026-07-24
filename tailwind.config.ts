import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette. See CLAUDE.md design system. Never hardcode these
        // hex values in JSX; reference the token names instead.
        forest: '#2C3B2D',
        gold: '#D4A843',
        linen: '#F0EBE1',
        ember: '#A0522D',
        fog: '#6B7A6B',
        ink: '#1A1A1A',
        // WCAG AA-safe variants for small text on linen/white backgrounds.
        // `gold` and `fog` stay unchanged for use on forest (dark) backgrounds
        // and decorative/large-scale treatments where they already pass.
        'gold-dark': '#7A5A1C',
        'fog-dark': '#566256',
      },
      fontFamily: {
        // Bound to the next/font CSS variables defined in app/layout.tsx.
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        mono: ['var(--font-dm-mono)', 'ui-monospace', 'monospace'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        label: '0.15em',
      },
      maxWidth: {
        content: '1200px',
      },
    },
  },
  plugins: [],
};

export default config;
