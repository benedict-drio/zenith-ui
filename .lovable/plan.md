

# Generate Custom OpenGraph Image for SatsTerminal

## Overview
Create a branded OpenGraph image (1200x630px) for SatsTerminal and update `index.html` to reference it, replacing the placeholder Lovable OG image for professional social sharing on Twitter, LinkedIn, Facebook, etc.

## Approach
Use the Lovable AI image generation API (Nano banana pro model) to generate a high-quality 1200x630 OG image featuring:
- Dark background matching the brand palette (#1a1a2e / dark theme)
- Orange lightning bolt icon (matching the favicon)
- "SatsTerminal" brand name in bold
- Tagline: "Bitcoin Payment Infrastructure"
- Clean, professional fintech aesthetic

The generated image will be saved to `public/og-image.png`.

## Changes

| File | Change |
|------|--------|
| `public/og-image.png` | New file -- AI-generated branded OG image (1200x630) |
| `index.html` | Update `og:image` and `twitter:image` URLs from the Lovable placeholder to `/og-image.png` |

## Technical Details
- OG image dimensions: 1200x630px (standard for social platforms)
- Format: PNG (universally supported by social crawlers)
- Both `og:image` and `twitter:image` meta tags will point to the same asset
- The image URL will use a relative path; once published, it will resolve to the production domain automatically

No dependencies added. Two files affected.
