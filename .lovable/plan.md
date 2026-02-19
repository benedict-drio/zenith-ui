

# Phase 3: Embeddable Payment Widget — All 4 States

Build a full-featured, standalone payment widget page (`/pay`) with four interactive states that users can click through, plus a dedicated showcase on the landing page.

---

## New Files

### 1. `src/components/payment/PaymentWidget.tsx` — Main Widget Container
- State machine managing 4 states: `compact` | `expanded` | `processing` | `success`
- Shared header (merchant logo, name, invoice number) and footer ("Powered by SatsTerminal")
- Shared amount display with sats/BTC/USD toggle (reuses existing pattern from PaymentWidgetDemo)
- AnimatePresence wrapping each state panel for smooth transitions

### 2. `src/components/payment/CompactState.tsx`
- Large amount display with Space Grotesk font and unit toggle pills
- Memo/order reference line
- "Pay with sBTC" gradient orange CTA that transitions to expanded state

### 3. `src/components/payment/ExpandedState.tsx`
- Styled QR code placeholder (CSS-drawn grid pattern inside an orange-bordered frame)
- Stacks address with truncation + copy button + "View on Explorer" link
- Countdown timer (mock, starts at 14:59, ticks down every second using useEffect)
- "Connect Wallet & Pay" CTA button that transitions to processing state
- "Back" text button to return to compact

### 4. `src/components/payment/ProcessingState.tsx`
- 3-step horizontal progress stepper: Sent -> Confirming -> Done
  - Each step: numbered circle + label, connected by lines
  - Active step gets orange fill + bitcoin-pulse animation
  - Completed steps get green checkmark
- Animated spinner ring with pulsing orange glow (CSS animation)
- Transaction hash display (truncated, monospace) with copy button
- Confirmation counter "2 of 6 confirmations" with 6 dots that fill in sequentially
- Auto-advances to success state after ~4 seconds (simulated)

### 5. `src/components/payment/SuccessState.tsx`
- Large animated SVG checkmark using the existing `animate-draw-check` utility
- Green success glow pulse ring behind the checkmark
- "Payment Complete" heading with amount received
- Invoice details summary (Invoice #, merchant, date)
- "View on Explorer" outlined button + "Done" gradient orange button
- Confetti-like particle burst on mount (small orange/green dots using framer-motion)

### 6. `src/pages/PaymentDemo.tsx` — Standalone Demo Page
- Centered layout with dark radial glow background
- Renders `<PaymentWidget />` at full interactive capacity
- Users can click through all 4 states in sequence
- "Reset" button to start over

---

## Modified Files

### 7. `src/App.tsx`
- Add route: `/pay` pointing to `PaymentDemo` page

### 8. `src/pages/Index.tsx`
- Add a new "Payment Widget Showcase" section between SocialProof and Footer
- Shows the widget in a browser-frame mockup with a "Try the Demo" link to `/pay`

---

## Technical Details

- **State machine**: Simple useState with type `"compact" | "expanded" | "processing" | "success"`
- **Timer**: useEffect with setInterval for the countdown in expanded state, cleared on unmount
- **Auto-advance**: useEffect with setTimeout in processing state to simulate confirmation progression
- **Animations**: Framer Motion for state transitions, CSS keyframes for pulse/draw-check/glow
- **No external QR library**: QR code rendered as a styled placeholder grid (pure CSS) to avoid adding dependencies
- **All mock data**: hardcoded invoice amounts, addresses, and transaction hashes

