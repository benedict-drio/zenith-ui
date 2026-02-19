

# Add Keyboard Shortcut Hint in Modal Footer

## Overview
Add a subtle hint text "Press R to refund" in the `DialogFooter` of `PaymentDetailDialog`, visible only for paid transactions.

## Changes

### `src/components/dashboard/PaymentDetailDialog.tsx`

Add a small muted hint next to the "Issue Refund" button inside the conditional `invoice.status === "paid"` block in the footer:

```
<span className="text-xs text-muted-foreground hidden sm:inline">Press R to refund</span>
```

This sits between the "Issue Refund" button and the right-side buttons, using `mr-auto` on a wrapper to keep it left-aligned with the refund button. Hidden on mobile (`hidden sm:inline`) to avoid cluttering small screens.

### Footer Layout (paid transactions)
```
[Issue Refund]  Press R to refund          [View Full Details]  [Close]
```

### No new files or dependencies needed.

