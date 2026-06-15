/**
 * Content model for the landing page. All live text is sourced from
 * docs/02-session-2-final-english-landing-page-copy.md and kept out of the
 * components so the page can support an Arabic route later (Session 4 §13).
 */

export interface SeoMeta {
  title: string;
  description: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface HeroContent {
  badge: string;
  headline: string;
  subheadline: string;
  bullets: string[];
  primaryCta: string;
  secondaryCta: string;
  trustText: string;
}

export interface SectionIntro {
  overline: string;
  headline: string;
  copy?: string;
}

export interface CalculatorContent {
  intro: SectionIntro;
  introCopy: string;
  resultMessages: {
    standard: string;
    custom: string;
    higher_capacity: string;
  };
  cta: string;
  disclaimer: string;
  addonsNote: string;
}

export interface FormContent {
  intro: SectionIntro;
  submitCta: string;
  successHeadline: string;
  successBody: string;
  failureMessage: string;
}

export interface FooterContent {
  description: string;
  legal: string;
}

export interface LandingContent {
  locale: "en" | "ar";
  dir: "ltr" | "rtl";
  seo: SeoMeta;
  nav: {
    items: NavItem[];
    cta: string;
  };
  hero: HeroContent;
  /** Section overlines + headlines keyed by component name. */
  sections: {
    trustBar: SectionIntro;
    problem: SectionIntro;
    solution: SectionIntro;
    flexibility: SectionIntro;
    calculator: SectionIntro;
    stages: SectionIntro;
    addons: SectionIntro;
    manufacturing: SectionIntro;
    site: SectionIntro;
    leadForm: SectionIntro;
    noFixedPrice: SectionIntro;
    finalCta: SectionIntro;
  };
  calculator: CalculatorContent;
  leadForm: FormContent;
  footer: FooterContent;
}
