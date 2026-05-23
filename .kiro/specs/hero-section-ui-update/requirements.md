# Requirements Document

## Introduction

This feature updates the hero section of the TroyTech Solutions Next.js website to convey the identity of a modern AI/cybersecurity company. The update targets two components — `herosection.tsx` (wrapper) and `Innovation.tsx` (hero content) — and introduces a dark futuristic aesthetic with animated background particles, cyan gradient text highlights, a glowing image effect, enlarged bold typography, a clear visual hierarchy, and premium call-to-action buttons. The section must remain spacious, visually powerful, and fully responsive across all screen sizes.

---

## Glossary

- **Hero_Section**: The full-viewport landing area of the TroyTech Solutions website, composed of `herosection.tsx` and `Innovation.tsx`.
- **HeroSectionThree**: The wrapper component defined in `herosection.tsx` that provides the background and renders `Innovation`.
- **Innovation**: The component defined in `Innovation.tsx` that renders the two-column hero content (text/CTAs on the left, image on the right).
- **Particle_Canvas**: An animated HTML5 canvas or CSS/SVG layer rendered behind the hero content that displays moving particles or geometric lines.
- **Cyan_Gradient_Text**: Text styled with a CSS gradient from a darker cyan starting stop to a lighter cyan terminal stop, applied via `bg-clip-text` and `text-transparent`.
- **Glow_Effect**: A blurred, semi-transparent layer placed behind the hero image using cyan-500 and/or emerald-500 accent colors at 15%–40% opacity to simulate a light-emission halo.
- **CTA_Button**: A call-to-action anchor element that directs the user to a contact or communication channel.
- **Typography_Hierarchy**: The visual relationship between heading, subheading, body, and label text established through font size, weight, and color contrast.
- **Dark_Gradient_Background**: A CSS background using at least three color stops in a diagonal direction, transitioning through dark slate, near-black gray, and dark cyan tones, with no stop lighter than 20% relative luminance.
- **Feature_Bullet**: A list item in the left column combining an icon, a bold label, and a short description.

---

## Requirements

### Requirement 1: Dark Futuristic Gradient Background

**User Story:** As a site visitor, I want to see a dark, futuristic gradient background in the hero section, so that the page immediately communicates a premium, technology-forward brand identity.

#### Acceptance Criteria

1. THE `HeroSectionThree` SHALL render a `Dark_Gradient_Background` using at least three color stops in a bottom-right diagonal direction (e.g., from `slate-950` through `gray-950` to `cyan-950`) that covers at minimum the full viewport height (`min-h-screen` or equivalent).
2. WHILE the page is rendered in dark mode AND WHEN the component mounts, THE `HeroSectionThree` SHALL display the `Dark_Gradient_Background` with no color stop exceeding 20% relative luminance, ensuring no light-colored fallback is visible.
3. WHILE the page is rendered in light mode AND WHEN the component mounts, THE `HeroSectionThree` SHALL display the same `Dark_Gradient_Background` with no color stop exceeding 20% relative luminance, overriding any light-mode default background.
4. THE `HeroSectionThree` SHALL NOT render a single solid color as its background at any viewport width from 320px to 2560px; the background SHALL always be a multi-stop gradient.

---

### Requirement 2: Cyan Gradient Text Highlights

**User Story:** As a site visitor, I want key words in the hero heading to be styled with a cyan gradient, so that the most important concepts are visually emphasized and reinforce the tech brand.

#### Acceptance Criteria

1. THE `Innovation` component SHALL apply `Cyan_Gradient_Text` styling to at least one word or phrase within the `<h1>` element that directly identifies the product or service offering (e.g., "Solutions in Uganda").
2. THE `Innovation` component SHALL implement `Cyan_Gradient_Text` using `bg-clip-text`, `text-transparent`, and `bg-gradient-to-r` with a darker cyan color as the starting stop and a lighter cyan tone as the ending stop.
3. THE lighter (terminal) gradient stop color of `Cyan_Gradient_Text` SHALL maintain a contrast ratio of at least 4.5:1 against the `Dark_Gradient_Background` at all times.
4. THE `Innovation` component SHALL NOT apply `Cyan_Gradient_Text` to any `<p>`, `<button>`, or `<a>` element; gradient text SHALL be restricted to `<h1>` elements only.

---

### Requirement 3: Glow Effect Behind Hero Image

**User Story:** As a site visitor, I want to see a glow effect behind the hero illustration, so that the image feels premium and draws the eye as a focal point of the right column.

#### Acceptance Criteria

1. THE `Innovation` component SHALL render a `Glow_Effect` layer with a z-index lower than the hero image element, positioned absolutely behind `programmer.jpg` in the right column.
2. THE `Glow_Effect` SHALL be implemented as a blurred element using `cyan-500` and/or `emerald-500` accent colors at 15%–40% opacity with a blur radius of at least 24px.
3. WHILE the hero image is visible, THE `Glow_Effect` SHALL extend at least 24px beyond the image boundary on all sides, creating a visible halo around the image.
4. THE hero image (`programmer.jpg`) SHALL render at full opacity (1.0) with no contrast reduction caused by the `Glow_Effect` layer.
5. IF the viewport width is below 1024px, THEN THE `Glow_Effect` SHALL render with an opacity no greater than 20% and a blur radius no greater than 32px to avoid overwhelming the mobile layout.

---

### Requirement 4: Increased Heading Size and Boldness

**User Story:** As a site visitor, I want the hero heading to be large and bold, so that the primary message is immediately readable and commands attention.

#### Acceptance Criteria

1. THE `Innovation` component SHALL render the `<h1>` heading at a minimum font size of 36px on viewports below 640px, 48px on viewports 640px–1023px, and 72px on viewports 1024px and above.
2. THE `Innovation` component SHALL apply `font-extrabold` (800 weight) to the `<h1>` heading.
3. THE `Innovation` component SHALL set `leading-tight` line-height on the `<h1>` to prevent excessive vertical spacing between lines.
4. WHEN the heading is rendered at 72px font size, THE `Innovation` component SHALL ensure no character in the heading overflows or is clipped within the left column container at viewport widths of 1024px and above.

---

### Requirement 5: Modern Typography Hierarchy

**User Story:** As a site visitor, I want a clear visual hierarchy between the heading, subheading, body text, and labels, so that I can scan the hero section and understand the value proposition quickly.

#### Acceptance Criteria

1. THE `Innovation` component SHALL establish a `Typography_Hierarchy` with at least four visually distinct levels: heading (`<h1>`), lead paragraph, body paragraph, and badge/label text — each differing in at least one of font size, font weight, or text color.
2. THE `Innovation` component SHALL use a non-monospace (sans-serif or display) font for the `<h1>` and `font-mono` for badge and label elements to create visual contrast between heading and metadata.
3. THE lead paragraph SHALL be styled at `text-lg` (18px) or larger and use `text-emerald-500` or a color with a relative luminance visually distinct from both the `<h1>` text color and the body paragraph text color.
4. THE body paragraph SHALL be styled at `text-base` (16px) and use `text-gray-500` or a color with relative luminance lower than the lead paragraph color, causing it to visually recede.
5. THE `Feature_Bullet` labels SHALL be styled at `text-base font-semibold` and use `text-cyan-400` to maintain visual consistency with the `Cyan_Gradient_Text` in the heading.

---

### Requirement 6: Premium Call-to-Action Buttons

**User Story:** As a site visitor, I want the CTA buttons to look premium and interactive, so that I am motivated to click them and contact TroyTech.

#### Acceptance Criteria

1. THE `Innovation` component SHALL render two CTA anchor elements: a primary anchor with label "Get started for free" and a secondary anchor with label "Talk to TroyTech".
2. THE primary CTA anchor SHALL have a filled multi-color gradient background transitioning from one accent color to another (e.g., cyan to emerald), dark-colored text (relative luminance < 10%), and a fully rounded (`border-radius: 9999px`) shape.
3. WHEN a user hovers over the primary CTA anchor, THE `Innovation` component SHALL apply a box-shadow glow effect using a cyan-toned color at 50% opacity within 200ms using a CSS `transition` property.
4. THE secondary CTA anchor SHALL have a transparent background, a 1px solid border using a cyan-toned color, and cyan-toned text.
5. WHEN a user hovers over the secondary CTA anchor, THE `Innovation` component SHALL apply a dark cyan-tinted background fill within 200ms using a CSS `transition` property.
6. WHEN a user focuses either CTA anchor via keyboard navigation, THE `Innovation` component SHALL display a visible focus ring with at least 3px width and a color that contrasts with the background at a ratio of at least 3:1, meeting WCAG 2.1 AA focus-visible requirements.
7. THE primary CTA anchor SHALL have `href="mailto:ikoditbenjamin9@gmail.com"` and the secondary CTA anchor SHALL have `href` set to the existing WhatsApp URL, preserving the current contact destinations.

---

### Requirement 7: Animated Background Particles or Lines

**User Story:** As a site visitor, I want to see subtle animated particles or geometric lines in the hero background, so that the section feels dynamic and alive without distracting from the content.

#### Acceptance Criteria

1. THE `Hero_Section` SHALL render a `Particle_Canvas` element with `pointer-events: none` and a z-index lower than the hero content layer, positioned absolutely to cover the full hero section area.
2. THE `Particle_Canvas` SHALL animate at least 30 discrete particles or line nodes in continuous motion while the hero section intersects the viewport.
3. WHEN the hero section no longer intersects the viewport (determined via `IntersectionObserver` or equivalent), THE `Particle_Canvas` SHALL cancel its animation frame loop to avoid unnecessary CPU/GPU usage.
4. THE `Particle_Canvas` SHALL render particles or lines using colors from the cyan/emerald accent palette (e.g., `rgba(6,182,212,0.4)` for cyan, `rgba(16,185,129,0.3)` for emerald) so they blend with the `Dark_Gradient_Background`.
5. THE `Particle_Canvas` element SHALL be sized and positioned such that it does not cause any layout shift; its dimensions SHALL be set before first paint using fixed or absolute positioning.
6. IF the user has enabled the `prefers-reduced-motion` media query, THEN THE `Particle_Canvas` SHALL not start its animation loop and SHALL render all particles or nodes in a static, non-moving state.

---

### Requirement 8: Spacious and Visually Powerful Layout

**User Story:** As a site visitor, I want the hero section to feel open and uncluttered, so that the content breathes and the overall impression is one of quality and confidence.

#### Acceptance Criteria

1. THE `Hero_Section` SHALL have a minimum height of 100vh (full viewport height) on all viewport widths of 768px and above.
2. THE `Innovation` component SHALL apply a minimum vertical padding of 96px (top and bottom) to the left content column on viewports 1024px and above.
3. THE `Innovation` component SHALL constrain its inner content to a maximum width of 1280px and center it horizontally within the viewport.
4. THE `Innovation` component SHALL render a two-column grid layout on viewports 1024px and above, and a single-column stacked layout on viewports below 1024px, with the text column appearing above the image column in the stacked layout.
5. WHEN rendered on a viewport below 1024px, THE `Innovation` component SHALL apply a minimum top padding of 48px to the image column to provide visual separation from the text column above it.

---

### Requirement 9: AI/Cybersecurity Brand Aesthetic

**User Story:** As a site visitor, I want the hero section to visually communicate that TroyTech is a modern AI and cybersecurity company, so that I immediately trust the brand's technical credibility.

#### Acceptance Criteria

1. WHILE the hero section is rendered, THE `HeroSectionThree` SHALL use only dark background tones (Tailwind `gray-900`, `gray-950`, `slate-950`, `cyan-950`, or equivalent near-black values) and `cyan-*` or `emerald-*` Tailwind accent classes for all foreground and border colors throughout all hero elements.
2. THE `Innovation` component SHALL render the badge element using `font-mono`, a dark background (`bg-emerald-950/60` or equivalent), a border using a `cyan-*` or `emerald-*` color class, and either a `BoltIcon` or `ShieldCheckIcon` as its leading icon.
3. THE first `Feature_Bullet` SHALL use `ShieldCheckIcon` with a `text-emerald-400` or `text-cyan-400` color class; the second `Feature_Bullet` SHALL use `BoltIcon` with a `text-cyan-400` color class; the third `Feature_Bullet` SHALL use `ChartBarIcon` with a `text-emerald-400` or `text-cyan-400` color class.
4. THE trust statement ("2,500+ companies already using TroyTech") SHALL be rendered using `font-mono` and a muted gray color class (`text-gray-500` or `text-gray-600`) consistent with the badge label typography.
5. THE `Innovation` component SHALL render the floating stats card in the right column with a dark background (`bg-gray-900` or equivalent), a border using an `emerald-*` or `cyan-*` color class, and an icon container using a gradient from `emerald-500` to `cyan-500`; the card SHALL display a numeric growth metric (e.g., "+48.2%") and a short label (e.g., "IT Growth").
