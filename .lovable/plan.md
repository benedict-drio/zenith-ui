

# Add Date Range Filter to Payments Page

## Overview
Replace the single date picker with a date range filter (From / To) so users can filter transactions between two dates.

## Changes

### `src/pages/Payments.tsx`

1. **Update state**: Replace `dateFilter` (single `Date | undefined`) with two states:
   ```typescript
   const [dateFrom, setDateFrom] = useState<Date | undefined>();
   const [dateTo, setDateTo] = useState<Date | undefined>();
   ```

2. **Update filter logic** in the `filtered` useMemo: Instead of checking `isSameDay || isAfter`, check that the transaction date falls within the range:
   - If only `dateFrom` is set, show transactions on or after that date
   - If only `dateTo` is set, show transactions on or before that date
   - If both are set, show transactions within the range (inclusive)

3. **Update UI**: Replace the single date picker button/popover with two side-by-side date pickers:
   - "From" date picker with placeholder "Start date"
   - "To" date picker with placeholder "End date"
   - Both use the existing Calendar + Popover pattern with `pointer-events-auto`

4. **Update `hasFilters`**: Check `dateFrom !== undefined || dateTo !== undefined` instead of `dateFilter !== undefined`.

5. **Update `clearFilters`**: Reset both `dateFrom` and `dateTo` to `undefined`.

6. **Update `useMemo` dependencies**: Replace `dateFilter` with `dateFrom, dateTo`.

### UI Layout
- The two date pickers sit next to each other in the existing filter bar
- Each is slightly narrower (around 160px) to fit both comfortably
- "From" shows a CalendarIcon and the selected date or "Start date"
- "To" shows a CalendarIcon and the selected date or "End date"

No new files or dependencies needed.

