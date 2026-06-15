import type { LandingContent } from "./types";

/**
 * English-first landing page content.
 * Source of truth: docs/02-session-2-final-english-landing-page-copy.md
 */
export const landingEn: LandingContent = {
  locale: "en",
  dir: "ltr",
  seo: {
    title: "Custom Healthy Bread Production Line | Nano Line NL-RM210",
    description:
      "Build a custom healthy bread production line with flexible capacity, adjustable loaf size, weight, and shape. Designed for industrial bakeries and food manufacturers.",
  },
  nav: {
    items: [
      { label: "Overview", href: "#overview" },
      { label: "Flexibility", href: "#flexibility" },
      { label: "Calculator", href: "#calculator" },
      { label: "Stages", href: "#stages" },
      { label: "Add-ons", href: "#addons" },
      { label: "Site", href: "#site" },
    ],
    cta: "Request a Custom Quotation",
  },
  hero: {
    badge: "Custom Industrial Line",
    headline: "Custom Healthy Bread Production Line Built Around Your Factory Needs",
    subheadline:
      "A complete industrial production solution for healthy bread manufacturing, designed with flexible capacity, adjustable loaf size and weight, and round or square bread configuration based on your market requirements.",
    bullets: [
      "Flexible production capacity based on your project needs",
      "Adjustable loaf size, weight, and shape",
      "Round or square bread configuration available",
      "Integrated production flow from dough cutting to cooling",
      "Optional mixing, counting, and packaging systems",
      "Built-to-order manufacturing, not immediate stock delivery",
    ],
    primaryCta: "Calculate Your Production Need",
    secondaryCta: "Request Technical Consultation",
    trustText:
      "Designed for medium and large bakeries, food factories, and investors building scalable healthy bread production operations.",
  },
  sections: {
    trustBar: {
      overline: "AT A GLANCE",
      headline:
        "An industrial healthy bread production line engineered for consistency, flexibility, and scalable output.",
    },
    problem: {
      overline: "THE CHALLENGE",
      headline: "Healthy Bread Production Needs Flexibility — Not a Fixed Machine",
    },
    solution: {
      overline: "THE SOLUTION",
      headline: "A Complete Production Line from Dough Cutting to Cooling",
    },
    flexibility: {
      overline: "CUSTOMIZATION OPTIONS",
      headline: "Design the Bread Your Market Needs",
    },
    calculator: {
      overline: "ESTIMATE YOUR CAPACITY",
      headline: "Estimate Your Required Production Capacity",
    },
    stages: {
      overline: "PRODUCTION STAGES",
      headline:
        "Integrated Production Stages for Industrial-Scale Bread Manufacturing",
    },
    addons: {
      overline: "OPTIONAL SYSTEMS",
      headline: "Optional Add-ons Based on Your Production Plan",
    },
    manufacturing: {
      overline: "MANUFACTURING PROCESS",
      headline: "Built-to-Order Manufacturing — Not Immediate Stock Delivery",
    },
    site: {
      overline: "SITE PREPARATION",
      headline: "Before the Final Quotation, We Review Your Site Readiness",
    },
    leadForm: {
      overline: "REQUEST A QUOTATION",
      headline: "Request a Custom Technical & Financial Quotation",
    },
    noFixedPrice: {
      overline: "PRICING APPROACH",
      headline: "Why Is There No Fixed Price on This Page?",
    },
    finalCta: {
      overline: "GET STARTED",
      headline:
        "Ready to Build a Healthy Bread Production Line Around Your Product?",
    },
  },
  calculator: {
    intro: {
      overline: "ESTIMATE YOUR CAPACITY",
      headline: "Estimate Your Required Production Capacity",
    },
    introCopy:
      "Use this calculator to estimate the hourly production your project may require. The result is for qualification only and does not generate pricing.",
    resultMessages: {
      standard:
        "Your required hourly production is within the lower production range. A standard configuration may be suitable, subject to technical review.",
      custom:
        "Your required hourly production is within the flexible production range. A custom configuration is recommended based on loaf size, weight, shape, and automation needs.",
      higher_capacity:
        "Your required hourly production is above the typical single-line range. A higher-capacity configuration or multi-line production study is recommended.",
    },
    cta: "Request a Custom Quotation Based on These Details",
    disclaimer:
      "This calculator provides an indicative production estimate only. Final line configuration, capacity, and quotation will be confirmed after technical review.",
    addonsNote:
      "Optional systems are selected after reviewing production volume, product type, site layout, and packaging workflow.",
  },
  leadForm: {
    intro: {
      overline: "REQUEST A QUOTATION",
      headline: "Request a Custom Technical & Financial Quotation",
    },
    submitCta: "Submit Requirements",
    successHeadline: "Thank you. Your request has been received.",
    successBody:
      "Our team will review your production requirements and contact you to discuss the suitable line configuration and quotation.",
    failureMessage:
      "Something went wrong while sending your request. Please try again, or contact us directly on WhatsApp.",
  },
  footer: {
    description:
      "Nano Line Industries — custom industrial healthy bread production lines, built-to-order around your product, capacity, and factory requirements.",
    legal: "© Nano Line Industries. All rights reserved.",
  },
};
