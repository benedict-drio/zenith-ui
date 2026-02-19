
# Enterprise-Grade UI/UX Polish -- Audit and Remediation Plan

## Current Quality Assessment

The application is already strong: consistent design tokens, glass-card design language, responsive layouts, accessibility (skip links, focus outlines, ARIA labels, reduced motion), mobile bottom nav, and well-structured components. However, a true enterprise-grade product requires attention to the following gaps.

---

## Issues Found and Proposed Fixes

### 1. Loading and Error States Are Missing

Currently, every page renders instantly from mock data with no loading skeletons, error boundaries, or empty states with illustrations. An enterprise app must gracefully handle all three states.

**Fix:**
- Add a reusable `<Skeleton>` loading pattern to `StatsCards`, `RevenueChart`, and all table views (Dashboard, Invoices, Payments, Refunds) using the existing `skeleton.tsx` component
- Wrap the `DashboardLayout` outlet in a React Error Boundary component that catches render errors and shows a branded error screen with a "Try Again" button
- Add illustrated empty states (SVG + text) to all table views when filtered results return zero rows, replacing the plain text "No transactions match"

### 2. 404 Page Is Unstyled and Off-Brand

The `NotFound.tsx` page uses a generic `bg-muted` layout with no brand identity, no illustration, and no navigation back to the dashboard.

**Fix:**
- Redesign `NotFound.tsx` with the gradient-dark-glow background, an SVG illustration, the SatsTerminal branding, and links to both `/` and `/dashboard`

### 3. Tables Lack Row-Level Keyboard Navigation

While focus outlines and ARIA labels are in place, the data tables (Invoices, Payments, Refunds) have clickable rows but no keyboard interaction -- users cannot Tab into individual rows or press Enter to open them.

**Fix:**
- Add `tabIndex={0}`, `role="link"`, `onKeyDown` (Enter/Space to navigate), and proper `aria-label` to each `TableRow` that is clickable

### 4. Dropdown Menu Buttons Missing ARIA Labels

The "more actions" button (`MoreHorizontal` icon) on each invoice row in `Invoices.tsx` has no `aria-label`.

**Fix:**
- Add `aria-label="Actions for invoice {inv.id}"` to the trigger button

### 5. No Breadcrumb Navigation in Detail Pages

`InvoiceDetail.tsx` uses a custom "Back to Invoices" button but lacks structured breadcrumb navigation that enterprises expect for wayfinding.

**Fix:**
- Add a `<Breadcrumb>` component (already available via shadcn) to `InvoiceDetail.tsx` showing Dashboard > Invoices > INV-001

### 6. Form Validation Is Incomplete

`CreateInvoiceSheet.tsx` has no form validation -- it only checks `!satsNum`. No max amount validation, no character limits, no error messages shown inline.

**Fix:**
- Add Zod schema validation (like the Contact form already uses) with proper error messages for amount (min/max), memo (max length), and reference (max length)
- Show inline error text below each field

### 7. Charts Have Hardcoded Dark-Theme Colors

`RevenueChart.tsx` uses hardcoded `hsl(220 16% 14%)` for grid lines, which breaks in light mode (dark grid on light background).

**Fix:**
- Replace hardcoded HSL values with `hsl(var(--border))` and `hsl(var(--muted-foreground))` CSS variables so charts adapt to both themes

### 8. Progress Ring in InvoiceDetail Has Hardcoded Colors

The SVG circle in `InvoiceDetail.tsx` uses `hsl(220 16% 14%)` for the background track, which is invisible in light mode.

**Fix:**
- Use `hsl(var(--border))` for the track and `hsl(var(--primary))` for the fill (which is already correct)

### 9. Missing Page Titles (document.title)

No page sets `document.title`, so the browser tab always shows the generic HTML title. Enterprise apps need per-page titles for usability and SEO.

**Fix:**
- Add a `useDocumentTitle` hook and apply it in every page: "Dashboard | SatsTerminal", "Invoices | SatsTerminal", etc.

### 10. Notification Items Are Not Keyboard-Accessible

Notification items in `NotificationDropdown.tsx` use `<div onClick>` instead of buttons, making them inaccessible via keyboard.

**Fix:**
- Convert notification items to `<button>` elements with proper roles

### 11. Pricing Section Has No CTA Buttons

The pricing cards show features but have no "Get Started" or "Contact Sales" buttons -- a critical enterprise conversion gap.

**Fix:**
- Add a CTA button to each pricing card ("Start Free" for Starter, "Get Started" for Pro)

### 12. Footer Links Are All Dead (`href="#"`)

Every footer link points to `#` with no functionality.

**Fix:**
- Link Product and Developer items to appropriate sections or routes (e.g., "Dashboard" to `/dashboard`, "Pricing" to `/#pricing`)
- Use `react-router-dom` `Link` for internal routes

---

## Technical Details

### Files to Create
- `src/components/dashboard/ErrorBoundary.tsx` -- React error boundary for the dashboard
- `src/components/dashboard/TableEmptyState.tsx` -- Reusable illustrated empty state for tables
- `src/hooks/useDocumentTitle.ts` -- Custom hook for setting page titles

### Files to Modify
- `src/pages/NotFound.tsx` -- Full redesign with branding
- `src/pages/Dashboard.tsx` -- Add document title, loading skeleton pattern
- `src/pages/Invoices.tsx` -- Add document title, keyboard-accessible rows, ARIA on action buttons, empty state
- `src/pages/Payments.tsx` -- Add document title, keyboard-accessible rows, empty state
- `src/pages/Refunds.tsx` -- Add document title, keyboard-accessible rows, empty state
- `src/pages/InvoiceDetail.tsx` -- Add document title, breadcrumbs, fix hardcoded SVG colors
- `src/pages/Settings.tsx` -- Add document title
- `src/pages/Index.tsx` -- Add document title
- `src/pages/PaymentDemo.tsx` -- Add document title
- `src/components/dashboard/CreateInvoiceSheet.tsx` -- Add Zod validation with inline errors
- `src/components/dashboard/RevenueChart.tsx` -- Replace hardcoded colors with CSS variables
- `src/components/dashboard/NotificationDropdown.tsx` -- Convert div items to buttons
- `src/components/dashboard/DashboardLayout.tsx` -- Wrap outlet in ErrorBoundary
- `src/components/landing/PricingSection.tsx` -- Add CTA buttons
- `src/components/landing/Footer.tsx` -- Fix dead links with real routes

### Dependencies
No new dependencies needed. Uses existing `@/components/ui/breadcrumb`, `@/components/ui/skeleton`, `zod`, `react-hook-form`, and `@hookform/resolvers` already installed.

### Priority Order
1. Chart/SVG color fixes (visual bugs in light mode)
2. Form validation on CreateInvoiceSheet
3. Keyboard-accessible table rows and notification items
4. Document titles
5. Error boundary + empty states + loading skeletons
6. 404 page redesign
7. Breadcrumbs on InvoiceDetail
8. Pricing CTAs + footer link fixes
