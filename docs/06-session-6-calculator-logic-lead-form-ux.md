# Session 6 — Calculator Logic + Lead Form UX

## Project
Nano Line Healthy Bread Production Line  
Model: **NL-RM210 / Steel Master**

---

# 0. Session Goal

Create an implementation-ready UX logic document for the production calculator and lead qualification form.

This document covers:

1. Calculator input fields
2. Calculator output fields
3. Calculator formula logic
4. Calculator result states
5. Add-on recommendation logic
6. Input validation rules
7. Edge cases
8. Lead form step-by-step UX
9. Form validation rules
10. Prefill behavior from calculator to form
11. Final lead data payload structure
12. WhatsApp message templates
13. Email notification templates
14. Thank-you / success message
15. Implementation notes for future frontend build

Important:

- The calculator is for production estimation only.
- The calculator must never output prices.
- The form supports sales qualification for a customized quotation.

---

# 1. Calculator UX Overview

The calculator should help visitors estimate their required hourly production and guide them toward the right sales conversation.

It should answer:

- How many loaves per hour do I need?
- Is my target within the standard/lower range?
- Do I need a custom configuration?
- Do I need a higher-capacity study?
- What add-ons may be relevant?

The calculator should never answer:

- What is the price?
- What is the final quotation?
- What is the cost per loaf?
- What is the ROI?

---

# 2. Calculator Step Flow

Use the 4-step flow defined in Session 4.

## Step 1 — Production Need

Fields:

- Required loaves per day
- Daily working hours
- Monthly working days

## Step 2 — Product Specs

Fields:

- Target loaf weight
- Target loaf shape
- Target loaf size
- Custom weight field if needed
- Custom size field if needed

## Step 3 — Automation Needs

Fields:

- Mixing system required?
- Weighing system required?
- Counting or packaging support required?
- Automatic counting required?

## Step 4 — Recommendation

Outputs:

- Required hourly production
- Estimated monthly production
- Capacity fit indicator
- Configuration direction
- Suggested add-ons
- CTA to request a custom quotation

---

# 3. Calculator Input Fields

## 3.1 Required Loaves Per Day

Key: `dailyLoaves`

Type: number  
Required: yes  
Default: empty  
Placeholder: `Example: 50,000`

Suggested range:

- Minimum: 1,000
- Maximum soft limit: 1,000,000

Validation:

- Must be a positive number.
- Must not be zero.
- Must not contain letters.

Friendly error:

> Please enter the number of loaves you want to produce per day.

---

## 3.2 Daily Working Hours

Key: `dailyWorkingHours`

Type: number  
Required: yes  
Default: empty  
Placeholder: `Example: 10`

Suggested range:

- Minimum: 1
- Maximum: 24

Validation:

- Must be between 1 and 24.
- Must not be zero.

Friendly error:

> Please enter the number of working hours per day.

---

## 3.3 Monthly Working Days

Key: `monthlyWorkingDays`

Type: number  
Required: yes  
Default: 26  
Placeholder: `Example: 26`

Suggested range:

- Minimum: 1
- Maximum: 31

Validation:

- Must be between 1 and 31.

Friendly error:

> Please enter the number of working days per month.

---

## 3.4 Target Loaf Weight

Key: `targetWeight`

Type: select / pill options  
Required: yes  
Default: `not_sure`

Options:

- `30g`
- `50g`
- `70g`
- `100g`
- `custom`
- `not_sure`

Custom sub-field:

Key: `customWeightGrams`  
Type: number  
Required only if `targetWeight = custom`

Suggested range:

- Minimum: 30
- Maximum: 100

Friendly error:

> Please enter a custom loaf weight between 30 g and 100 g, or choose Not sure.

Important:

Loaf weight does not change the numeric calculator output. It helps sales review the technical configuration.

---

## 3.5 Target Loaf Shape

Key: `targetShape`

Type: select / pill options  
Required: yes  
Default: `not_sure`

Options:

- `round`
- `square`
- `not_sure`

Important:

Loaf shape does not change the numeric calculator output. It helps sales understand the required configuration.

---

## 3.6 Target Loaf Size

Key: `targetSize`

Type: select / pill options  
Required: yes  
Default: `not_sure`

Options:

- `20cm`
- `25cm`
- `30cm`
- `custom`
- `not_sure`

Custom sub-field:

Key: `customSizeCm`  
Type: number  
Required only if `targetSize = custom`

Suggested range:

- Minimum: 20
- Maximum: 30

Friendly error:

> Please enter a custom loaf size between 20 cm and 30 cm, or choose Not sure.

Important:

Loaf size does not change the numeric calculator output. It helps sales review technical configuration.

---

## 3.7 Mixing System Required?

Key: `needsMixingSystem`

Type: select / pill options  
Required: yes  
Default: `not_sure`

Options:

- `yes`
- `no`
- `not_sure`

---

## 3.8 Counting or Packaging Support Required?

Key: `needsPackagingSupport`

Type: select / pill options  
Required: yes  
Default: `not_sure`

Options:

- `yes`
- `no`
- `not_sure`

---

# 4. Calculator Output Fields

## 4.1 Required Hourly Production

Key: `requiredHourlyProduction`

Formula:

```txt
ceil(dailyLoaves / dailyWorkingHours)
```

Display format:

```txt
Your project requires approximately [X] loaves per hour.
```

Rules:

- Always round up using `ceil`.
- Use thousands separators.
- Use tabular numerals.

---

## 4.2 Estimated Monthly Production

Key: `estimatedMonthlyProduction`

Formula:

```txt
dailyLoaves × monthlyWorkingDays
```

Display format:

```txt
Estimated monthly output: [X] loaves.
```

Rules:

- Use thousands separators.
- Use tabular numerals.

---

## 4.3 Capacity Fit Indicator

Key: `capacityFit`

Possible values:

- `standard_possible`
- `custom_recommended`
- `higher_capacity_study`

This drives:

- Result state color
- Recommendation message
- Gauge position
- CTA emphasis

---

## 4.4 Configuration Direction

Key: `configurationDirection`

Possible values:

1. Standard Configuration May Be Suitable
2. Custom Configuration Recommended
3. Higher-Capacity Study Recommended

---

## 4.5 Suggested Add-ons

Key: `suggestedAddOns`

Returns an array of canonical add-on names.

Canonical names:

- Spiral Mixer
- Electronic Mixing System with Weighing Scale
- Packing and Preparation Table
- Bag Sealing Machine
- Automatic Bread Counter
- Air Compressor
- Additional Control Systems

---

## 4.6 Disclaimer

Always show:

> This calculator provides an indicative production estimate only. Final line configuration, capacity, and quotation will be confirmed after technical review.

---

# 5. Formula Logic

## Core formulas

```txt
requiredHourlyProduction = ceil(dailyLoaves / dailyWorkingHours)
estimatedMonthlyProduction = dailyLoaves × monthlyWorkingDays
```

## Important technical note

Loaf weight, loaf shape, and loaf size do not change the numeric output in the calculator.

They are collected for technical qualification only.

The calculator estimates required output based on production demand and operating time. Final line capacity depends on technical configuration.

---

# 6. Result States

## Boundary Table

| Required hourly production | Result state | UI color |
|---:|---|---|
| 1–3,500 | Standard Configuration May Be Suitable | Green |
| 3,501–6,000 | Custom Configuration Recommended | Blue |
| 6,001+ | Higher-Capacity Study Recommended | Amber |

---

## 6.1 Standard Configuration May Be Suitable

Condition:

```txt
requiredHourlyProduction <= 3500
```

Exact message:

> Your required hourly production is within the lower production range. A standard configuration may be suitable, subject to technical review.

UI state:

- Green result card
- Calm positive state
- Do not imply final approval

---

## 6.2 Custom Configuration Recommended

Condition:

```txt
requiredHourlyProduction > 3500 && requiredHourlyProduction <= 6000
```

Exact message:

> Your required hourly production is within the flexible production range. A custom configuration is recommended based on loaf size, weight, shape, and automation needs.

UI state:

- Blue result card
- Recommended state
- Strong CTA to submit requirements

---

## 6.3 Higher-Capacity Study Recommended

Condition:

```txt
requiredHourlyProduction > 6000
```

Exact message:

> Your required hourly production is above the typical single-line range. A higher-capacity configuration or multi-line production study is recommended.

UI state:

- Amber result card
- Consultative state, not error or warning

---

# 7. Add-on Recommendation Logic

## Base recommendations by capacity fit

### Standard possible

Suggest:

- Air Compressor
- Additional Control Systems

### Custom recommended

Suggest:

- Air Compressor
- Additional Control Systems
- Electronic Mixing System with Weighing Scale

### Higher-capacity study

Suggest:

- Air Compressor
- Additional Control Systems
- Electronic Mixing System with Weighing Scale
- Automatic Bread Counter

---

## Input-driven recommendations

If `needsMixingSystem = yes`:

Add:

- Spiral Mixer
- Electronic Mixing System with Weighing Scale

If `needsMixingSystem = no`:

Remove:

- Spiral Mixer

If `needsPackagingSupport = yes`:

Add:

- Packing and Preparation Table
- Bag Sealing Machine
- Automatic Bread Counter

If `needsPackagingSupport = no`:

Remove:

- Packing and Preparation Table
- Bag Sealing Machine
- Automatic Bread Counter

If `needsPackagingSupport = not_sure`:

Keep packaging add-ons only if capacity fit is `higher_capacity_study`.

## De-duplication rule

The final add-on list must be unique.

---

# 8. Calculator Validation Rules

## Live result behavior

Do not show full results until these fields are valid:

- Required loaves per day
- Daily working hours
- Monthly working days

Before valid input, show a neutral placeholder:

> Enter your production target to estimate the required hourly output.

## Field-level messages

- `dailyLoaves` missing: Please enter the number of loaves you want to produce per day.
- `dailyWorkingHours` missing: Please enter the number of working hours per day.
- `dailyWorkingHours` zero: Working hours must be greater than zero.
- `monthlyWorkingDays` missing: Please enter the number of working days per month.
- `customWeightGrams` out of range: Please enter a custom loaf weight between 30 g and 100 g.
- `customSizeCm` out of range: Please enter a custom loaf size between 20 cm and 30 cm.

---

# 9. Edge Cases

## 9.1 Divide by zero

If `dailyWorkingHours = 0`, block calculation and show a validation message.

## 9.2 Exact 3,500

If required hourly production equals 3,500, result is:

- Standard Configuration May Be Suitable

## 9.3 Exact 6,000

If required hourly production equals 6,000, result is:

- Custom Configuration Recommended

## 9.4 6,001+

If required hourly production is 6,001 or more, result is:

- Higher-Capacity Study Recommended

## 9.5 Not sure product specs

If weight, shape, or size are `not_sure`, calculation still works.

Show note:

> Final product specifications can be reviewed during the technical consultation.

## 9.6 Very large inputs

If required hourly production is far above 6,000, avoid scary warnings.

Use consultative message:

> Your project may require a higher-capacity configuration, multiple lines, or a custom production study.

## 9.7 Standalone form path

If a visitor skips calculator and goes directly to form, the form should still work.

Derived values should be computed at submit if enough data is available.

---

# 10. Lead Form UX

The lead form should collect enough data for sales to prepare a short customized quotation.

It should use 5 steps.

## Step 1 — Contact Details

Fields:

| Field | Key | Required |
|---|---|---|
| Full Name | `fullName` | Yes |
| Company Name | `companyName` | Yes |
| Country / City | `location` | Yes |
| Phone / WhatsApp | `phoneWhatsapp` | Yes |
| Email Address | `email` | Yes |

Rationale:

Contact is first because the final copy uses contact-first flow and because phone/email are critical for sales follow-up.

---

## Step 2 — Product Requirements

Fields:

| Field | Key | Required |
|---|---|---|
| Product Type | `productType` | Yes |
| Preferred Loaf Shape | `preferredShape` | Yes |
| Target Loaf Weight | `targetWeight` | Yes |
| Target Loaf Size | `targetSize` | Yes |
| Additional Product Notes | `productNotes` | No |

---

## Step 3 — Production Capacity

Fields:

| Field | Key | Required |
|---|---|---|
| Required Loaves Per Day | `dailyLoaves` | Yes |
| Daily Working Hours | `dailyWorkingHours` | Yes |
| Monthly Working Days | `monthlyWorkingDays` | Yes |
| Future Capacity Expansion? | `futureExpansion` | No |

---

## Step 4 — Automation & Add-ons

Fields:

| Field | Key | Required |
|---|---|---|
| Need Mixing System? | `needsMixingSystem` | Yes |
| Need Weighing System? | `needsWeighingSystem` | No |
| Need Packing Support? | `needsPackagingSupport` | Yes |
| Need Automatic Counting? | `needsAutomaticCounting` | No |

---

## Step 5 — Site Readiness

Fields:

| Field | Key | Required |
|---|---|---|
| Factory Space Ready? | `factorySpaceReady` | Yes |
| Available Space | `availableSpace` | No |
| Electricity Ready? | `electricityReady` | No |
| Gas or Diesel Available? | `fuelAvailable` | No |
| Ventilation Ready? | `ventilationReady` | No |
| Target Operation Date | `targetOperationDate` | No |

---

# 11. Form Validation Rules

## Critical required fields

The form cannot submit without:

- Full name
- Company name
- Country / city
- Phone / WhatsApp
- Email
- Product type
- Preferred shape
- Daily loaves
- Daily working hours
- Monthly working days

## Email validation

Show error if email does not include a valid email format.

Message:

> Please enter a valid business email address.

## Phone validation

Keep phone validation flexible for international numbers.

Required rules:

- Must not be empty.
- Must contain at least 8 digits.

Message:

> Please enter a valid phone or WhatsApp number.

## Numeric validation

Use the same calculator validation rules for:

- Daily loaves
- Daily working hours
- Monthly working days
- Custom weight
- Custom size

---

# 12. Prefill Behavior from Calculator to Form

If the user completes the calculator first, prefill these form fields:

| Calculator field | Form field |
|---|---|
| `dailyLoaves` | `dailyLoaves` |
| `dailyWorkingHours` | `dailyWorkingHours` |
| `monthlyWorkingDays` | `monthlyWorkingDays` |
| `targetShape` | `preferredShape` |
| `targetWeight` | `targetWeight` |
| `targetSize` | `targetSize` |
| `needsMixingSystem` | `needsMixingSystem` |
| `needsPackagingSupport` | `needsPackagingSupport` |
| `requiredHourlyProduction` | summary panel only |
| `estimatedMonthlyProduction` | summary panel only |
| `capacityFit` | hidden derived field |
| `suggestedAddOns` | hidden derived field and summary panel |

Rules:

- Prefilled fields must remain editable.
- Show small note:

> We filled these details from your calculator result. You can edit them before submitting.

- Track source:

```txt
leadSourcePath = calculator_prefill
```

If user did not use calculator:

```txt
leadSourcePath = direct_form
```

---

# 13. Final Lead Payload Structure

Use this normalized structure for future frontend/API implementation.

```json
{
  "source": "landing_page",
  "leadSourcePath": "calculator_prefill",
  "contact": {
    "fullName": "",
    "companyName": "",
    "location": "",
    "phoneWhatsapp": "",
    "email": ""
  },
  "product": {
    "productType": "",
    "preferredShape": "round | square | not_sure",
    "targetWeight": "30g | 50g | 70g | 100g | custom | not_sure",
    "customWeightGrams": null,
    "targetSize": "20cm | 25cm | 30cm | custom | not_sure",
    "customSizeCm": null,
    "productNotes": ""
  },
  "production": {
    "dailyLoaves": null,
    "dailyWorkingHours": null,
    "monthlyWorkingDays": null,
    "futureExpansion": "yes | no | not_sure"
  },
  "automation": {
    "needsMixingSystem": "yes | no | not_sure",
    "needsWeighingSystem": "yes | no | not_sure",
    "needsPackagingSupport": "yes | no | not_sure",
    "needsAutomaticCounting": "yes | no | not_sure",
    "suggestedAddOns": []
  },
  "site": {
    "factorySpaceReady": "yes | not_yet | under_preparation",
    "availableSpace": "",
    "electricityReady": "yes | no | not_sure",
    "fuelAvailable": "yes | no | not_sure",
    "ventilationReady": "yes | no | not_sure",
    "targetOperationDate": ""
  },
  "derived": {
    "requiredHourlyProduction": null,
    "estimatedMonthlyProduction": null,
    "capacityFit": "standard_possible | custom_recommended | higher_capacity_study",
    "configurationDirection": ""
  },
  "meta": {
    "submittedAt": "ISO_DATE",
    "language": "en",
    "noPriceDisplayed": true
  }
}
```

Important:

- `noPriceDisplayed` must always be true.
- Payload must not include any price field.

---

# 14. WhatsApp Templates

## 14.1 System to Sales Notification

```txt
New Nano Line lead received

Company: [companyName]
Contact: [fullName]
Location: [location]
Phone/WhatsApp: [phoneWhatsapp]
Email: [email]

Product: [productType]
Shape: [preferredShape]
Weight: [targetWeight]
Size: [targetSize]

Daily production target: [dailyLoaves] loaves/day
Working hours: [dailyWorkingHours] hours/day
Required hourly production: [requiredHourlyProduction] loaves/hour
Monthly output estimate: [estimatedMonthlyProduction] loaves/month

Configuration direction: [configurationDirection]
Suggested add-ons: [suggestedAddOns]

Site readiness:
- Space: [factorySpaceReady]
- Available space: [availableSpace]
- Electricity: [electricityReady]
- Gas/Diesel: [fuelAvailable]
- Ventilation: [ventilationReady]

No price was displayed on the website. Prepare a customized quotation after technical review.
```

---

## 14.2 Visitor-Initiated WhatsApp Message

```txt
Hello Nano Line team,

I would like to request a custom quotation for the NL-RM210 healthy bread production line.

My project details:
- Product: [productType]
- Shape: [preferredShape]
- Daily production target: [dailyLoaves] loaves/day
- Working hours: [dailyWorkingHours] hours/day
- Required hourly production: [requiredHourlyProduction] loaves/hour

Please contact me to review the suitable configuration.
```

---

# 15. Email Templates

## 15.1 Sales Notification Email

Subject:

```txt
New Nano Line Quotation Request — [companyName]
```

Body:

```txt
A new quotation request has been submitted from the Nano Line landing page.

Contact Details
Full name: [fullName]
Company: [companyName]
Location: [location]
Phone/WhatsApp: [phoneWhatsapp]
Email: [email]

Product Requirements
Product type: [productType]
Preferred shape: [preferredShape]
Target weight: [targetWeight]
Target size: [targetSize]
Notes: [productNotes]

Production Capacity
Daily loaves: [dailyLoaves]
Working hours/day: [dailyWorkingHours]
Monthly working days: [monthlyWorkingDays]
Required hourly production: [requiredHourlyProduction]
Estimated monthly production: [estimatedMonthlyProduction]
Configuration direction: [configurationDirection]

Automation & Add-ons
Mixing system: [needsMixingSystem]
Weighing system: [needsWeighingSystem]
Packing support: [needsPackagingSupport]
Automatic counting: [needsAutomaticCounting]
Suggested add-ons: [suggestedAddOns]

Site Readiness
Factory space ready: [factorySpaceReady]
Available space: [availableSpace]
Electricity ready: [electricityReady]
Gas/Diesel available: [fuelAvailable]
Ventilation ready: [ventilationReady]
Target operation date: [targetOperationDate]

Important: No price was displayed on the website. Follow up with a technical review before sending a customized quotation.
```

---

## 15.2 Visitor Acknowledgement Email

Subject:

```txt
Your Nano Line quotation request has been received
```

Body:

```txt
Thank you for submitting your production requirements.

Our team will review your healthy bread production target, product specifications, automation needs, and site readiness before preparing a customized quotation.

Please note that the NL-RM210 is a built-to-order production line. Average manufacturing and preparation lead time is approximately 120 to 180 days, depending on the final approved configuration.

A member of our team will contact you to discuss the suitable line setup for your project.
```

---

# 16. Success / Failure UX States

## Success Message

Use exact Session 2 copy:

```txt
Thank you. Your request has been received. Our team will review your production requirements and contact you to discuss the suitable line configuration and quotation.
```

## Failure Message

```txt
Something went wrong while submitting your request. Please try again or contact us on WhatsApp.
```

## Accessibility

- Announce success/failure messages to screen readers.
- Move focus to the success state after submit.
- Keep submitted summary visible after success.

---

# 17. Implementation Notes

## Module boundaries

Future code should separate:

```txt
lib/calculator.ts
lib/validation.ts
lib/leadPayload.ts
content/landing.en.ts
components/ProductionCalculator.tsx
components/LeadQualificationForm.tsx
```

## Pure calculator functions

The calculator logic should be implemented as pure functions later.

Suggested future functions:

```txt
calculateRequiredHourlyProduction()
calculateMonthlyProduction()
getCapacityFit()
getConfigurationDirection()
getSuggestedAddOns()
buildLeadPayload()
```

## Central thresholds

Capacity thresholds must be centralized:

```txt
STANDARD_MAX = 3500
CUSTOM_MAX = 6000
```

## No-price guardrails

Future implementation should avoid these keys and words in calculator output:

- price
- cost
- quote value
- USD
- SAR
- AED
- EGP
- payment
- discount

## Analytics hooks

Track:

- calculator_started
- calculator_completed
- calculator_result_standard
- calculator_result_custom
- calculator_result_high_capacity
- lead_form_started
- lead_form_completed
- whatsapp_clicked
- quotation_cta_clicked

No pricing analytics should be tracked because pricing is not shown.

---

# 18. Session 6 Output Summary

Session 6 delivered:

- Calculator input contract
- Calculator output contract
- Formula logic
- Boundary states
- Add-on recommendation logic
- Validation messages
- Edge cases
- Lead form UX
- Form validation
- Calculator-to-form prefill mapping
- Sales-ready payload
- WhatsApp templates
- Email templates
- Success/failure UX states
- Implementation notes

---

# 19. Next Session

Next session:

## Session 7 — Frontend Scaffold

Goal:
Create the Next.js + TypeScript + Tailwind project structure, content files, component placeholders, calculator logic foundation, and documentation-ready code architecture.
