

# Phase 4: Merchant Dashboard

Build a full-featured merchant dashboard at `/dashboard` with sidebar navigation, statistics overview, revenue chart, invoices management, invoice creation, and invoice detail/refund flow -- all using mock data and the existing SatsTerminal dark theme.

---

## New Files

### Data & Types
- **`src/data/mockDashboard.ts`** -- All mock data in one file: invoices array (12-15 rows with varied statuses), revenue chart data (last 7 days), stats card values, and TypeScript types (`Invoice`, `InvoiceStatus`, `RevenueDataPoint`).

### Layout
- **`src/components/dashboard/DashboardLayout.tsx`** -- Wraps the sidebar + main content area using `SidebarProvider`. Contains a top header bar with `SidebarTrigger`, page title, and a "Connect Wallet" button. Routes nested dashboard pages through a React Router `<Outlet />`.

- **`src/components/dashboard/DashboardSidebar.tsx`** -- Uses the existing `Sidebar` UI component. Contains:
  - SatsTerminal logo at top
  - Nav items: Dashboard, Invoices (with orange badge showing pending count), Payments, Refunds, Settings
  - Active route highlighting via `NavLink`
  - "Wallet Connected" status pill in footer area
  - Collapses to icon-only mini mode on smaller screens

### Dashboard Overview Page
- **`src/pages/Dashboard.tsx`** -- The main `/dashboard` route. Contains:
  - Welcome header ("Welcome back, CryptoMerch")
  - 4 stats cards in a responsive grid
  - Revenue area chart
  - Recent invoices table (last 5)

- **`src/components/dashboard/StatsCards.tsx`** -- 4 glass-cards showing Total Volume (BTC), Active Invoices, Success Rate (%), and Platform Fee (BTC). Each card has an icon, value (Space Grotesk font), label, and a green/red trend indicator with percentage.

- **`src/components/dashboard/RevenueChart.tsx`** -- Recharts `AreaChart` inside `ChartContainer` with orange gradient fill, dark grid lines, and custom tooltip. Shows last 7 days of revenue.

### Invoices Page
- **`src/pages/Invoices.tsx`** -- The `/dashboard/invoices` route. Contains:
  - Header with "Invoices" title + "Create Invoice" gradient orange button
  - Full invoices data table with columns: Invoice ID, Customer/Memo, Amount (sats), Status, Date, Actions
  - Status badges using color-coded variants: Pending (orange), Partial (yellow), Paid (green), Expired (gray), Cancelled (red), Refunded (blue)
  - Action dropdown per row: View, Copy Link, Refund
  - Simple client-side pagination (10 per page)

- **`src/components/dashboard/InvoiceStatusBadge.tsx`** -- Reusable badge component mapping each `InvoiceStatus` to a styled badge with dot indicator and appropriate color.

- **`src/components/dashboard/CreateInvoiceSheet.tsx`** -- Slide-in sheet panel (uses existing `Sheet` component) with:
  - Large amount input with real-time sats/BTC/USD conversion display
  - Memo and Reference ID text fields
  - Toggle switches: Allow partial payments, Allow overpayment
  - Expiry duration select (15min, 30min, 1hr, 24hr)
  - Cancel (ghost) + Create Invoice (gradient orange) action buttons
  - Loading spinner on submit, success toast via Sonner

### Invoice Detail Page
- **`src/pages/InvoiceDetail.tsx`** -- The `/dashboard/invoices/:id` route. Contains:
  - Back button to invoices list
  - Large amount display with status badge
  - Invoice info grid: Invoice ID, Merchant, Customer/Memo, Reference, Created date, Expiry
  - Payment timeline (vertical stepper showing payment events: Created, Payment Received with amounts, Confirmed)
  - QR code placeholder for sharing
  - Partial payment progress ring (SVG circle with stroke-dashoffset animation)
  - "Issue Refund" button (shown for Paid invoices only)

- **`src/components/dashboard/RefundDialog.tsx`** -- Alert dialog with backdrop blur for refund confirmation. Shows invoice amount, refund amount input, reason field, and Confirm/Cancel buttons. Triggers success toast on confirm.

### Placeholder Pages
- **`src/pages/Payments.tsx`** -- Simple placeholder page at `/dashboard/payments` with an empty state illustration and "Coming soon" message.
- **`src/pages/Refunds.tsx`** -- Placeholder at `/dashboard/refunds`.
- **`src/pages/Settings.tsx`** -- Placeholder at `/dashboard/settings`.

---

## Modified Files

### `src/App.tsx`
- Add dashboard routes as nested routes under `/dashboard`:
  - `/dashboard` -- Dashboard overview
  - `/dashboard/invoices` -- Invoices list
  - `/dashboard/invoices/:id` -- Invoice detail
  - `/dashboard/payments` -- Payments (placeholder)
  - `/dashboard/refunds` -- Refunds (placeholder)
  - `/dashboard/settings` -- Settings (placeholder)
- All dashboard routes wrapped by `DashboardLayout`

### `src/pages/Index.tsx`
- Update "Get Started" CTA links in HeroSection to navigate to `/dashboard`

---

## Technical Details

- **Routing**: Nested routes with `<Outlet />` in `DashboardLayout` so the sidebar persists across all dashboard pages.
- **State management**: All local React state -- no global store needed. Invoice list, creation, and detail use mock data with `useState`.
- **Charts**: Uses existing `ChartContainer` + Recharts `AreaChart` with a custom orange gradient `<defs>` fill.
- **Sidebar**: Uses the existing shadcn `Sidebar` component with `SidebarProvider`, `SidebarTrigger`, `SidebarMenu`, `SidebarMenuItem`, `SidebarMenuButton`, and `NavLink` for active route styling.
- **Sheet for creation**: Uses existing `Sheet`/`SheetContent` component sliding from the right.
- **Refund dialog**: Uses existing `AlertDialog` with `AlertDialogOverlay` styled with `backdrop-blur`.
- **Animations**: Framer Motion `fade-in-up` on page mount for cards and sections. Count-up animation on stats values reusing existing `useCountUp` hook.
- **Responsive**: 1-col on mobile, 2-col on tablet, 4-col stats grid on desktop. Sidebar collapses to sheet on mobile via built-in sidebar behavior.

