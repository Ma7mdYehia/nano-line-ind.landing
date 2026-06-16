/**
 * Production calculator — pure, deterministic, side-effect-free logic.
 * Implements Session 6 §3 (formulas), §4 (result states), §5 (add-on logic).
 *
 * HARD RULE: this module estimates production capacity only. It must never
 * compute or expose price, cost, ROI, or any financial value (CLAUDE.md §3).
 */

import { ADDONS, CAPACITY_THRESHOLDS, NOMINAL_ROUND_CAPACITY } from "./constants";

export type LoafShape = "round" | "square" | "rectangular" | "not_sure";
export type TriState = "yes" | "no" | "not_sure";

export type ConfigurationDirection = "standard" | "custom" | "higher_capacity";
export type CapacityFit = "within" | "upper" | "beyond";

/** Risk level introduced by the product spec into capacity planning. */
export type ProductSpecRisk = "low" | "medium" | "high";

/**
 * Configuration path stages that will likely be required for this product,
 * listed in order. Non-round shapes add a provisional note.
 */
export interface ConfigurationProfile {
  stages: string[];
  hasProvisionNote: boolean;
  provisionNote?: string;
}

export interface CalculatorInputs {
  dailyLoaves: number;
  dailyWorkingHours: number;
  monthlyWorkingDays: number;
  loafShape?: LoafShape;
  loafWeightGrams?: number;
  loafSizeCm?: number;
  isCustomWeight?: boolean;
  isCustomSize?: boolean;
  needsMixing?: TriState;
  needsPackaging?: TriState;
}

export interface CalculatorResult {
  /* — volume —*/
  requiredHourlyProduction: number;
  monthlyProduction: number;
  /* — product-adjusted capacity — */
  estimatedProductCapacity: number;
  capacityMultiplier: number;
  capacityDeltaPercent: number;
  capacityUtilizationPercent: number;
  hasProductSpec: boolean;
  /* — qualification — */
  direction: ConfigurationDirection;
  capacityFit: CapacityFit;
  productSpecRisk: ProductSpecRisk;
  productSpecNote: string;
  configurationProfile: ConfigurationProfile;
  configPath: string[];
  suggestedAddons: string[];
}

// ---------------------------------------------------------------------------
// Helpers exported for use in form / UI components
// ---------------------------------------------------------------------------

export function parseLoafWeightGrams(
  pill: string,
  customValue?: number
): number | undefined {
  if (pill === "custom") return customValue && customValue > 0 ? customValue : undefined;
  const n = Number(pill);
  return isFinite(n) && n > 0 ? n : undefined;
}

export function parseLoafSizeCm(
  pill: string,
  customValue?: number
): number | undefined {
  if (pill === "custom") return customValue && customValue > 0 ? customValue : undefined;
  const n = Number(pill);
  return isFinite(n) && n > 0 ? n : undefined;
}

export function parseLoafShape(value: string): LoafShape | undefined {
  if (
    value === "round" ||
    value === "square" ||
    value === "rectangular" ||
    value === "not_sure"
  )
    return value;
  return undefined;
}

// ---------------------------------------------------------------------------
// Core formulas
// ---------------------------------------------------------------------------

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function roundToNearest50(n: number): number {
  return Math.round(n / 50) * 50;
}

/**
 * Compute the product-spec-adjusted capacity multiplier and estimated capacity.
 * Returns `null` when insufficient spec data was provided (not-sure / missing).
 *
 * Model:
 *  weightNorm      = clamp((w - 30) / 70, 0, 1)   [30 g → 0, 100 g → 1]
 *  sizeNorm        = clamp((s - 20) / 10, 0, 1)    [20 cm → 0, 30 cm → 1]
 *  loadFactor      = clamp(weightNorm*0.70 + sizeNorm*0.30, 0, 1)
 *  multiplier      = 1.40 - loadFactor*0.80        [1.40 @ lightest → 0.60 @ heaviest]
 *  estimatedCap    = roundToNearest50(NOMINAL * multiplier)
 */
export function computeProductSpec(
  weightGrams: number | undefined,
  sizeCm: number | undefined
): {
  capacityMultiplier: number;
  estimatedProductCapacity: number;
  capacityDeltaPercent: number;
} | null {
  if (weightGrams === undefined || sizeCm === undefined) return null;

  const weightNorm = clamp((weightGrams - 30) / 70, 0, 1);
  const sizeNorm = clamp((sizeCm - 20) / 10, 0, 1);
  const loadFactor = clamp(weightNorm * 0.7 + sizeNorm * 0.3, 0, 1);
  const multiplier = 1.4 - loadFactor * 0.8;
  const estimated = roundToNearest50(NOMINAL_ROUND_CAPACITY * multiplier);
  const deltaPercent = Math.round((multiplier - 1) * 100);

  return {
    capacityMultiplier: Math.round(multiplier * 100) / 100,
    estimatedProductCapacity: estimated,
    capacityDeltaPercent: deltaPercent,
  };
}

function resolveProductSpecRisk(
  multiplier: number,
  shape: LoafShape | undefined
): ProductSpecRisk {
  const isNonRound = shape === "square" || shape === "rectangular";
  if (multiplier < 0.75 || (isNonRound && multiplier < 0.90)) return "high";
  if (multiplier < 0.95 || isNonRound) return "medium";
  return "low";
}

function buildProductSpecNote(
  multiplier: number,
  risk: ProductSpecRisk,
  shape: LoafShape | undefined
): string {
  const isNonRound = shape === "square" || shape === "rectangular";
  if (risk === "high") {
    return "Your product specification (heavy or large loaf) significantly reduces effective line throughput. A technical review is strongly recommended before confirming capacity.";
  }
  if (risk === "medium") {
    if (isNonRound) {
      return "Non-round bread formats require additional forming configuration. Estimated capacity is indicative — a technical review will confirm the actual throughput.";
    }
    return "Your loaf specification moderately reduces effective throughput compared to the nominal range. The estimate reflects typical output for this product profile.";
  }
  // low risk
  if (multiplier > 1.1) {
    return "Your product specification (lighter, smaller loaf) is within the high-efficiency range. The estimated capacity reflects optimal throughput conditions.";
  }
  return "Your product specification is within the standard operating range. The estimated capacity is a reliable indicative figure.";
}

function buildConfigurationProfile(
  shape: LoafShape | undefined,
  direction: ConfigurationDirection
): ConfigurationProfile {
  const base = [
    "Dough Divider",
    "Proofer",
    "Dough Rounding",
    "Dough Arrangement",
  ];

  const formingStage =
    shape === "square" || shape === "rectangular"
      ? "Dough Sheeter + Square Former"
      : shape === "round"
      ? "Dough Sheeter + Round Former"
      : "Dough Sheeter + Forming Unit";

  const tail = ["Transfer Conveyors", "Baking Chamber", "Cooling Conveyors"];

  const stages = [...base, formingStage, ...tail];

  const hasProvisionNote =
    shape === "square" ||
    shape === "rectangular" ||
    direction === "higher_capacity";

  const provisionNote = hasProvisionNote
    ? shape === "rectangular"
      ? "Rectangular forming requires a dedicated sheeter die — configuration confirmed at quotation stage."
      : shape === "square"
      ? "Square forming configuration is available and will be confirmed at quotation stage."
      : "Higher-capacity configurations may require a multi-line study — confirmed at technical review."
    : undefined;

  return { stages, hasProvisionNote, provisionNote };
}

// ---------------------------------------------------------------------------
// Existing public functions (unchanged API)
// ---------------------------------------------------------------------------

/**
 * Required hourly production, rounded UP so the recommended line speed can
 * always meet the daily target within the stated working hours (Session 6 §3.1).
 */
export function computeRequiredHourly(
  dailyLoaves: number,
  dailyWorkingHours: number
): number {
  if (!isFinite(dailyLoaves) || !isFinite(dailyWorkingHours)) return 0;
  if (dailyWorkingHours <= 0) return 0;
  return Math.ceil(dailyLoaves / dailyWorkingHours);
}

/** Estimated monthly production (Session 6 §3.2). */
export function computeMonthly(
  dailyLoaves: number,
  monthlyWorkingDays: number
): number {
  if (!isFinite(dailyLoaves) || !isFinite(monthlyWorkingDays)) return 0;
  return Math.round(dailyLoaves * monthlyWorkingDays);
}

/**
 * Map a required hourly production figure to a configuration direction and the
 * gauge fit indicator (Session 6 §4).
 */
export function resolveConfiguration(requiredHourly: number): {
  direction: ConfigurationDirection;
  capacityFit: CapacityFit;
} {
  if (requiredHourly <= CAPACITY_THRESHOLDS.STANDARD_MAX) {
    return { direction: "standard", capacityFit: "within" };
  }
  if (requiredHourly <= CAPACITY_THRESHOLDS.CUSTOM_MAX) {
    return { direction: "custom", capacityFit: "upper" };
  }
  return { direction: "higher_capacity", capacityFit: "beyond" };
}

/**
 * Build the ordered, de-duplicated list of suggested add-ons (Session 6 §5).
 * Advisory only — never implies pricing.
 */
export function suggestAddons(
  inputs: Pick<CalculatorInputs, "needsMixing" | "needsPackaging">,
  direction: ConfigurationDirection,
  requiredHourly: number
): string[] {
  const list: string[] = [];
  const add = (name: string) => {
    if (!list.includes(name)) list.push(name);
  };

  if (direction === "standard") {
    add(ADDONS.SPIRAL_MIXER);
  } else if (direction === "custom") {
    add(ADDONS.ELECTRONIC_MIXING);
    add(ADDONS.AIR_COMPRESSOR);
  } else {
    add(ADDONS.ELECTRONIC_MIXING);
    add(ADDONS.AIR_COMPRESSOR);
    add(ADDONS.CONTROL_SYSTEMS);
  }

  if (inputs.needsMixing === "yes") {
    add(direction === "standard" ? ADDONS.SPIRAL_MIXER : ADDONS.ELECTRONIC_MIXING);
  } else if (inputs.needsMixing === "not_sure") {
    add(ADDONS.ELECTRONIC_MIXING);
  }

  if (inputs.needsPackaging === "yes") {
    add(ADDONS.PACKING_TABLE);
    add(ADDONS.BAG_SEALING);
    add(ADDONS.BREAD_COUNTER);
  } else if (inputs.needsPackaging === "not_sure") {
    add(ADDONS.BREAD_COUNTER);
  }

  if (requiredHourly > CAPACITY_THRESHOLDS.CUSTOM_MAX) {
    add(ADDONS.CONTROL_SYSTEMS);
  }

  let result = list;
  if (inputs.needsMixing === "no") {
    result = result.filter(
      (a) => a !== ADDONS.SPIRAL_MIXER && a !== ADDONS.ELECTRONIC_MIXING
    );
  }
  if (inputs.needsPackaging === "no") {
    result = result.filter(
      (a) =>
        a !== ADDONS.PACKING_TABLE &&
        a !== ADDONS.BAG_SEALING &&
        a !== ADDONS.BREAD_COUNTER
    );
  }

  return result;
}

/** Run the full calculation pipeline. */
export function calculate(inputs: CalculatorInputs): CalculatorResult {
  const requiredHourlyProduction = computeRequiredHourly(
    inputs.dailyLoaves,
    inputs.dailyWorkingHours
  );
  const monthlyProduction = computeMonthly(
    inputs.dailyLoaves,
    inputs.monthlyWorkingDays
  );
  const { direction, capacityFit } = resolveConfiguration(requiredHourlyProduction);
  const suggestedAddons = suggestAddons(inputs, direction, requiredHourlyProduction);

  // Product-adjusted capacity
  const productSpec = computeProductSpec(inputs.loafWeightGrams, inputs.loafSizeCm);
  const hasProductSpec = productSpec !== null;

  const estimatedProductCapacity = hasProductSpec
    ? productSpec!.estimatedProductCapacity
    : NOMINAL_ROUND_CAPACITY;

  const capacityMultiplier = hasProductSpec ? productSpec!.capacityMultiplier : 1.0;
  const capacityDeltaPercent = hasProductSpec ? productSpec!.capacityDeltaPercent : 0;

  const capacityUtilizationPercent =
    estimatedProductCapacity > 0
      ? Math.round((requiredHourlyProduction / estimatedProductCapacity) * 100)
      : 0;

  const productSpecRisk = resolveProductSpecRisk(
    capacityMultiplier,
    inputs.loafShape
  );
  const productSpecNote = buildProductSpecNote(
    capacityMultiplier,
    productSpecRisk,
    inputs.loafShape
  );
  const configurationProfile = buildConfigurationProfile(
    inputs.loafShape,
    direction
  );

  return {
    requiredHourlyProduction,
    monthlyProduction,
    estimatedProductCapacity,
    capacityMultiplier,
    capacityDeltaPercent,
    capacityUtilizationPercent,
    hasProductSpec,
    direction,
    capacityFit,
    productSpecRisk,
    productSpecNote,
    configurationProfile,
    configPath: configurationProfile.stages,
    suggestedAddons,
  };
}
