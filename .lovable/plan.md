

# Add "Contact" Link to Navbar

## Change

**`src/components/landing/Navbar.tsx`** -- Add a new entry to the `navLinks` array:

```ts
{ label: "Contact", href: "#contact" }
```

Insert it after the "FAQ" link and before "Docs". The existing `handleNavClick` logic already handles `#` links with `scrollIntoView({ behavior: "smooth" })`, and the `ContactSection` already has `id="contact"` with `scroll-mt-20`, so no other changes are needed.

