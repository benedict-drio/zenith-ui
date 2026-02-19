

# CSV Export for Payments Page

## Overview
Add a "Export CSV" button to the Payments page filters bar that downloads the currently filtered transaction list as a CSV file.

## Changes

### `src/pages/Payments.tsx`

- Import `Download` icon from lucide-react.
- Add an `exportCsv()` function that:
  - Takes the current `filtered` array (respects active status/date filters).
  - Builds CSV with headers: `ID, Customer, Memo, Amount (sats), Status, Date, Tx Hash`.
  - Maps each invoice to a row, formatting the date as `YYYY-MM-DD`.
  - Creates a Blob, generates an object URL, triggers a download via a temporary `<a>` element, then revokes the URL.
  - Filename: `payments-export-YYYY-MM-DD.csv`.
- Add an "Export CSV" `<Button>` (variant="outline", size="sm") with the `Download` icon, placed in the filters row after the Clear button. Disabled when `filtered.length === 0`.

No new files or dependencies needed.

