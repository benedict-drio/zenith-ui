
# Add Contact/Support Section to Landing Page

## Overview
Add a new `ContactSection` component below the FAQ section with a simple contact form (name, email, message) matching the existing landing page styling.

## New File: `src/components/landing/ContactSection.tsx`

- **Section layout**: Same pattern as other sections (`py-32`, `container mx-auto px-6`)
- **Heading**: "Get in Touch" with bitcoin-gradient accent, fade-up `motion.div` animation
- **Subtitle**: Supporting text like "Have a question or need help getting started? Drop us a message."
- **Form** inside a `glass-card` container, `max-w-xl mx-auto`:
  - **Name** field using existing `Input` component
  - **Email** field using existing `Input` component (type="email")
  - **Message** field using existing `Textarea` component
  - **Submit button** using existing `Button` component with primary styling
  - Each field wrapped with `Label` for accessibility
- **Validation** using `zod` schema:
  - Name: required, trimmed, max 100 chars
  - Email: required, valid email format, max 255 chars
  - Message: required, trimmed, max 1000 chars
- **Form handling** with `react-hook-form` and `@hookform/resolvers/zod`
- On submit: show a success toast via `sonner` ("Message sent! We'll get back to you soon.") and reset the form
- **Animation**: staggered entrance for each form field using `framer-motion`
- Add `id="contact"` and `scroll-mt-20` for potential future navbar linking

## Modified File: `src/pages/Index.tsx`

- Import `ContactSection`
- Place `<ContactSection />` between `<FAQSection />` and `<SocialProof />`

## No new dependencies needed
Uses existing: `react-hook-form`, `@hookform/resolvers`, `zod`, `sonner`, `framer-motion`, `Input`, `Textarea`, `Button`, `Label`
