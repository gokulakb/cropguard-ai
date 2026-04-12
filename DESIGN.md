# Design Brief

## Direction

CropGuard AI v2 — expanded agricultural disease prediction platform with 13 new features (history, maps, calendar, guides, pricing, yield, forums, community) maintaining botanical green identity with warm rust accents for community sections.

## Tone

Professional, accessible, farmer-first — clinical precision for data features paired with warm storytelling for community features. Trust through transparency, not decoration.

## Differentiation

Dual-mode design: data features use green/neutral palette (health, maps, metrics, tracking); community features use warm rust accent (forums, stories, testimonials). Color psychology drives mental model — green for agricultural health, rust for human connection.

## Color Palette

| Token       | OKLCH           | Role                              |
| ----------- | --------------- | --------------------------------- |
| background  | 0.97/0.13 0.008/0.02 155 | Light cream/dark forest bg       |
| foreground  | 0.18/0.92 0.015/0.01 155 | Forest text / light text dark    |
| primary     | 0.55/0.65 0.18 155      | Botanical green (confident)      |
| accent      | 0.65/0.7 0.15/0.12 85   | Warm amber (warnings/actions)    |
| success     | 0.5/0.6 0.2/0.16 135    | Health/healthy crop green        |
| info        | 0.6/0.68 0.12/0.1 215   | Data/analytics blue              |
| social      | 0.6/0.68 0.16/0.14 35   | Community/human rust accent      |
| destructive | 0.55 0.22 25            | Emergency/severe red             |

## Typography

- Display: Space Grotesk — modern geometric headings, feature titles
- Body: Plus Jakarta Sans — warm accessible sans for UI/copy
- Scale: hero `text-5xl md:text-6xl font-bold`, h2 `text-3xl md:text-4xl font-bold`, label `text-xs font-semibold uppercase`, body `text-base`

## Elevation & Depth

Subtle shadow hierarchy with semantic card variants: `.card-data` (clinical green border, neutral) for timelines/charts/guides; `.card-social` (warm rust border accent) for forum threads/success stories. Both use 0.05–0.08 opacity shadows.

## Structural Zones

| Zone       | Background            | Border/Accent      | Feature Group          |
| ---------- | --------------------- | ------------------ | ---------------------- |
| Data Cards | card with primary/20  | border or primary  | History, Map, Calendar |
| Social Cards | card with social/10 | social/40 on hover | Forum, Stories         |
| Timeline   | muted/30 alternating  | info accent        | Health History         |
| Hero Stat  | primary/5 gradient    | primary accent     | Market prices, yields  |

## Spacing & Rhythm

Data sections: 24px gaps, 16px card padding, aligned grid columns (3 cols md/lg). Community sections: 20px gaps, 18px card padding, looser cards with breathing room. Micro: 8px/12px tokens for internal spacing.

## Component Patterns

- Buttons: primary green (data) or social rust (community), hover shade shift, no shadow
- Cards: `.card-data` (neutral clinical) or `.card-social` (warm rust accent), 8px radius, 1px border
- Badges: `.badge-success` (green), `.badge-warning` (amber), `.badge-info` (blue), `.badge-social` (rust)
- Timelines: info accent line with muted alternating event backgrounds

## Motion

- Entrance: `animate-fade-in` 0.3s ease-out on page load
- Card entry: `animate-slide-in` 0.3s ease-out staggered
- Hover: `transition-smooth` 0.3s cubic-bezier, border/background shift only
- Decorative: `animate-pulse-subtle` 2s ease for new notifications

## Constraints

- No gradients, no decoration — all surfaces are solid OKLCH colors
- All text AA+ contrast; verify both light & dark modes
- Data features: neutral/clinical feel; community features: warm/social feel
- New animations are entrance/hover only; no auto-playing decorative motion
- Mobile-first responsive with `sm:` `md:` `lg:` breakpoints
- All colors from OKLCH tokens; no hex, rgb, or arbitrary values

## Signature Detail

Dual semantic color system — botanical green for agricultural health data paired with warm rust for farmer community connection — creates a distinctive visual hierarchy that signals both data integrity and human trust without requiring skeuomorphism or rustic clichés.
