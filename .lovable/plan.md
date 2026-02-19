

# Add Memo/Description to Payments Search

## Overview
Extend the existing search filter on the Payments page to also match against the transaction memo field, so users can find payments by memo text in addition to customer name and invoice ID.

## Changes

### `src/pages/Payments.tsx`

Update the search filter inside the `filtered` useMemo (around line 43) to also check `inv.memo`:

```typescript
list = list.filter((inv) =>
  inv.customer.toLowerCase().includes(q) ||
  inv.id.toLowerCase().includes(q) ||
  (inv.memo && inv.memo.toLowerCase().includes(q))
);
```

Update the search input placeholder to reflect the expanded scope:
```
"Search by customer, ID, or memo..."
```

No new files, dependencies, or additional state needed.

