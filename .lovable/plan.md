

# Click-to-Read Individual Notifications

## Overview
Allow users to click on a single notification row to mark it as read, in addition to the existing "Mark all read" button.

## Change

**`src/components/dashboard/NotificationDropdown.tsx`**

- Add a `markAsRead(id: string)` handler that updates the notification's `read` field to `true` in local state.
- Attach an `onClick` calling `markAsRead(notif.id)` to each notification row `<div>`.
- Add `cursor-pointer` to unread notification rows so they look clickable.
- Read notifications keep their current non-highlighted style and no pointer cursor (clicking them again is a no-op, which is fine).

No other files need changes.

