

# Add FAQ Accordion Section to Landing Page

## Overview
Add a new `FAQSection` component below the `PricingSection` on the landing page, using the existing Radix accordion primitives and matching the landing page's animation and styling patterns.

## New File: `src/components/landing/FAQSection.tsx`

A new component containing:

- **Section heading** with the same `motion.div` fade-up pattern used in `FeaturesGrid` and `PricingSection`
- **Title**: "Frequently Asked Questions" with a bitcoin-gradient highlighted word
- **Subtitle**: Brief supporting text

- **Accordion** using the existing `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` from `src/components/ui/accordion.tsx`
  - Type: `"single"`, collapsible
  - Max width constrained (`max-w-2xl mx-auto`) to keep readability
  - Styled with `glass-card` wrapper to match the landing page aesthetic

- **FAQ items** (6 questions):
  1. "What is sBTC and how does it work?" -- Explains sBTC as a 1:1 Bitcoin-backed asset on Stacks
  2. "How fast are payment confirmations?" -- Covers Stacks block times and near-instant settlement
  3. "What are the fees?" -- Reiterates the 0.5% fee, no hidden costs
  4. "Do I need to KYC my customers?" -- Self-custody, no intermediary, merchant responsibility
  5. "How do refunds work?" -- One-click refunds from the dashboard with audit trail
  6. "How do I integrate SatsTerminal?" -- Embed the payment widget, API keys, documentation mention

- Each item wrapped in a `motion.div` with staggered entrance animation

## Modified File: `src/pages/Index.tsx`

- Import `FAQSection`
- Add `<FAQSection />` between `<PricingSection />` and `<SocialProof />`

## Technical Notes
- No new dependencies -- uses existing `@radix-ui/react-accordion` components and `framer-motion`
- Follows the exact same section layout pattern (container, px-6, py-32, centered heading) as the other landing sections
- Accordion items use `border-border/50` styling to match the dark/light theme

