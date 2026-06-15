import type { LandingContent } from "./types";
import { landingEn } from "./landing.en";
import { landingAr } from "./landing.ar";

export type Locale = "en" | "ar";

const content: Record<Locale, LandingContent> = {
  en: landingEn,
  ar: landingAr,
};

/** Resolve landing content for a locale. Defaults to English. */
export function getContent(locale: Locale = "en"): LandingContent {
  return content[locale] ?? landingEn;
}

export type { LandingContent } from "./types";
