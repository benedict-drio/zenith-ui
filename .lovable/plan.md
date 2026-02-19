

# SatsTerminal — Bitcoin Payment Infrastructure Frontend

An enterprise-grade sBTC payment widget and merchant dashboard with a dark, Bitcoin-native aesthetic featuring Satoshi Orange accents, premium animations, and world-class UX.

---

## Phase 1: Design System & Foundation

### Custom Theme & Typography
- Dark theme with Carbon Black surfaces and Satoshi Orange (`#F97316`) accent palette
- Three font families: Inter (body), Space Grotesk (display/amounts), JetBrains Mono (addresses/code)
- Full color system: orange primary, success green, warning yellow, error red, info blue
- Custom gradients: `gradient-bitcoin`, `gradient-dark-glow`, `gradient-card`
- Shadow & elevation system optimized for dark UI

### Signature Animations
- Bitcoin pulse animation for pending states (orange glow)
- SVG checkmark draw animation for success states
- Count-up number animation for amounts
- Shimmer loading skeletons
- Micro-interactions: hover lifts, focus glows, spring-physics toggles
- Page transition animations with fade + scale

---

## Phase 2: Landing Page

### Hero Section
- Large headline: "Accept Bitcoin Payments in Seconds, Not Hours"
- Subtext explaining sBTC on Stacks value proposition
- Two CTAs: "Get Started" (gradient orange) and "View Demo" (ghost)
- Live interactive payment widget demo on the right side
- Subtle floating animation on hero elements with dark radial glow background

### Features Grid
- 6 feature cards with icons: Instant Settlements, Secure Self-Custody, Low Fees (0.5%), Partial Payments, Built-in Refunds, Analytics Dashboard
- Cards with glassmorphism effect, hover lift animations

### Social Proof Section
- "Trusted by Businesses on Stacks" with placeholder logos
- Live stats counters (total volume, transactions, merchants) with count-up animation

### Footer
- Navigation links, social links, "Powered by Stacks" branding

---

## Phase 3: Payment Widget (Embeddable Component)

### Compact Mode
- Merchant logo + name header
- Large amount display (Space Grotesk, tabular numbers) with sats/BTC/USD toggle
- Memo/order reference line
- "Pay with sBTC" gradient orange CTA button
- "Powered by SatsTerminal" footer

### Expanded Payment Mode
- QR code display with styled frame
- Stacks address with truncation, copy button, and explorer link
- Countdown timer for invoice expiry
- "Connect Wallet & Pay" alternative button

### Payment Processing State
- 3-step progress stepper: Sent → Confirming → Done
- Animated spinner with pulsing orange glow
- Transaction hash display (truncated, linkable)
- Confirmation counter (2/6 confirms) with filling dots

### Payment Success State
- Animated checkmark (SVG path draw)
- Success glow pulse effect
- Amount received + invoice details
- "View on Explorer" link + "Done" button

---

## Phase 4: Merchant Dashboard

### Sidebar Navigation
- SatsTerminal logo + merchant switcher
- Nav items: Dashboard, Invoices (with badge count), Payments, Refunds, Settings
- Wallet connect status in footer
- Collapsible on tablet, bottom nav on mobile

### Dashboard Overview
- Welcome header with merchant name
- 4 stats cards: Total Volume, Active Invoices, Success Rate, Platform Fee
- Trend indicators with percentage change
- Revenue chart (area chart with orange gradient fill)
- Recent invoices table with status badges

### Invoice Management
- Data table: Invoice ID, Customer/Memo, Amount, Status, Date
- Sortable columns, pagination
- Status badges: Pending (orange), Partial (yellow), Paid (green), Expired (gray), Cancelled (red), Refunded (blue)
- Quick actions: View, Copy link, Refund

### Invoice Creation
- Slide-in form panel
- Large amount input with real-time sats/BTC/USD conversion
- Memo and Reference ID fields
- Toggle options: Allow partial payments, Allow overpayment
- Expiry duration selector
- Cancel (ghost) + Create Invoice (gradient orange) buttons
- Loading state on submit, success toast on completion

### Invoice Detail View
- Full invoice information with large amount display
- Payment history timeline
- QR code for sharing
- Refund action (with confirmation dialog + backdrop blur)
- Partial payment progress ring (SVG animated)

---

## Phase 5: Settings & Polish

### Settings Page
- Merchant profile configuration
- Payment preferences (default expiry, partial payments toggle)
- Notification preferences
- API keys display (masked, copyable)

### Responsive Design
- Mobile: Full-screen payment modal, bottom navigation, FAB for new invoice, swipe gestures
- Tablet: Two-column layout, collapsible sidebar
- Desktop: Full sidebar, multi-panel layouts

### Toast Notifications
- Slide-in from bottom-right, stack up to 3
- Auto-dismiss with progress bar (5s)
- Variants: success (green), warning (orange), error (red), info (blue)

### Empty States & Error Handling
- Illustrated empty states for no invoices, no payments
- Input validation with shake animation + red borders
- Transaction error states with retry options

---

## Technical Notes
- All pages are frontend-only with mock/demo data (no backend integration)
- Uses React + TypeScript + Tailwind CSS
- Recharts for dashboard charts
- Lucide icons throughout
- All amounts formatted with comma separators and unit toggles
- Keyboard accessible with visible focus states (orange outline)

