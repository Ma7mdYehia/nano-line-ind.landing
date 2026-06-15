# CLAUDE.md — Nano Line Healthy Bread Landing Page Handoff

## Project Name
Nano Line Healthy Bread Production Line Landing Page

## Repository
`Ma7mdYehia/nano-line-ind.landing`

## Product
Nano Line Industries Healthy Bread Production Line  
Model: **NL-RM210 / Steel Master**

---

# 1. Current Project State

This repository is being prepared for Claude-assisted planning, UX, design, and frontend implementation.

Current source-of-truth documentation has been added under `/docs`:

1. `docs/01-session-1-project-brief-strategy.md`
2. `docs/02-session-2-final-english-landing-page-copy.md`
3. `docs/03-session-3-visual-video-blueprint.md`
4. `docs/04-session-4-ux-wireframe.md`
5. `docs/05-session-5-ui-direction-design-system.md`
6. `docs/06-session-6-calculator-logic-lead-form-ux.md`

This `CLAUDE.md` file is the master handoff and project execution plan.

At this stage, the repository contains documentation only. No frontend framework has been scaffolded yet.

---

# 2. Important Business Context

We are building an English-first B2B landing page for Nano Line Industries.

The landing page should sell and explain a custom industrial healthy bread production line, not a simple off-the-shelf machine.

The page should help the sales team qualify serious leads before sending a short customized quotation.

The page must be visually rich, sales-focused, technically clear, conversion-oriented, and ready for Arabic expansion later.

---

# 3. Key Strategic Rules

## Must Communicate

- The line is customizable.
- Production capacity can be increased depending on project requirements.
- Loaf size, weight, and shape can be adjusted.
- The line can be configured for round or square bread.
- The line is built-to-order, not ready-stock.
- Pricing is handled through a customized quotation after technical review.
- Average manufacturing and preparation lead time can be communicated as approximately 120–180 days, depending on the final configuration.
- The page should qualify leads for the sales team through a calculator and a detailed form.

## Must Avoid

- Do not display prices anywhere on the website.
- Do not display financial offer tables.
- Do not show quotation values.
- Do not promise fixed delivery dates.
- Do not say the line is immediately available.
- Do not overpromise a fixed production capacity without saying that capacity depends on loaf size, weight, shape, and configuration.
- Do not use raw PDF screenshots as final website visuals.
- Do not make the landing page look like a downloadable brochure.
- Do not make add-ons look like ecommerce products.

---

# 4. Source Documents

The project strategy was built from two uploaded PDF documents.

## Technical Offer PDF

Used as the primary source for:

- Machine stages
- Technical features
- Loaf size and weight range
- Production capacity range
- Site requirements
- Installation, training, delivery, and warranty logic
- Add-on references
- CE certification reference

Important technical references from the offer:

- Production capacity: approximately 3,500–6,000 loaves/hour depending on loaf size, weight, shape, and configuration.
- Loaf size: approximately 20–30 cm.
- Loaf weight: approximately 30–100 g.
- Approximate space requirement: 8 × 22 m.
- Production stages include dough divider, proofer, dough rounding, dough arrangement, dough sheeter, bread forming, transfer conveyors, baking chamber, and cooling conveyors.

## Financial Offer PDF

Used only as internal commercial context for:

- Add-on categories
- Sales quotation logic
- Commercial workflow

Important: the financial offer contains prices, but prices must not be shown on the landing page.

---

# 5. Completed Sessions

## Session 1 — Project Brief + Strategy

File: `docs/01-session-1-project-brief-strategy.md`

Outcome:

The landing page should be treated as a sales enablement and lead qualification tool.

Main angle:

> Tell us what bread you want to produce and how much output you need — we will configure the production line around your project.

---

## Session 2 — Final English Landing Page Copy

File: `docs/02-session-2-final-english-landing-page-copy.md`

Outcome:

English landing page copy is ready for UX, design, and frontend build.

---

## Session 3 — Visual / Video Blueprint

File: `docs/03-session-3-visual-video-blueprint.md`

Outcome:

Visual strategy is ready for design and asset production.

---

## Session 4 — UX Wireframe

File: `docs/04-session-4-ux-wireframe.md`

Outcome:

Desktop/mobile UX structure is ready for UI direction and implementation.

---

## Session 5 — UI Direction / Design System

File: `docs/05-session-5-ui-direction-design-system.md`

Outcome:

UI direction and design system are ready for implementation.

Key decisions:

- Navy `#0D1F3C`
- Slate Blue `#1E3A5F`
- Amber `#D97706` for CTAs/action states only
- Steel Light `#E5E9EF`
- Inter typography
- 4px spacing base
- 1280px main container, 1440px wide container
- Lucide icons
- Split-panel calculator
- Multi-step form with live summary panel
- Sticky-left stage timeline on desktop and accordions on mobile

---

## Session 6 — Calculator Logic + Lead Form UX

File: `docs/06-session-6-calculator-logic-lead-form-ux.md`

Outcome:

Calculator and lead form logic are ready for implementation.

Key decisions:

- Calculator estimates production only, never price.
- `requiredHourlyProduction = ceil(dailyLoaves / dailyWorkingHours)`
- `estimatedMonthlyProduction = dailyLoaves × monthlyWorkingDays`
- Standard state: `<= 3500`
- Custom state: `3501–6000`
- Higher-capacity state: `> 6000`
- Calculator fields can prefill lead form fields.
- Lead payload must never include price fields.
- Sales handoff templates are defined for WhatsApp and email.

---

# 6. Next Session

## Session 7 — Frontend Scaffold

Goal:
Create the actual website project scaffold without building the full final UI yet.

Suggested stack:

- Next.js
- TypeScript
- Tailwind CSS
- Component-based structure
- English-first route
- Arabic-ready structure later

Session 7 should create:

- Base project structure
- App layout
- Content file foundation
- Component placeholders
- Design token setup
- Tailwind configuration aligned with Session 5
- Calculator utility functions foundation based on Session 6
- Form payload structure foundation
- Placeholder assets directories
- Basic README/update notes if useful

Do not build final polished sections in Session 7. Session 7 is for scaffold and architecture.

---

# 7. Recommended Claude Start Prompt

Use this prompt when bringing Claude into the repository for the next stage:

```text
Continue in Claude Opus 4.8.

You are working inside the GitHub repository for the Nano Line Healthy Bread Production Line landing page.

Start by reading:
1. CLAUDE.md
2. docs/01-session-1-project-brief-strategy.md
3. docs/02-session-2-final-english-landing-page-copy.md
4. docs/03-session-3-visual-video-blueprint.md
5. docs/04-session-4-ux-wireframe.md
6. docs/05-session-5-ui-direction-design-system.md
7. docs/06-session-6-calculator-logic-lead-form-ux.md

Important rules:
- Do not display prices anywhere.
- Treat the landing page as a B2B sales qualification tool.
- The line is customizable and built-to-order.
- The page must be visually rich, technical, clean, and conversion-focused.
- Use the calculator only for production estimates, not pricing.
- The calculator and form logic are already defined.
- The UI design system is already defined.

Your task is Session 7: Frontend Scaffold.

Create the Next.js + TypeScript + Tailwind project scaffold and architecture only.

Required output:
1. Package/project setup
2. App structure
3. Tailwind/design token setup based on Session 5
4. Content structure based on Session 2
5. Component placeholder structure based on Session 4
6. Calculator utility foundation based on Session 6
7. Lead form payload foundation based on Session 6
8. Public asset folders
9. README or setup notes if needed

Do not create final polished UI yet.
Do not add prices anywhere.
Do not use raw PDF screenshots.
```

---

# 8. Current Final Section Order

1. Header / Navigation
2. Hero Section
3. Trust / Specification Bar
4. Problem Section
5. Solution Section
6. Production Flexibility Section
7. Production Calculator Section
8. Production Stages Section
9. Optional Add-ons Section
10. Manufacturing & Delivery Section
11. Site Requirements Section
12. Lead Qualification Form
13. Why No Fixed Price Section
14. Final CTA Section
15. Footer

---

# 9. Recommended Component Map

```txt
Header
HeroSection
TrustBar
ProblemSection
SolutionSection
ProductionFlexibilitySection
ProductionCalculator
ProductionStagesSection
AddOnsSection
ManufacturingTimeline
SiteRequirementsSection
LeadQualificationForm
NoFixedPriceSection
FinalCTA
Footer
StickyCTA
```

Supporting components:

```txt
SectionHeader
CTAButton
SpecBadge
BenefitCard
StageCard
AddOnCard
TimelineStep
FormStep
SummaryPanel
CalculatorResultCard
```

---

# 10. Suggested Project Structure

```txt
app/
  page.tsx
  layout.tsx
components/
  Header.tsx
  HeroSection.tsx
  TrustBar.tsx
  ProblemSection.tsx
  SolutionSection.tsx
  ProductionFlexibilitySection.tsx
  ProductionCalculator.tsx
  ProductionStagesSection.tsx
  AddOnsSection.tsx
  ManufacturingTimeline.tsx
  SiteRequirementsSection.tsx
  LeadQualificationForm.tsx
  NoFixedPriceSection.tsx
  FinalCTA.tsx
  Footer.tsx
  StickyCTA.tsx
  ui/
    CTAButton.tsx
    SectionHeader.tsx
    SpecBadge.tsx
    BenefitCard.tsx
    StageCard.tsx
    AddOnCard.tsx
    TimelineStep.tsx
    SummaryPanel.tsx
    CalculatorResultCard.tsx
content/
  landing.en.ts
  landing.ar.ts
lib/
  calculator.ts
  leadPayload.ts
  validation.ts
public/
  images/
  videos/
```

---

# 11. Project Success Criteria

The landing page is successful if it:

- Explains the line quickly and visually.
- Makes customization clear.
- Shows round and square bread possibilities.
- Makes the built-to-order model clear.
- Avoids public pricing.
- Gives sales enough data to prepare a short customized quotation.
- Looks like a premium industrial website, not a brochure.
- Works perfectly on mobile.
- Uses visuals and diagrams to educate the customer.
- Implements calculator and lead form logic without pricing output.

---

# 12. Final Instruction for Claude

Always keep the sales goal in mind:

> The website should not just inform the visitor. It should prepare the visitor to submit enough project data so sales can send a customized quotation quickly.
