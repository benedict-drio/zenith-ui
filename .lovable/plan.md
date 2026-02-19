

# Sticky Navigation Header for Landing Page

Add a glassmorphism sticky navbar to the landing page with the SatsTerminal brand, navigation links, and a gradient CTA button.

---

## New File

### `src/components/landing/Navbar.tsx`
- Fixed/sticky header pinned to top with `fixed top-0 w-full z-50`
- Starts transparent, transitions to glassmorphism on scroll (uses a `useState` + `useEffect` scroll listener at ~20px threshold)
- Scrolled state applies: `bg-background/70 backdrop-blur-xl border-b border-border/50 shadow-lg`
- Contents (inside `container mx-auto`):
  - **Left**: SatsTerminal logo (Zap icon in orange gradient square + "SatsTerminal" text in Space Grotesk), links to `/`
  - **Center**: Nav links — Features, Pricing, Docs, Dashboard. Styled as `text-sm text-muted-foreground hover:text-foreground`. "Dashboard" links to `/dashboard`, others scroll to sections or are placeholder anchors
  - **Right**: "Get Started" button with `gradient-bitcoin` background, `shadow-glow`, and arrow icon — navigates to `/dashboard`
  - **Mobile**: Hamburger menu icon (lucide `Menu`) toggling a slide-down mobile menu with all links stacked vertically

---

## Modified Files

### `src/pages/Index.tsx`
- Import and render `<Navbar />` at the top, before `<HeroSection />`

### `src/components/landing/HeroSection.tsx`
- Add `pt-20` to the section to offset for the fixed navbar height

---

## Technical Details
- Scroll detection: `window.addEventListener("scroll", ...)` in a `useEffect`, toggling a `scrolled` boolean state
- Mobile menu: Local `useState` boolean, renders a collapsible div with `AnimatePresence` for smooth open/close
- All styling uses existing Tailwind utilities and CSS custom properties (no new CSS needed)
- Navbar transitions use `transition-all duration-300` for smooth glassmorphism fade-in
