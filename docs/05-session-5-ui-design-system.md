# Session 5 — UI Direction / Design System

## Project
Nano Line Healthy Bread Production Line  
Model: **NL-RM210 / Steel Master**

---

# 0. Design Direction Summary

## Concept
**Industrial Precision. Built-to-Order Confidence.**

The visual language should communicate that Nano Line is a serious industrial manufacturer — not a catalog retailer. Every design decision should reinforce trust, technical authority, and the message that this line is custom-engineered around the client's project.

## Core Design Feeling
- Clean steel factory, not a brochure printout
- Calm authority, not aggressive sales pressure
- Technically precise, not academic or dry
- Premium industrial B2B, not retail or ecommerce

## Design Personality
| Attribute         | Direction                        |
|-------------------|----------------------------------|
| Tone              | Professional, confident, clear   |
| Energy            | Focused, purposeful, measured    |
| Complexity        | Elegant simplicity over clutter  |
| Warmth            | Controlled — trust, not friendly |
| Motion            | Functional, not decorative       |

---

# 1. Color Palette

## 1.1 Primary Brand Colors

### Navy Blue — `#0D1F3C`
**Role:** Primary authority color. Used for main headlines, primary backgrounds in dark sections, navigation, and strong CTA backgrounds.  
**Meaning:** Industrial trust, technical depth, engineering credibility.

### Steel Gray — `#4B5563`
**Role:** Secondary text, supporting UI elements, icon strokes, borders on dark surfaces, and technical labels.  
**Meaning:** Machine surfaces, precision, neutral technical strength.

### Off-White — `#F7F8FA`
**Role:** Section background for alternating light sections, card backgrounds, input field backgrounds.  
**Meaning:** Clean factory environment, food-safe, organized.

### Pure White — `#FFFFFF`
**Role:** Primary content background, card surfaces, form fields.

---

## 1.2 Accent Color

### Nano Line Amber — `#D97706`
**Role:** CTAs, hover states, active states, section overlines, key highlights, badge borders, result card borders.  
**Meaning:** Energy, action, conversion signal.  
**Rule:** Use sparingly — only for calls-to-action, active states, and key data highlights. Never decorative.

### Amber Light — `#FEF3C7`
**Role:** Calculator result card background (Standard configuration), soft section highlights, light accent tags.

---

## 1.3 Supporting Colors

### Slate Blue — `#1E3A5F`
**Role:** Calculator panel background, dark card headers, section backgrounds where deep navy feels too heavy.

### Steel Light — `#E5E9EF`
**Role:** Dividers, card borders, trust bar background, subtle section separators.

### Steel Pale — `#F1F4F8`
**Role:** Alternating section background (lighter than off-white), form step backgrounds.

---

## 1.4 Semantic / State Colors

### Success Green — `#16A34A`
**Role:** Form success message, submit confirmation, positive states.

### Muted Green — `#D1FAE5`
**Role:** Success message background.

### Configuration Blue — `#1D4ED8`
**Role:** Custom configuration recommendation result card accent.

### Configuration Blue Light — `#DBEAFE`
**Role:** Custom configuration result card background.

### Consultative Amber — `#D97706`
**Role:** Higher-capacity recommendation result card accent (reuses brand amber).

### Error Red — `#DC2626`
**Role:** Form field validation errors.

### Error Red Light — `#FEE2E2`
**Role:** Error field background highlight.

---

## 1.5 Text Color System

| Token              | Color       | Hex       | Usage                                          |
|--------------------|-------------|-----------|------------------------------------------------|
| `text-primary`     | Navy        | `#0D1F3C` | Headlines, primary body on white backgrounds   |
| `text-body`        | Dark gray   | `#374151` | Body paragraphs, standard text                 |
| `text-muted`       | Steel gray  | `#6B7280` | Captions, disclaimers, placeholders (contrast) |
| `text-inverse`     | White       | `#FFFFFF` | All text on navy/dark backgrounds              |
| `text-accent`      | Amber       | `#D97706` | Section overlines, highlighted labels          |

---

## 1.6 Color Usage Rules

1. **Orange/Amber is never used for decoration.** It is reserved for CTAs, active states, and key data points only.
2. **Dark navy sections** use white text only. No gray text on navy — it fails contrast.
3. **Light sections** use `#0D1F3C` for headlines and `#374151` for body copy.
4. **Section backgrounds alternate:** `#FFFFFF` → `#F1F4F8` → `#FFFFFF` → `#0D1F3C` for emphasis sections.
5. **Steel Light (`#E5E9EF`) is the standard border** for cards, inputs, and dividers on white backgrounds.

---

# 2. Typography System

## 2.1 Font Family

### Primary Font — `Inter`
**Usage:** All headlines, body copy, UI labels, buttons, form fields, calculator.  
**Why:** Inter is a modern, highly legible grotesque with excellent tabular figure support — ideal for technical numbers in calculators and spec tables. Free and widely available.

### Fallback Stack
```
'Inter', 'Helvetica Neue', Arial, sans-serif
```

### Numeric / Spec Display (optional enhancement)
For large production capacity numbers and calculator results, use:
```
font-variant-numeric: tabular-nums;
font-feature-settings: 'tnum';
```
This aligns numbers cleanly in spec badges and result panels.

---

## 2.2 Type Scale

| Token              | Size    | Line Height | Weight       | Usage                                               |
|--------------------|---------|-------------|--------------|-----------------------------------------------------|
| `display`          | 60px    | 68px        | 700 (Bold)   | Hero headline (desktop)                             |
| `h1`               | 48px    | 56px        | 700          | Major section headlines (desktop)                   |
| `h2`               | 36px    | 44px        | 700          | Section headlines                                   |
| `h3`               | 28px    | 36px        | 600 (Semibold)| Subsection headlines, card titles                  |
| `h4`               | 22px    | 30px        | 600          | Card headers, step titles, form step labels         |
| `body-lg`          | 18px    | 28px        | 400 (Regular)| Subheadlines, intro copy, important paragraphs      |
| `body`             | 16px    | 26px        | 400          | Standard body copy                                  |
| `body-sm`          | 14px    | 22px        | 400          | Secondary labels, form labels above inputs          |
| `caption`          | 13px    | 20px        | 400          | Captions under images, disclaimer text              |
| `micro`            | 12px    | 18px        | 500 (Medium) | Badge text, tag labels, step indicators             |
| `overline`         | 12px    | 16px        | 600          | Section overlines (uppercase, letter-spaced)        |
| `cta`              | 16px    | 24px        | 600          | Button text                                         |
| `spec-number`      | 32–40px | 40–48px     | 700          | Large spec display (production capacity, loaf size) |

### Mobile Scale Reductions
| Desktop     | Mobile      |
|-------------|-------------|
| `display` 60px | 40px     |
| `h1` 48px   | 34px        |
| `h2` 36px   | 28px        |
| `h3` 28px   | 22px        |
| `body-lg` 18px | 17px     |

---

## 2.3 Typography Rules

1. **Headlines are always `#0D1F3C`** on light backgrounds and `#FFFFFF` on dark.
2. **Body copy is `#374151`** on all light backgrounds.
3. **Section overlines** use `overline` style — 12px, uppercase, 2px letter-spacing, `#D97706` amber.
4. **The hero headline** should be `display` size on desktop. Bold. Never italic.
5. **Spec numbers** (3,500–6,000, 20–30 cm, 30–100 g) should use tabular numerals and `font-weight: 700`.
6. **Disclaimer and caption text** uses `caption` style in `#6B7280`.
7. **Button text** is always `16px, font-weight: 600`. Never italic in buttons.
8. **Line lengths** should not exceed 65–70 characters for comfortable reading in body sections.

---

# 3. Spacing System

## 3.1 Base Unit
`4px` base unit. All spacing tokens are multiples of 4.

## 3.2 Spacing Scale

| Token    | Value  | Common Usage                                         |
|----------|--------|------------------------------------------------------|
| `xs`     | 4px    | Icon-to-label gap, tight internal spacing            |
| `sm`     | 8px    | Badge padding, small gap between related elements    |
| `md`     | 12px   | Internal card padding (compact)                      |
| `lg`     | 16px   | Standard element gap, input height padding           |
| `xl`     | 24px   | Card padding, column gap (mobile)                    |
| `2xl`    | 32px   | Column gap (desktop), section inner block padding    |
| `3xl`    | 40px   | Section padding top/bottom (compact)                 |
| `4xl`    | 48px   | Card group gap, CTA top margin                       |
| `5xl`    | 64px   | Section vertical padding (standard)                  |
| `6xl`    | 80px   | Section vertical padding (spacious)                  |
| `7xl`    | 96px   | Large section vertical padding                       |
| `8xl`    | 128px  | Hero vertical padding                                |

## 3.3 Section Padding Rules

| Section Type         | Desktop Top/Bottom | Mobile Top/Bottom |
|----------------------|--------------------|-------------------|
| Hero                 | 120px / 80px       | 72px / 64px       |
| Standard section     | 80px               | 56px              |
| Compact section      | 64px               | 40px              |
| Trust bar            | 24px               | 20px              |
| Footer               | 64px               | 48px              |

---

# 4. Layout System

## 4.1 Grid System

### Desktop
- **Max content width:** 1280px
- **Wide container:** 1440px (for full-bleed section backgrounds)
- **Grid:** 12 columns
- **Column gutter:** 32px
- **Outer margin:** auto (centered)

### Tablet (768px – 1024px)
- **Content width:** 100% – 48px margin
- **Grid:** 8 columns
- **Gutter:** 24px

### Mobile (< 768px)
- **Content width:** 100% – 32px margin (16px each side)
- **Grid:** 4 columns
- **Gutter:** 16px

## 4.2 Common Layout Patterns

### Two-Column (Hero, Problem, Site Requirements, Why No Price)
```
Left: 45–50%    Right: 50–55%
Content / Copy   Visual / Interactive block
```

### Three-Column (Benefit cards, Add-on cards)
```
[  Card  ] [  Card  ] [  Card  ]
33%          33%        33%
```

### Four-Column (Trust bar)
```
[ Badge ] [ Badge ] [ Badge ] [ Badge ] (truncated / scroll on mobile)
```

### Sticky Left + Right Panel (Production Stages)
```
Left 30% sticky list     Right 70% changing content panel
```

### Split Calculator (Desktop)
```
Left 48% inputs     Right 52% live results
```

---

## 4.3 Z-Index Layers

| Layer           | Value | Element                              |
|-----------------|-------|--------------------------------------|
| Base            | 0     | Page content                         |
| Cards           | 10    | Floating hero cards                  |
| Sticky elements | 50    | Sticky header, sticky CTA bar        |
| Overlays        | 100   | Modal overlays, form focus overlays  |
| Tooltips        | 200   | Hover tooltips on badge items        |

---

# 5. Section Style Rules

Each section has defined background, text treatment, and visual weight.

## 5.1 Hero Section
- **Background:** Dark overlay on production line image, OR two-column split (white left, image right)
- **Recommended approach:** Two-column split — cleaner for text legibility, no contrast issues
- **Left column bg:** `#FFFFFF`
- **Right column:** Full production line image, with floating spec cards
- **Headline color:** `#0D1F3C`
- **Subheadline color:** `#374151`
- **Badge above headline:** `#D97706` text, `#FEF3C7` background, `1px solid #D97706` border

## 5.2 Trust / Specification Bar
- **Background:** `#F1F4F8`
- **Border top/bottom:** `1px solid #E5E9EF`
- **Badge style:** Light pill with icon, `#374151` text, `#FFFFFF` background, `1px solid #E5E9EF` border
- **Horizontal scroll on mobile with no scrollbar visible**

## 5.3 Problem Section
- **Background:** `#FFFFFF`
- **Headline:** `#0D1F3C`
- **Pain point cards:** Light steel background `#F1F4F8`, left border `#D97706` 3px accent, no shadow
- **Visual:** Right-side split comparison illustration

## 5.4 Solution Section
- **Background:** `#F7F8FA`
- **Headline:** `#0D1F3C`
- **Benefit cards:** `#FFFFFF` background, `1px solid #E5E9EF` border, subtle shadow, amber top accent on hover

## 5.5 Production Flexibility Section
- **Background:** `#FFFFFF`
- **Toggle control:** Pill toggle, active state uses `#0D1F3C` background + white text
- **Spec cards:** `#F1F4F8` background, `#0D1F3C` label, amber accent number

## 5.6 Production Calculator Section
- **Background:** `#1E3A5F` (Slate Blue) — sets this apart as a tool section
- **Text:** `#FFFFFF` headline, `#CBD5E1` body
- **Calculator card:** `#FFFFFF` background, `0 8px 32px rgba(0,0,0,0.2)` shadow
- **Result panel:** Separate background from inputs panel, `#F7F8FA` background
- **Disclaimer:** `#94A3B8` italic text below result

## 5.7 Production Stages Section
- **Background:** `#0D1F3C` (Deep Navy)
- **Text:** `#FFFFFF` and `#CBD5E1`
- **Stage navigation items:** Active = `#D97706` amber left border + white text; Inactive = `#6B7280` text
- **Stage content area:** Dark card with image, `#1E3A5F` background, white caption

## 5.8 Optional Add-ons Section
- **Background:** `#FFFFFF`
- **Add-on cards:** `#FFFFFF` background, `1px solid #E5E9EF`, subtle shadow, icon top-center
- **Optional tag:** `#D97706` text, `#FEF3C7` background, pill shape

## 5.9 Manufacturing & Delivery Section
- **Background:** `#F7F8FA`
- **Timeline:** Horizontal on desktop, vertical on mobile
- **Step circles:** Active/completed `#0D1F3C`, future `#E5E9EF`
- **Lead time callout:** Emphasized block, `#1E3A5F` background, white text, amber left border

## 5.10 Site Requirements Section
- **Background:** `#FFFFFF`
- **Requirement cards:** `#F1F4F8` background, checkmark icon in amber
- **Factory diagram:** Right column, technical 2D/isometric illustration

## 5.11 Lead Qualification Form
- **Background:** `#F7F8FA`
- **Form card:** `#FFFFFF`, strong shadow, `border-radius: 16px`
- **Step indicator:** Horizontal progress dots or numbered tabs, active state amber
- **Summary panel:** `#0D1F3C` background, white text, amber labels for values

## 5.12 Why No Fixed Price Section
- **Background:** `#0D1F3C`
- **Text:** `#FFFFFF` headline, `#CBD5E1` body
- **Variables graphic:** Light diagram on dark bg, amber connector lines

## 5.13 Final CTA Section
- **Background:** Full-bleed image of finished bread on conveyor, dark overlay `rgba(13,31,60,0.80)`
- **Text:** `#FFFFFF`
- **CTA buttons:** All three visible — Primary amber, Secondary white outline, WhatsApp green

## 5.14 Footer
- **Background:** `#0D1F3C`
- **Text:** `#94A3B8` for secondary, `#FFFFFF` for primary links
- **Divider:** `1px solid #1E3A5F`

---

# 6. Card Styles

## 6.1 BenefitCard
```
Background:  #FFFFFF
Border:      1px solid #E5E9EF
Border-radius: 10px
Padding:     24px
Shadow:      0 2px 8px rgba(0,0,0,0.06)
Hover:       border-left: 3px solid #D97706, shadow deepens

Structure:
  [Icon — 32px amber]
  [Title — h4, #0D1F3C]
  [Body — body-sm, #374151]
```

## 6.2 SpecBadge (Trust Bar)
```
Background:  #FFFFFF
Border:      1px solid #E5E9EF
Border-radius: 24px (pill)
Padding:     10px 16px
Gap:         8px (icon + text)
Text:        body-sm, #374151, font-weight: 500
Icon:        16px, #D97706 or #4B5563

Hover:       Background #FEF3C7, border-color #D97706
```

## 6.3 StageCard (Production Stages)
```
Background:  #1E3A5F
Border:      none
Border-radius: 12px
Padding:     32px
Text:        #FFFFFF headline, #94A3B8 caption
Stage number: 40px circle, #D97706 bg, #FFFFFF text, font-weight: 700
Image:       16:9 ratio, rounded-top, object-fit: cover

Active state: Border-left 4px solid #D97706
```

## 6.4 AddOnCard
```
Background:  #FFFFFF
Border:      1px solid #E5E9EF
Border-radius: 10px
Padding:     24px
Align:       Center
Icon area:   56px × 56px, #F1F4F8 background, centered machine icon
Tag:         "Optional" — micro text, #D97706, #FEF3C7 bg, pill
Name:        h4, #0D1F3C
Benefit:     body-sm, #374151
```

## 6.5 CalculatorResultCard

### Result 1 — Standard Configuration
```
Background:  #D1FAE5
Border-left: 4px solid #16A34A
Border-radius: 10px
Label:       "Standard Configuration May Be Suitable"
Label color: #065F46
```

### Result 2 — Custom Configuration
```
Background:  #DBEAFE
Border-left: 4px solid #1D4ED8
Border-radius: 10px
Label:       "Custom Configuration Recommended"
Label color: #1E3A8A
```

### Result 3 — Higher-Capacity Study
```
Background:  #FEF3C7
Border-left: 4px solid #D97706
Border-radius: 10px
Label:       "Higher-Capacity Study Recommended"
Label color: #92400E
```

## 6.6 TimelineStep
```
Circle:      44px diameter
Active bg:   #0D1F3C, white icon inside
Completed:   #D97706 bg, white checkmark inside
Future:      #E5E9EF bg, #9CA3AF icon

Connector line: 2px, dashed, #D1D5DB
Label:       caption style below circle, #374151
```

## 6.7 SummaryPanel (Lead Form — Desktop)
```
Background:  #0D1F3C
Border-radius: 12px
Padding:     24px
Label text:  body-sm, #94A3B8
Value text:  body-sm, #FFFFFF, font-weight: 600
Separator:   1px solid #1E3A5F
CTA area:    amber button at bottom
```

## 6.8 FormStep Card
```
Background:  #FFFFFF
Border:      1px solid #E5E9EF
Border-radius: 12px
Padding:     32px (desktop) / 20px (mobile)
Step header: overline text (amber) + step name (h3)
```

---

# 7. Button Styles

## 7.1 Primary Button — Amber CTA
```
Background:   #D97706
Text:         #FFFFFF, 16px, font-weight: 600
Border:       none
Border-radius: 8px
Padding:      14px 28px
Height:       48px minimum

Hover:        Background #B45309, smooth transition 200ms
Active:       Background #92400E
Focus:        2px offset outline, #D97706 30% opacity
Disabled:     Background #D1D5DB, text #9CA3AF, cursor: not-allowed
```

**Used for:** Calculate CTA, Submit form, Request Quotation

## 7.2 Secondary Button — Navy Outline
```
Background:   transparent
Text:         #0D1F3C, 16px, font-weight: 600
Border:       2px solid #0D1F3C
Border-radius: 8px
Padding:      13px 27px (1px less to account for border)
Height:       48px minimum

Hover:        Background #0D1F3C, text #FFFFFF
Focus:        2px offset outline #0D1F3C 30% opacity
```

**Used for:** Request Technical Consultation, secondary CTAs

## 7.3 Secondary Button on Dark Background — White Outline
```
Background:   transparent
Text:         #FFFFFF, 16px, font-weight: 600
Border:       2px solid #FFFFFF
Border-radius: 8px
Padding:      13px 27px

Hover:        Background #FFFFFF, text #0D1F3C
```

**Used for:** Secondary CTAs inside dark sections

## 7.4 WhatsApp Button
```
Background:   #25D366
Text:         #FFFFFF, 16px, font-weight: 600
Border:       none
Border-radius: 8px
Padding:      14px 28px
Icon:         WhatsApp icon, left of text, 20px

Hover:        Background #20C157
```

## 7.5 Ghost / Text Button
```
Background:   transparent
Text:         #D97706, 14px, font-weight: 600
Border:       none
Padding:      8px 0

Hover:        Text #B45309, underline
```

**Used for:** Small inline CTAs, section link CTAs

## 7.6 Navigation Header CTA (Compact)
```
Background:   #D97706
Text:         #FFFFFF, 14px, font-weight: 600
Border-radius: 6px
Padding:      10px 20px
Height:       40px
```

---

# 8. Icon Direction

## 8.1 Icon Style
**Line icons, 1.5px stroke weight, rounded line caps and joins.**  
Recommended set: **Lucide Icons** (open source, consistent, technical aesthetic).  
Alternative: **Heroicons** (similar quality, Tailwind-native).

## 8.2 Icon Sizes

| Size    | Pixels | Usage                                              |
|---------|--------|----------------------------------------------------|
| `xs`    | 16px   | Inline text icons, badge icons                     |
| `sm`    | 20px   | Navigation icons, form icons, small cards          |
| `md`    | 24px   | Standard card icons, button icons                  |
| `lg`    | 32px   | Benefit card icons, trust bar icons                |
| `xl`    | 48px   | Add-on card icons, section lead icons              |
| `2xl`   | 64px   | Timeline step icons (inside circles)               |

## 8.3 Icon Color Rules
- On white/light backgrounds: `#D97706` (amber) for primary icons, `#4B5563` for neutral/muted icons
- On dark/navy backgrounds: `#FFFFFF` or `#D97706` for key icons
- Never use decorative icon fills — all icons are line style only

## 8.4 Production Stage Icons (Reference Guide)

| Stage                  | Icon Suggestion (Lucide)                  |
|------------------------|-------------------------------------------|
| Dough Divider          | `scissors` or custom blade icon           |
| Proofer                | `thermometer` or `clock`                 |
| Dough Rounding         | `refresh-cw` (circular movement)         |
| Dough Arrangement      | `layout-grid`                            |
| Dough Sheeter          | `minimize-2` (flattening)                |
| Bread Forming Unit     | `circle` / `square` toggle               |
| Transfer Conveyors     | `arrow-right` / `move-right`             |
| Baking Chamber         | `flame`                                  |
| Cooling Conveyors      | `wind`                                   |

## 8.5 Add-on Icons

| Add-on                        | Icon Suggestion       |
|-------------------------------|-----------------------|
| Spiral Mixer                  | `rotate-cw`           |
| Electronic Mixing + Weighing  | `scale`               |
| Packing Table                 | `package`             |
| Bag Sealing Machine           | `zap`                 |
| Automatic Bread Counter       | `hash`                |
| Air Compressor                | `wind`                |
| Additional Control Systems    | `sliders`             |

## 8.6 Manufacturing Timeline Icons

| Step                      | Icon         |
|---------------------------|--------------|
| Requirement Review        | `clipboard`  |
| Technical Configuration   | `settings`   |
| Manufacturing             | `tool`       |
| Inspection & Shipping     | `package`    |
| Installation & Operation  | `check-circle` |

## 8.7 Site Requirements Icons

| Requirement               | Icon           |
|---------------------------|----------------|
| Production Space          | `maximize-2`   |
| Industrial Electricity    | `zap`          |
| Gas or Diesel             | `flame`        |
| Ventilation               | `wind`         |
| Compressed Air            | `activity`     |
| Maintenance Access        | `tool`         |
| Operators & Training      | `users`        |

---

# 9. Form Style

## 9.1 Input Fields
```
Background:   #FFFFFF
Border:       1px solid #D1D5DB
Border-radius: 6px
Height:       48px
Padding:      12px 14px
Font:         16px, #374151

Focus:        border-color #0D1F3C, box-shadow: 0 0 0 3px rgba(13,31,60,0.10)
Filled:       border-color #9CA3AF
Error:        border-color #DC2626, background: #FEF2F2
Disabled:     background: #F9FAFB, text #9CA3AF
Placeholder:  #9CA3AF
```

## 9.2 Labels
```
Font:         14px, font-weight: 600, #374151
Margin:       0 0 6px 0 (above field)
```

## 9.3 Select / Dropdown
```
Same as input field
Arrow:        Chevron icon, #6B7280, right-aligned
Selected:     font-weight: 500, #0D1F3C
```

## 9.4 Radio / Option Buttons (Loaf shape, weight, etc.)
```
Style:        Pill option buttons (not standard radio inputs)
Default:      background #FFFFFF, border 1px solid #D1D5DB, text #374151
Selected:     background #0D1F3C, border-color #0D1F3C, text #FFFFFF
Hover:        border-color #0D1F3C
Border-radius: 6px
Padding:      10px 18px
Font:         14px, font-weight: 500
```

## 9.5 Step Progress Indicator
```
Style:        Numbered horizontal steps
Active step:  Filled circle, #D97706, white number inside
Completed:    #0D1F3C, white checkmark
Future:       #E5E9EF, #9CA3AF number
Connector:    1px dashed line, #D1D5DB between circles
Step label:   12px, #6B7280 below circle
Active label: 12px, #0D1F3C, font-weight: 600
```

## 9.6 Navigation Buttons (Back / Next / Submit)
- Next: Primary amber button, right-aligned
- Back: Ghost/text button, left-aligned
- Submit: Primary amber button, full-width on final step

## 9.7 Form Section Divider
```
Border-top:   1px solid #F1F4F8
Margin:       24px 0
```

## 9.8 Form Success State
```
Background:   #D1FAE5
Border:       1px solid #6EE7B7
Border-radius: 12px
Padding:      32px
Icon:         check-circle, 48px, #16A34A, centered
Headline:     h3, #065F46
Body:         body, #065F46 80% opacity
```

---

# 10. Calculator UI Style

## 10.1 Calculator Container
```
Background:   Section background is #1E3A5F (slate blue)
Card:         #FFFFFF, border-radius: 16px, padding: 0 (split internally)
Shadow:       0 16px 64px rgba(0,0,0,0.20)
Max-width:    900px, centered
```

## 10.2 Calculator Layout (Desktop)
```
┌─────────────────────────────────────────────────────────┐
│  Inputs (Left 48%)               Results (Right 52%)    │
│  ─────────────────────────       ─────────────────────  │
│  Background: #FFFFFF             Background: #F7F8FA    │
│  Padding: 32px                   Padding: 32px          │
│                                                          │
│  Input fields                    Result cards            │
│  Option buttons                  Recommendation state   │
│                                  Suggested add-ons      │
│                                  [Request Quotation CTA] │
│                                  Disclaimer text         │
└─────────────────────────────────────────────────────────┘
```

## 10.3 Calculator Input Fields
Same style as Form input fields (Section 9.1), but with a lighter header label:
```
Section label: overline, #D97706 on #1E3A5F header
```

## 10.4 Result Numbers (Large display)
```
Font:         spec-number style (40px, font-weight: 700, tabular-nums)
Color:        #0D1F3C
Sub-label:    body-sm, #6B7280
```

## 10.5 Recommendation State
Refer to CalculatorResultCard styles in Section 6.5.

## 10.6 Suggested Add-ons (inside result)
```
Style:        Small horizontal tag list
Tag:          pill shape, #FEF3C7 bg, #D97706 text, 12px font
Icon:         16px icon left of tag text
```

## 10.7 Disclaimer
```
Font:         caption, italic, #94A3B8
Margin-top:   16px
Border-top:   1px solid #E5E9EF
Padding-top:  12px
```

## 10.8 Mobile Calculator (Step-Based)
```
Each step:    Full-width card, #FFFFFF, shadow
Progress:     Horizontal step indicator at top
Fields:       Full-width single column
Next button:  Full-width primary amber
Results:      Full-width result cards stacked
```

---

# 11. Stage Timeline Style

## 11.1 Desktop — Sticky Left + Right Panel

### Left Navigation Panel
```
Width:        280px
Position:     Sticky, offset top 80px (below header)
Background:   #0D1F3C (matches section bg)
Padding:      0

Each item:
  Padding:      16px 24px
  Stage number: 24px circle, #1E3A5F bg, amber text
  Stage name:   body-sm, #94A3B8
  
  Active state:
    border-left: 4px solid #D97706
    Stage number: #D97706 bg, #FFFFFF text
    Stage name: #FFFFFF, font-weight: 600
    Background: #1E3A5F
    
Hover (non-active):
  Background: #162D50
  Stage name: #CBD5E1
```

### Right Content Panel
```
Background:   #1E3A5F
Padding:      48px
Border-radius: 0 (fills the right side)

Image:        16:9 ratio, border-radius: 10px, full-width within panel
Stage name:   h3, #FFFFFF, margin-top: 24px
Description:  body, #CBD5E1, margin-top: 12px
Why it matters: body-sm, #94A3B8, border-top: 1px solid #243B55, padding-top: 16px, margin-top: 16px
Stage number badge: Large 64px circle, #D97706, #FFFFFF text, positioned top-right of panel
```

## 11.2 Mobile — Accordion Cards

### Collapsed State
```
Background:   #0D1F3C
Border-bottom: 1px solid #1E3A5F
Padding:      16px 20px
Stage number: 28px circle, #1E3A5F bg, amber text
Stage name:   body-sm, #FFFFFF
Chevron:      #6B7280, right-aligned, rotates on open
```

### Expanded State
```
Background:   #1E3A5F
Image:        16:9, full-width, border-radius: 8px, margin: 12px 0
Description:  body-sm, #CBD5E1
Stage number badge: amber, visible
```

## 11.3 Horizontal Timeline (Alternative / Manufacturing Section)

```
Each step container:    Centered column, flex
Circle:                 48px, see TimelineStep card style (Section 6.6)
Label:                  caption, centered below circle, max-width: 80px
Connector:              horizontal line, dashed, 2px, #D1D5DB

Lead time callout:      Separate block below timeline
                        Background: #1E3A5F
                        Border-left: 4px solid #D97706
                        Padding: 16px 24px
                        Text: body, #FFFFFF, emphasis on "120 to 180 days"
```

---

# 12. Mobile Design Direction

## 12.1 Core Mobile Philosophy

- **One clear action per screen** — never overwhelm with multiple competing elements.
- **Thumb zone first** — primary actions (CTA buttons, form navigation) in the lower half of screen.
- **Content before chrome** — reduce header and navigation footprint on mobile.
- **No horizontal overflow** — nothing should require horizontal scrolling except the Trust Badge strip.

## 12.2 Sticky Bottom CTA Bar (Mobile)
```
Position:     fixed, bottom: 0, left: 0, right: 0
Height:       64px
Background:   #FFFFFF
Border-top:   1px solid #E5E9EF
Shadow:       0 -4px 16px rgba(0,0,0,0.08)
z-index:      50
Padding:      8px 16px

Two-button layout:
  Left button:  "Calculate" — secondary navy outline, height: 48px
  Right button: WhatsApp green, height: 48px

After calculator or form scroll:
  Left button updates to: "Request Quotation" — primary amber
```

## 12.3 Mobile Navigation
```
Header height:  60px
Logo:           Left
Hamburger:      Right (24px icon, #0D1F3C)

Drawer menu:    Slides down from top or from right
Drawer bg:      #FFFFFF
Nav items:      h4 style, #0D1F3C, 56px touch height, border-bottom: 1px solid #F1F4F8
Close button:   Top-right, X icon
CTA in drawer:  Full-width amber button at bottom
```

## 12.4 Mobile Trust Bar
```
Layout:         Horizontal scroll, no scrollbar (overflow-x: auto, scrollbar-width: none)
Gap:            12px between badges
Padding:        16px horizontal
Fade edges:     Gradient fade on right side to indicate scrollability
```

## 12.5 Mobile Section Stack
All desktop two-column layouts collapse to single column:
```
Order:  Visual/image first, then text content below
Exception: Hero section — headline and CTA before image
```

## 12.6 Mobile Card Grids
- Three-column → Single-column
- Two-column → Single-column (with horizontal scroll option for add-on cards)

## 12.7 Mobile Image Rules
- Hero: Static image, no autoplay video
- Stage images: Load only expanded accordion images (lazy-load)
- Factory diagram: Simplified 2D image on mobile, not full isometric

## 12.8 Mobile Typography Adjustments
See Section 2.2 Mobile Scale Reductions.  
Minimum readable font size: **13px** (captions only). Body text never below 16px.

## 12.9 Mobile Form Rules
- One field per visual group where possible
- Full-width inputs
- Large tap targets for option buttons (minimum 44px height)
- Keyboard type attributes: `type="number"` for numeric fields, `type="tel"` for phone, `type="email"` for email
- Autoscroll to next step after pressing Next

---

# 13. Visual Treatment Rules

## 13.1 Background Rhythm

The page should alternate backgrounds to create natural section breaks without needing heavy borders.

Recommended sequence:
```
1.  Hero                          White left / image right
2.  Trust Bar                     Steel Pale (#F1F4F8)
3.  Problem                       White (#FFFFFF)
4.  Solution                      Off-White (#F7F8FA)
5.  Flexibility                   White (#FFFFFF)
6.  Calculator                    Slate Blue (#1E3A5F)
7.  Production Stages             Navy (#0D1F3C)
8.  Add-ons                       White (#FFFFFF)
9.  Manufacturing                 Off-White (#F7F8FA)
10. Site Requirements             White (#FFFFFF)
11. Lead Form                     Steel Pale (#F1F4F8)
12. Why No Price                  Navy (#0D1F3C)
13. Final CTA                     Dark image overlay (#0D1F3C 80%)
14. Footer                        Navy (#0D1F3C)
```

## 13.2 Image Treatment
- All production line photography should use a **very subtle warm grade** — slightly desaturated with warm highlight tones — to feel premium, not overly corporate.
- Hero image: Slightly brightened right side to avoid silhouetting machinery.
- Dark section images: Add a `rgba(13,31,60,0.3)` tint overlay for consistency.
- All images: Object-fit `cover` within defined aspect ratios.

## 13.3 Shadow System
```
Shallow:  0 1px 3px rgba(0,0,0,0.08) — subtle card depth
Standard: 0 4px 12px rgba(0,0,0,0.08) — lifted cards
Deep:     0 8px 32px rgba(0,0,0,0.12) — calculator, form card
Heavy:    0 16px 64px rgba(0,0,0,0.20) — floating hero elements
```

## 13.4 Border Radius System
```
Pill:     9999px — badges, tags, option buttons
Small:    4px — input fields, compact buttons
Medium:   8px — standard buttons, compact cards
Large:    10px — standard cards
XLarge:  12–16px — form card, calculator card, major feature blocks
```

## 13.5 Dividers and Separators
```
Standard divider:  1px solid #E5E9EF (on white sections)
Dark divider:      1px solid #1E3A5F (on navy sections)
Accent divider:    2px solid #D97706 (for section breaks with emphasis)
```

## 13.6 Section Overlines
Every section should begin with a small overline label above the headline.
```
Style:    12px, uppercase, letter-spacing: 0.1em, font-weight: 600
Color:    #D97706 (amber)
Margin:   0 0 12px 0
Examples:
  "PRODUCTION LINE"
  "CUSTOMIZATION OPTIONS"
  "ESTIMATE YOUR CAPACITY"
  "PRODUCTION STAGES"
  "OPTIONAL SYSTEMS"
  "MANUFACTURING PROCESS"
  "SITE PREPARATION"
  "REQUEST A QUOTATION"
```

## 13.7 Motion / Animation Rules

### Philosophy
- Animations explain content or guide attention. Never decorative.
- Duration: 200ms for micro-interactions, 400ms for reveals, 600ms for timeline animations.
- Easing: `ease-out` for entering elements, `ease-in-out` for transitions.
- No bounces, elastic, or playful spring animations on any industrial content.

### Scroll-Triggered Reveals
```
Effect:     Fade in + translate Y from 20px to 0px
Trigger:    Element enters viewport (IntersectionObserver, threshold 0.1)
Duration:   400ms ease-out
Stagger:    80ms between sequential cards
```

### Calculator Live Results
```
Number update:  Smooth count animation, duration 600ms
Result card transition:  Cross-fade between state cards, 300ms
```

### Trust Bar Micro-Animation
```
On page load:  Badges fade in with 80ms stagger, left to right
On hover:     Background tint appears, 150ms ease
```

### Production Stages (Desktop)
```
Left nav:     Highlight transitions 200ms ease
Right panel:  Fade + slight translate on stage change, 350ms ease-out
```

### Manufacturing Timeline
```
On scroll:    Steps animate sequentially, 200ms apart
Connector:    Line draws from left to right as user scrolls
```

### Form Step Transitions
```
Forward:    Current slide fades and translates left 20px, next slides in from right 20px
Backward:   Reverse direction
Duration:   300ms ease-in-out
```

---

# 14. Accessibility Rules

## 14.1 Color Contrast
All text must pass **WCAG AA** minimum (4.5:1 for body, 3:1 for large text).

| Combination                        | Contrast Ratio | Pass |
|------------------------------------|----------------|------|
| #FFFFFF on #0D1F3C                 | ~15.6:1        | AAA  |
| #0D1F3C on #FFFFFF                 | ~15.6:1        | AAA  |
| #374151 on #FFFFFF                 | ~8.9:1         | AAA  |
| #FFFFFF on #D97706                 | ~3.1:1         | AA Large only |
| #0D1F3C on #FEF3C7                 | ~12.5:1        | AAA  |
| #6B7280 on #FFFFFF                 | ~4.6:1         | AA   |

**Note:** `#FFFFFF` text on `#D97706` amber buttons passes only for large text (18px+). For 16px button text, use `#0D1F3C` text on amber if the amber is lightened, or ensure button font-weight is 700 (bold meets the large text threshold at 16px bold). Test contrast before final implementation.

## 14.2 Focus States
All interactive elements must have a **visible focus ring**:
```
outline:        2px solid #D97706
outline-offset: 3px
```
Never use `outline: none` without replacing with a custom visible focus indicator.

## 14.3 Touch Targets
Minimum touch target: **44px × 44px** on all mobile interactive elements.

## 14.4 Alt Text
Every technical image must have descriptive alt text explaining the machine stage or production process. No decorative images should have empty alt tags that skip meaningful content.

## 14.5 Form Accessibility
- All inputs must have explicit `<label>` elements, not placeholder-only.
- Error messages must use `aria-describedby` to associate with the field.
- Calculator results must be announced to screen readers via `aria-live="polite"`.

---

# 15. Design Token Summary

Below is a structured reference for implementation (Tailwind CSS custom config or CSS custom properties).

## Colors
```css
--color-navy:         #0D1F3C;
--color-slate:        #1E3A5F;
--color-steel:        #4B5563;
--color-steel-light:  #E5E9EF;
--color-steel-pale:   #F1F4F8;
--color-amber:        #D97706;
--color-amber-light:  #FEF3C7;
--color-white:        #FFFFFF;
--color-off-white:    #F7F8FA;
--color-success:      #16A34A;
--color-error:        #DC2626;
--color-config-blue:  #1D4ED8;
--color-whatsapp:     #25D366;

/* Text */
--text-primary:       #0D1F3C;
--text-body:          #374151;
--text-muted:         #6B7280;
--text-inverse:       #FFFFFF;
--text-accent:        #D97706;
```

## Typography
```css
--font-family:        'Inter', 'Helvetica Neue', Arial, sans-serif;
--font-display:       700 60px/68px var(--font-family);
--font-h1:            700 48px/56px var(--font-family);
--font-h2:            700 36px/44px var(--font-family);
--font-h3:            600 28px/36px var(--font-family);
--font-h4:            600 22px/30px var(--font-family);
--font-body-lg:       400 18px/28px var(--font-family);
--font-body:          400 16px/26px var(--font-family);
--font-body-sm:       400 14px/22px var(--font-family);
--font-caption:       400 13px/20px var(--font-family);
--font-overline:      600 12px/16px var(--font-family);
--font-micro:         500 12px/18px var(--font-family);
```

## Spacing
```css
--space-xs:   4px;
--space-sm:   8px;
--space-md:   12px;
--space-lg:   16px;
--space-xl:   24px;
--space-2xl:  32px;
--space-3xl:  40px;
--space-4xl:  48px;
--space-5xl:  64px;
--space-6xl:  80px;
--space-7xl:  96px;
--space-8xl:  128px;
```

## Border Radius
```css
--radius-pill:   9999px;
--radius-sm:     4px;
--radius-md:     8px;
--radius-lg:     10px;
--radius-xl:     12px;
--radius-2xl:    16px;
```

## Shadows
```css
--shadow-shallow: 0 1px 3px rgba(0,0,0,0.08);
--shadow-sm:      0 4px 12px rgba(0,0,0,0.08);
--shadow-md:      0 8px 32px rgba(0,0,0,0.12);
--shadow-lg:      0 16px 64px rgba(0,0,0,0.20);
```

---

# 16. Session 5 Handoff Notes

## What Is Ready

Session 5 is complete. The full UI direction and design system has been defined including:

- Color palette with semantic tokens
- Typography scale with mobile adjustments
- Spacing system
- Layout grid system
- Section-by-section style rules
- Card style library (6 card types)
- Button style library (5 button variants)
- Icon direction with specific icon map per section
- Form UI style
- Calculator UI style
- Stage and timeline style
- Mobile design direction
- Visual treatment rules
- Animation principles
- Accessibility requirements
- Design token summary

## What Is Not Yet Done

- No frontend code has been written.
- No Figma or visual design files have been created.
- Assets (images, videos) have not been produced — see Session 3 visual blueprint.

## Next Session

**Session 6 — Calculator Logic + Lead Form UX**

Before moving to the frontend scaffold (Session 7), Session 6 should define the complete calculator state logic, form validation rules, and smart prefill behavior (auto-populating form fields from calculator results).

The design system in this document is the visual contract for all subsequent frontend work.
