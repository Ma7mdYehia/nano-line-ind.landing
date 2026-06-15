# nano-line-ind.landing

Nano Line Industries — Healthy Bread Production Line landing page  
Model: **NL-RM210 / Steel Master**

English-first B2B landing page that explains a custom, built-to-order industrial
healthy bread production line and qualifies leads for the sales team. **No prices
are ever displayed** — pricing is handled through a customized quotation after
technical review.

## Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router) + TypeScript
- [Tailwind CSS](https://tailwindcss.com/) with design tokens from Session 5
- Component-based structure, English-first with an Arabic-ready content layer

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

## Project Structure

```txt
app/
  layout.tsx          # root layout, metadata, locale/dir
  page.tsx            # assembles all sections in order
  globals.css         # Tailwind + design tokens (CSS variables)
components/
  ui/                 # CTAButton, SectionHeader, ScaffoldNote
  Header.tsx … StickyCTA.tsx   # one component per landing section
lib/
  calculator.ts       # pure production-calculator logic (Session 6)
  constants.ts        # thresholds, bounds, add-on names
content/
  types.ts            # LandingContent model
  landing.en.ts       # English copy (Session 2)
  landing.ar.ts       # Arabic-ready placeholder (RTL)
  index.ts            # getContent(locale)
public/
  images/ videos/     # asset placeholders
docs/
  01 … 07             # session documentation (strategy → scaffold)
```

## Status — V1 Complete (Session 8)

All 15 sections are fully implemented and `npm run build` passes with zero errors.
The production calculator, 5-step lead qualification form, interactive production
stages explorer, round/square bread toggle, and all supporting sections are live.

**Next step:** Session 10 — QA, polish, and launch readiness.

See `docs/` for the full plan and `CLAUDE.md` for project rules and the QA checklist.
