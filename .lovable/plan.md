

# Add SVG Illustrations to Table Empty States

## Overview

Replace the current icon-in-a-box empty state with contextual SVG illustrations for each table (Invoices, Payments, Refunds). Each illustration will be inline SVG, themed with CSS variables so it adapts to light and dark modes.

## What Changes

### 1. Upgrade `TableEmptyState.tsx`

Add an optional `variant` prop that selects a contextual SVG illustration:

- **`search`** (default): A magnifying glass with dashed circle -- used when filters return no results
- **`invoices`**: A document/receipt icon with a lightning bolt -- for empty invoice tables
- **`payments`**: A wallet/arrows icon -- for empty payment tables
- **`refunds`**: A circular arrow with a coin -- for empty refund tables

Each SVG will be ~80x80px, use `stroke="currentColor"` with `text-muted-foreground` and accent elements in `text-primary/40` (the orange brand color at low opacity), giving them a polished, branded feel without being heavy.

The component will also accept a `children` slot for an optional action button (e.g., "Clear filters").

### 2. Update Table Pages

- **Invoices.tsx**: Add an empty state check (currently missing) for when `pageInvoices` is empty, using variant `invoices`
- **Payments.tsx**: Switch from `TableEmptyState` with no variant to `variant="payments"`
- **Refunds.tsx**: Switch to `variant="refunds"`

## Technical Details

### Files Modified

| File | Change |
|------|--------|
| `src/components/dashboard/TableEmptyState.tsx` | Add `variant` prop, 4 inline SVG illustrations, optional `children` slot |
| `src/pages/Invoices.tsx` | Add empty state row when no invoices match, import `TableEmptyState` |
| `src/pages/Payments.tsx` | Add `variant="payments"` to existing `TableEmptyState` |
| `src/pages/Refunds.tsx` | Add `variant="refunds"` to existing `TableEmptyState` |

### SVG Design Approach

- All SVGs are inline (no external files), ~15-20 lines each
- Colors use Tailwind classes (`text-muted-foreground`, `text-primary`) so they adapt to both themes automatically
- Subtle animation: a gentle `opacity` pulse on accent elements using Tailwind's `animate-pulse` at reduced intensity
- No new dependencies required
