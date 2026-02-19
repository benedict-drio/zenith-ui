

# Search Functionality for Payments Table

## Overview
Add a search input to the Payments page filters bar that lets users filter transactions by customer name or invoice ID in real-time.

## Changes

### `src/pages/Payments.tsx`

1. **New state**: Add `const [search, setSearch] = useState("")` for the search query.

2. **Filter logic**: Update the `filtered` useMemo to also filter by `search` — match against `inv.customer` and `inv.id` (case-insensitive). Add `search` to the dependency array.

3. **UI**: Add an `<Input>` with a `Search` icon before the status Select in the filters row. Placeholder: "Search by customer or ID...". Width ~220px. On change, update `search` state and reset page to 0.

4. **Imports**: Add `Input` from `@/components/ui/input` and `Search` icon from `lucide-react`.

5. **Clear filters**: Update `clearFilters` to also reset `search` to `""`. Update `hasFilters` to include `search !== ""`.

No new files or dependencies needed.

