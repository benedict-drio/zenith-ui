

# Build Out the Refunds Page

## Overview
Replace the current "coming soon" placeholder with a full refund management page featuring summary stats, a searchable/filterable refund history table, and the ability to view linked invoice details.

## Data Layer

Add mock refund data to `src/data/mockDashboard.ts`:

- New `Refund` interface with fields: `id`, `invoiceId`, `customer`, `amountSats`, `reason`, `status` (processed | pending | failed), `createdAt`, `txHash`
- A `refunds` array with 6-8 entries, linking back to existing invoice IDs where possible (e.g., INV-006 which is already "refunded")
- New `RefundStatus` type: `"processed" | "pending" | "failed"`

## Page Structure

Mirrors the Payments page layout for consistency:

```text
[Page Header: icon + title + count]

[3 Summary Cards: Total Refunded | Refund Count | Avg. Refund Size]

[Filters: Search | Status dropdown | Date pickers | Clear | Export CSV]

[Table: Refund ID | Linked Invoice | Customer | Amount | Status | Date | Tx Hash]

[Pagination]
```

## Summary Cards (top row)
- **Total Refunded** -- sum of all refund amounts, displayed in BTC format
- **Refund Count** -- total number of refunds
- **Avg. Refund Size** -- average refund in sats

## Filters
- **Search** -- filters by refund ID, invoice ID, or customer name (with search highlighting reused from Payments)
- **Status dropdown** -- All / Processed / Pending / Failed
- **Date range** -- From/To date pickers
- **Clear filters** button when any filter is active
- **Export CSV** button

## Table Columns
| Column | Details |
|--------|---------|
| Refund ID | Mono font, e.g. `RFD-001` |
| Invoice | Linked invoice ID as a clickable link navigating to `/dashboard/invoices/:id` |
| Customer | Customer name |
| Amount | Right-aligned, mono font, formatted sats |
| Status | Color-coded badge (green for processed, yellow for pending, red for failed) |
| Date | Formatted date |
| Tx Hash | Mono, hidden on mobile |

Clicking a row opens a toast or navigates to the linked invoice detail.

## Pagination
Same pattern as Payments: 8 rows per page, Previous/Next buttons, "Page X of Y" label.

## Status Badges
Add a `RefundStatusBadge` component (inline in the file or as a small component) with three variants:
- **processed**: green dot + green background
- **pending**: yellow/warning dot + yellow background  
- **failed**: red/destructive dot + red background

---

## Technical Details

### Files Changed
1. **`src/data/mockDashboard.ts`** -- add `RefundStatus` type, `Refund` interface, and `refunds` mock array
2. **`src/pages/Refunds.tsx`** -- complete rewrite from placeholder to full refunds page

### Pattern Reuse
- Reuses the same layout pattern as `Payments.tsx`: motion entrance animations, glass-card styling, filter bar, sortable table, pagination
- Reuses `HighlightText` helper (copied inline or extracted to a shared util)
- Reuses `formatSats`, `formatBtc` from mockDashboard
- Reuses existing UI components: Card, Table, Button, Input, Select, Popover, Calendar, Badge

### State Management
- `useState` for search, status filter, date range, sort key/direction, current page
- `useMemo` for filtered/sorted/paginated list and summary stats
- CSV export follows exact same pattern as Payments page

### Dependencies
No new dependencies -- uses only what is already installed.

