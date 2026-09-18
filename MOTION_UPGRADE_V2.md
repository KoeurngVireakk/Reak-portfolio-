# Portfolio V3 — Spatial Motion System

This version upgrades the portfolio without changing the underlying personal/project facts.

## Motion system

- Spring-smoothed page scroll progress indicator
- Active navigation indicator using shared-layout animation
- Hero reveal with restrained CSS perspective and pointer-aware tilt
- Spring-smoothed portrait parallax with a static reduced-motion fallback
- Floating engineering labels drawn only from demonstrated capabilities
- Low-opacity desktop cursor spotlight that never captures pointer input
- Staggered hero, capabilities, and project transitions using shared tokens
- Animated project-category filtering with layout transitions
- Project-specific browser, desktop, phone/dashboard, dashboard, and POS frames
- Native-scroll sticky featured-project storytelling on wide viewports
- Simplified vertical project storytelling on mobile and coarse pointers
- Journey timeline draw animation
- Animated theme icon transition
- Animated mobile navigation entrance/exit

## Professional motion rules used

1. Motion supports hierarchy and navigation; it is not used on every text element.
2. Hover movement stays small to avoid a game-like interface.
3. Major entrances use the same Silk easing family for consistency.
4. Pointer effects use spring return and move only a few pixels or degrees.
5. `prefers-reduced-motion` disables decorative, layout, tilt, and parallax motion.
6. Project filters retain layout animation so content moves rather than abruptly jumps.
7. No WebGL dependency is required; ordinary content remains immediate and indexable.

## Recommended next visual upgrade

Replace project monograms with real screenshots. The reusable frame system is ready for those assets without changing project-story markup.
