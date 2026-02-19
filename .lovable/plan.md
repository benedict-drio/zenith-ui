

# Toast Confirmation After CSV Export

## Overview
Show a success toast notification after the CSV file download is triggered, giving users clear visual feedback.

## Changes

### `src/pages/Payments.tsx`

- Import `toast` from `sonner`.
- Add a `toast.success()` call at the end of the `exportCsv()` function, after the download is triggered. Message: "CSV exported successfully" with a description showing the number of rows exported (e.g., "12 transactions downloaded").

No new files or dependencies needed. The project already uses Sonner toasts via `<Sonner />` in `App.tsx`.

