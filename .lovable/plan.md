

# Add Refund Button to Payment Detail Modal

## Overview
Add a "Issue Refund" button inside the PaymentDetailDialog for transactions with "paid" status. Clicking it opens the existing RefundDialog.

## Changes

### `src/components/dashboard/PaymentDetailDialog.tsx`

1. **Import** `RefundDialog` from `@/components/dashboard/RefundDialog` and `RotateCcw` icon from `lucide-react`.
2. **Add state**: `const [refundOpen, setRefundOpen] = useState(false);` inside the component.
3. **Add refund button** in the `DialogFooter`, conditionally rendered when `invoice.status === "paid"`:
   - Styled with `variant="outline"` and destructive color accents (matching the InvoiceDetail page pattern)
   - Shows `RotateCcw` icon + "Issue Refund" text
4. **Render `RefundDialog`** at the bottom of the component, passing `refundOpen`, `setRefundOpen`, `invoice.id`, and `invoice.amountSats`.

### Footer Layout (when status is "paid")
```
[Issue Refund]    [View Full Details]    [Close]
```

The refund button uses the same styling as the InvoiceDetail page: `border-destructive/30 text-destructive hover:bg-destructive/10`.

### No new files or dependencies needed
- Reuses existing `RefundDialog` component and `RotateCcw` icon already used in InvoiceDetail.

