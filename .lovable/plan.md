

# Add Keyboard Shortcuts to Payment Detail Modal

## Overview
Add keyboard shortcuts to the PaymentDetailDialog: Escape to close (already handled by Radix Dialog) and "R" to open the refund dialog for paid invoices.

## Changes

### `src/components/dashboard/PaymentDetailDialog.tsx`

1. **Add `useEffect`** import from React.
2. **Add a `useEffect` hook** that listens for `keydown` events when the dialog is open:
   - **"r" or "R" key**: If `invoice.status === "paid"` and no input/textarea is focused, call `setRefundOpen(true)`.
   - **Escape** is already handled natively by the Radix Dialog primitive, so no additional code is needed for that.
   - The effect depends on `open`, `invoice`, and `refundOpen` -- only attaches the listener when the dialog is open and the refund dialog is not already open.
   - Includes a guard to skip the shortcut if the active element is an input or textarea (to avoid triggering while typing in the refund dialog).

### Technical Details

```text
useEffect logic:
  if (!open || refundOpen) return;   // only listen when detail modal is open and refund isn't

  handler(e):
    if activeElement is input/textarea -> return
    if e.key === "r" or "R" and invoice.status === "paid" -> setRefundOpen(true)

  addEventListener("keydown", handler)
  return () => removeEventListener("keydown", handler)
```

### No new files or dependencies needed
- Uses built-in `useEffect` and DOM `addEventListener`.

