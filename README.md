# Koeurng Vireak Portfolio

A recruiter-focused developer portfolio built from Vireak's real projects and technical background. Portfolio V5 evolves the experience into a systems field manual: cinematic where spatial context helps, quiet where recruiters need to read, and evidence-first throughout.

Production: https://reak-portfolio-brown.vercel.app/

## Design goals

- Product-first presentation inspired by modern technical portfolios, without copying another developer's branding or claims.
- No fabricated years of experience, clients, or proficiency percentages.
- Evidence-driven project stories: architecture, security decisions, testing, project status, and public GitHub links where available.
- Responsive, accessible, editorial dark-first UI with an intentional light mode and `prefers-reduced-motion` support.
- Evidence-led project case studies covering problem, solution, role, architecture, security, testing, and status.
- A layered CSS-3D portrait scene with grid, mesh, topology, and a reusable system-flow identity.
- CSS-perspective product frames and subtle pointer interactions with complete static fallbacks.
- Interactive capability architecture and a licensed monochrome technology rail.
- Native-scroll featured-project storytelling with a simpler mobile composition.
- React 19.3 View Transitions for project-filter state changes, with reduced-motion fallbacks.
- URL-backed project filters, keyboard-operable capability tabs, and an explicit pause control for continuous motion.
- A fixed wide-screen system rail and inter-section architecture handoffs that make the page read as one connected system.
- Offscreen and hidden-document animation pausing to protect mobile battery and rendering time.
- Data-driven content in `src/data/portfolio.ts` so the portfolio can be updated without rewriting UI components.

## Stack

- React 19
- TypeScript
- Vite 8
- Tailwind CSS 4 using `@tailwindcss/vite`
- Motion for React
- Lucide React
- Self-hosted Manrope variable font
- Local CC0 brand SVG paths sourced from Simple Icons

## Portfolio sections

1. Cinematic spatial hero
2. Recruiter-focused profile facts
3. About
4. Capabilities / technology evidence
5. Sticky, filterable engineering case studies
6. Education + engineering journey
7. System-resolution contact

## Featured projects

- Koupreng E-Invitation
- KRAMA
- Face Attendance Studio
- E-Menu SaaS
- Loan Management System
- Sale Management System

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL printed by Vite.

## Production build

```bash
npm run build
npm run preview
```

The production site is deployed as a static Vite application on Vercel. `vercel.json` adds conservative response headers without overriding Vercel's immutable caching for hashed build assets. Hash navigation and query-backed Inspector states load from the canonical `/` document, so no SPA rewrite is required for the current single-page architecture.

## Architecture overview

- `src/data/portfolio.ts` owns public profile and project evidence.
- Section components render the portfolio narrative; reusable motion, visual, mockup, and project components keep behavior isolated.
- The Engineering Inspector is loaded as a separate chunk only when requested and restores focus when closed.
- Shared media-query, visibility, and intersection observers pause continuous decoration when it cannot contribute.
- CSS is split by tokens, base, typography, layout, components, sections, motion, responsive behavior, accessibility, and utilities.

## Accessibility and motion policy

The site targets WCAG 2.2 AA: semantic landmarks, visible keyboard focus, labelled dialogs and tabs, keyboard-operable navigation, 44 px touch targets, resilient forced-colors styling, and dark/light semantic contrast. `prefers-reduced-motion` removes continuous rails, scanner effects, parallax, shared-element travel, theme radial animation, and Inspector travel while keeping all content available. Continuous motion also pauses offscreen and while the document is hidden.

## SEO and sharing

Canonical, Open Graph, Twitter summary, Person, and WebSite metadata live in `index.html`. Crawl directives and the single canonical page are defined in `public/robots.txt` and `public/sitemap.xml`. A social image is intentionally omitted until a final 1200x630 asset exists, preventing broken previews.

When a custom domain is introduced, update the canonical origin in `index.html`, `public/robots.txt`, and `public/sitemap.xml` together.

## Production quality targets

- Accessibility, SEO, and Best Practices: 95 or higher in representative Lighthouse runs.
- Performance: 90 or higher on representative desktop runs, with strong mobile results and no artificial audit-only behavior.
- Release gate: `npx tsc -b`, `npm run build`, `npm run preview`, `git diff --check`, and a browser keyboard/responsive pass.

## Where to edit your content

Most personal/project content is intentionally centralized here:

```text
src/data/portfolio.ts
```

Update your name, role, contact details, skill areas, projects, and journey there.

Each project also has a `presentation` value that selects its browser, desktop, phone/dashboard, dashboard, or POS frame, plus a restrained `accent` used by its product scene. Add verified screenshots through the optional `media` field; the UI keeps an explicitly labeled placeholder until those assets exist.

The visual system and rationale are documented in `DESIGN.md`.

The CSS foundation is split by responsibility under `src/styles/`: tokens, base, typography, layout, reusable components, sections, motion, responsive behavior, accessibility, and utilities. Legacy V2–V4 override layers have been consolidated into those final owners.

## Before publishing

- Add a verified LinkedIn URL only if you want it public.
- Add a real resume PDF only when the final resume is ready.
- Add screenshots for the best projects after capturing them from real builds.
- Create a final 1200x630 social card before enabling `og:image` and `twitter:image`.
- Connect a custom domain when ready, then update every canonical-origin location listed above.

## Content integrity rule

Only publish claims you can explain in an interview. Prefer concrete evidence such as architecture, testing, security controls, workflows, and shipped functionality over percentages or inflated metrics.
