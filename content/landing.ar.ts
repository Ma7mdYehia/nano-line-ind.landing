import type { LandingContent } from "./types";
import { landingEn } from "./landing.en";

/**
 * Arabic content — placeholder scaffold for the future RTL route (Session 4 §13).
 *
 * For now this falls back to the English copy so the structure compiles and the
 * routing/i18n wiring can be built. Translated strings will be filled in a later
 * session, and `dir` is already set to "rtl" so layout work can begin.
 */
export const landingAr: LandingContent = {
  ...landingEn,
  locale: "ar",
  dir: "rtl",
};
