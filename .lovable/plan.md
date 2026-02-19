
# Dark/Light Mode Toggle

Add a theme toggle button to both the landing page navbar and the dashboard header, powered by `next-themes` (already installed).

---

## Changes

### 1. `index.html`
- Add `class="dark"` to the `<html>` tag so `next-themes` can manage the class attribute

### 2. `src/App.tsx`
- Wrap the entire app with `<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>` from `next-themes`

### 3. New: `src/components/ThemeToggle.tsx`
- A reusable toggle button component using `useTheme()` from `next-themes`
- Renders a Sun icon (in dark mode) / Moon icon (in light mode) using `lucide-react`
- Uses the existing `Button` component with `variant="ghost"` and `size="icon"`
- Handles the mounted state to avoid hydration mismatch flicker

### 4. `src/index.css`
- Add a `.light` / non-dark `:root` theme block with light-mode HSL values for all CSS variables (background, foreground, card, muted, border, sidebar, etc.)
- Keep the current dark values as-is under `:root` (default dark) and add light overrides under `.light` class
- Adjust gradient and shadow custom properties for light mode

### 5. `src/components/landing/Navbar.tsx`
- Import and render `<ThemeToggle />` in the desktop nav area (between nav links and the CTA button)
- Also add it to the mobile menu

### 6. `src/components/dashboard/DashboardLayout.tsx`
- Import and render `<ThemeToggle />` in the dashboard header, next to the "Connect Wallet" button

---

## Technical Details

- `next-themes` is already installed; it manages a `class` attribute on `<html>` (`dark` or `light`)
- `tailwind.config.ts` already has `darkMode: ["class"]` configured
- The current CSS variables are dark-only under `:root`. We will restructure so `:root` holds light values and `.dark` holds the current dark values (following the standard next-themes + Tailwind pattern)
- The `ThemeToggle` component will use `useTheme().setTheme()` to toggle between "light" and "dark"
- A `mounted` state check prevents flash of incorrect icon on initial render
