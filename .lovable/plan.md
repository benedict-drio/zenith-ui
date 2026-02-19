

# Add Column Sorting to Payments Table

## Overview
Add clickable column headers to the Payments table so users can sort transactions by Amount, Date, or Status. Clicking a header toggles between ascending, descending, and no sort.

## Changes

### `src/pages/Payments.tsx`

1. **New state**: Add sort state to track which column is sorted and in which direction:
   ```typescript
   const [sortKey, setSortKey] = useState<"amount" | "date" | "status" | null>(null);
   const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
   ```

2. **Toggle function**: Add a `handleSort` function that cycles through asc -> desc -> clear when the same column is clicked, or sets asc when a new column is clicked.

3. **Sort logic**: After filtering in the `filtered` useMemo, apply sorting based on `sortKey` and `sortDir`:
   - **amount**: Compare `inv.amountPaidSats` numerically
   - **date**: Compare `inv.createdAt` as ISO date strings
   - **status**: Compare `inv.status` alphabetically (paid before refunded, etc.)

4. **Sortable column headers**: Replace the plain text in the Amount, Date, and Status `<TableHead>` cells with clickable elements that call `handleSort`. Add a sort direction indicator icon (ArrowUpDown from lucide-react when unsorted, ArrowUp/ArrowDown when sorted).

5. **Clear filters**: Update `clearFilters` to also reset `sortKey` to `null`.

6. **Imports**: Add `ArrowUpDown`, `ArrowUp`, `ArrowDown` icons from `lucide-react`.

### UI Behavior
- Sortable columns show a subtle sort icon next to the header text
- Active sort column is visually highlighted with a directional arrow
- Sorting resets pagination to page 1
- Customer and ID columns remain unsortable (search covers those)
- Tx Hash column remains unsortable

No new files or dependencies needed.

