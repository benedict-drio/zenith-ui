

# Mobile UX Improvements

## Overview
Add three mobile-specific enhancements to the dashboard: a fixed bottom navigation bar (replacing the sidebar on small screens), a floating action button (FAB) for creating new invoices, and improved touch targets throughout.

## Changes

### 1. New Component: `src/components/dashboard/MobileBottomNav.tsx`

A fixed bottom navigation bar visible only on mobile (below `md` breakpoint):

- Renders 5 icon buttons in a row: Dashboard, Invoices, Payments, Refunds, Settings
- Uses the same `navItems` data (icons + routes) from the sidebar
- Active route gets highlighted with the primary color
- Shows the pending invoice badge on the Invoices icon
- Fixed to the bottom of the screen with a frosted glass background (`bg-background/80 backdrop-blur-sm`)
- Safe-area padding at the bottom for notched devices (`pb-[env(safe-area-inset-bottom)]`)
- Each tap target is at least 44x44px for comfortable touch interaction
- Hidden on `md:` and larger screens

### 2. New Component: `src/components/dashboard/FloatingActionButton.tsx`

A circular FAB in the bottom-right corner (above the bottom nav on mobile):

- Shows a `+` icon; on tap opens the `CreateInvoiceSheet`
- Gradient-bitcoin background, 56x56px with a drop shadow
- Positioned `fixed bottom-20 right-4` on mobile (above bottom nav), `bottom-6 right-6` on desktop
- Only visible on Invoices-related pages and Dashboard (or always visible -- simpler)
- Uses `framer-motion` for a scale-in entrance animation

### 3. Modified: `src/components/dashboard/DashboardLayout.tsx`

- Import and render `MobileBottomNav` below the `<main>` content area
- Add bottom padding to `<main>` on mobile (`pb-20 md:pb-0`) so content isn't hidden behind the bottom nav
- Hide the `SidebarTrigger` on mobile since the bottom nav replaces sidebar navigation
- Render the `FloatingActionButton`

### 4. Modified: `src/components/dashboard/DashboardSidebar.tsx`

- Add `className="hidden md:flex"` to the `<Sidebar>` wrapper so it's completely hidden on mobile (the bottom nav takes over)

### 5. Touch Target Improvements

In `DashboardLayout.tsx` header:
- Increase header button sizes on mobile: ensure all icon buttons (ThemeToggle, NotificationDropdown, Wallet) have `min-h-[44px] min-w-[44px]` for touch compliance

---

## Technical Details

### New Files
- `src/components/dashboard/MobileBottomNav.tsx`
- `src/components/dashboard/FloatingActionButton.tsx`

### Modified Files
- `src/components/dashboard/DashboardLayout.tsx` -- add bottom nav, FAB, bottom padding, hide sidebar trigger on mobile
- `src/components/dashboard/DashboardSidebar.tsx` -- hide on mobile via className

### Dependencies
No new dependencies. Uses `useIsMobile` hook, `react-router-dom` `useLocation` and `NavLink`, `lucide-react` icons, `framer-motion`, and `CreateInvoiceSheet` (already exists).

### Key Patterns
- Bottom nav uses `useLocation()` to determine active route and applies active styling
- FAB manages its own `useState` for the `CreateInvoiceSheet` open state
- All touch targets are minimum 44x44px per Apple/Google HIG guidelines
- Bottom nav includes `safe-area-inset-bottom` for iPhone notch/home indicator support
