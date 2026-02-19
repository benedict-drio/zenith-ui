

# Replace Fake Logos with Generic Message

## Overview
Remove the placeholder company logos (StackSwap, BitCommerce, etc.) from the SocialProof section and replace them with a simple, generic tagline.

## Changes

| File | Change |
|------|--------|
| `src/components/landing/SocialProof.tsx` | Remove the fake logo grid (the `Array.from({ length: 5 })` block) and replace it with a single centered line: **"Built for teams like yours"** styled as a subtle, elegant tagline. Also remove the unused `Bitcoin` import from lucide-react. |

The stats (12,500 BTC, 84,200+ transactions, 1,340+ merchants) and the "Join the Network" CTA button remain unchanged.

