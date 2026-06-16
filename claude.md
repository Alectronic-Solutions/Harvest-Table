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

## Typography
- Display: Cormorant Garamond (300, 400, 600) — headings only, large sizes
- Mono: DM Mono (400) — prices, labels, seasonal indicators ONLY
- Body: DM Sans (400, 500) — all UI and paragraph text
- Load all three via next/font/google

## Seasonal Strip
Every page has a thin top bar ABOVE the navbar:
- Background: #2C3B2D
- Text: "SUMMER 2026 — MENU CHANGES WITH THE HARVEST" in DM Mono
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

## Navigation
- Transparent over hero, transitions to #2C3B2D on scroll
- Logo centered (not left) — restaurant convention
- Links: Menu / Farmers / Reservations / Events / About
- "Reserve" button far right, gold background
- Mobile: hamburger opens full-screen overlay menu

## Quality Gates (run before every section)
- [ ] Mobile-first 375px base, then md: lg: breakpoints
- [ ] No lorem ipsum — write real restaurant copy
- [ ] No placeholder <div> boxes — use next/image with real alt text
- [ ] Tailwind tokens only — no hardcoded hex in JSX
- [ ] Every section has ONE job (comment at top of file)
- [ ] Touch targets minimum 48px on mobile
- [ ] Farm source attribution on every menu item

## Strict Rules
- No em dashes in copy or comments
- No overline pill labels above headings
- Reservation CTA is "Reserve a Table" — never "Book Now"
- Phone number always formatted as (xxx) xxx-xxxx with tel: link
- Prices in DM Mono, never in Cormorant or DM Sans
- FormSubmit action: https://formsubmit.co/YOUR_EMAIL