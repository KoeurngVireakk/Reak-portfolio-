# Koeurng Vireak Portfolio

A recruiter-focused developer portfolio built from Vireak's real projects and technical background.

## Design goals

- Product-first presentation inspired by modern technical portfolios, without copying another developer's branding or claims.
- No fabricated years of experience, clients, or proficiency percentages.
- Evidence-driven project cards: architecture, security decisions, testing, project status, and public GitHub links where available.
- Responsive, accessible, dark-first UI with light mode and `prefers-reduced-motion` support.
- Data-driven content in `src/data/portfolio.ts` so the portfolio can be updated without rewriting UI components.

## Stack

- React 19
- TypeScript
- Vite 8
- Tailwind CSS 4 using `@tailwindcss/vite`
- Motion for React
- Lucide React

## Portfolio sections

1. Hero
2. Real portfolio facts
3. About
4. Capabilities / technology evidence
5. Filterable project showcase
6. Education + engineering journey
7. Contact

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

## Before publishing

- Replace the GitHub avatar with a local professional headshot if desired.
- Add a verified LinkedIn URL only if you want it public.
- Add a real resume PDF only when the final resume is ready.
- Add screenshots for the best projects after capturing them from real builds.
- Deploy to Vercel, Netlify, Cloudflare Pages, or another static host.
- Connect a custom domain after the content and screenshots are final.

## Content integrity rule

Only publish claims you can explain in an interview. Prefer concrete evidence such as architecture, testing, security controls, workflows, and shipped functionality over percentages or inflated metrics.
