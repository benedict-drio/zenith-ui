
# Add Transaction Detail Modal to Payments Page

## Overview
Replace the row-click navigation (`navigate("/dashboard/invoices/{id}")`) with an inline Dialog modal that shows full payment details without leaving the Payments page.

## Changes

### New file: `src/components/dashboard/PaymentDetailDialog.tsx`

A reusable dialog component that receives an `Invoice` object and displays:

- **Header**: Amount in sats + BTC conversion, status badge
- **Details grid**: Invoice ID, Customer, Memo, Reference, Created date, Expires date, Tx Hash (as a link)
- **Payment timeline**: The event timeline from the invoice data (same as InvoiceDetail page)
- **Footer**: "View Full Details" link to the invoice detail page, and a close button

Uses existing `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle` from `src/components/ui/dialog.tsx`, plus `InvoiceStatusBadge`, `formatSats`, `satsToBtc`.

### Modified file: `src/pages/Payments.tsx`

1. **Add state**: `const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);`
2. **Update row click**: Replace `onClick={() => navigate(...)}` with `onClick={() => setSelectedInvoice(inv)}`
3. **Render dialog**: Add `<PaymentDetailDialog invoice={selectedInvoice} open={!!selectedInvoice} onOpenChange={(open) => !open && setSelectedInvoice(null)} />` at the bottom of the component
4. **Import**: Add `PaymentDetailDialog` and `Invoice` type imports

### Dialog Layout

```
+------------------------------------------+
|  250,000 sats              [Paid] badge  |
|  B 0.00250000                            |
+------------------------------------------+
|  Invoice ID      INV-001                 |
|  Customer        CryptoShop Pro          |
|  Memo            Premium plan sub...     |
|  Reference       REF-20250219-001        |
|  Created         Feb 19, 2025 10:30 AM   |
|  Expires         Feb 19, 2025 11:30 AM   |
|  Tx Hash         0x8a3f...c4e2  [link]   |
+------------------------------------------+
|  Payment Timeline                        |
|  o Invoice Created        10:30 AM       |
|  |                                       |
|  o Payment Received       10:42 AM       |
|  |  250,000 sats                         |
|  o Confirmed              10:55 AM       |
|     6/6 confirmations                    |
+------------------------------------------+
|  [View Full Details]           [Close]   |
+------------------------------------------+
```

### Technical Details

- The dialog uses `max-w-lg` width with `max-h-[80vh] overflow-y-auto` for scrollability
- Reuses existing UI components: `Dialog`, `InvoiceStatusBadge`, `Separator`
- The "View Full Details" button navigates to `/dashboard/invoices/{id}` for users who want the full page view
- No new dependencies required
