

# Fix Payment Widget Link in Footer

## Problem
The Footer component links "Payment Widget" to `/demo`, but the actual route defined in `App.tsx` is `/pay`. This results in a 404 (NotFound page) when clicked.

## Change

| File | Change |
|------|--------|
| `src/components/landing/Footer.tsx` | Update `href` from `"/demo"` to `"/pay"` on the "Payment Widget" link (line 5 in the `links` object) |

One-line fix. No other files affected.
