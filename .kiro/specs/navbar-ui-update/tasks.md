# Implementation Plan: Navbar UI Update

## Overview

Refactor `components/Header.tsx` to deliver a premium, futuristic navigation bar with always-on transparent dark navy background, cyan accent active links, scroll-triggered box shadow, smooth hover transitions, and a consistent mobile menu. Move the grid texture overlay to `app/layout.tsx` and add a `pt-16` body offset. Add a full unit + property-based test suite using Vitest, React Testing Library, and fast-check.

## Tasks

- [ ] 1. Install and configure the test framework
  - Install Vitest, `@vitejs/plugin-react`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, and `fast-check` as dev dependencies
  - Create `vitest.config.ts` at the project root with jsdom environment, globals enabled, and the React plugin
  - Add a `setupTests.ts` file that imports `@testing-library/jest-dom/vitest`
  - Add `"test": "vitest --run"` to the `scripts` section of `package.json`
  - Create the `__tests__/components/` directory structure
  - _Requirements: 4.1, 4.2, 4.3_

- [ ] 2. Extract and export the `isActive` pure helper
  - [ ] 2.1 Export `isActive` helper and `navigation` constant from `Header.tsx`
    - Change `const navigation = [...]` to `export const navigation = [...]`
    - Add `export const isActive = (pathname: string | null, href: string): boolean => pathname === href;`
    - This makes both symbols importable by the test file without rendering the full component
    - _Requirements: 4.1, 4.2, 4.3_

  - [ ] 2.2 Write property test for Property 1 — Active link detection is exact-match only
    - Create `__tests__/components/Header.test.tsx`
    - Import `isActive` from `components/Header`
    - Use `fc.property(fc.string(), fc.string(), ...)` to assert `isActive(p, h) === (p === h)` for all string pairs
    - **Property 1: Active link detection is exact-match only**
    - **Validates: Requirements 4.1, 4.2, 4.3**

  - [ ] 2.3 Write property test for Property 2 — At most one nav item is active per pathname
    - In `__tests__/components/Header.test.tsx`
    - Import `navigation` and `isActive`
    - Use `fc.property(fc.string(), ...)` to assert `navigation.filter(item => isActive(p, item.href)).length <= 1`
    - **Property 2: At most one nav item is active per pathname**
    - **Validates: Requirements 4.1, 4.2, 4.3**

- [ ] 3. Refactor `Header.tsx` — always-on styles and scroll shadow
  - [ ] 3.1 Apply always-on `<header>` classes and scroll-only box shadow
    - Add `usePathname` import from `next/navigation`
    - Replace the existing conditional `className` on `<header>` with the always-on set:
      `fixed inset-x-0 top-0 z-50 min-h-[64px] bg-[rgba(3,7,18,0.85)] backdrop-blur-md border-b border-cyan-400/20 transition-all duration-300`
    - Append `shadow-[0_4px_30px_rgba(34,211,238,0.06)]` only when `scrolled === true`
    - Remove the `bg-transparent` / `bg-gray-950/90` conditional logic entirely
    - _Requirements: 1.1, 1.2, 1.3, 2.1, 2.3, 3.1, 3.2, 3.3, 6.1, 6.2, 6.3, 6.4, 8.4_

  - [ ] 3.2 Write unit tests for scroll-state class behavior (Property 3)
    - In `__tests__/components/Header.test.tsx`
    - Mock `next/navigation` so `usePathname` returns `"/"`
    - Render `<Header />` and assert `<header>` always has `bg-[rgba(3,7,18,0.85)]`, `backdrop-blur-md`, and `border-cyan-400/20`
    - Fire a scroll event with `window.scrollY = 50` and assert the shadow class is present; fire with `window.scrollY = 0` and assert it is absent
    - **Property 3: Scroll state controls only box shadow — background, blur, and border are invariant**
    - **Validates: Requirements 1.1, 1.2, 1.3, 2.1, 2.3, 3.1, 3.2, 3.3, 6.6, 8.4**

- [ ] 4. Refactor `Header.tsx` — active link detection and desktop nav styling
  - [ ] 4.1 Wire `usePathname` into desktop navigation link rendering
    - Call `const pathname = usePathname()` at the top of the component
    - In the desktop nav `navigation.map(...)`, replace the static `className` with a conditional that applies `text-cyan-400` when `isActive(pathname, item.href)` is true and `text-gray-400` otherwise
    - Add `font-mono tracking-[0.05em] transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:text-cyan-400` to every desktop nav link
    - _Requirements: 4.1, 4.2, 4.3, 5.1, 5.2, 5.3, 8.1, 8.5_

  - [ ] 4.2 Write unit + property tests for active/inactive desktop link styling (Property 4)
    - In `__tests__/components/Header.test.tsx`
    - For each route in `navigation`, mock `usePathname` to return that route, render `<Header />`, and assert the matching `<a>` has class `text-cyan-400` and all others have `text-gray-400`
    - Mock `usePathname` returning a path not in the nav list; assert all links have `text-gray-400`
    - Use `fc.property(fc.string(), ...)` to assert that for any pathname every nav item gets exactly one of the two styles (never both, never neither)
    - **Property 4: Active/inactive nav link styling is exhaustive and mutually exclusive**
    - **Validates: Requirements 4.1, 4.2, 4.4**

- [ ] 5. Checkpoint — Ensure all tests pass
  - Run `pnpm test` (or `npm test`) and confirm all property and unit tests pass. Ask the user if any questions arise before continuing.

- [ ] 6. Refactor `Header.tsx` — mobile menu consistency
  - [ ] 6.1 Update `DialogPanel` classes and mobile nav link styling
    - Replace `DialogPanel` `className` with: `fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-950 border-l border-cyan-400/20 px-6 py-6 sm:max-w-sm`
    - In the mobile menu `navigation.map(...)`, apply `text-cyan-400` when `isActive(pathname, item.href)` is true and `text-gray-300` otherwise
    - Add `font-mono font-medium transition-colors duration-200 ease-in-out hover:bg-cyan-950 hover:text-cyan-400` to every mobile nav link
    - Ensure the mobile menu header logo uses the local logo image (not the external Tailwind CDN URL)
    - _Requirements: 4.4, 5.4, 9.1, 9.2, 9.3, 9.4, 9.5_

  - [ ] 6.2 Write unit tests for mobile menu active link styling
    - In `__tests__/components/Header.test.tsx`
    - Open the mobile menu by clicking the hamburger button
    - Mock `usePathname` returning each route in turn; assert the matching mobile link has `text-cyan-400` and others have `text-gray-300`
    - Assert `DialogPanel` has `border-l border-cyan-400/20` and `bg-gray-950`
    - _Requirements: 4.4, 9.1, 9.2_

- [ ] 7. Update `app/layout.tsx` — relocate grid texture and add body offset
  - [ ] 7.1 Move grid texture overlay out of `Header.tsx` and into `layout.tsx`
    - Remove the `<div>` grid overlay from `Header.tsx` (the `pointer-events-none fixed inset-0 z-0` element with the green grid `backgroundImage`)
    - In `app/layout.tsx`, add that same `<div>` as a direct child of `<ThemeProvider>`, placed before `<Header />`
    - Wrap `{children}` in `<main className="pt-16">` (or add `pt-16` to the `<body>` className) to offset the 64px fixed header
    - _Requirements: 6.5, 8.3_

  - [ ] 7.2 Write unit test for layout body offset
    - In `__tests__/components/Header.test.tsx` (or a separate `__tests__/app/layout.test.tsx`)
    - Assert that the `<header>` element has `min-h-[64px]` so the offset assumption is valid
    - _Requirements: 6.4, 6.5_

- [ ] 8. Final checkpoint — Ensure all tests pass
  - Run `pnpm test` and confirm the full suite is green. Verify the component renders correctly in the browser at `/`, `/about`, and `/projects`. Ask the user if any questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at logical boundaries
- Property tests validate universal correctness properties using fast-check
- Unit tests validate specific examples and edge cases
- The design uses TypeScript throughout — all new code must be typed
- `isActive` must be exported from `Header.tsx` to be directly testable without rendering the full component

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["2.1"] },
    { "id": 2, "tasks": ["2.2", "2.3", "3.1"] },
    { "id": 3, "tasks": ["3.2", "4.1"] },
    { "id": 4, "tasks": ["4.2", "6.1"] },
    { "id": 5, "tasks": ["6.2", "7.1"] },
    { "id": 6, "tasks": ["7.2"] }
  ]
}
```
