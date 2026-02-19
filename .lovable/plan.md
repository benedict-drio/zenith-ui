

# Update index.html with SatsTerminal Branding

## Overview

Replace all generic "Lovable App" metadata in `index.html` with proper SatsTerminal branding for SEO, social sharing, and browser identity.

## Changes (single file: `index.html`)

### Title and Meta
- **Title**: "SatsTerminal -- Bitcoin Payment Infrastructure"
- **Description**: "Enterprise-grade Bitcoin payment processing dashboard. Accept Lightning and on-chain payments with real-time analytics, invoicing, and refund management."
- **Author**: "SatsTerminal"

### OpenGraph Tags
- `og:title`: "SatsTerminal -- Bitcoin Payment Infrastructure"
- `og:description`: (same as meta description)
- `og:type`: "website"
- `og:url`: current published URL or preview URL
- `og:image`: keep existing Lovable OG image for now (no custom image asset available)
- `og:site_name`: "SatsTerminal"

### Twitter Card
- `twitter:card`: "summary_large_image"
- `twitter:title`: "SatsTerminal -- Bitcoin Payment Infrastructure"
- `twitter:description`: (same as meta description)
- `twitter:image`: keep existing image

### Favicon
Since no custom favicon image has been provided, we will generate a simple branded SVG favicon inline (an orange Bitcoin-inspired lightning bolt on a dark background) and reference it as an SVG favicon. This works in all modern browsers.

- Add a new file `public/favicon.svg` with a minimal branded icon (orange lightning bolt on dark rounded square)
- Update `index.html` to reference `/favicon.svg` with `type="image/svg+xml"`
- Keep the existing `favicon.ico` as a fallback

### Theme Color
- Add `<meta name="theme-color" content="#f97316">` for mobile browser chrome color (the orange brand color)

## Technical Details

| File | Change |
|------|--------|
| `index.html` | Update title, meta tags, OG tags, Twitter card, favicon link, theme-color |
| `public/favicon.svg` | New file -- minimal SVG favicon with orange lightning bolt |

No dependencies added. No other files affected.

