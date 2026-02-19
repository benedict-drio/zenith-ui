

# Add More Keyboard Shortcuts to Payment Detail Modal

## Overview
Extend the existing keyboard shortcut system with "V" to navigate to the full invoice detail page, and add a visual hint bar in the footer showing all available shortcuts.

## Changes

### `src/components/dashboard/PaymentDetailDialog.tsx`

**1. Extend the `useEffect` handler to support "V":**
- Add a check for `e.key.toLowerCase() === "v"` that closes the dialog and navigates to `/dashboard/invoices/{id}`.

```text
Updated handler logic:
  if key === "r" and status === "paid" -> open refund
  if key === "v" -> close dialog, navigate to detail page
```

**2. Update the footer hint text:**
- Replace the single "Press R to refund" hint with a combined shortcut bar showing all available shortcuts.
- For paid invoices: `R Refund · V Details · Esc Close`
- For non-paid invoices: `V Details · Esc Close`
- Styled with `text-xs text-muted-foreground`, hidden on mobile via `hidden sm:inline`.
- Each shortcut key letter wrapped in a `<kbd>` style (e.g., a slightly bordered/bg span) for visual clarity.

### Footer Layout

For paid transactions:
```
[Issue Refund]   R Refund · V Details · Esc Close     [View Full Details] [Close]
```

For other statuses:
```
V Details · Esc Close                                  [View Full Details] [Close]
```

### No new files or dependencies needed.

