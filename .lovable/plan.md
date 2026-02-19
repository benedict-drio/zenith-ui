
# Fix: Mobile Nav Smooth Scroll Not Working

## Problem
When clicking anchor links (Features, Pricing, Docs) in the mobile hamburger menu, the menu closes but the page does not scroll to the target section. This works correctly on desktop.

**Root cause**: In `handleNavClick`, `setMobileOpen(false)` triggers the AnimatePresence exit animation, which causes a layout reflow (the menu div collapses its height). This interferes with `scrollIntoView` being called in the same synchronous block.

## Solution

### `src/components/landing/Navbar.tsx`
- Add a small `setTimeout` delay (around 300ms, matching the exit animation duration) before calling `scrollIntoView` when on mobile (i.e., when `mobileOpen` is true at the time of the click)
- This ensures the menu has fully collapsed before the scroll begins

Updated `handleNavClick` logic:
```
const handleNavClick = (link) => {
  const wasMobileOpen = mobileOpen;
  setMobileOpen(false);
  if (link.isRoute) {
    navigate(link.href);
  } else if (link.href.startsWith("#")) {
    const scrollToEl = () => {
      const el = document.getElementById(link.href.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    };
    if (wasMobileOpen) {
      setTimeout(scrollToEl, 300);
    } else {
      scrollToEl();
    }
  }
};
```

No other files need changes. Desktop behavior remains unaffected since `mobileOpen` is always `false` on desktop.
