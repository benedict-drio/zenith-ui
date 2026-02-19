

# Generate an Exceptional OpenGraph Image for SatsTerminal

## Overview
Replace the current AI-generated OG image with a striking, premium-quality 1200x630px image that matches the SatsTerminal brand identity shown in the uploaded screenshot.

## Design Direction
The new image will feature:
- **Deep dark background** (#0a0a14 to #1a1a2e gradient) with a subtle radial orange glow emanating from the center
- **Large, centered orange rounded-square icon** with the white lightning bolt (matching the favicon/logo style from the screenshot)
- **"SatsTerminal"** in bold Space Grotesk font below the icon
- **"Bitcoin Payment Infrastructure"** as a refined subtitle in lighter text
- Subtle grid or noise texture overlay for depth
- A soft orange ambient light halo behind the icon for a premium fintech feel

The goal: something that looks hand-crafted and premium when shared on Twitter/LinkedIn -- not generic AI art.

## Changes

| File | Change |
|------|--------|
| `public/og-image.png` | Replace with a new, higher-quality AI-generated OG image using the Nano banana pro model with a detailed, specific prompt |

No other files need changes -- `index.html` already references `/og-image.png`.

## Technical Details
- Will use the `google/gemini-3-pro-image-preview` model (higher quality) with a very specific prompt describing exact colors, layout, typography, and composition
- Dimensions: 1200x630px (standard OG format)
- The prompt will emphasize: minimal design, dark fintech aesthetic, centered logo composition, orange (#f97316) accent color, and clean sans-serif typography

