

# Smooth Scroll Navigation Links

Wire up the Features, Pricing, and Docs nav links to smoothly scroll to corresponding sections on the landing page.

---

## Changes

### 1. `src/components/landing/Navbar.tsx`
- Update `handleNavClick` to handle anchor links (`#features`, `#pricing`, `#docs`) by calling `document.getElementById(...).scrollIntoView({ behavior: "smooth" })` with an offset for the fixed header
- For anchor links, prevent default and scroll; for route links, continue using `navigate()`

### 2. `src/components/landing/FeaturesGrid.tsx`
- Add `id="features"` to the `<section>` element and `scroll-mt-20` class (to offset for the fixed navbar)

### 3. `src/components/landing/WidgetShowcase.tsx`
- Add `id="docs"` to the `<section>` element and `scroll-mt-20` class
- This section serves as the "Docs" anchor since it showcases the widget/integration documentation

### 4. `src/components/landing/Footer.tsx`
- Add `id="pricing"` to the `<footer>` or a new pricing placeholder section
- Since there is no dedicated Pricing section yet, we will add a minimal pricing teaser section as a new component

### 5. New: `src/components/landing/PricingSection.tsx`
- Simple pricing section with `id="pricing"` and `scroll-mt-20`
- Displays the 0.5% fee highlight with a card layout (Free tier vs Pro tier or similar simple presentation)
- Matches existing dark theme and glass-card styling

### 6. `src/pages/Index.tsx`
- Import and render `<PricingSection />` between `<FeaturesGrid />` and `<SocialProof />`

---

## Technical Details
- Smooth scrolling uses native `scrollIntoView({ behavior: "smooth" })` -- no additional libraries needed
- `scroll-mt-20` (80px) on target sections ensures content is not hidden behind the fixed navbar (h-16 = 64px + 16px buffer)
- The navbar `handleNavClick` checks if `href` starts with `#`, extracts the ID, and scrolls to it; otherwise navigates via React Router

