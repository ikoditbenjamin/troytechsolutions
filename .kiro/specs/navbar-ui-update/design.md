# Design Document: Navbar UI Update

## Overview

This design covers the refactor of `components/Header.tsx` to deliver a premium, futuristic navigation bar for the TroyTech Solutions website. The changes are purely presentational and behavioral within the existing component — no new routes, APIs, or data sources are introduced.

The core goals are:

- Always-on transparent dark navy background (`rgba(3, 7, 18, 0.85)`) with `backdrop-blur-md`
- Cyan (`#22d3ee` / `cyan-400`) as the sole accent color for active links, borders, and hover states
- Active link detection via `usePathname` from `next/navigation` with exact string matching
- Scroll-triggered box shadow only (border is always present)
- Grid texture overlay moved out of `<header>` into the page layout
- Minimum 64px header height with layout-level `padding-top` to prevent content occlusion
- Smooth hover transitions: color + `translateY(-2px)` over 300ms `ease-in-out`
- Mobile menu: fully opaque dark navy panel, left border `cyan/20`, emerald→cyan CTA gradient

The existing component structure (Headless UI `Dialog`, Heroicons, `ModeToggle`) is preserved. Only class names, inline styles, state logic, and the active-link mechanism change.

---

## Architecture

The update is scoped to two files and one layout concern:

```
components/
  Header.tsx          ← primary change target
app/
  layout.tsx          ← add grid texture overlay + pt-16 body offset
```

### Active Link Detection

The current component uses plain `<a>` tags with `href` strings. To detect the active route without a full router dependency, `usePathname` from `next/navigation` is used. This hook is available in Next.js 13+ App Router and returns the current pathname as a string (e.g. `/about`). An exact `===` comparison against each navigation item's `href` determines the active state.

> **Why not `next/link`?** The existing component uses `<a>` tags throughout. Switching to `<Link>` is a valid improvement but is out of scope for this spec — the requirement only mandates correct active-state detection, not a full link migration. `usePathname` works with either `<a>` or `<Link>`.

### Scroll State

The existing `scrolled` boolean state (triggered at `window.scrollY > 10`) is retained. Its only remaining job is toggling the box shadow class. The background, border, and blur are always applied.

### Grid Texture Relocation

The `<div>` grid overlay currently lives inside the `Header` component's return, wrapping the `<header>`. It will be moved to `app/layout.tsx` as a fixed, pointer-events-none overlay at `z-0`, keeping `<header>` semantically clean per Requirement 8.3.

---

## Components and Interfaces

### `Header` component (`components/Header.tsx`)

**Props:** none (unchanged)

**State:**

| State variable   | Type      | Purpose                                      |
|------------------|-----------|----------------------------------------------|
| `mobileMenuOpen` | `boolean` | Controls Headless UI Dialog open/close state |
| `scrolled`       | `boolean` | True when `window.scrollY > 10`              |

**New hook:**

```ts
const pathname = usePathname(); // from 'next/navigation'
```

**Helper:**

```ts
const isActive = (href: string) => pathname === href;
```

**`<header>` element classes (always applied):**

```
fixed inset-x-0 top-0 z-50
min-h-[64px]
bg-[rgba(3,7,18,0.85)] backdrop-blur-md
border-b border-cyan-400/20
transition-all duration-300
```

**Scroll-conditional addition:**

```
scrolled ? "shadow-[0_4px_30px_rgba(34,211,238,0.06)]" : ""
```

**Desktop nav link classes:**

```
text-sm font-mono tracking-[0.05em]
transition-all duration-300 ease-in-out
hover:-translate-y-0.5 hover:text-cyan-400
```

Active state: `text-cyan-400`  
Inactive state: `text-gray-400`

**Mobile menu link classes:**

```
-mx-3 block rounded-lg px-3 py-2.5
text-base font-mono font-medium
transition-colors duration-200 ease-in-out
hover:bg-cyan-950 hover:text-cyan-400
```

Active state: `text-cyan-400`  
Inactive state: `text-gray-300`

**`DialogPanel` classes:**

```
fixed inset-y-0 right-0 z-50
w-full overflow-y-auto
bg-gray-950
border-l border-cyan-400/20
px-6 py-6 sm:max-w-sm
```

**`<nav>` layout classes (unchanged):**

```
flex items-center justify-between
p-4 lg:px-8
max-w-7xl mx-auto
```

**Desktop gap classes (unchanged):**

- Nav links: `lg:gap-x-8`
- Action group: `lg:gap-x-4`

### `layout.tsx` changes

Add the grid texture overlay as a direct child of `<body>` (inside `ThemeProvider`), before `<Header />`:

```tsx
<div
  className="pointer-events-none fixed inset-0 z-0"
  style={{
    backgroundImage:
      "linear-gradient(rgba(0,255,128,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,128,0.03) 1px, transparent 1px)",
    backgroundSize: "40px 40px",
  }}
/>
```

Add `pt-16` (64px) to the `<body>` element or wrap `{children}` in a `<main className="pt-16">` to offset fixed header height.

---

## Data Models

No new data models are introduced. The navigation item list remains a static constant:

```ts
const navigation = [
  { name: "Home",     href: "/" },
  { name: "About",    href: "/about" },
  { name: "Blogs",    href: "/blogs" },
  { name: "Contact",  href: "/contact" },
  { name: "Projects", href: "/projects" },
];

const BOOK_HREF = "/booking";
```

**Active link shape** (derived, not stored):

```ts
// Computed per render from usePathname()
const isActive = (href: string): boolean => pathname === href;
```

No persistence, no API calls, no context changes.

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Active link detection is exact-match only

*For any* pathname string and any href string, the `isActive` helper returns `true` if and only if the two strings are strictly equal (`===`) — no prefix matching, no trailing-slash normalization, no case folding.

**Validates: Requirements 4.1, 4.2, 4.3**

---

### Property 2: At most one nav item is active per pathname

*For any* pathname string and the fixed navigation list, the count of items for which `isActive(pathname, item.href)` returns `true` is always 0 or 1 — never greater than 1 — because all hrefs in the navigation list are distinct strings.

**Validates: Requirements 4.1, 4.2, 4.3**

---

### Property 3: Scroll state controls only box shadow — background, blur, and border are invariant

*For any* scroll position value (both `scrolled = false` and `scrolled = true`), the `<header>` element always carries the dark navy background class, the `backdrop-blur-md` class, and the `border-b border-cyan-400/20` class. The only class that differs between the two scroll states is the box shadow utility: present when `scrolled = true`, absent when `scrolled = false`.

**Validates: Requirements 1.1, 1.2, 1.3, 2.1, 2.3, 3.1, 3.2, 3.3, 6.6, 8.4**

---

### Property 4: Active/inactive nav link styling is exhaustive and mutually exclusive

*For any* pathname string, every navigation item rendered in both the desktop nav and the mobile menu receives exactly one of two styles: the active cyan style (`text-cyan-400`) when `isActive` returns `true`, or the inactive gray style (`text-gray-400` / `text-gray-300`) when `isActive` returns `false` — never both, never neither.

**Validates: Requirements 4.1, 4.2, 4.4**

---

## Error Handling

This component has no async operations, no API calls, and no user-submitted data. Error scenarios are limited to:

| Scenario | Handling |
|---|---|
| `usePathname()` returns `null` (SSR edge case in older Next.js) | `isActive` receives `null`; strict `===` comparison against any href string returns `false`, so all links render as inactive — safe fallback |
| Navigation item `href` is malformed or empty string | Exact match against pathname will simply never be true; no crash |
| `window` not available during SSR | The `useEffect` scroll listener is already guarded by the effect lifecycle; no change needed |
| Mobile menu open on resize to desktop | Headless UI Dialog handles this gracefully; no additional logic needed |

---

## Testing Strategy

This feature is a UI component refactor. The logic under test is:

1. **`isActive` helper** — a pure function; suitable for property-based testing
2. **Scroll state toggle** — event-driven boolean; suitable for example-based unit tests
3. **Class application** — conditional Tailwind classes; suitable for snapshot/example tests
4. **Visual rendering** — layout, spacing, color; suitable for visual regression or manual review

### PBT Applicability Assessment

The feature is primarily a UI rendering update. Most acceptance criteria describe visual appearance (colors, spacing, blur) that cannot be meaningfully verified by property-based testing. However, the `isActive` helper is a pure function with a well-defined universal property, making it a good candidate for PBT.

### Unit Tests (example-based)

Use **Vitest** + **React Testing Library** (already standard in Next.js projects):

- Render `Header` with a mocked `usePathname` returning each route in turn; assert the matching link has `text-cyan-400` class and all others have `text-gray-400`
- Render `Header` with `usePathname` returning a path not in the nav list; assert all links have `text-gray-400`
- Simulate scroll event (`window.scrollY = 50`); assert the shadow class is present on `<header>`
- Simulate scroll at top (`window.scrollY = 0`); assert no shadow class on `<header>`
- Assert `<header>` always has `border-b border-cyan-400/20` regardless of scroll state
- Assert `<header>` always has `backdrop-blur-md` regardless of scroll state

### Property-Based Tests

Use **fast-check** for the `isActive` pure function:

**Feature: navbar-ui-update, Property 1: Active link detection is exact-match only**

```ts
// For any string pathname and any string href,
// isActive(pathname, href) === (pathname === href)
fc.assert(
  fc.property(fc.string(), fc.string(), (pathname, href) => {
    expect(isActive(pathname, href)).toBe(pathname === href);
  }),
  { numRuns: 100 }
);
```

**Feature: navbar-ui-update, Property 2: At most one nav item is active per pathname**

```ts
// For any pathname, at most one navigation item is active
fc.assert(
  fc.property(fc.string(), (pathname) => {
    const activeCount = navigation.filter(item => isActive(pathname, item.href)).length;
    expect(activeCount).toBeLessThanOrEqual(1);
  }),
  { numRuns: 100 }
);
```

**Feature: navbar-ui-update, Property 3: Scroll state controls only box shadow — background, blur, and border are invariant**

```ts
// For both scroll states, header always has background/blur/border classes
[false, true].forEach(scrolled => {
  const { container } = render(<Header />, { /* mock scrolled state */ });
  const header = container.querySelector("header");
  expect(header?.className).toContain("bg-[rgba(3,7,18,0.85)]");
  expect(header?.className).toContain("backdrop-blur-md");
  expect(header?.className).toContain("border-cyan-400/20");
  if (scrolled) {
    expect(header?.className).toContain("shadow-");
  } else {
    expect(header?.className).not.toContain("shadow-");
  }
});
```

**Feature: navbar-ui-update, Property 4: Active/inactive nav link styling is exhaustive and mutually exclusive**

```ts
// For any pathname, every nav item gets exactly one of active or inactive style
fc.assert(
  fc.property(fc.string(), (pathname) => {
    // mock usePathname to return pathname, render Header, check each link
    navigation.forEach(item => {
      const active = isActive(pathname, item.href);
      // active is strictly boolean — mutually exclusive by definition
      expect(typeof active).toBe("boolean");
      // rendered link has cyan-400 XOR gray-400 class
    });
  }),
  { numRuns: 100 }
);
```

### Visual / Manual Review

The following criteria require manual or visual regression testing and cannot be automated with unit tests:

- Backdrop blur appearance (`backdrop-blur-md`)
- Box shadow glow effect on scroll
- `translateY(-2px)` hover animation smoothness
- Letter spacing rendering at `0.05em`
- Mobile menu slide-in animation
- Dark/light mode toggle appearance
- Overall layout balance and brand consistency

### Test File Location

```
__tests__/
  components/
    Header.test.tsx       ← unit + property tests
```

Or co-located as `components/Header.test.tsx` if the project prefers co-location.
