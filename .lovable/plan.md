

# Add FAQ Link with Smooth Scroll to Navbar

## Changes

### 1. `src/components/landing/Navbar.tsx`
Add a new "FAQ" entry to the `navLinks` array pointing to `#faq`:
```
{ label: "FAQ", href: "#faq" }
```
Insert it after the "Pricing" link and before "Docs".

### 2. `src/components/landing/FAQSection.tsx`
Add `id="faq"` to the `<section>` element so the anchor link scrolls to it. The section already has `scroll-mt-20` which provides proper offset for the fixed navbar.

No new dependencies or components needed -- the existing `handleNavClick` logic in the Navbar already handles `#` links with `scrollIntoView({ behavior: "smooth" })`.

