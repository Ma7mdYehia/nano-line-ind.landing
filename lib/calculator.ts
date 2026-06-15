/**
 * Production calculator — pure, deterministic, side-effect-free logic.
 * Implements Session 6 §3 (formulas), §4 (result states), §5 (add-on logic).
 *
 * HARD RULE: this module estimates production capacity only. It must never
 * compute or expose price, cost, ROI, or any financial value (CLAUDE.md §3).
 */

import { ADDONS, CAPACITY_THRESHOLDS } from "./constants";

export type LoafShape = "round" | "square" | "not_sure";
export type TriState = "yes" | "no" | "not_sure";

export type ConfigurationDirection = "standard" | "custom" | "higher_capacity";
export type CapacityFit = "within" | "upper" | "beyond";

export interface CalculatorInputs {
  dailyLoaves: number;
  dailyWorkingHours: number;
  monthlyWorkingDays: number;
  loafShape?: LoafShape;
  needsMixing?: TriState;
  needsPackaging?: TriState;
}

export interface CalculatorResult {
  requiredHourlyProduction: number;
  monthlyProduction: number;
  direction: ConfigurationDirection;
  capacityFit: CapacityFit;
  suggestedAddons: string[];
}

/**
 * Required hourly production, rounded UP so the recommended line speed can
 * always meet the daily target within the stated working hours (Session 6 §3.1).
 */
export function computeRequiredHourly(
  dailyLoaves: number,
  dailyWorkingHours: number
): number {
  if (!isFinite(dailyLoaves) || !isFinite(dailyWorkingHours)) return 0;
  if (dailyWorkingHours <= 0) return 0; // guard: never divide by zero
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

  // §5.1 — base recommendations per direction
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

  // §5.2 — input-driven rules
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

  // §5.3 — removal rules when the user explicitly declines
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

/** Run the full calculation pipeline (Session 6 §2–§5). */
export function calculate(inputs: CalculatorInputs): CalculatorResult {
  const requiredHourlyProduction = computeRequiredHourly(
    inputs.dailyLoaves,
    inputs.dailyWorkingHours
  );
  const monthlyProduction = computeMonthly(
    inputs.dailyLoaves,
    inputs.monthlyWorkingDays
  );
  const { direction, capacityFit } = resolveConfiguration(
    requiredHourlyProduction
  );
  const suggestedAddons = suggestAddons(
    inputs,
    direction,
    requiredHourlyProduction
  );

  return {
    requiredHourlyProduction,
    monthlyProduction,
    direction,
    capacityFit,
    suggestedAddons,
  };
}
