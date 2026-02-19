
# Add Copy-to-Clipboard Buttons for Invoice ID and Tx Hash

## Overview
Add small copy buttons next to the Invoice ID and Tx Hash fields in the PaymentDetailDialog. Clicking copies the value to clipboard and shows brief visual feedback (icon changes from Copy to Check).

## Changes

### `src/components/dashboard/PaymentDetailDialog.tsx`

1. **Import** `Copy` and `Check` icons from `lucide-react`, and `useState` from React.
2. **Create a `CopyableValue` helper component** inside the file:
   - Renders the value text alongside a small copy icon button
   - On click, copies the text to clipboard via `navigator.clipboard.writeText()`
   - Swaps the icon to a Check mark for 2 seconds, then reverts
   - Uses `toast` from sonner for a "Copied!" confirmation
3. **Update the Invoice ID row** (line 59): Wrap the value with `CopyableValue` passing `invoice.id`
4. **Update the Tx Hash row** (lines 65-74): Wrap the value with `CopyableValue` passing `invoice.txHash` (only when txHash exists)

### CopyableValue Component Behavior
- Displays the text in its existing mono styling
- Shows a small (14px) Copy icon button on the right, muted by default, darker on hover
- On click: copies text, swaps to Check icon for 2 seconds, shows a sonner toast "Copied to clipboard"
- Accessible: button has `aria-label="Copy to clipboard"`

### No new files or dependencies needed
- Uses existing `lucide-react` icons (Copy, Check) and `sonner` toast
