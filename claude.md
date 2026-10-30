# Harvest Table — Claude Code Project Memory

## Business Context
Harvest Table is a farm-to-table restaurant with seasonal menus sourced 
from local farms within 60 miles. Demo site built by Alectronic Solutions 
to show prospective restaurant clients a premium $5K-$8K web presence.

## Design System
- Forest: #2C3B2D (primary dark, backgrounds, navbar)
- Gold: #D4A843 (accent, CTAs, seasonal labels)
- Linen: #F0EBE1 (page background)
- Ember: #A0522D (warm accent, used sparingly for seasonal warmth)
- Fog: #6B7A6B (secondary text, borders, captions)
- Text: #1A1A1A primary, #6B7A6B secondary
- Tailwind tokens: forest, gold, linen, ember, fog, ink, paper (#FFFFFF, raised panels on linen)
- Small text on linen or paper uses gold-dark (#7A5A1C) and fog-dark (#566256) for AA contrast; plain gold and fog are for dark backgrounds and large text
- Translucent scrims, glows and text shadows live in globals.css utilities (scrim-*, warmth-*, glow-gold, text-shadow-*) built from the --rgb-* palette channels; no rgba() literals in JSX

## Typography
- Display: Cormorant Garamond (300, 400, 600) — headings only, large sizes
- Mono: DM Mono (400) — prices, labels, seasonal indicators ONLY
- Body: DM Sans (400, 500) — all UI and paragraph text
- Load all three via next/font/google
- Weights: only use Cormorant 300/400/600 (no font-medium on display text); dark backgrounds use 400, linen uses 600
- Mobile floor: no text under 12px except the seasonal strip (11px); mono labels are text-xs with tracking-label (0.15em), one tracking value for all caps labels
- Readable paragraphs (menu items, events, FAQ, stories) are text-base leading-relaxed; text-sm is for captions, names and status notes only
- Multi-line paragraphs are left-aligned on mobile; only headings and one-line sublines are centered
- DM Mono h2/h3 are allowed only for short column labels (Hours, Visit us); never as a label above a heading

## Seasonal Strip
Every page has a thin top bar ABOVE the navbar:
- Background: #2C3B2D
- Text: "FALL 2026 · MENU CHANGES WITH THE HARVEST" in DM Mono (season comes from CURRENT_SEASON in data/restaurant.ts)
- Text color: #D4A843
- Height: 36px, centered, font-size: 11px, letter-spacing: 0.15em
- This sits above the sticky navbar, not inside it

## Tech Stack
- Next.js 14, TypeScript, App Router
- Tailwind CSS with custom tokens in tailwind.config.ts
- Framer Motion for animations
- Static export (output: 'export') — Cloudflare Pages
- FormSubmit for reservation and contact forms
- next/image for ALL images — no <img> tags ever

## Animation Rules
- Scroll reveals: Framer Motion whileInView, once: true, y: 24 → 0
- Hover on cards: subtle scale(1.02), 300ms ease, NO border glow effects
- Menu item hover: underline slides in from left (CSS only, no JS)
- Photo mosaic: stagger children 0.1s apart on scroll enter
- NO parallax on mobile — only on md: and above
- NO auto-playing carousels

## Spacing
- Mobile section padding is py-16 (64px) everywhere; desktop is md:py-24 for standard sections and md:py-20 for dark closers
- Section header gap mb-10 md:mb-12; subline gap mt-3 or mt-4 within one section
- Page-level H2s are text-4xl on mobile; H1 is text-5xl
- Gutters are px-5 on mobile, md:px-8

## Navigation
- Sticky translucent linen bar (bg-linen/70, firming to /90 with blur and shadow on scroll); it sits below the seasonal strip
- Logo and wordmark on the left (as built; the earlier centered-logo plan was dropped)
- Links: Menu / Farmers / Reservations / Events / About / Contact
- "Reserve a Table" button far right on desktop, gold background
- Below lg (tablets included): call icon and hamburger; hamburger opens a full-screen forest overlay with numbered links, a Reserve a Table button and the phone number
- Mobile also shows a fixed bottom Call and Reserve bar after the hero; it hides near forms and the footer

## Quality Gates (run before every section)
- [ ] Mobile-first 375px base, then md: lg: breakpoints
- [ ] No lorem ipsum — write real restaurant copy
- [ ] No placeholder <div> boxes — use next/image with real alt text
- [ ] Tailwind tokens only — no hardcoded hex in JSX
- [ ] Every section has ONE job (comment at top of file)
- [ ] Touch targets minimum 48px on mobile (use min-h-12; inline links inside a sentence are exempt)
- [ ] Farm source attribution on every menu item

## Strict Rules
- No em dashes in copy or comments
- No overline pill labels above headings
- Reservation CTA is "Reserve a Table" — never "Book Now"
- Phone number always formatted as (xxx) xxx-xxxx with tel: link
- Prices in DM Mono, never in Cormorant or DM Sans
- FormSubmit action: https://formsubmit.co/YOUR_EMAIL