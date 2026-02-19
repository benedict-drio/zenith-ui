

# Notification Bell in Dashboard Header

## Overview
Add a notification bell icon with an unread count badge to the dashboard header. Clicking it opens a dropdown (popover) displaying recent payment alerts and system notifications.

## Mock Notification Data

**`src/data/mockNotifications.ts`** (new file)

Define a `Notification` type and a static array of ~6 mock notifications:

- "Payment received: 250,000 sats from CryptoShop Pro" (type: payment, 12 min ago)
- "Invoice INV-005 expired" (type: warning, 2 hours ago)
- "Refund issued: 320,000 sats to Chain Analytics" (type: refund, 5 hours ago)
- "New invoice INV-011 created" (type: info, 8 hours ago)
- "Payment partially received: 75,000 sats on INV-003" (type: payment, yesterday)
- "System maintenance scheduled for Feb 20" (type: system, 2 days ago)

Each notification has: `id`, `title`, `description`, `type`, `time` (relative string), `read` (boolean).

## New Component

**`src/components/dashboard/NotificationDropdown.tsx`**

- Uses existing `Popover`, `PopoverTrigger`, `PopoverContent` from `@/components/ui/popover`
- **Trigger**: `Bell` icon from lucide-react inside a `Button` (variant="ghost", size="icon")
  - Red dot badge (absolute positioned) showing unread count when > 0
- **Content panel** (~320px wide):
  - Header row: "Notifications" title + "Mark all read" text button
  - Scrollable list of notifications using `ScrollArea` (max-h-80)
  - Each item shows an icon by type (green circle for payment, yellow for warning, blue for info, red for refund, gray for system), title, description, and relative time
  - Unread items have a subtle left border accent or slightly different background
  - Empty state: "No notifications" message
- Clicking "Mark all read" clears the unread badge (local state only)

## Modified File

**`src/components/dashboard/DashboardLayout.tsx`**

- Import `NotificationDropdown`
- Place `<NotificationDropdown />` in the header between `<ThemeToggle />` and the "Connect Wallet" button

## No new dependencies
Uses existing: `Popover`, `ScrollArea`, `Button`, lucide-react `Bell` icon, framer-motion (optional subtle animation)

