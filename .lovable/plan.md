

# Gate Dashboard Behind Wallet Connection + Wire "View Demo"

## Overview
Two changes: (1) The "Get Started" button in the hero should only navigate to the dashboard if the wallet is connected -- otherwise it triggers wallet connection first. (2) The "View Demo" button should scroll down to the WidgetShowcase section (or navigate to `/pay`) so it actually does something.

## Changes

### 1. HeroSection -- Gate "Get Started" behind wallet (`src/components/landing/HeroSection.tsx`)
- Import `useWallet` from the wallet context
- When "Get Started" is clicked:
  - If wallet is connected: navigate to `/dashboard`
  - If wallet is not connected: call `connect()`, then navigate to `/dashboard` after connection completes (or show a toast prompting to connect first)
- Update "View Demo" button to scroll to the `#widget-showcase` section on the page (smooth scroll), giving it real functionality

### 2. Dashboard route protection (`src/App.tsx` or new component)
- Create a small `<ProtectedRoute>` wrapper component that checks `useWallet().isConnected`
- If not connected, redirect to `/` (home) with a toast message like "Please connect your wallet first"
- Wrap the `/dashboard` route's element with this guard so users can't access the dashboard directly via URL without connecting

### 3. Add id to WidgetShowcase section (`src/components/landing/WidgetShowcase.tsx`)
- Add `id="widget-showcase"` to the section element so "View Demo" can scroll to it

## Technical Details
- The `ProtectedRoute` component will use `useWallet()` and `Navigate` from react-router-dom to redirect
- "Get Started" click flow: if disconnected, call `connect()` -- since connect is async (mock 800ms delay), we can either navigate after connection or simply prompt the user to connect first and let them click again
- Simpler approach chosen: if not connected, trigger `connect()` and show a toast "Connecting wallet..." -- once connected the user clicks again. The dashboard route guard ensures they can't bypass it.

