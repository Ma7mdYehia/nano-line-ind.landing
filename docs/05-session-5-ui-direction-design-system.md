# Session 5 — UI Direction / Design System

## Project
Nano Line Healthy Bread Production Line  
Model: **NL-RM210 / Steel Master**

---

# 0. Session Goal

Create a complete UI direction and design system for the Nano Line healthy bread production line landing page.

This document is a design contract for future implementation. It defines the visual system, interface rules, component styling direction, mobile behavior, and design tokens.

No frontend code should be written from this session alone.

---

# 1. Visual Positioning

The landing page should feel like a premium industrial B2B website for a serious manufacturing solution.

The page should communicate:

- Industrial authority
- Engineering confidence
- Clean food-production trust
- Modern technical clarity
- Sales conversion focus
- Built-to-order customization
- Scalable production capability

The visual direction should not feel like a PDF brochure, catalog, or ecommerce page. It should feel like a guided technical sales experience.

---

# 2. Color Palette

## Navy

`#0D1F3C`

Use for:

- Authority
- Primary headlines
- Dark sections
- Footer
- Technical emphasis
- Strong navigation text

Role:

Navy gives the page a serious industrial and executive feel.

---

## Slate Blue

`#1E3A5F`

Use for:

- Calculator section
- Dark cards
- Technical panels
- Secondary dark sections
- Data-heavy areas

Role:

Slate Blue gives depth and supports calculator/result areas without making the page too black or heavy.

---

## Amber

`#D97706`

Use for:

- CTAs only
- Overlines
- Active states
- Selected options
- Progress indicators
- Focus highlights

Rule:

Amber should never be used as random decoration. It must signal action, selection, or priority.

---

## Steel Light

`#E5E9EF`

Use for:

- Borders
- Dividers
- Card outlines
- Input borders
- Section separators

---

## Off-White / Steel Pale

Suggested values:

- `#F8FAFC` — page pale background
- `#F3F6F9` — alternating section background
- `#FFFFFF` — cards and clean content surfaces

Use for:

- Alternating light sections
- Soft industrial backgrounds
- Calculator/form input cards
- Visual balance between dark sections

---

# 3. Semantic Color Tokens

```css
:root {
  --color-navy: #0D1F3C;
  --color-slate-blue: #1E3A5F;
  --color-amber: #D97706;
  --color-amber-hover: #B45309;
  --color-steel-light: #E5E9EF;
  --color-steel-pale: #F8FAFC;
  --color-bg-alt: #F3F6F9;
  --color-white: #FFFFFF;

  --color-bg-page: #FFFFFF;
  --color-bg-soft: #F8FAFC;
  --color-bg-alt-section: #F3F6F9;
  --color-bg-dark: #0D1F3C;
  --color-bg-slate: #1E3A5F;
  --color-bg-card: #FFFFFF;
  --color-bg-card-dark: rgba(255, 255, 255, 0.06);

  --color-text-primary: #0D1F3C;
  --color-text-secondary: #475569;
  --color-text-muted: #64748B;
  --color-text-inverse: #FFFFFF;
  --color-text-inverse-muted: #CBD5E1;

  --color-border-light: #E5E9EF;
  --color-border-medium: #CBD5E1;
  --color-border-dark: rgba(255, 255, 255, 0.16);

  --color-action-primary: #D97706;
  --color-action-primary-hover: #B45309;
  --color-action-primary-soft: #FEF3C7;
  --color-action-focus: rgba(217, 119, 6, 0.28);

  --color-state-standard: #16A34A;
  --color-state-standard-bg: #DCFCE7;
  --color-state-custom: #2563EB;
  --color-state-custom-bg: #DBEAFE;
  --color-state-high-capacity: #D97706;
  --color-state-high-capacity-bg: #FEF3C7;

  --color-whatsapp: #25D366;
  --color-whatsapp-hover: #1DA851;
}
```

---

# 4. Typography System

## Primary Font

Use **Inter** as the primary font.

Reason:

- Free and reliable
- Clean B2B feel
- Excellent readability
- Strong tabular numeral support
- Works well for technical specs and calculator outputs

Fallback stack:

```css
font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

## Numeric Rule

All production specs and calculator numbers must use tabular numerals.

```css
font-variant-numeric: tabular-nums;
```

Apply to:

- `3,500–6,000 loaves/hour`
- `20–30 cm`
- `30–100 g`
- `8 × 22 m`
- Calculator output values
- Timeline durations and step numbers

## Desktop Type Scale

```css
--font-display-xl: 60px;
--font-display-lg: 48px;
--font-heading-xl: 40px;
--font-heading-lg: 32px;
--font-heading-md: 26px;
--font-heading-sm: 22px;
--font-body-lg: 18px;
--font-body-md: 16px;
--font-body-sm: 14px;
--font-caption: 13px;
--font-micro: 12px;
```

## Mobile Type Scale

```css
--font-mobile-display: 40px;
--font-mobile-heading-xl: 32px;
--font-mobile-heading-lg: 26px;
--font-mobile-heading-md: 22px;
--font-mobile-body-lg: 17px;
--font-mobile-body-md: 15px;
--font-mobile-caption: 13px;
--font-mobile-micro: 12px;
```

## Line Height Tokens

```css
--leading-tight: 1.05;
--leading-heading: 1.16;
--leading-body: 1.6;
--leading-compact: 1.4;
```

## Font Weight Tokens

```css
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
```

---

# 5. Spacing + Layout Grid

## Base Unit

Use a 4px base unit.

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
```

## Containers

```css
--container-main: 1280px;
--container-wide: 1440px;
--container-narrow: 960px;
```

## Section Padding Rules

### Hero / Major Sections

Desktop: `96px` vertical padding  
Mobile: `64px` vertical padding

### Standard Sections

Desktop: `80px` vertical padding  
Mobile: `56px` vertical padding

### Compact Sections

Desktop: `48px` vertical padding  
Mobile: `36px` vertical padding

## Grid Rules

- Main desktop sections use a 12-column grid.
- Two-column sections use 5/7, 6/6, or 7/5 depending on content weight.
- Cards use 3 columns on desktop, 2 on tablet, and 1 on mobile.
- Calculator and form areas should have wider cards and stronger visual hierarchy.

---

# 6. Section Style Rules

The page should use an alternating dark/light rhythm to avoid monotony.

## Recommended Section Background Rhythm

1. Header / Navigation — White or translucent light
2. Hero Section — Off-white / steel pale with strong hero visual
3. Trust Bar — White
4. Problem Section — White
5. Solution Section — Steel pale
6. Production Flexibility — White
7. Production Calculator — Slate Blue dark section
8. Production Stages — White or Off-white
9. Optional Add-ons — Steel pale
10. Manufacturing & Delivery — Navy dark section
11. Site Requirements — White
12. Lead Qualification Form — Steel pale with white form card
13. Why No Fixed Price — White explanatory section
14. Final CTA — Navy overlay over production visual
15. Footer — Navy

## Dark Section Rules

Use:

- White headlines
- Muted light body text
- Amber CTAs
- White outline secondary buttons
- Glass-style cards when useful
- Subtle dark borders

## Light Section Rules

Use:

- Navy headlines
- Slate/gray body text
- White cards
- Steel Light borders
- Amber only for CTAs, active states, or overlines

---

# 7. Card Library

## BenefitCard

Use for solution benefits.

Structure:

- Icon
- Title
- Short description

Style:

- White background
- Steel Light border
- 20–24px radius
- Subtle shadow
- Icon in soft amber or navy pill

---

## SpecBadge

Use for trust bar and quick specs.

Structure:

- Small icon
- Label
- Optional value

Style:

- Compact pill or card
- White / soft background
- Steel Light border
- Caption/micro text
- Tabular numerals for numbers

---

## StageCard

Use for production stages.

Structure:

- Stage number
- Stage name
- Stage image/video placeholder
- One-line explanation
- Optional “why it matters” note

Style:

- Large visual card
- White background
- 24px radius
- Strong image area
- Stage number highlighted with amber

State:

- Active stage uses amber indicator
- Inactive stage uses muted border/text

---

## AddOnCard

Use for optional add-ons.

Structure:

- Add-on visual
- Add-on name
- One-line business benefit
- Optional tag: Optional

Important:

Do not style add-ons like ecommerce products. No price, no cart, no checkout behavior.

---

## CalculatorResultCard

Three visual states:

1. **Standard Configuration May Be Suitable** — green state
2. **Custom Configuration Recommended** — blue state
3. **Higher-Capacity Study Recommended** — amber state

The high-capacity amber state should feel consultative, not like an error.

---

## TimelineStep

Use for manufacturing and delivery.

Structure:

- Step number
- Icon
- Title
- Description

Style:

- Connected timeline line
- Amber active dots
- Light text if placed on dark background

---

## SummaryPanel

Use beside calculator and lead form.

Structure:

- Selected shape
- Target weight
- Target size
- Required hourly output
- Monthly output
- Suggested configuration direction
- Selected add-ons

Style:

- Sticky on desktop if useful
- White card on light background
- Glass card on dark background
- Tabular numerals

---

## FormStep

Use for multi-step lead form.

Structure:

- Step label
- Step title
- Fields
- Pill options
- Back / Next / Submit buttons

Style:

- White form card
- Rounded inputs
- Amber focus state
- Clear progress indicator

---

# 8. Button System

## 1. Primary Amber

Use for main conversion actions.

Examples:

- Calculate Your Production Need
- Request a Custom Quotation
- Submit Requirements

Style:

```css
background: #D97706;
color: #FFFFFF;
```

Hover:

```css
background: #B45309;
```

---

## 2. Secondary Navy Outline

Use on light backgrounds.

- Transparent background
- Navy border
- Navy text

---

## 3. Secondary White Outline

Use on dark backgrounds.

- Transparent background
- White border
- White text

---

## 4. WhatsApp Green

Use only for WhatsApp actions.

```css
background: #25D366;
color: #FFFFFF;
```

---

## 5. Ghost / Text

Use for low-priority actions.

Examples:

- Learn more
- View stages
- Back

## Button Size Tokens

```css
--btn-height-sm: 40px;
--btn-height-md: 48px;
--btn-height-lg: 56px;
--btn-radius: 999px;
```

Touch target rule:

- All mobile buttons must be at least 44px high.

---

# 9. Icon Direction

Use **Lucide** line icons.

Rules:

- Stroke width: 1.75–2px
- Rounded stroke caps
- Navy icons on light backgrounds
- White icons on dark backgrounds
- Amber only for active/action states

## Icon Map

### Production Stages

- Dough Divider: `Scissors` / `Split`
- Proofer: `Timer`
- Dough Rounding: `CircleDot`
- Dough Arrangement: `Rows3`
- Dough Sheeter: `Layers`
- Bread Forming Unit: `Shapes`
- Transfer Conveyors: `MoveRight`
- Baking Chamber: `Flame`
- Cooling Conveyors: `Wind`

### Add-ons

- Spiral Mixer: `RefreshCw` / `RotateCcw`
- Electronic Mixing System: `Scale`
- Packing Table: `Package`
- Bag Sealing Machine: `Archive`
- Automatic Bread Counter: `Hash`
- Air Compressor: `Gauge`
- Additional Control Systems: `SlidersHorizontal`

### Manufacturing Timeline

- Requirement Review: `ClipboardCheck`
- Technical Configuration: `DraftingCompass`
- Manufacturing: `Factory`
- Inspection & Shipping: `Truck`
- Installation & Operation: `Wrench`

### Site Requirements

- Production Space: `Ruler`
- Industrial Electricity: `Zap`
- Gas or Diesel Setup: `Fuel`
- Ventilation: `Fan`
- Compressed Air: `Gauge`
- Maintenance Access: `Wrench`
- Operators and Training: `Users`

---

# 10. Calculator UI Style

## Desktop

Use a split-panel calculator:

```txt
Left: Inputs
Right: Live Results + Recommendation + CTA
```

## Background

Calculator section should use Slate Blue:

```css
background: #1E3A5F;
```

Calculator card:

- White/light card
- 28px radius
- Strong shadow
- Clear input grouping
- High contrast result panel

## Inputs

- Rounded input fields
- Large readable labels
- Helpful helper text
- Numeric fields with tabular numerals
- Pill buttons for shape, weight, size, and yes/no options

## Result States

- Green: Standard may be suitable
- Blue: Custom recommended
- Amber: Higher-capacity study recommended

No result state should mention price.

---

# 11. Lead Form UI Style

## Desktop

- Left: Multi-step form
- Right: Live summary panel

## Mobile

- Single-column multi-step form
- Collapsible summary panel

## Form Rules

- White form card
- 28px radius
- Clear progress indicator
- Pill options
- Large input fields
- Friendly placeholders
- Amber focus state
- Human error messages

## Progress Pattern

```txt
Step 1 of 5 — Contact Details
```

---

# 12. Stage Timeline UI

## Desktop

Use sticky-left navigation with a changing right-side stage panel.

```txt
Left: Stage list / progress
Right: Active stage visual + copy
```

Active stage:

- Amber vertical indicator
- Bold navy title
- Highlighted stage number

Inactive stages:

- Muted text
- Light dividers

## Mobile

Use accordion cards.

Each accordion includes:

- Stage number
- Stage name
- Image
- Short description
- Why it matters note

---

# 13. Mobile Direction

## Mobile Header

- Compact logo
- Hamburger menu
- Optional language switch placeholder later

## Sticky Bottom CTA

After hero scroll:

```txt
[Calculate] [WhatsApp]
```

After calculator/form area:

```txt
[Request Quotation] [WhatsApp]
```

## Touch Rules

- Buttons: minimum 44px high
- Inputs: minimum 48px high
- Cards: generous spacing
- Avoid tiny icon-only controls

## Mobile Media

- Use static hero image or lightweight video poster
- Avoid autoplaying all videos
- Lazy-load below-the-fold media
- Production stages use images first, optional video buttons

---

# 14. Animation Principles

Motion should be purposeful and support understanding or usability.

## Recommended Animations

- Scroll reveal for cards
- Calculator live result update
- Form step transition
- Stage timeline active highlight
- Manufacturing timeline draw animation

## Motion Rules

- Keep transitions between 180–320ms
- Use smooth easing
- Respect reduced-motion preferences
- Avoid decorative motion that slows the page

---

# 15. Radius and Shadow Tokens

```css
:root {
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-2xl: 24px;
  --radius-3xl: 32px;
  --radius-full: 999px;

  --shadow-sm: 0 1px 2px rgba(13, 31, 60, 0.06);
  --shadow-md: 0 8px 24px rgba(13, 31, 60, 0.08);
  --shadow-lg: 0 18px 48px rgba(13, 31, 60, 0.12);
  --shadow-dark-card: 0 18px 48px rgba(0, 0, 0, 0.22);
}
```

---

# 16. Session 5 Output Summary

Session 5 delivered:

1. Color palette
2. Typography system
3. Spacing and layout grid
4. Section style rules
5. Card library
6. Button system
7. Icon direction
8. Calculator UI style
9. Lead form UI style
10. Stage timeline UI
11. Mobile direction
12. Animation principles
13. Design tokens

---

# 17. Next Session

Next session:

## Session 6 — Calculator Logic + Lead Form UX

Goal:
Create the calculator state machine, validation rules, lead form logic, form prefill behavior, final sales payload, WhatsApp templates, and email templates.
