

# Accessibility Improvements

## Overview
Add four accessibility enhancements across the application: skip navigation links, visible focus outlines on all interactive elements, ARIA labels on icon-only buttons, and reduced motion support for users who prefer it.

## Changes

### 1. Skip Link -- `src/index.css` + Layout files

Add a visually-hidden "Skip to main content" link that becomes visible on focus, allowing keyboard users to bypass navigation.

- Add a `.skip-link` CSS class: visually hidden by default, slides into view on `:focus` with a high z-index
- Add the skip link in both `DashboardLayout.tsx` (dashboard pages) and `Index.tsx` (landing page)
- The `<main>` element in `DashboardLayout.tsx` gets `id="main-content"`; the landing page's wrapper div gets the same ID

### 2. Focus Outlines -- `src/index.css`

Add a global focus-visible style using a 2px orange (`hsl(25 95% 53%)`) outline on all interactive elements:

- Target `a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])` with `:focus-visible`
- Apply `outline: 2px solid hsl(25 95% 53%); outline-offset: 2px;`
- Override the existing `ring` styles from shadcn/ui button variants to use the orange ring instead, or layer it so both work together
- Only shows on keyboard navigation (`:focus-visible`), not mouse clicks

### 3. ARIA Labels -- Multiple component files

Add `aria-label` attributes to every icon-only button that currently lacks one:

| File | Element | Label |
|------|---------|-------|
| `NotificationDropdown.tsx` | Bell button | "Notifications" |
| `DashboardLayout.tsx` | Wallet button (mobile, icon-only) | "Connect Wallet" |
| `Navbar.tsx` | Mobile menu toggle | "Open menu" / "Close menu" |
| `Navbar.tsx` | Logo button | "SatsTerminal home" |
| `DashboardSidebar.tsx` | Logo NavLink | "SatsTerminal dashboard" |
| `MobileBottomNav.tsx` | Already has `aria-label` -- no change needed |
| `FloatingActionButton.tsx` | Already has `aria-label` -- no change needed |
| `ThemeToggle.tsx` | Already has `aria-label` -- no change needed |

### 4. Reduced Motion -- `src/index.css` + Component updates

Respect `prefers-reduced-motion: reduce` for users who have it enabled:

- Add a `@media (prefers-reduced-motion: reduce)` block in `index.css` that disables all custom animations (bitcoin-pulse, shimmer, float, draw-check, glow-pulse) by setting `animation: none !important` and `transition-duration: 0.01ms !important`
- In `DashboardLayout.tsx`, use framer-motion's `useReducedMotion()` hook to conditionally skip page transition animations (set `initial`/`animate`/`exit` to empty objects)
- In `FloatingActionButton.tsx`, skip the scale-in spring animation when reduced motion is preferred

---

## Technical Details

### Files Modified
1. **`src/index.css`** -- add skip-link styles, global focus-visible outlines, and `prefers-reduced-motion` media query
2. **`src/components/dashboard/DashboardLayout.tsx`** -- add skip link, `id="main-content"` on main, reduced motion for page transitions
3. **`src/pages/Index.tsx`** -- add skip link and `id="main-content"` on wrapper
4. **`src/components/landing/Navbar.tsx`** -- add aria-labels to logo and mobile menu toggle
5. **`src/components/dashboard/NotificationDropdown.tsx`** -- add `aria-label="Notifications"` to bell button
6. **`src/components/dashboard/DashboardSidebar.tsx`** -- add `aria-label` to logo link
7. **`src/components/dashboard/FloatingActionButton.tsx`** -- respect reduced motion for spring animation

### Dependencies
No new dependencies. `framer-motion` already provides `useReducedMotion()`.

### Key Patterns
- Focus outlines use `:focus-visible` (not `:focus`) so they only appear during keyboard navigation
- The orange color matches the brand primary (`hsl(25 95% 53%)`) for visual consistency
- Skip link follows WCAG best practice: first focusable element in DOM, jumps to `#main-content`
- Reduced motion uses both CSS (`prefers-reduced-motion`) and JS (`useReducedMotion`) to cover all animation types
