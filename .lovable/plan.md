
# Build Out the Payments Page

Replace the placeholder Payments page with a full transaction history view including summary stats, a volume chart, filters, and a paginated table.

---

## Overview

The page will have three sections stacked vertically:
1. **Summary cards** -- 3 compact stat cards (Total Received, Total Transactions, Avg. Transaction Size)
2. **Payment volume bar chart** -- daily payment volume for the last 7 days
3. **Filterable transaction table** -- all paid/refunded invoices with status and date filters, plus pagination

All data comes from the existing `mockDashboard.ts` -- no new data file needed. We derive "payments" by filtering invoices to those with `status === "paid"` or `status === "refunded"` (transactions that actually moved funds).

---

## Changes

### 1. `src/data/mockDashboard.ts`
- Add a new exported array `paymentVolume` with daily aggregated payment data (7 entries matching the existing revenue date range), used by the bar chart
- Add a helper `formatBtc(sats)` that returns a shortened BTC string (e.g. "0.0025 BTC")

### 2. `src/pages/Payments.tsx` (full rewrite)
Replace the placeholder with a complete page containing:

**Header** -- Title "Payments" with subtitle showing total count

**Summary Cards Row** (3 cards in a responsive grid)
- Total Received (sum of `amountPaidSats` for paid invoices, shown in BTC)
- Transactions (count of paid + refunded invoices)
- Avg. Size (average `amountPaidSats`, shown in sats)

Each card uses the existing `Card` component and a `motion.div` wrapper matching the dashboard animation pattern.

**Payment Volume Chart**
- A `BarChart` (from recharts) inside `ChartContainer` showing daily payment volume
- Uses the bitcoin orange color to match the existing `RevenueChart` style
- Wrapped in `glass-card` with a heading, matching dashboard conventions

**Filters Row**
- **Status filter**: a `Select` dropdown with options: All, Paid, Refunded
- **Date filter**: a date picker `Popover` with `Calendar` for selecting a single date to filter transactions on or after that date
- A "Clear filters" button that resets both filters

**Transaction Table**
- Columns: Transaction ID (invoice id), Customer, Amount (sats), Status, Date, Tx Hash (truncated, shown on md+ screens)
- Uses the existing `Table` components, `InvoiceStatusBadge`, and `formatSats`
- Paginated at 8 rows per page with Previous/Next buttons
- Each row is clickable, navigating to the invoice detail page
- Empty state message when filters return no results

All sections use `motion.div` with staggered delays (0, 0.1, 0.2, 0.3) matching the existing dashboard page animation style.

---

## Technical Details

- **Filtering logic**: `useState` for `statusFilter` ("all" | "paid" | "refunded") and `dateFilter` (Date | undefined). The invoice list is filtered with `useMemo` before pagination.
- **Summary stats**: Computed with `useMemo` from the filtered (or full) paid/refunded invoice set.
- **Components reused**: `Card`, `CardContent`, `CardHeader`, `CardTitle` for stat cards; `Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem` for status filter; `Popover`, `PopoverTrigger`, `PopoverContent`, `Calendar`, `Button` for date picker; `Table` family and `InvoiceStatusBadge` for the table; `ChartContainer`, `ChartTooltip`, `ChartTooltipContent` for the chart.
- **No new dependencies** -- everything uses existing recharts, radix, and framer-motion packages.
- **Date filter** uses `date-fns` `format` and `isAfter`/`isSameDay` for comparison, both already installed.
