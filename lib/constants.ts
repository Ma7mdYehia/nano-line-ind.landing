/**
 * Centralized constants. Thresholds are defined once here and never inlined
 * elsewhere (Session 6 §15.3).
 */

/**
 * Nominal average capacity — the midpoint of the public 3,500–6,000 loaves/hr
 * range. Used as the base for product-adjusted capacity estimates.
 */
export const NOMINAL_ROUND_CAPACITY = 4750; // loaves / hour

/** Production capacity thresholds in loaves per hour (Session 1 / Session 6 §4). */
export const CAPACITY_THRESHOLDS = {
  /** At or below this value, a standard configuration may be suitable. */
  STANDARD_MAX: 3500,
  /** At or below this value (and above STANDARD_MAX), custom is recommended. */
  CUSTOM_MAX: 6000,
} as const;

/** Input bounds shared by the calculator and the lead form (Session 6 §6, §9). */
export const INPUT_BOUNDS = {
  DAILY_LOAVES_MIN: 1,
  DAILY_LOAVES_MAX: 5_000_000,
  WORKING_HOURS_MIN: 1,
  WORKING_HOURS_MAX: 24,
  WORKING_DAYS_MIN: 1,
  WORKING_DAYS_MAX: 31,
  LOAF_WEIGHT_CUSTOM_MIN: 10,
  LOAF_WEIGHT_CUSTOM_MAX: 500,
  LOAF_SIZE_CUSTOM_MIN: 5,
  LOAF_SIZE_CUSTOM_MAX: 80,
} as const;

/** Public, approximate lead time. Never a fixed delivery promise (CLAUDE.md §3). */
export const LEAD_TIME = {
  MIN_DAYS: 120,
  MAX_DAYS: 180,
} as const;

/** Local storage key for autosaved lead-form drafts (Session 6 §15.2). */
export const FORM_DRAFT_KEY = "nl_lead_draft_v1";

/** Canonical add-on names — must match Session 2 copy exactly (Session 6 §5.4). */
export const ADDONS = {
  SPIRAL_MIXER: "Spiral Mixer",
  ELECTRONIC_MIXING: "Electronic Mixing System with Weighing Scale",
  PACKING_TABLE: "Packing and Preparation Table",
  BAG_SEALING: "Bag Sealing Machine",
  BREAD_COUNTER: "Automatic Bread Counter",
  AIR_COMPRESSOR: "Air Compressor",
  CONTROL_SYSTEMS: "Additional Control Systems",
} as const;
