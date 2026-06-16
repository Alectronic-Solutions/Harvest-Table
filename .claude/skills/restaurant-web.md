# Restaurant Website Patterns

## Reservation Form Fields
- Date (date picker or text input)
- Time (dropdown: 5:00 PM through 9:30 PM, 30-min intervals)
- Party size (dropdown: 1-10, "10+ contact us")
- Name, phone, email
- Special requests / dietary needs (textarea)
- FormSubmit honeypot field for spam: _honey

## Menu Page Structure
Each menu section (Starters / Mains / Desserts / Drinks):
- Section label in DM Mono uppercase
- Item name in Cormorant Garamond
- Farm source in Fog color, italic DM Sans: "Sunnyside Farm, Lodi"
- Price in DM Mono, right-aligned
- Seasonal badge (small pill) on rotating items: "Limited"

## Farmer Card Template
Each farm partner card:
- Square photo (crop to 1:1)
- Farm name in Cormorant
- Farmer name in DM Sans
- What they grow (2-3 items max)
- Distance from restaurant: "42 miles"
- No CTA — this is atmosphere, not a link

## Photo Requirements
- Hero: min 1400px wide, high-quality food or golden-hour farm
- Menu section: dark moody overhead food shots
- Farmers section: outdoor natural light, NOT studio
- Space mosaic: mix of detail shots (silverware, candle, plate edge)
  with wider dining room shots

## Mobile Restaurant Conventions
- Phone number click-to-call in sticky header
- "Reserve" button always visible on mobile (sticky bottom bar option)
- Menu page: single column, full width on mobile
- Hours visible without scrolling on contact/footer

## SEO / Local Schema
Add Restaurant schema in layout.tsx:
- @type: Restaurant
- name, address, telephone, url
- servesCuisine: "American, Farm-to-Table"
- priceRange: "$$$"
- openingHours array
- hasMenu: /menu URL