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

This `CLAUDE.md` file is the master handoff and project execution plan.

At this stage, the repository contains documentation only. No frontend framework has been scaffolded yet.

---

# 2. Important Business Context

We are building an English-first B2B landing page for Nano Line Industries.

The landing page should sell and explain a custom industrial healthy bread production line, not a simple off-the-shelf machine.

The page should help the sales team qualify serious leads before sending a short customized quotation.

The user wants the page to be visually rich, sales-focused, and technically clear.

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
- Do not make the landing page look like a PDF brochure.

---

# 4. Source Documents

The project strategy was built from two uploaded PDF documents:

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

Purpose:

- Define project positioning
- Define target audience
- Define customer objections
- Define landing page section order
- Define CTA hierarchy
- Define calculator strategy
- Define content rules

Outcome:

The landing page should be treated as a sales enablement and lead qualification tool.

Main angle:

> Tell us what bread you want to produce and how much output you need — we will configure the production line around your project.

---

## Session 2 — Final English Landing Page Copy
File: `docs/02-session-2-final-english-landing-page-copy.md`

Purpose:

- Finalize English website copy
- Write section-by-section content
- Define CTA copy
- Define calculator labels and messages
- Define form labels and success message
- Explain why no fixed price is displayed

Outcome:

English landing page copy is ready for UX wireframing and frontend build.

---

## Session 3 — Visual / Video Blueprint
File: `docs/03-session-3-visual-video-blueprint.md`

Purpose:

- Define image and video direction for each section
- Map visual references to PDF page numbers
- Identify which visuals should be AI-generated or redesigned
- Define must-have, should-have, and nice-to-have media
- Provide AI image and video prompt templates

Outcome:

Visual strategy is ready for design and asset production.

---

# 6. Next Sessions / Project Roadmap

## Session 4 — UX Wireframe

Goal:
Create the full landing page UX structure before starting UI design or code.

Deliverables:

- Desktop wireframe
- Mobile wireframe
- Section-by-section layout
- Sticky CTA behavior
- Calculator placement
- Form flow
- Visual placement
- Navigation anchors
- Scroll behavior suggestions

Key requirements:

- Hero above the fold must be strong and conversion-focused.
- Calculator should appear before the long technical stages section.
- Production stages section should be visually rich and interactive.
- Mobile experience must be clean, fast, and CTA-driven.

---

## Session 5 — UI Direction / Design System

Goal:
Create the visual design direction for the website.

Deliverables:

- Color palette
- Typography system
- Spacing system
- Section style rules
- Card styles
- Button styles
- Icon direction
- Form style
- Calculator UI style
- Stage timeline style
- Visual treatment rules

Suggested design direction:

- Premium industrial B2B
- Light theme
- White / off-white backgrounds
- Steel gray and deep navy
- Controlled orange/yellow Nano Line accent
- Clean technical cards
- Modern motion and diagrams

---

## Session 6 — Calculator Logic + Lead Form UX

Goal:
Turn the calculator and form into clear implementation-ready components.

Calculator inputs:

- Required loaves per day
- Daily working hours
- Target loaf weight
- Target loaf shape
- Target loaf size
- Monthly working days
- Mixing system required?
- Packaging support required?

Calculator outputs:

- Required hourly production
- Estimated monthly production
- Standard / Custom / Higher-capacity recommendation
- Suggested add-ons
- CTA to request quotation

Recommendation logic:

- `requiredHourlyProduction = dailyLoaves / dailyWorkingHours`
- `monthlyProduction = dailyLoaves * monthlyWorkingDays`

If `requiredHourlyProduction <= 3500`:

- Standard configuration may be suitable.

If `requiredHourlyProduction > 3500 && requiredHourlyProduction <= 6000`:

- Custom configuration is recommended.

If `requiredHourlyProduction > 6000`:

- Higher-capacity customization or multi-line study is recommended.

Important:

- No pricing output.
- No estimated price.
- No financial calculation.
- The calculator qualifies production needs only.

---

## Session 7 — Frontend Scaffold

Goal:
Create the actual website project.

Suggested stack:

- Next.js
- TypeScript
- Tailwind CSS
- Component-based structure
- English-first route
- Arabic-ready structure later

Suggested folders:

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
lib/
  calculator.ts
content/
  landing.en.ts
public/
  images/
  videos/
```

---

## Session 8 — Frontend Build

Goal:
Implement the full landing page with placeholder assets first.

Deliverables:

- Responsive homepage
- All sections from final copy
- Production calculator component
- Multi-step lead form component
- Sticky CTA
- Mobile WhatsApp/contact CTA
- Placeholder visual blocks based on visual blueprint

---

## Session 9 — Asset Production + Integration

Goal:
Replace placeholders with final visuals.

Deliverables:

- Hero visual or video
- Round/square bread renders
- Production stage images
- Site layout diagram
- Add-on cards
- Final CTA visual
- Optimized WebP/AVIF image exports
- Lightweight video loops where needed

---

## Session 10 — QA, Polish, and Launch Readiness

Goal:
Final review before publishing.

Checklist:

- No prices anywhere
- No raw PDF screenshots
- No unsupported claims
- All technical numbers are consistent
- Calculator works correctly
- Form works correctly
- Mobile layout is polished
- Images are optimized
- Page speed is acceptable
- CTA hierarchy is clear
- Meta title and description added
- Accessibility alt text added
- Final content reviewed for English clarity

---

# 7. Recommended Claude Start Prompt

Use this prompt when bringing Claude into the repository:

```text
Continue in Claude Opus 4.8.

You are working inside the GitHub repository for the Nano Line Healthy Bread Production Line landing page.

Start by reading:
1. CLAUDE.md
2. docs/01-session-1-project-brief-strategy.md
3. docs/02-session-2-final-english-landing-page-copy.md
4. docs/03-session-3-visual-video-blueprint.md

Important rules:
- Do not display prices anywhere.
- Treat the landing page as a B2B sales qualification tool.
- The line is customizable and built-to-order.
- The page must be visually rich, technical, clean, and conversion-focused.
- Use the calculator only for production estimates, not pricing.

Your first task is Session 4: UX Wireframe.

Create a detailed UX wireframe plan for desktop and mobile, including section order, layout direction, CTA placement, calculator placement, form flow, visual placement, sticky CTA behavior, and responsive behavior.

Do not write frontend code yet.
Do not create UI design yet.
Focus only on UX structure.
```

---

# 8. Current Final Section Order

1. Hero Section
2. Trust / Specification Bar
3. Problem Section
4. Solution Section
5. Production Flexibility Section
6. Production Calculator Section
7. Production Stages Section
8. Optional Add-ons Section
9. Manufacturing & Delivery Section
10. Site Requirements Section
11. Lead Qualification Form
12. Why No Fixed Price Section
13. Final CTA Section

---

# 9. Project Success Criteria

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

---

# 10. Final Instruction for Claude

Always keep the sales goal in mind:

> The website should not just inform the visitor. It should prepare the visitor to submit enough project data so sales can send a customized quotation quickly.
