

# Navbar: Connect Wallet + Home Link + Disconnect

## Overview
Replace the "Get Started" CTA in the landing Navbar with a "Connect Wallet" button (with mock connect/disconnect state), and add a way to navigate home from the dashboard.

## Changes

### 1. Create a shared wallet context (`src/contexts/WalletContext.tsx`)
- A simple React context with `isConnected`, `connect()`, `disconnect()`, and a mock truncated address (e.g., `SP2J...X4WD`)
- This lets both the landing Navbar and Dashboard header share wallet state

### 2. Update Landing Navbar (`src/components/landing/Navbar.tsx`)
- Replace "Get Started" button (desktop + mobile) with a **Connect Wallet** / **Disconnect** button
- When disconnected: show `Wallet` icon + "Connect Wallet" with the gradient-bitcoin style
- When connected: show truncated address + a disconnect option (dropdown or click to disconnect)
- The SatsTerminal logo already navigates to `/` -- no change needed there

### 3. Update Dashboard header (`src/components/dashboard/DashboardLayout.tsx`)
- Wire the existing "Connect Wallet" button to the shared wallet context
- When connected: show truncated address + disconnect option
- Add a **Home** icon/button in the header left side to navigate back to `/`

### 4. Update Dashboard sidebar (`src/components/dashboard/DashboardSidebar.tsx`)
- Wire the footer "Wallet Connected" indicator to the shared context so it reflects actual state
- Make the SatsTerminal logo link to `/` (home) instead of `/dashboard`

### 5. Wire context in App (`src/App.tsx`)
- Wrap the app with `<WalletProvider>`

## Technical Details
- Wallet state is mock/local only (no real blockchain integration) -- just `useState` in the context
- The connect action simulates a brief delay then sets connected with a fake address
- Disconnect resets state immediately
- Connected state shows a dropdown (using Radix DropdownMenu) with the address and a "Disconnect" option

