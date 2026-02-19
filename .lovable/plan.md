

# Add Real-Time Search Highlighting in Payments Table

## Overview
When the user types in the search box, matching text in the ID, Customer, and Memo columns will be visually highlighted with a colored background, making it easy to see why each row matched.

## Approach

### 1. Create a `HighlightText` helper component
A small inline component (defined in `Payments.tsx` or a separate file) that takes `text` and `query` props. It splits the text on the search term (case-insensitive) and wraps matched segments in a `<mark>` styled with Tailwind classes like `bg-primary/20 text-primary rounded-sm px-0.5`.

### 2. Apply highlighting to searchable columns
In the table body, replace plain text rendering with the `HighlightText` component for columns that are searchable:

- **ID column**: `<HighlightText text={inv.id} query={search} />`
- **Customer column**: `<HighlightText text={inv.customer} query={search} />`
- **Memo** (not currently displayed in table, so no change needed unless we add it)

Non-searchable columns (Amount, Status, Date, Tx Hash) remain unchanged.

### 3. No new dependencies
Uses basic string splitting and React fragments -- no external library needed.

## Technical Details

**HighlightText component:**
```tsx
function HighlightText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const regex = new RegExp(`(${escapeRegex(query)})`, "gi");
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part)
          ? <mark key={i} className="bg-primary/20 text-primary rounded-sm px-0.5">{part}</mark>
          : part
      )}
    </>
  );
}
```

A small `escapeRegex` helper ensures special characters in the search string don't break the regex.

**File changed:** `src/pages/Payments.tsx` only.
