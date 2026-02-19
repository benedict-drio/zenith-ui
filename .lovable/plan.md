
# Add Dashboard Page Transition Animations

## Overview
Wrap the `<Outlet />` in `DashboardLayout` with framer-motion's `AnimatePresence` and a `motion.div` keyed to the current route, so each dashboard page fades and slides in subtly on navigation.

## Changes

### `src/components/dashboard/DashboardLayout.tsx`
- Import `useLocation` from `react-router-dom`
- Import `AnimatePresence` and `motion` from `framer-motion`
- Get the current `location` via `useLocation()`
- Wrap `<Outlet />` with `<AnimatePresence mode="wait">` and a `<motion.div>` keyed by `location.pathname`
- Animation values:
  - **initial**: `opacity: 0, y: 8`
  - **animate**: `opacity: 1, y: 0`
  - **exit**: `opacity: 0, y: -8`
  - **transition**: `duration: 0.2, ease: "easeInOut"`

This keeps the effect subtle (small vertical shift + fade) and fast (200ms). The `mode="wait"` ensures the exiting page completes before the entering page animates in, preventing layout overlap.

No other files need changes -- each dashboard page already has its own `motion.div` wrappers for internal stagger animations, which will layer naturally on top of this page-level transition.
