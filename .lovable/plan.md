

# Fix OG Image Subtitle Font

## Problem
The current OG image subtitle ("Bitcoin Payment Infrastructure") appears slightly italic. It needs to be bolder and use a clean, non-italic sans-serif font.

## Change

| File | Change |
|------|--------|
| `public/og-image.png` | Regenerate using the `google/gemini-3-pro-image-preview` model, editing the existing image with an explicit instruction to make the subtitle text bolder, upright (non-italic), and in a clean geometric sans-serif font like Inter or Helvetica |

No other files affected -- `index.html` already references `/og-image.png`.

## Technical Details
- Will use the image-edit workflow: pass the current `public/og-image.png` as input along with a text instruction specifying "Make the subtitle 'Bitcoin Payment Infrastructure' bolder, completely upright (not italic), and in a clean geometric sans-serif typeface. Keep everything else exactly the same."
- Output saved back to `public/og-image.png`

