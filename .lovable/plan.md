

# Build Out the Settings Page

## Overview
Replace the current placeholder Settings page with a fully functional settings panel containing four tabbed sections: API Keys, Webhooks, Branding/Theme, and Notification Preferences. All data will be stored in local state (no backend) with toast confirmations on save.

## Page Structure

The page uses a `Tabs` component with four tabs laid out horizontally at the top:

```text
[API Keys] [Webhooks] [Branding] [Notifications]
```

Each tab contains a Card with form fields and a Save button.

---

## Tab 1: API Keys

A card displaying:
- **Live API Key** -- a read-only mono input with a masked value (e.g., `sk_live_••••••••••••a1b2`) and a Copy button (copies to clipboard, shows toast)
- **Test API Key** -- same pattern with `sk_test_••••••••••••c3d4`
- **Regenerate buttons** -- each key row has a secondary "Regenerate" button that shows an AlertDialog confirmation before replacing the masked key
- A note: "Keep your API keys secret. Never expose them in client-side code."

## Tab 2: Webhooks

A card with:
- **Webhook URL** -- an editable Input field, placeholder `https://yoursite.com/api/webhook`
- **Events to listen for** -- a list of checkboxes:
  - `payment.received`
  - `payment.confirmed`
  - `invoice.created`
  - `invoice.expired`
  - `refund.issued`
- **Webhook Secret** -- read-only mono input with Copy button (e.g., `whsec_••••••••••••x9y8`)
- **Save Webhook** button

## Tab 3: Branding

A card with:
- **Store Name** -- editable Input, default "Demo Store"
- **Primary Color** -- a color input (`<input type="color">`) defaulting to `#F97316` (Bitcoin orange)
- **Theme** -- a radio group: "System", "Light", "Dark" (wired to the existing `next-themes` provider via `useTheme`)
- **Logo URL** -- an Input for a URL, with a small preview thumbnail
- **Save Branding** button

## Tab 4: Notifications

A card with Switch toggles for each notification category:
- **Payment Received** -- default on
- **Payment Confirmed** -- default on
- **Invoice Created** -- default off
- **Invoice Expired** -- default on
- **Refund Issued** -- default on
- **System Alerts** -- default on

Each row shows a label, a short description, and a Switch on the right side. A "Save Preferences" button at the bottom.

---

## Technical Details

### Files Changed
- **`src/pages/Settings.tsx`** -- complete rewrite from placeholder to full settings page

### Dependencies Used (already installed)
- `@radix-ui/react-tabs` (Tabs, TabsList, TabsTrigger, TabsContent)
- `@radix-ui/react-switch` (Switch)
- `@radix-ui/react-checkbox` (Checkbox)
- `@radix-ui/react-alert-dialog` (for regenerate key confirmation)
- `lucide-react` icons: Key, Webhook, Palette, Bell, Copy, RefreshCw, Eye, EyeOff
- `sonner` toast for save confirmations
- `next-themes` useTheme for the branding theme selector
- `framer-motion` for page entrance animation (matching existing pattern)
- Card, CardHeader, CardTitle, CardDescription, CardContent from ui/card
- Input, Label, Button, Separator, RadioGroup

### State Management
- All settings stored in `useState` hooks (local state only, no persistence beyond session)
- Copy-to-clipboard uses `navigator.clipboard.writeText()` with toast feedback
- Theme selection wired to existing `useTheme()` from next-themes
- Save buttons show a success toast via `sonner`

### Layout Pattern
- Page header with icon + title + description (consistent with other dashboard pages)
- Tabs below the header, responsive -- stacks to scrollable horizontal on mobile
- Each TabsContent contains a single Card with the form fields
- Consistent spacing using the existing design system classes

