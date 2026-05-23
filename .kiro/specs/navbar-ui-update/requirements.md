# Requirements Document

## Introduction

This feature updates the existing `Header.tsx` navbar component for the TroyTech Solutions Next.js SaaS website. The goal is to transform the current navbar into a premium, futuristic, and minimal navigation experience. Key visual changes include a transparent dark navy background, backdrop blur, a thin cyan bottom border with low opacity, cyan-colored active navigation links, smooth hover transitions, sticky top positioning, and modern spacing and alignment — all consistent with a high-end SaaS product aesthetic.

## Glossary

- **Navbar**: The top-level navigation bar rendered by the `Header.tsx` component, visible on all pages.
- **Active Link**: A navigation link whose `href` matches the current page URL pathname.
- **Backdrop Blur**: A CSS blur filter applied behind a semi-transparent element to create a frosted-glass effect.
- **Cyan Accent**: The brand highlight color used for active states and interactive affordances, defined as `#22d3ee` (Tailwind `cyan-400`).
- **Dark Navy**: The deep navy background color used for the navbar, defined as `rgba(3, 7, 18, 0.85)` (approximately `gray-950` at 85% opacity).
- **Sticky Navigation**: A navbar that remains fixed at the top of the viewport as the user scrolls.
- **ModeToggle**: The existing dark/light theme toggle component rendered inside the navbar.
- **Mobile Menu**: The slide-in dialog panel rendered on viewports narrower than the `lg` breakpoint (1024px).

## Requirements

### Requirement 1: Transparent Dark Navy Background

**User Story:** As a site visitor, I want the navbar to have a transparent dark navy background, so that the page content beneath is subtly visible and the navbar feels modern and premium.

#### Acceptance Criteria

1. THE Navbar SHALL render with a background color of dark navy at 85% opacity (`rgba(3, 7, 18, 0.85)`) at all times, regardless of scroll position.
2. WHEN the page is at the top (scroll position = 0), THE Navbar SHALL maintain the same transparent dark navy background without switching to a fully opaque color.
3. THE Navbar SHALL NOT use a fully opaque solid background color as its default resting state.
4. THE Mobile Menu overlay background SHALL use a semi-transparent dark color (at least 60% opacity black) distinct from the navbar background.

---

### Requirement 2: Backdrop Blur Effect

**User Story:** As a site visitor, I want the navbar to have a backdrop blur effect, so that the frosted-glass appearance reinforces the premium SaaS aesthetic.

#### Acceptance Criteria

1. THE Navbar SHALL apply a backdrop blur of at least 12px to all content rendered behind the navbar element at all times.
2. WHILE the Mobile Menu is open, THE Mobile Menu overlay SHALL also apply a backdrop blur of at least 4px to its background.
3. WHEN the page is scrolled more than 10px, THE Navbar SHALL display the backdrop blur effect.
4. WHEN the page is scrolled more than 10px, THE Navbar SHALL transition to the blurred background state over a duration of 300ms.

---

### Requirement 3: Thin Cyan Bottom Border

**User Story:** As a site visitor, I want a thin cyan bottom border on the navbar, so that the navbar has a distinct, futuristic edge that separates it from page content.

#### Acceptance Criteria

1. THE Navbar `<header>` element SHALL render a bottom border of `1px solid` using the Cyan Accent color at 20% opacity at all times.
2. THE Navbar SHALL display the cyan bottom border at all times, regardless of scroll position.
3. IF the page is scrolled to the top (scroll position = 0), THE Navbar `<header>` element SHALL still display the cyan bottom border.
4. THE cyan bottom border SHALL apply only to the main `<header>` element and NOT to the Mobile Menu dialog panel.

---

### Requirement 4: Active Navigation Link Styling

**User Story:** As a site visitor, I want the currently active navigation link to be highlighted in cyan, so that I can immediately identify which page I am on.

#### Acceptance Criteria

1. IF the current page URL pathname exactly matches a navigation item's `href`, THE Navbar SHALL render that navigation link in Cyan Accent color.
2. IF the current page URL pathname does not exactly match a navigation item's `href`, THE Navbar SHALL render that navigation link in a muted gray color.
3. THE Navbar SHALL determine the active route by comparing the full current pathname string against each navigation item's `href` using exact string equality.
4. WHEN the Mobile Menu is open, THE Mobile Menu SHALL apply Cyan Accent color to active matching navigation items and muted gray to all non-matching items.

---

### Requirement 5: Smooth Hover Transitions on Links

**User Story:** As a site visitor, I want navigation links to transition smoothly on hover, so that the interaction feels polished and responsive.

#### Acceptance Criteria

1. WHEN a user hovers over a desktop navigation link, THE Navbar SHALL transition the link color from its resting color to Cyan Accent over a duration of 300ms using an `ease-in-out` timing function.
2. WHEN a user hovers over a desktop navigation link, THE Navbar SHALL apply a subtle upward translate transform of 2px over the same 300ms duration.
3. WHEN a user stops hovering over a desktop navigation link, THE Navbar SHALL smoothly reverse the color back to its resting color and the vertical offset back to zero over the same 300ms duration.
4. WHEN a user hovers over a Mobile Menu navigation link, THE Mobile Menu SHALL transition the link background to a dark cyan tint and the text color to Cyan Accent over 200ms using an `ease-in-out` timing function.

---

### Requirement 6: Sticky Top Navigation

**User Story:** As a site visitor, I want the navbar to remain fixed at the top of the viewport while scrolling, so that navigation is always accessible without scrolling back to the top.

#### Acceptance Criteria

1. THE Navbar SHALL be positioned fixed at the top of the viewport with a z-index of 50 or higher.
2. WHILE the user scrolls the page, THE Navbar SHALL remain visible and fixed at the top of the viewport.
3. THE Navbar SHALL NOT shift, collapse, or disappear at any scroll position.
4. THE Navbar SHALL have a minimum height of 64px.
5. THE page content below the navbar SHALL be offset by at least the navbar height so that no content is hidden beneath the fixed navbar.
6. WHEN the page is scrolled more than 10px, THE Navbar SHALL transition its background from transparent to the dark navy semi-transparent color.

---

### Requirement 7: Modern Spacing and Alignment

**User Story:** As a site visitor, I want the navbar to use modern, balanced spacing and alignment, so that the layout feels clean, professional, and easy to scan.

#### Acceptance Criteria

1. THE Navbar SHALL use horizontal padding of 16px on viewports below 1024px wide and 32px on viewports 1024px wide and above.
2. THE Navbar SHALL constrain its content to a maximum width of 1280px and center it horizontally on viewports wider than 1280px.
3. THE Navbar SHALL vertically align all visible elements — including the logo, navigation links, action buttons, ModeToggle, and hamburger button — to the midpoint of the navbar height.
4. THE Navbar SHALL maintain a consistent gap of 32px between desktop navigation links on viewports 1024px wide and above.
5. THE Navbar SHALL maintain a consistent gap of 16px between the desktop action elements (Sign in link, Book a Call button, ModeToggle) on viewports 1024px wide and above.

---

### Requirement 8: Clean and Minimal Futuristic Appearance

**User Story:** As a site visitor, I want the navbar to look clean, minimal, and futuristic, so that it reinforces TroyTech Solutions' premium brand identity.

#### Acceptance Criteria

1. THE Navbar SHALL use a monospace typeface for all navigation link text, action link text (Sign in, Book a Call), and brand name text; the theme toggle control is excluded from this requirement.
2. THE Navbar SHALL render the brand logo and name in the left section, navigation links in the center section, and action buttons (Sign in, Book a Call, ModeToggle) in the right section on viewports 1024px wide and above.
3. THE Navbar `<header>` element SHALL NOT contain direct child elements that serve purely as decorative overlays (e.g., grid textures, ambient glow divs); such elements SHALL be placed outside the `<header>` in the page layout.
4. WHEN the page is scrolled more than 10px, THE Navbar SHALL display a subtle box shadow to reinforce depth; WHEN the page is at or above the top (scroll position ≤ 10px), THE Navbar SHALL display no box shadow.
5. THE Navbar SHALL apply a letter spacing of at least 0.05em to all navigation link text.

---

### Requirement 9: Mobile Menu Consistency

**User Story:** As a site visitor on a mobile device, I want the mobile menu to match the futuristic dark navy aesthetic of the desktop navbar, so that the experience is consistent across all screen sizes.

#### Acceptance Criteria

1. THE Mobile Menu Panel SHALL use a fully opaque dark navy background and display a 1px solid border on its left edge using Cyan Accent color at 20% opacity.
2. THE Mobile Menu Panel SHALL display navigation links using a monospace typeface with a muted gray default text color.
3. WHEN a user hovers over a Mobile Menu navigation link, THE Mobile Menu SHALL change the link background to a dark cyan tint and the text color to Cyan Accent.
4. THE Mobile Menu Panel SHALL include a "Book a Call" CTA button styled with a left-to-right gradient from emerald to cyan.
5. THE Mobile Menu Panel SHALL include the ModeToggle component positioned at the bottom of the panel, centered horizontally.
