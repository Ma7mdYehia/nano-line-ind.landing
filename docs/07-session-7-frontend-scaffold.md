# Session 7 — Frontend Scaffold

## Project
Nano Line Healthy Bread Production Line  
Model: **NL-RM210 / Steel Master**

---

# 0. Goal

Create the actual website project skeleton so the Session 8 build can implement
each section against a working, type-checked, buildable foundation.

This session **scaffolds** the project. It does not produce the final UI for
every section — section bodies that are not yet built render a clearly marked
placeholder and are Session 8 targets.

---

# 1. Stack

Per CLAUDE.md §7:

- **Next.js 14** (App Router)
- **TypeScript** (strict mode)
- **Tailwind CSS 3.4** with design tokens from Session 5
- Component-based structure
- English-first route, Arabic-ready content layer

---

# 2. What Was Created

## Configuration
- `package.json`, `tsconfig.json` (strict, `@/*` path alias)
- `next.config.mjs` (AVIF/WebP image formats enabled)
- `tailwind.config.ts` — full Session 5 token set (colors, type scale, spacing,
  radius, shadows, max-widths)
- `postcss.config.mjs`, `.eslintrc.json`, `.gitignore`

## App
- `app/layout.tsx` — root layout, SEO metadata from content, `lang`/`dir`
- `app/page.tsx` — assembles all 15 sections in the Session 1 order + StickyCTA
- `app/globals.css` — Tailwind layers + design tokens as CSS variables, focus
  rings, tabular numerals, `.overline` and `.container-content` helpers

## Library (pure logic)
- `lib/constants.ts` — capacity thresholds (3500 / 6000), input bounds, lead-time
  range, canonical add-on names, form draft key
- `lib/calculator.ts` — `computeRequiredHourly`, `computeMonthly`,
  `resolveConfiguration`, `suggestAddons`, `calculate` (Session 6 §3–§5).
  Pure, deterministic, no pricing.

## Content (i18n-ready)
- `content/types.ts` — `LandingContent` model
- `content/landing.en.ts` — English copy from Session 2
- `content/landing.ar.ts` — Arabic placeholder (RTL, falls back to English)
- `content/index.ts` — `getContent(locale)`

## Components
Shared UI: `ui/CTAButton` (5 variants), `ui/SectionHeader`, `ui/ScaffoldNote`.

Section components (one per section, Session 1 order):
`Header`, `HeroSection`, `TrustBar`, `ProblemSection`, `SolutionSection`,
`ProductionFlexibilitySection`, `ProductionCalculator`, `ProductionStagesSection`,
`AddOnsSection`, `ManufacturingTimeline`, `SiteRequirementsSection`,
`LeadQualificationForm`, `NoFixedPriceSection`, `FinalCTA`, `Footer`, `StickyCTA`.

## Public
- `public/images/`, `public/videos/` (with `.gitkeep`)

---

# 3. What Is Already Functional (beyond stubs)

- **Header** — sticky nav with anchor links + quotation CTA
- **HeroSection** — full hero copy, bullets, dual CTAs
- **TrustBar** — all 7 spec badges, horizontal scroll on mobile
- **ProductionCalculator** — wired to `lib/calculator.ts`; live required-hourly,
  monthly output, result-state message, and suggested add-ons
- **ManufacturingTimeline** — lead-time callout from `LEAD_TIME` constants
- **FinalCTA / Footer** — full copy and CTAs
- **StickyCTA** — appears after hero scroll (mobile)

Sections showing a dashed **Scaffold** panel (Session 8 build targets):
Problem, Solution, Flexibility, Stages, Add-ons, Site Requirements, Lead Form,
No-Fixed-Price.

---

# 4. Verification

- `npm run typecheck` — passes, zero type errors
- `npm run build` — compiles successfully, all routes prerendered as static

---

# 5. Design / Content Fidelity

- All colors, type sizes, spacing, radii, and shadows come from the Session 5
  token set in `tailwind.config.ts` — no ad-hoc values in components except a few
  exact hex result-card text colors noted inline.
- All visible text is sourced from `content/landing.en.ts` (Session 2), never
  hardcoded in components.
- **No prices** anywhere. The calculator outputs production figures only.

---

# 6. Handoff to Session 8 — Frontend Build

Build out each placeholder section against this scaffold:

1. Hero visual + floating spec cards
2. Problem pain-point cards + comparison visual
3. Solution benefit cards
4. Flexibility round/square toggle + spec cards
5. Calculator → upgrade to full multi-step UI with validation + form prefill
6. Production stages (sticky nav / accordion)
7. Add-on cards
8. Manufacturing 5-step timeline
9. Site requirements cards + factory diagram
10. Lead qualification multi-step form + summary panel + success state
11. No-fixed-price variables graphic

Use placeholder visual blocks first (Session 3 blueprint), then integrate final
assets in Session 9.
