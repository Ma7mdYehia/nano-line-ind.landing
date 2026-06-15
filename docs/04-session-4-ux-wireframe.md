# Session 4 — UX Wireframe

## Project
Nano Line Healthy Bread Production Line  
Model: **NL-RM210 / Steel Master**

---

# 0. Session Goal

Create a complete UX wireframe plan for the English-first Nano Line landing page before UI design or frontend implementation.

This document defines:

- Desktop page structure
- Mobile page structure
- Section-by-section layouts
- CTA placement and behavior
- Calculator placement and flow
- Lead qualification form flow
- Visual placement
- Navigation anchors
- Sticky CTA behavior
- Scroll and interaction behavior
- Implementation-ready component mapping

This is a UX planning document only. It is not a UI design system and not frontend code.

---

# 1. UX Strategy Summary

The landing page should behave like a guided B2B technical sales consultation.

The visitor journey should move through this logic:

1. Understand the product quickly.
2. Trust that it is an industrial solution.
3. Realize why flexibility matters.
4. See that the line can be customized.
5. Estimate their production requirement.
6. Understand the production stages.
7. Review optional add-ons.
8. Understand built-to-order manufacturing.
9. Check site readiness.
10. Submit project information for a customized quotation.

The calculator and lead form are the conversion core of the landing page.

---

# 2. UX Principles

## 2.1 Conversion First

Every section should push the visitor toward one of three actions:

- Calculate production need
- Request technical consultation
- Request custom quotation

## 2.2 Visual Explanation Before Heavy Text

The page should use visuals, diagrams, cards, timelines, and interactive blocks to explain the production line instead of relying on long paragraphs.

## 2.3 No Public Pricing

The UX must never create an expectation that pricing will be shown on-page.

All pricing-related CTAs should lead to:

- Technical review
- Lead form
- Customized quotation request

## 2.4 Built-to-Order Clarity

The page should clearly communicate that the line is custom manufactured and not ready stock.

## 2.5 Sales Qualification

The form and calculator should collect enough data for the sales team to prepare a short customized quotation.

## 2.6 Mobile-First Conversion

Most mobile users should be able to:

- Understand the product quickly
- Use the calculator easily
- Submit a request without feeling overwhelmed
- Contact via WhatsApp from a sticky CTA

---

# 3. Final Page Architecture

## Primary Page Flow

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

## Navigation Anchors

Use short and clear anchors:

- Overview
- Flexibility
- Calculator
- Stages
- Add-ons
- Site
- Quotation

Recommended anchor IDs:

```txt
#overview
#flexibility
#calculator
#stages
#addons
#site
#quotation
```

---

# 4. Desktop Wireframe Overview

## Desktop Layout Style

Use a centered max-width content container with full-width visual sections.

Suggested content widths:

- Main container: 1200–1280 px
- Wide visual container: 1440 px max
- Text column width: 520–640 px
- Form/calculator card width: 480–620 px

## Desktop Above-the-Fold Structure

```txt
┌──────────────────────────────────────────────────────────────┐
│ Header: Logo | Nav | Request Quotation CTA                  │
├──────────────────────────────────────────────────────────────┤
│ Hero Left:                                                   │
│ - Badge: Custom Industrial Line                              │
│ - Headline                                                   │
│ - Subheadline                                                │
│ - 2 CTA buttons                                              │
│ - Small trust text                                           │
│                                                              │
│ Hero Right:                                                  │
│ - Full production line visual / video                        │
│ - Floating cards: Round/Square, 3500–6000, Built-to-order    │
├──────────────────────────────────────────────────────────────┤
│ Trust / Specification Bar                                    │
└──────────────────────────────────────────────────────────────┘
```

Goal:
The user should understand within 5 seconds that this is a custom healthy bread production line with flexible capacity and customizable bread formats.

---

# 5. Section-by-Section Desktop Wireframe

---

## 5.1 Header / Navigation

### Layout

Desktop:

```txt
Logo / Nano Line     Overview  Flexibility  Calculator  Stages  Site     [Request Quotation]
```

### Behavior

- Header should be sticky after the user scrolls past the hero.
- Header background should become solid/light with subtle shadow when sticky.
- Primary CTA should always be visible on desktop.
- Clicking “Request Quotation” scrolls to the lead form.

### UX Notes

Keep the navigation short. Avoid too many technical menu items.

---

## 5.2 Hero Section

### Layout

Two-column layout:

```txt
Left Column 45%                         Right Column 55%
────────────────────────                ─────────────────────────
Badge                                    Hero image / loop video
Headline                                 Floating spec cards
Subheadline                              Optional machine overlay
Bullets
CTA row
Small trust text
```

### Content Priority

1. Headline
2. Custom / built-to-order message
3. Round or square flexibility
4. Calculator CTA

### Visual Placement

Use a large hero visual of the full production line in a clean factory.

Floating cards on the visual:

- Flexible Capacity
- Round / Square Bread
- Built-to-Order
- Technical Review Before Quotation

### CTA Placement

Primary CTA: `Calculate Your Production Need`  
Secondary CTA: `Request Technical Consultation`

### UX Notes

The hero should not feel like a brochure cover. It should feel like an active production solution.

---

## 5.3 Trust / Specification Bar

### Layout

Horizontal badge strip directly under hero:

```txt
[Custom Manufacturing] [CE Certified] [Round/Square] [20–30 cm] [30–100 g] [3500–6000/h] [Industrial Flow]
```

### Behavior

- Badges can use light micro-animation.
- On hover, each badge can show a one-line explanation.

### UX Notes

This section should reduce uncertainty fast without heavy explanation.

---

## 5.4 Problem Section

### Layout

Two-column comparison:

```txt
Left Column: Copy + pain points          Right Column: Split comparison visual
```

Alternative layout:

```txt
Top: Headline + short copy
Bottom: 5 pain-point cards
```

### Visual Placement

Use split visual:

- Manual/semi-manual workflow
- Automated consistent production flow

### CTA Placement

Small text CTA: `Build a Line Around Your Product`

### UX Notes

Keep this section concise. Do not overdramatize the problem.

---

## 5.5 Solution Section

### Layout

Intro section followed by 6 benefit cards:

```txt
Headline + copy

[Higher Consistency] [Lower Manual Handling] [Flexible Product Format]
[Scalable Output]   [Better Production Flow] [Quotation Based on Real Needs]
```

### Visual Placement

Include a small simplified production line illustration or process strip.

### CTA Placement

CTA after benefit cards: `Request a Technical Review`

### UX Notes

This section should bridge from business pain to technical solution.

---

## 5.6 Production Flexibility Section

### Layout

Interactive two-column configuration block:

```txt
Left Column: Product preview
- Toggle: Round / Square
- Bread visual changes by selected shape

Right Column: Spec cards
- Loaf Size
- Loaf Weight
- Production Capacity
- Configuration Note
```

### Interaction

- Toggle between Round and Square bread preview.
- Optional sliders for size and weight can be visual-only at this stage.
- CTA scrolls to calculator.

### Visual Placement

Use clean renders of round and square healthy bread on a conveyor.

### CTA Placement

`Estimate Your Required Capacity`

### UX Notes

This is a critical section. It should make customization obvious without requiring the user to read too much.

---

## 5.7 Production Calculator Section

### Layout

Calculator should be visually prominent and placed before the long stages section.

Desktop layout:

```txt
Left Column: Intro + explanation + no-price note
Right Column: Calculator card

Calculator Card:
Step 1: Production Need
Step 2: Product Specs
Step 3: Automation Needs
Result Panel
CTA
```

Alternative layout for stronger conversion:

```txt
Top: Headline + intro
Bottom: Wide calculator card split into Inputs / Results
```

### Recommended Calculator Layout

```txt
┌──────────────────────────────────────────────────────────────┐
│ Calculator Header                                            │
├──────────────────────────────┬───────────────────────────────┤
│ Inputs                       │ Live Results                  │
│ - Daily loaves               │ - Required hourly output      │
│ - Working hours              │ - Monthly output              │
│ - Weight                     │ - Recommendation              │
│ - Shape                      │ - Suggested add-ons           │
│ - Size                       │                               │
│ - Monthly working days        │ [Request Custom Quotation]    │
│ - Mixing / packaging          │                               │
└──────────────────────────────┴───────────────────────────────┘
```

### Result States

1. Standard configuration may be suitable.
2. Custom configuration recommended.
3. Higher-capacity study recommended.

### CTA Placement

Inside result panel:

`Request a Custom Quotation Based on These Details`

### UX Notes

No prices. No financial output. No “estimated cost”.

The calculator should feel useful even if the user is not ready to submit the form yet.

---

## 5.8 Production Stages Section

### Layout

This should be the richest educational section.

Recommended desktop layout:

```txt
Section Header
Short intro

Sticky Stage Navigation (left)     Dynamic Stage Visual/Card (right)
1. Dough Divider                   Image/video + stage caption
2. Proofer                         Key benefit
3. Dough Rounding                  Optional mini spec
...
9. Cooling Conveyors
```

Alternative:

Horizontal timeline with cards:

```txt
[Dough Divider] → [Proofer] → [Rounding] → [Arrangement] → [Sheeter] → [Forming] → [Conveyors] → [Baking] → [Cooling]
```

### Best UX Recommendation

Use sticky left stage list + changing right-side visual on desktop.

This gives a premium interactive feeling and avoids a long boring list.

### Visual Placement

Each stage gets:

- Stage image or short loop
- Stage name
- 1-line explanation
- Optional “why it matters” note

### CTA Placement

End of section CTA:

`Discuss Your Required Production Flow`

### UX Notes

Use scroll progress to make the production process feel guided.

---

## 5.9 Optional Add-ons Section

### Layout

Modular card grid:

```txt
Headline + copy

[Spiral Mixer] [Electronic Mixing System] [Packing Table]
[Bag Sealing]  [Bread Counter]            [Air Compressor]
[Additional Control Systems]
```

### Visual Placement

Each add-on should have:

- Small product image/render
- Add-on name
- One-line benefit
- Optional tag: `Optional`

### Interaction

Optional “Select add-ons” interaction can feed into the lead form summary later.

### CTA Placement

`Choose the Right Add-ons for Your Project`

### UX Notes

Do not make this look like an e-commerce product grid. No prices, no add-to-cart behavior.

---

## 5.10 Manufacturing & Delivery Section

### Layout

Timeline layout:

```txt
Headline + copy
Lead time note

[1 Requirement Review] → [2 Technical Configuration] → [3 Manufacturing] → [4 Inspection & Shipping] → [5 Installation & Initial Operation]
```

### Visual Placement

Use a clean timeline or process illustration.

### CTA Placement

`Start Your Technical Review`

### UX Notes

This section should set expectations and reduce pressure on sales later.

Recommended wording placement:

> Average manufacturing and preparation lead time is approximately 120 to 180 days, depending on the final approved configuration.

---

## 5.11 Site Requirements Section

### Layout

Two-column layout:

```txt
Left Column:
Headline + copy + requirement cards

Right Column:
Factory layout diagram / 8 × 22 m visual
```

### Requirement Cards

- Production Space
- Industrial Electricity
- Gas or Diesel Setup
- Ventilation and Heat Extraction
- Compressed Air
- Maintenance Access
- Operators and Training

### Visual Placement

Use 2D or isometric layout showing approximate site plan.

### CTA Placement

`Check Your Site Readiness`

### UX Notes

This section should be practical and sales-enabling.

---

## 5.12 Lead Qualification Form

### Layout

Multi-step form with side summary.

Desktop:

```txt
Left: Form steps                         Right: Live summary card
────────────────────                     ─────────────────────
Step indicator                           Selected shape
Current form fields                      Target weight
Navigation buttons                       Daily production
                                         Required hourly output
                                         Selected add-ons
                                         Site readiness status
```

### Form Steps

1. Contact Details
2. Product Requirements
3. Production Capacity
4. Automation & Add-ons
5. Site Readiness

### Step UX

Each step should feel short and easy.

Use progress indicator:

```txt
Step 1 of 5 — Contact Details
```

### CTA Buttons

- Next
- Back
- Submit Requirements

### Success State

After submit:

```txt
Thank you. Your request has been received.
Our team will review your production requirements and contact you to discuss the suitable line configuration and quotation.
```

### UX Notes

The form should be the main conversion section. Make it professional, not overwhelming.

---

## 5.13 Why No Fixed Price Section

### Layout

Two-column explanation:

```txt
Left Column: Headline + copy + CTA
Right Column: Custom quotation variables visual
```

### Visual Placement

Use “variables flowing into custom quotation” graphic.

Variables:

- Capacity
- Loaf size
- Loaf weight
- Loaf shape
- Add-ons
- Site requirements
- Installation scope
- Final configuration

### CTA Placement

`Request a Project-Specific Quotation`

### UX Notes

Place this after the form to support users who scroll looking for price information.

---

## 5.14 Final CTA Section

### Layout

Strong closing block:

```txt
Background visual: finished bread on conveyor
Overlay card:
- Headline
- Short copy
- 3 CTA buttons
- Trust line
```

### CTA Buttons

- Calculate Required Capacity
- Request a Custom Quotation
- Contact Us on WhatsApp

### UX Notes

This section should feel confident and action-driven.

---

## 5.15 Footer

### Layout

```txt
Logo / Nano Line
Short description
Navigation links
Contact links
Language switch placeholder
Legal / copyright
```

### UX Notes

Prepare footer for bilingual expansion later.

---

# 6. Mobile Wireframe

## Mobile UX Goals

- Fast understanding
- Minimal friction
- Easy calculator interaction
- Sticky CTA access
- Clean accordion content
- Avoid video overload

---

## 6.1 Mobile Header

### Layout

```txt
Logo                         Menu Icon
```

Sticky bottom CTA after scroll:

```txt
[Calculate] [WhatsApp]
```

### Behavior

- Top header stays compact.
- Full nav opens in slide-down or side drawer.
- Primary mobile actions should be available from the bottom sticky bar.

---

## 6.2 Mobile Hero

### Layout

```txt
Badge
Headline
Subheadline
CTA buttons stacked
Hero image
Spec mini-cards
```

### UX Notes

Do not autoplay heavy hero videos on mobile. Use a static image or lightweight poster unless optimized.

---

## 6.3 Mobile Trust Bar

### Layout

Horizontal swipe badges:

```txt
[Custom] [CE] [Round/Square] [20–30 cm] [30–100 g] [3500–6000/h]
```

### UX Notes

Badges should be thumb-friendly and readable.

---

## 6.4 Mobile Problem / Solution Sections

### Layout

Stacked cards:

```txt
Headline
Short paragraph
Pain point cards
Visual
CTA
```

### UX Notes

Avoid long text blocks. Use cards and short sentences.

---

## 6.5 Mobile Flexibility Section

### Layout

```txt
Shape toggle: Round | Square
Bread preview image
Spec cards stacked 2 × 2
CTA
```

### UX Notes

The shape toggle should be easy to tap.

---

## 6.6 Mobile Calculator

### Layout

Use a step-based calculator instead of a large two-column layout.

```txt
Step 1: Production Need
- Required loaves/day
- Working hours/day
- Monthly working days

Step 2: Product Specs
- Shape
- Weight
- Size

Step 3: Add-ons
- Mixing
- Packaging

Step 4: Result
- Required hourly production
- Monthly output
- Recommendation
- CTA
```

### UX Notes

Keep all numbers easy to enter on mobile numeric keyboards.

---

## 6.7 Mobile Production Stages

### Layout

Accordion cards:

```txt
[1 Dough Divider]
[2 Proofer]
[3 Dough Rounding]
...
```

Each accordion opens to show:

- Image
- Short description
- Why it matters

### UX Notes

Do not load all videos at once. Use images by default and optional play buttons.

---

## 6.8 Mobile Add-ons

### Layout

Swipe cards or stacked cards.

Each card:

- Image
- Add-on name
- One-line benefit

### UX Notes

No price-like styling.

---

## 6.9 Mobile Manufacturing Timeline

### Layout

Vertical timeline:

```txt
1 Requirement Review
2 Technical Configuration
3 Manufacturing
4 Inspection & Shipping
5 Installation & Initial Operation
```

### UX Notes

Timeline should make the built-to-order process clear.

---

## 6.10 Mobile Site Requirements

### Layout

```txt
Headline
Short copy
Factory layout image
Requirement checklist cards
CTA
```

### UX Notes

Use collapsible cards if the section becomes long.

---

## 6.11 Mobile Lead Form

### Layout

Single-column multi-step form.

```txt
Progress bar
Step title
Fields
Back / Next buttons
```

### UX Notes

- Autosave form progress if possible.
- Keep field labels clear.
- Use dropdowns where possible.
- Avoid showing too many fields at once.

---

# 7. Sticky CTA Behavior

## Desktop

Sticky header CTA:

- Appears after hero scroll.
- CTA text: `Request Quotation`.
- Secondary sticky button can be `Calculate`.

Optional floating side CTA after calculator:

```txt
Need help configuring your line? Request Technical Review
```

## Mobile

Sticky bottom bar after user scrolls past hero:

```txt
[Calculate] [WhatsApp]
```

After the user reaches the calculator or form, update the sticky bar:

```txt
[Request Quotation] [WhatsApp]
```

## CTA Priority by Page Stage

- Hero to calculator
- Calculator to lead form
- Form to submit
- Final CTA to quotation / WhatsApp

---

# 8. Calculator UX Flow

## Entry Points

Users can reach the calculator from:

- Hero CTA
- Production flexibility CTA
- Sticky CTA
- Final CTA

## Calculator Steps

### Step 1 — Production Need

Fields:

- Required loaves per day
- Daily working hours
- Monthly working days

Output preview:

- Required hourly production
- Estimated monthly output

### Step 2 — Product Specs

Fields:

- Target loaf shape
- Target loaf weight
- Target loaf size

Output preview:

- Configuration note

### Step 3 — Automation Needs

Fields:

- Need mixing system?
- Need packaging support?

Output preview:

- Suggested add-ons

### Step 4 — Recommendation

Shows:

- Required hourly production
- Estimated monthly production
- Configuration direction
- Suggested add-ons
- CTA to submit request

## Calculator Result UX

### Result 1 — Standard Configuration May Be Suitable
Use calm positive state.

### Result 2 — Custom Configuration Recommended
Use highlighted recommendation state.

### Result 3 — Higher-Capacity Study Recommended
Use consultative state, not warning/error.

## Calculator Disclaimer

Always show:

> This calculator provides an indicative production estimate only. Final line configuration, capacity, and quotation will be confirmed after technical review.

---

# 9. Lead Qualification Form UX Flow

## Form Goal

Collect sales-ready data without making the user feel like they are filling a complicated technical document.

## Recommended Form Steps

### Step 1 — Contact Details

Fields:

- Full name
- Company name
- Country / city
- Phone / WhatsApp
- Email address

### Step 2 — Product Requirements

Fields:

- Product type
- Preferred loaf shape
- Target loaf weight
- Target loaf size
- Additional product notes

### Step 3 — Production Capacity

Fields:

- Required loaves per day
- Daily working hours
- Monthly working days
- Future capacity expansion?

### Step 4 — Automation & Add-ons

Fields:

- Mixing system?
- Weighing system?
- Packing support?
- Automatic counting?

### Step 5 — Site Readiness

Fields:

- Factory space ready?
- Available space
- Electricity ready?
- Gas or diesel available?
- Ventilation ready?
- Target operation date

## Smart Behavior

If user completed calculator first:

- Auto-fill daily loaves, working hours, shape, weight, size, and add-on preferences into the form.

## Summary Panel

Desktop should show a live summary panel.

Mobile should show a collapsible summary card at the top of the final step.

---

# 10. Scroll & Interaction Behavior

## Recommended Interactions

- Smooth anchor scrolling
- Sticky header after hero
- Floating spec cards in hero
- Toggle in flexibility section
- Calculator live results
- Production stages scroll interaction on desktop
- Accordions on mobile
- Timeline animation for manufacturing section
- Form step progress

## Interactions to Avoid

- Heavy animations that slow the page
- Autoplaying many videos at once
- Overcomplicated 3D interactions in the first version
- Price-like calculators
- Ecommerce-style add-on selection with cart behavior

---

# 11. UX Component Map

Recommended implementation components:

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

Recommended supporting components:

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

# 12. Content-to-UX Mapping

Use `docs/02-session-2-final-english-landing-page-copy.md` as the source of all live text.

Use `docs/03-session-3-visual-video-blueprint.md` as the source of all visuals, asset prompts, and media planning.

The UX should not rewrite the content unless required for layout clarity.

---

# 13. Bilingual Readiness Notes

Although the first page will be English-first, the structure should be Arabic-ready.

Prepare for:

- English route first
- Arabic route later
- RTL layout support later
- Navigation labels from content data
- Section content separated from components
- Form options managed through content/config files

Suggested future content structure:

```txt
content/
  landing.en.ts
  landing.ar.ts
```

---

# 14. Implementation Priority

## Version 1 UX Build

Build first:

1. Hero
2. Trust bar
3. Flexibility section
4. Calculator
5. Production stages
6. Lead form
7. Site requirements
8. Final CTA

## Version 1.1 UX Enhancements

Add after core build:

1. Add-on selection interaction
2. Stage micro-videos
3. Manufacturing timeline animation
4. Problem comparison animation
5. Custom quotation explanation graphic

## Version 2 UX Enhancements

Add later:

1. Advanced product configurator
2. Interactive 3D production line map
3. CRM integration
4. Saved calculator submission
5. Arabic version

---

# 15. Session 5 Handoff

Session 4 is complete.

Next session should be:

## Session 5 — UI Direction / Design System

Claude should read:

1. `CLAUDE.md`
2. `docs/01-session-1-project-brief-strategy.md`
3. `docs/02-session-2-final-english-landing-page-copy.md`
4. `docs/03-session-3-visual-video-blueprint.md`
5. `docs/04-session-4-ux-wireframe.md`

Then create:

- Color palette
- Typography system
- Layout system
- Section style rules
- Card styles
- Button styles
- Icon direction
- Calculator style
- Form style
- Timeline style
- Mobile design direction
- Visual treatment rules

Do not start coding in Session 5 unless explicitly requested.
