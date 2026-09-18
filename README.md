# Koeurng Vireak Portfolio

A recruiter-focused developer portfolio built from Vireak's real projects and technical background. Portfolio V4 adds cinematic spatial engineering without changing the evidence-first content model.

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
- Data-driven content in `src/data/portfolio.ts` so the portfolio can be updated without rewriting UI components.

## Stack

- React 19
- TypeScript
- Vite 8
- Tailwind CSS 4 using `@tailwindcss/vite`
- Motion for React
- Lucide React
- Self-hosted Manrope variable font
- Simple Icons (CC0 brand SVG paths)

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

## Where to edit your content

Most personal/project content is intentionally centralized here:

```text
src/data/portfolio.ts
```

Update your name, role, contact details, skill areas, projects, and journey there.

Each project also has a `presentation` value that selects its browser, desktop, phone/dashboard, dashboard, or POS frame, plus a restrained `accent` used by its product scene. Add verified screenshots through the optional `media` field; the UI keeps an explicitly labeled placeholder until those assets exist.

The visual system and rationale are documented in `DESIGN.md`.

## Before publishing

- Replace the GitHub avatar with a local professional headshot if desired.
- Add a verified LinkedIn URL only if you want it public.
- Add a real resume PDF only when the final resume is ready.
- Add screenshots for the best projects after capturing them from real builds.
- Deploy to Vercel, Netlify, Cloudflare Pages, or another static host.
- Connect a custom domain after the content and screenshots are final.

## Content integrity rule

Only publish claims you can explain in an interview. Prefer concrete evidence such as architecture, testing, security controls, workflows, and shipped functionality over percentages or inflated metrics.
