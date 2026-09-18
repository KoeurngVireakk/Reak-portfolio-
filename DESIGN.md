# Portfolio V5 design system

## Direction

**Systems Field Manual** is the V5 expression of Cinematic Spatial Engineering. It combines editorial hierarchy, product evidence, and system architecture. The connected `UI → API → Data → Security` language begins in the portrait scene, activates in capabilities, frames project evidence, tracks progress at the viewport edge, and resolves into contact.

The interface spends visual intensity in the hero, capability model, project proof, and contact resolution. Reading sections stay quiet, spacious, and recruiter-friendly. Section connectors make each transition feel causal rather than decorative.

## Color and light

- Canvas: `#020503`
- Surface: `#0a0d0b`
- Raised surface: `#101512`
- Foreground: `#eff3f1`
- Muted foreground: `#a1a6a3`
- Structural border: `#323a36`
- Botanical primary: `#7ac39e`
- Tonal accent: `#77cdc2`
- Focus: `#95c9ff`

Light mode maps the same semantic roles to a warm neutral canvas. Project colors are categorical accents used only for glows, system paths, identifiers, and mockup highlights.

## Typography

Manrope Variable carries display and body content. Display headings use tight tracking and compact line height; body copy stays near a 50–75 character measure. The system monospace stack is reserved for architecture nodes, coordinates, status, and technical metadata.

## Layout and spacing

The core spacing scale is `4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96`. Sections use fluid spacing from 104–168 px. The desktop hero is an editorial split; mobile becomes a deliberate copy-first sequence with a simplified static scene.

## Geometry and surfaces

Controls use 8 px radii and content surfaces use restrained 14 px radii. The hero portrait uses a larger silhouette geometry as the single exception. Separation follows whitespace, tonal change, hairline, then shadow. Glass treatment is limited to navigation, technical labels, and architecture nodes.

## Depth and elevation

CSS perspective establishes three semantic depth bands:

- Far: grid, topology, and ambient mesh
- Content: portrait and product evidence
- Near: system labels, connection nodes, and inspection details

Mockups use restrained perspective, screen illumination, edge reflections, and layered shadows. No content depends on 3D.

## Motion

Motion categories are ambient, editorial reveal, interaction, navigation, project transition, scroll-linked progress, and spatial spring. Animations use transform and opacity, retain native scrolling, and never block content. Section titles reveal as a single staggered semantic unit. Project filtering uses React 19.3 View Transitions; physical scroll changes continue to use Motion springs.

Continuous motion pauses when offscreen, when the document is hidden, when the user invokes the rail control, or when `prefers-reduced-motion` is active. Reduced motion removes parallax, pulses, scanning, continuous rails, view-transition choreography, and spatial transforms while preserving the complete composition.

## Transition system

- Same-page navigation moves focus to the destination and uses native smooth scrolling only when motion is allowed.
- Project-filter state is reflected in `?work=` and participates in browser history.
- A shared filter indicator provides continuity between filter states.
- Project entries and exits use short opacity/transform transitions; no long-lived page snapshot is kept.
- Theme changes use React scheduling without animating every page pixel.

## Accessibility

Semantic landmarks and headings are preserved. Controls meet 44 px touch targets, focus remains visible, capability selection uses a vertical ARIA tab pattern with arrow-key navigation, and same-page links restore programmatic focus. The technology rail has a visible pause/resume control. Content never depends on hover, and the system flow includes a readable accessible label. Dark and light modes maintain semantic contrast roles.

## Performance policy

- Spatial scenes use CSS transforms and existing Motion primitives; no WebGL runtime is shipped.
- Desktop and mobile project media are mutually mounted rather than duplicated and hidden.
- Media-query and visibility subscriptions are shared through external stores.
- Safe, non-sticky below-fold sections use `content-visibility: auto` with intrinsic-size fallbacks; sticky and scroll-observed sections remain fully rendered. Project images are lazy-loaded with fixed dimensions.
- Hero and rail loops stop when they cannot contribute to the current viewport.

## Breakpoints

- Compact mobile: 320–360 px
- Mobile: 375–430 px
- Tablet: 768 px
- Compact desktop: 1024 px
- Desktop: 1280–1440 px
- Wide desktop: 1920 px

Pointer-only depth is disabled on coarse pointers. Sticky project storytelling becomes a linear media-first narrative below 900 px.

## Asset policy

The portrait uses a 94 KB WebP source with an optimized JPEG fallback. Project screenshots are never fabricated; missing media remains clearly marked. Technology marks come from the CC0-licensed Simple Icons project and render monochromatically.
