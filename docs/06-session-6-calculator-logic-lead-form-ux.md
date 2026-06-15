# Session 6 — Calculator Logic + Lead Form UX

## Project
Nano Line Healthy Bread Production Line  
Model: **NL-RM210 / Steel Master**

---

# 0. Session Goal

Turn the production calculator and the lead qualification form into precise, implementation-ready specifications.

This document defines:

- Every calculator input, its type, and constraints
- Every calculator output and how it is derived
- Exact formula logic and result-state thresholds
- Add-on recommendation logic
- Validation rules and edge-case handling
- Step-by-step lead form UX with field-level rules
- Prefill behavior from calculator into the form
- The final structured lead data payload
- WhatsApp and email notification templates for the sales team
- Success/thank-you behavior
- Implementation notes for the future frontend build

## Hard Rules (carried from CLAUDE.md)

- **No prices, no cost output, no financial calculation anywhere.**
- The calculator estimates **production capacity only**.
- The line is **customizable and built-to-order**.
- The form exists to give sales enough data to prepare a **short customized quotation**.
- All capacity numbers must be framed as **dependent on configuration**.

---

# 1. Calculator Input Fields

The calculator is a qualification tool. It collects the minimum data needed to estimate required hourly production and to suggest a configuration direction.

| # | Field | Key | Type | Required | Options / Range | Default | Placeholder |
|---|-------|-----|------|----------|-----------------|---------|-------------|
| 1 | Required Loaves Per Day | `dailyLoaves` | Number (integer) | Yes | 1 – 5,000,000 | empty | `Example: 50,000` |
| 2 | Daily Working Hours | `dailyWorkingHours` | Number (decimal, 1 dp) | Yes | 1 – 24 | empty | `Example: 10` |
| 3 | Monthly Working Days | `monthlyWorkingDays` | Number (integer) | Yes | 1 – 31 | `26` | `Example: 26` |
| 4 | Target Loaf Weight | `loafWeight` | Single-select | Yes | `30g`, `50g`, `70g`, `100g`, `Custom` | none | — |
| 5 | Target Loaf Shape | `loafShape` | Single-select | Yes | `Round`, `Square`, `Not sure yet` | none | — |
| 6 | Target Loaf Size | `loafSize` | Single-select | Yes | `20cm`, `25cm`, `30cm`, `Custom` | none | — |
| 7 | Need a Mixing System? | `needsMixing` | Single-select | Yes | `Yes`, `No`, `Not sure` | none | — |
| 8 | Need Counting / Packaging Support? | `needsPackaging` | Single-select | Yes | `Yes`, `No`, `Not sure` | none | — |

## 1.1 Custom Value Sub-Fields

When `loafWeight = Custom`, reveal:
- `loafWeightCustom` — Number, 10 – 500, suffix `g`, required if shown.

When `loafSize = Custom`, reveal:
- `loafSizeCustom` — Number, 5 – 80, suffix `cm`, required if shown.

These custom values are **collected and passed to sales**, but do **not** change the capacity formula (capacity is driven by daily loaves and working hours). They inform the configuration note and the eventual technical review.

## 1.2 Step Grouping (UX from Session 4)

Per the wireframe, the calculator groups inputs into steps:

- **Step 1 — Production Need:** `dailyLoaves`, `dailyWorkingHours`, `monthlyWorkingDays`
- **Step 2 — Product Specs:** `loafShape`, `loafWeight`, `loafSize`
- **Step 3 — Automation Needs:** `needsMixing`, `needsPackaging`
- **Step 4 — Recommendation:** read-only results + CTA

On **desktop**, all inputs may appear in a single left panel with live results on the right (Session 4 §5.7). On **mobile**, use the 4-step flow (Session 4 §6.6). The logic below is identical in both layouts.

---

# 2. Calculator Output Fields

| # | Output | Key | Type | Source |
|---|--------|-----|------|--------|
| 1 | Required Hourly Production | `requiredHourlyProduction` | Number (loaves/hour) | Formula §3.1 |
| 2 | Estimated Monthly Production | `monthlyProduction` | Number (loaves/month) | Formula §3.2 |
| 3 | Configuration Direction | `configurationDirection` | Enum: `standard` \| `custom` \| `higher_capacity` | Logic §4 |
| 4 | Configuration Message | `configurationMessage` | String (from copy) | Logic §4 |
| 5 | Suggested Add-ons | `suggestedAddons` | String array | Logic §5 |
| 6 | Capacity Fit Indicator | `capacityFit` | Enum for gauge: `within` \| `upper` \| `beyond` | Maps from §4 |

## 2.1 Output Display Rules

- `requiredHourlyProduction` is displayed **rounded up** to the nearest whole loaf (you cannot produce a fraction of a loaf, and rounding up avoids under-speccing the line). Display with thousands separators, e.g. `5,000`.
- `monthlyProduction` is displayed as a whole number with thousands separators.
- All numbers use tabular numerals (Session 5 §2.1).
- The gauge (Session 3 §6, Session 5 §10.5) visually moves across three zones mapped from `capacityFit`.
- The disclaimer is **always** shown beneath results (see §4.5).

---

# 3. Calculator Formula Logic

## 3.1 Required Hourly Production

```
requiredHourlyProduction = ceil(dailyLoaves / dailyWorkingHours)
```

- `ceil` (round up) ensures the recommended line speed can meet the daily target within the stated working hours.
- Unit: loaves per hour.

## 3.2 Estimated Monthly Production

```
monthlyProduction = dailyLoaves × monthlyWorkingDays
```

- Unit: loaves per month.

## 3.3 Worked Example

Inputs: `dailyLoaves = 50,000`, `dailyWorkingHours = 10`, `monthlyWorkingDays = 26`

```
requiredHourlyProduction = ceil(50,000 / 10) = 5,000 loaves/hour
monthlyProduction        = 50,000 × 26       = 1,300,000 loaves/month
```

Result: `5,000` falls in the 3,500–6,000 band → **Custom configuration recommended** (see §4.2).

## 3.4 Important Constraints on the Formula

- The formula uses **only** `dailyLoaves`, `dailyWorkingHours`, and `monthlyWorkingDays`.
- Loaf weight, shape, and size do **not** alter the numeric output. They affect the **configuration narrative** and are forwarded to sales, because real-world capacity depends on them — but the page must never present a single fixed capacity as guaranteed.
- No price, cost, ROI, or financial value is ever computed.

---

# 4. Calculator Result States

The thresholds come directly from CLAUDE.md / Session 1. Three states, none of them framed as errors or warnings.

## 4.1 State 1 — Standard Configuration May Be Suitable

**Condition:**
```
requiredHourlyProduction <= 3500
```

- `configurationDirection = "standard"`
- `capacityFit = "within"`
- **Visual:** Calm positive state — green result card (Session 5 §6.5 Result 1).
- **Message (from Session 2 copy):**
  > Your required hourly production is within the lower production range. A standard configuration may be suitable, subject to technical review.

## 4.2 State 2 — Custom Configuration Recommended

**Condition:**
```
requiredHourlyProduction > 3500 AND requiredHourlyProduction <= 6000
```

- `configurationDirection = "custom"`
- `capacityFit = "upper"`
- **Visual:** Highlighted recommendation state — blue result card (Session 5 §6.5 Result 2).
- **Message:**
  > Your required hourly production is within the flexible production range. A custom configuration is recommended based on loaf size, weight, shape, and automation needs.

## 4.3 State 3 — Higher-Capacity Study Recommended

**Condition:**
```
requiredHourlyProduction > 6000
```

- `configurationDirection = "higher_capacity"`
- `capacityFit = "beyond"`
- **Visual:** Consultative state (not warning/error) — amber result card (Session 5 §6.5 Result 3).
- **Message:**
  > Your required hourly production is above the typical single-line range. A higher-capacity configuration or multi-line production study is recommended.

## 4.4 Result-State Logic Table

| requiredHourlyProduction | direction | capacityFit | Card color |
|--------------------------|-----------|-------------|------------|
| `<= 3500` | `standard` | `within` | Green |
| `3501 – 6000` | `custom` | `upper` | Blue |
| `> 6000` | `higher_capacity` | `beyond` | Amber |

> **Boundary note:** The brief expresses the middle band as “> 3500 and <= 6000.” Because results are integers (rounded up), the value `3500` is Standard and `3501` is the first Custom value. `6000` is the last Custom value; `6001` is the first Higher-capacity value.

## 4.5 Always-Present Disclaimer

Displayed with every result, regardless of state (Session 2 copy):

> This calculator provides an indicative production estimate only. Final line configuration, capacity, and quotation will be confirmed after technical review.

## 4.6 Calculator CTA

Inside the result panel (Session 2 copy):

> **Request a Custom Quotation Based on These Details**

This CTA scrolls to the Lead Qualification Form and triggers prefill (§10).

---

# 5. Add-on Recommendation Logic

`suggestedAddons` is an ordered list assembled from the rules below. It is advisory only — it pre-selects nothing irreversibly and never implies pricing.

## 5.1 Base Recommendations by Configuration Direction

| Direction | Always-suggested base add-ons |
|-----------|-------------------------------|
| `standard` | `Spiral Mixer` (if mixing not declined) |
| `custom` | `Electronic Mixing System with Weighing Scale`, `Air Compressor` |
| `higher_capacity` | `Electronic Mixing System with Weighing Scale`, `Air Compressor`, `Additional Control Systems` |

> Rationale: higher throughput benefits from electronic dosing accuracy and stronger control/automation. The Air Compressor supports pneumatic systems that are commonly required as automation increases.

## 5.2 Rules Driven by Calculator Inputs

| Condition | Add to `suggestedAddons` |
|-----------|--------------------------|
| `needsMixing = "Yes"` AND `direction = standard` | `Spiral Mixer` |
| `needsMixing = "Yes"` AND `direction != standard` | `Electronic Mixing System with Weighing Scale` |
| `needsMixing = "Not sure"` | `Electronic Mixing System with Weighing Scale` (as an option to discuss) |
| `needsPackaging = "Yes"` | `Packing and Preparation Table`, `Bag Sealing Machine`, `Automatic Bread Counter` |
| `needsPackaging = "Not sure"` | `Automatic Bread Counter` (as an option to discuss) |
| `requiredHourlyProduction > 6000` | `Additional Control Systems` |

## 5.3 Assembly Rules

1. Start with the base list for the matched `configurationDirection`.
2. Apply each input-driven rule in §5.2.
3. **De-duplicate** while preserving first-seen order.
4. If `needsMixing = "No"`, **remove** any mixing add-on (`Spiral Mixer`, `Electronic Mixing System with Weighing Scale`) that was added by the base rule.
5. If `needsPackaging = "No"`, **remove** packaging add-ons (`Packing and Preparation Table`, `Bag Sealing Machine`, `Automatic Bread Counter`).
6. If the final list is empty, display the neutral note instead of an empty block:
   > Optional systems can be selected after a technical review of your production plan.

## 5.4 Canonical Add-on Names (must match Session 2 copy exactly)

- Spiral Mixer
- Electronic Mixing System with Weighing Scale
- Packing and Preparation Table
- Bag Sealing Machine
- Automatic Bread Counter
- Air Compressor
- Additional Control Systems

## 5.5 Display

- Render as pill tags (Session 5 §10.6), each with its icon (Session 5 §8.5).
- Always followed by the note (Session 2):
  > Optional systems are selected after reviewing production volume, product type, site layout, and packaging workflow.

---

# 6. Input Validation Rules (Calculator)

Validation is **inline, friendly, and non-blocking until calculation**. Results compute live once required fields are valid.

| Field | Rule | Error Message |
|-------|------|---------------|
| `dailyLoaves` | Required, integer, `>= 1`, `<= 5,000,000` | `Please enter your required loaves per day.` |
| `dailyLoaves` | Not zero / not negative | `Daily loaves must be a positive number.` |
| `dailyLoaves` | Above max | `That number seems very high. Our team will study multi-line options with you.` |
| `dailyWorkingHours` | Required, number, `>= 1`, `<= 24` | `Enter working hours between 1 and 24.` |
| `monthlyWorkingDays` | Required, integer, `>= 1`, `<= 31` | `Enter working days between 1 and 31.` |
| `loafWeight` | One option selected | `Select a target loaf weight.` |
| `loafWeightCustom` | Required if weight = Custom; 10–500 | `Enter a custom weight between 10 and 500 g.` |
| `loafShape` | One option selected | `Select a loaf shape.` |
| `loafSize` | One option selected | `Select a target loaf size.` |
| `loafSizeCustom` | Required if size = Custom; 5–80 | `Enter a custom size between 5 and 80 cm.` |
| `needsMixing` | One option selected | `Let us know if you need a mixing system.` |
| `needsPackaging` | One option selected | `Let us know if you need counting or packaging support.` |

## 6.1 Validation Behavior

- **Numeric inputs:** strip non-numeric characters; accept thousands separators on display but store as raw number.
- **Live results:** compute and show results only when `dailyLoaves`, `dailyWorkingHours`, and `monthlyWorkingDays` are all valid. The three spec/automation selects refine the configuration message and add-ons but are not required for the numeric output to appear.
- **Calculator CTA enabled** only once all required fields are valid.
- Errors appear **on blur** and clear **on valid input** (do not nag while typing the first character).

---

# 7. Edge Cases

| # | Scenario | Handling |
|---|----------|----------|
| 1 | `dailyWorkingHours = 0` | Blocked by validation (min 1). Never divide by zero. |
| 2 | Division yields a decimal | `ceil()` to whole loaves/hour. |
| 3 | Extremely large `dailyLoaves` (e.g. > 5,000,000) | Cap input; show the multi-line guidance message; still route to `higher_capacity`. |
| 4 | `requiredHourlyProduction` exactly `3500` | Standard state. |
| 5 | `requiredHourlyProduction` exactly `6000` | Custom state. |
| 6 | `requiredHourlyProduction` = `6001` | Higher-capacity state. |
| 7 | `loafShape = "Not sure yet"` | Allowed. Configuration message adds: “Final shape (round or square) will be confirmed during technical review.” |
| 8 | `loafWeight = Custom` but custom field empty | Block calculation; show custom-weight error. |
| 9 | All automation answers = `Not sure` | Add-ons list shows discussion-level suggestions (§5.2) plus the neutral note. |
| 10 | User edits an input after results shown | Recompute live; animate number change (Session 5 §13.7). |
| 11 | `monthlyWorkingDays` > 31 | Block (max 31). |
| 12 | Non-numeric pasted into numeric field | Sanitize on input; ignore invalid characters. |
| 13 | User reaches form without using calculator | Form works standalone; no prefill applied (§10.4). |
| 14 | Very small need (e.g. 100 loaves/day, 8h → 13/h) | Standard state; message still framed positively, no “too small” language. |
| 15 | Decimal working hours (e.g. 10.5) | Allowed (1 decimal place). |
| 16 | Floating-point rounding artifacts | Round monthly to nearest integer; ceil hourly. |

---

# 8. Lead Form Step-by-Step UX

Five steps, matching Session 1 §10, Session 2 §11, and Session 4 §9. A live **Summary Panel** is shown on desktop (right column) and as a collapsible card on the final mobile step (Session 5 §6.7).

**Progress indicator:** `Step X of 5 — [Step Name]` (Session 5 §9.5).

> **Step order note:** Session 2 copy lists Contact Details as Step 1; Session 1/Session 4 list Contact Details last. We follow **Session 2 (the finalized copy): Contact Details first**, because capturing contact early protects the lead even on partial completion. The summary panel still surfaces product/capacity data as later steps are filled.

## Step 1 — Contact Details
| Field | Key | Type | Required |
|-------|-----|------|----------|
| Full Name | `fullName` | Text | Yes |
| Company Name | `companyName` | Text | Yes |
| Country / City | `location` | Text | Yes |
| Phone / WhatsApp | `phone` | Tel | Yes |
| Email Address | `email` | Email | Yes |

## Step 2 — Product Requirements
| Field | Key | Type | Required |
|-------|-----|------|----------|
| What product do you want to produce? | `productType` | Text | Yes |
| Preferred Loaf Shape | `loafShape` | Select: Round / Square / Not sure yet | Yes |
| Target Loaf Weight | `loafWeight` | Select: 30g / 50g / 70g / 100g / Custom | Yes |
| Target Loaf Size | `loafSize` | Select: 20cm / 25cm / 30cm / Custom | Yes |
| Additional Product Notes | `productNotes` | Textarea | No |

## Step 3 — Production Capacity
| Field | Key | Type | Required |
|-------|-----|------|----------|
| Required Loaves Per Day | `dailyLoaves` | Number | Yes |
| Daily Working Hours | `dailyWorkingHours` | Number | Yes |
| Monthly Working Days | `monthlyWorkingDays` | Number | Yes |
| Do You Expect Future Capacity Expansion? | `futureExpansion` | Select: Yes / No / Not sure | Yes |

## Step 4 — Automation & Add-ons
| Field | Key | Type | Required |
|-------|-----|------|----------|
| Do You Need a Mixing System? | `needsMixing` | Select: Yes / No / Not sure | Yes |
| Do You Need a Weighing System? | `needsWeighing` | Select: Yes / No / Not sure | Yes |
| Do You Need Packing Support? | `needsPacking` | Select: Yes / No / Not sure | Yes |
| Do You Need Automatic Counting? | `needsCounting` | Select: Yes / No / Not sure | Yes |

## Step 5 — Site Readiness
| Field | Key | Type | Required |
|-------|-----|------|----------|
| Is Your Factory Space Ready? | `spaceReady` | Select: Yes / Not yet / Under preparation | Yes |
| Available Space | `availableSpace` | Text | No |
| Is Electricity Ready? | `electricityReady` | Select: Yes / Not yet / Not sure | Yes |
| Is Gas or Diesel Available? | `fuelReady` | Select: Yes / Not yet / Not sure | Yes |
| Is Ventilation Ready? | `ventilationReady` | Select: Yes / Not yet / Not sure | Yes |
| Target Operation Date | `targetOperationDate` | Text | No |

**Final CTA:** `Submit Requirements`

## 8.1 Per-Step UX Behavior

- Each step validates before advancing; **Next** disabled until required fields valid.
- **Back** never loses entered data (state persists across steps).
- On the final step, the summary panel becomes a collapsible review card (mobile) so users can confirm before submit.
- Progress is **autosaved to local storage** (Session 4 §6.11) so an interrupted user can return.
- Smooth step transitions per Session 5 §13.7.

---

# 9. Form Validation Rules

| Field | Rule | Error Message |
|-------|------|---------------|
| `fullName` | Required, 2–80 chars, letters/spaces/hyphens | `Please enter your full name.` |
| `companyName` | Required, 2–120 chars | `Please enter your company name.` |
| `location` | Required, 2–120 chars | `Please enter your country and city.` |
| `phone` | Required, valid international format (E.164-friendly), 7–20 digits, may start `+` | `Enter a valid phone or WhatsApp number with country code.` |
| `email` | Required, valid email pattern | `Enter a valid business email address.` |
| `productType` | Required, 2–200 chars | `Tell us what product you want to produce.` |
| `loafShape` | Required selection | `Select a loaf shape.` |
| `loafWeight` | Required selection; if Custom → custom field 10–500 g | `Select a target loaf weight.` |
| `loafSize` | Required selection; if Custom → custom field 5–80 cm | `Select a target loaf size.` |
| `productNotes` | Optional, max 1000 chars | — |
| `dailyLoaves` | Required, integer 1–5,000,000 | `Enter your required loaves per day.` |
| `dailyWorkingHours` | Required, 1–24 | `Enter working hours between 1 and 24.` |
| `monthlyWorkingDays` | Required, integer 1–31 | `Enter working days between 1 and 31.` |
| `futureExpansion` | Required selection | `Let us know about future expansion.` |
| `needsMixing` / `needsWeighing` / `needsPacking` / `needsCounting` | Required selection each | `Please choose an option.` |
| `spaceReady` / `electricityReady` / `fuelReady` / `ventilationReady` | Required selection each | `Please choose an option.` |
| `availableSpace` | Optional, max 60 chars | — |
| `targetOperationDate` | Optional, free text (e.g. “Q4 2026”), max 40 chars | — |

## 9.1 Validation Behavior

- Validate **on blur** per field, and **on Next** for the whole step.
- Show one consolidated, friendly error summary at the top of a step only if the user attempts Next with multiple errors.
- Email and phone are the two most critical fields for sales — emphasize their errors clearly.
- Never block on optional fields.

---

# 10. Prefill Behavior (Calculator → Form)

If the user runs the calculator before opening the form (e.g. via the result-panel CTA), carry their inputs forward so they don’t re-enter data.

## 10.1 Mapped Fields

| Calculator field | Form field | Step |
|------------------|------------|------|
| `dailyLoaves` | `dailyLoaves` | 3 |
| `dailyWorkingHours` | `dailyWorkingHours` | 3 |
| `monthlyWorkingDays` | `monthlyWorkingDays` | 3 |
| `loafShape` | `loafShape` | 2 |
| `loafWeight` (+ custom) | `loafWeight` (+ custom) | 2 |
| `loafSize` (+ custom) | `loafSize` (+ custom) | 2 |
| `needsMixing` | `needsMixing` | 4 |
| `needsPackaging` | `needsPacking` | 4 |

## 10.2 Derived Values Carried (read-only context for sales)

- `requiredHourlyProduction`
- `monthlyProduction`
- `configurationDirection`
- `suggestedAddons`

These are stored on the payload (§11) and shown in the summary panel, but are **not** editable form fields.

## 10.3 Prefill UX

- When the form opens with prefill, show a small dismissible note at the top of the form:
  > We’ve carried over your calculator details. You can edit anything before submitting.
- Prefilled fields are normal (editable), not locked.
- The summary panel immediately reflects prefilled values.
- If the user changes a prefilled capacity field, recompute `requiredHourlyProduction` / `monthlyProduction` / `configurationDirection` so the payload stays consistent with what was submitted.

## 10.4 No-Calculator Path

- If the user opens the form directly, no prefill is applied; derived fields are computed at submit time from the form’s capacity inputs (Step 3) using the same formulas (§3) and logic (§4–§5).

## 10.5 Source Tracking

- `leadSource.usedCalculator` = `true` if any prefill occurred, else `false`.

---

# 11. Final Lead Data Payload Structure

A single normalized object submitted to the backend / CRM / notification service. **No pricing fields exist anywhere in this payload.**

```json
{
  "meta": {
    "submittedAt": "2026-06-15T10:06:46Z",
    "locale": "en",
    "pageVersion": "nl-rm210-landing-v1",
    "leadSource": {
      "usedCalculator": true,
      "entryCta": "calculator_result",
      "referrer": "https://example.com",
      "utm": {
        "source": null,
        "medium": null,
        "campaign": null
      }
    }
  },
  "contact": {
    "fullName": "string",
    "companyName": "string",
    "location": "string",
    "phone": "+9665XXXXXXXX",
    "email": "name@company.com"
  },
  "product": {
    "productType": "string",
    "loafShape": "round | square | not_sure",
    "loafWeight": "30g | 50g | 70g | 100g | custom",
    "loafWeightCustom": 0,
    "loafSize": "20cm | 25cm | 30cm | custom",
    "loafSizeCustom": 0,
    "productNotes": "string"
  },
  "capacity": {
    "dailyLoaves": 50000,
    "dailyWorkingHours": 10,
    "monthlyWorkingDays": 26,
    "futureExpansion": "yes | no | not_sure"
  },
  "automation": {
    "needsMixing": "yes | no | not_sure",
    "needsWeighing": "yes | no | not_sure",
    "needsPacking": "yes | no | not_sure",
    "needsCounting": "yes | no | not_sure"
  },
  "site": {
    "spaceReady": "yes | not_yet | under_preparation",
    "availableSpace": "8 x 22 m",
    "electricityReady": "yes | not_yet | not_sure",
    "fuelReady": "yes | not_yet | not_sure",
    "ventilationReady": "yes | not_yet | not_sure",
    "targetOperationDate": "Q4 2026"
  },
  "derived": {
    "requiredHourlyProduction": 5000,
    "monthlyProduction": 1300000,
    "configurationDirection": "standard | custom | higher_capacity",
    "suggestedAddons": [
      "Electronic Mixing System with Weighing Scale",
      "Air Compressor"
    ]
  }
}
```

## 11.1 Field Notes

- `loafWeightCustom` / `loafSizeCustom` are `0` (or `null`) unless the matching select is `custom`.
- `derived` is computed at submit time from `capacity` + `product` + `automation`, even when the calculator was not used, so sales always receives a configuration direction.
- Enum values are stored in normalized snake_case; display labels come from the content files.

---

# 12. WhatsApp Message Template (for Sales)

Used when the lead is delivered to the sales team via WhatsApp (or when the visitor taps the WhatsApp CTA and we prefill a structured message). **No prices.**

## 12.1 Sales Notification (system → sales WhatsApp)

```
🟠 New Nano Line Lead — NL-RM210

👤 Contact
Name: {{fullName}}
Company: {{companyName}}
Location: {{location}}
Phone: {{phone}}
Email: {{email}}

🍞 Product
Type: {{productType}}
Shape: {{loafShape}}
Weight: {{loafWeight}}
Size: {{loafSize}}

⚙️ Capacity
Daily loaves: {{dailyLoaves}}
Working hours/day: {{dailyWorkingHours}}
Working days/month: {{monthlyWorkingDays}}
Required hourly: {{requiredHourlyProduction}}/h
Monthly output: {{monthlyProduction}}
Future expansion: {{futureExpansion}}

🧩 Direction: {{configurationDirection}}
Suggested add-ons: {{suggestedAddons}}

🏭 Site
Space ready: {{spaceReady}} ({{availableSpace}})
Electricity: {{electricityReady}}
Fuel: {{fuelReady}}
Ventilation: {{ventilationReady}}
Target date: {{targetOperationDate}}

Source: {{usedCalculator ? "Calculator + Form" : "Form only"}}
Submitted: {{submittedAt}}
```

## 12.2 Visitor-Initiated WhatsApp (CTA → pre-filled outbound message)

When a visitor taps **Contact Us on WhatsApp**, prefill a short, polite message (no internal labels):

```
Hello Nano Line, I'm interested in the NL-RM210 healthy bread production line.

I want to produce {{loafShape}} bread, around {{loafWeight}}, target ~{{dailyLoaves}} loaves/day.
Could you help me configure a line and prepare a customized quotation?
```

If the calculator/form has no data yet, fall back to:

```
Hello Nano Line, I'm interested in the NL-RM210 healthy bread production line and would like to discuss a customized quotation.
```

---

# 13. Email Notification Template (for Sales)

Internal email to the sales inbox on each submission. **No prices.**

**Subject:**
```
New NL-RM210 Lead — {{companyName}} ({{configurationDirection}}, ~{{requiredHourlyProduction}}/h)
```

**Body (HTML or plain text):**
```
A new lead has been submitted from the Nano Line landing page.

CONTACT
- Name: {{fullName}}
- Company: {{companyName}}
- Location: {{location}}
- Phone / WhatsApp: {{phone}}
- Email: {{email}}

PRODUCT REQUIREMENTS
- Product type: {{productType}}
- Loaf shape: {{loafShape}}
- Loaf weight: {{loafWeight}}{{loafWeightCustom ? " (" + loafWeightCustom + " g)" : ""}}
- Loaf size: {{loafSize}}{{loafSizeCustom ? " (" + loafSizeCustom + " cm)" : ""}}
- Notes: {{productNotes}}

PRODUCTION CAPACITY
- Required loaves/day: {{dailyLoaves}}
- Daily working hours: {{dailyWorkingHours}}
- Monthly working days: {{monthlyWorkingDays}}
- Required hourly production: {{requiredHourlyProduction}} loaves/hour
- Estimated monthly production: {{monthlyProduction}} loaves
- Future expansion: {{futureExpansion}}

CONFIGURATION DIRECTION
- {{configurationDirection}}
- Suggested add-ons: {{suggestedAddons}}

AUTOMATION NEEDS
- Mixing system: {{needsMixing}}
- Weighing system: {{needsWeighing}}
- Packing support: {{needsPacking}}
- Automatic counting: {{needsCounting}}

SITE READINESS
- Factory space ready: {{spaceReady}}
- Available space: {{availableSpace}}
- Electricity ready: {{electricityReady}}
- Gas/diesel available: {{fuelReady}}
- Ventilation ready: {{ventilationReady}}
- Target operation date: {{targetOperationDate}}

LEAD SOURCE
- Used calculator: {{usedCalculator}}
- Entry CTA: {{entryCta}}
- Submitted: {{submittedAt}}

Reminder: prepare a SHORT customized quotation after technical review.
Do not send pricing before configuration is confirmed.
```

## 13.1 Optional Lead Auto-Acknowledgement (to the visitor)

If a visitor confirmation email is sent, it must **not** include any price or fixed delivery date:

**Subject:** `We received your Nano Line production request`

```
Dear {{fullName}},

Thank you for your interest in the Nano Line NL-RM210 healthy bread production line.

Our technical team will review your production requirements and contact you to
discuss the suitable line configuration and a customized quotation.

This is a built-to-order industrial line. Average manufacturing and preparation
lead time is approximately 120 to 180 days, depending on the final approved
configuration.

Best regards,
Nano Line Industries
```

---

# 14. Thank-You / Success Message

On successful submission (Session 2 copy, exact):

> **Thank you. Your request has been received.**
> Our team will review your production requirements and contact you to discuss the suitable line configuration and quotation.

## 14.1 Success State UX (Session 5 §9.8)

- Replace the form card with the success card: `#D1FAE5` background, `check-circle` 48px in `#16A34A`, headline in `#065F46`.
- Show secondary actions below the message:
  - `Contact Us on WhatsApp` (WhatsApp green button)
  - `Back to Home` / `Explore Production Stages` (ghost button)
- Clear autosaved form draft from local storage on success.
- Announce success to screen readers via `aria-live="polite"`.

## 14.2 Failure State

If submission fails (network/server):

> Something went wrong while sending your request. Please try again, or contact us directly on WhatsApp.

- Keep all entered data intact.
- Offer a **Retry** button and the WhatsApp fallback.

---

# 15. Implementation Notes (for the future frontend build)

> No code in this session. These notes guide Session 7 (scaffold) and Session 8 (build).

## 15.1 Suggested Module Boundaries

- `lib/calculator.ts` — pure functions only:
  - `computeRequiredHourly(dailyLoaves, dailyWorkingHours): number`
  - `computeMonthly(dailyLoaves, monthlyWorkingDays): number`
  - `resolveConfiguration(requiredHourly): { direction, capacityFit, message }`
  - `suggestAddons(inputs, direction): string[]`
  - All deterministic, side-effect free, unit-testable.
- `lib/validation.ts` — field validators returning `{ valid, message }`.
- `content/landing.en.ts` — all labels, options, messages, templates (Session 4 §13 bilingual readiness).
- Components map to Session 4 §11 (`ProductionCalculator`, `LeadQualificationForm`, `SummaryPanel`, `CalculatorResultCard`, `FormStep`).

## 15.2 State Management

- Calculator and form should share a single source of truth (e.g. a small store or React context) so prefill (§10) and the live summary panel stay in sync.
- Persist form draft to `localStorage` under a versioned key (e.g. `nl_lead_draft_v1`); clear on success.

## 15.3 Formula Integrity

- Centralize thresholds (`3500`, `6000`) as named constants — never hardcode inline.
- `requiredHourlyProduction` uses `Math.ceil`; `monthlyProduction` uses integer multiplication.
- Add unit tests for the boundary cases in §7 (3500 / 6000 / 6001).

## 15.4 No-Price Guardrails

- No field, label, template, or computed value may represent currency, cost, ROI, or fixed delivery dates.
- A simple lint/test could assert that calculator and payload contain no keys matching `price|cost|amount|total|currency`.

## 15.5 Accessibility & Input Hints

- Numeric inputs: `inputmode="numeric"`; phone: `inputmode="tel"`; email: `type="email"`.
- Calculator result region: `aria-live="polite"`.
- Every option group uses fieldset/legend semantics; pill options are real radio inputs visually styled (Session 5 §9.4).
- Minimum 44px touch targets (Session 5 §14.3).

## 15.6 Analytics Hooks (no PII beyond consent)

Recommended events: `calculator_started`, `calculator_completed`, `calculator_cta_clicked`, `form_step_completed` (with step index), `form_submitted`, `whatsapp_clicked`. These help the sales/marketing team measure qualification funnel performance.

## 15.7 Delivery / Integration

- Submit endpoint should fan out to: CRM record + sales email (§13) + optional sales WhatsApp (§12) + optional visitor acknowledgement (§13.1).
- Treat WhatsApp/email templates as content (translatable later for the Arabic version).

---

# 16. Session 6 Handoff

Session 6 is complete. Defined and ready:

- Calculator inputs, outputs, formulas, result states, and add-on logic
- Calculator and form validation rules and edge cases
- Five-step lead form UX with field-level specs
- Calculator→form prefill behavior
- Normalized, price-free lead payload
- WhatsApp and email templates (sales + visitor)
- Success/failure UX
- Implementation notes for the engineering phase

## Next Session

**Session 7 — Frontend Scaffold** (Next.js + TypeScript + Tailwind, component and content structure per CLAUDE.md §7), followed by **Session 8 — Frontend Build**, implementing the calculator and form exactly per this document and the Session 5 design system.
