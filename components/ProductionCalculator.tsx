"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  calculate,
  parseLoafWeightGrams,
  parseLoafSizeCm,
  parseLoafShape,
  type ConfigurationDirection,
  type LoafShape,
  type TriState,
} from "@/lib/calculator";
import { CAPACITY_THRESHOLDS } from "@/lib/constants";
import { CTAButton } from "./ui/CTAButton";
import type { LandingContent } from "@/content/types";

type Weight = "30" | "50" | "70" | "100" | "custom";
type Size = "20" | "25" | "30" | "custom";

const RESULT_STYLE: Record<ConfigurationDirection, { card: string; dot: string; badge: string }> = {
  standard: {
    card: "bg-success-light border-l-4 border-success text-[#065F46]",
    dot: "bg-success",
    badge: "bg-success/10 text-[#065F46]",
  },
  custom: {
    card: "bg-config-blue-light border-l-4 border-config-blue text-[#1E3A8A]",
    dot: "bg-config-blue",
    badge: "bg-config-blue/10 text-[#1E3A8A]",
  },
  higher_capacity: {
    card: "bg-amber-light border-l-4 border-amber text-amber-darker",
    dot: "bg-amber",
    badge: "bg-amber/10 text-amber-darker",
  },
};

const STATE_LABEL: Record<ConfigurationDirection, string> = {
  standard: "Standard Configuration May Be Suitable",
  custom: "Custom Configuration Recommended",
  higher_capacity: "Higher-Capacity Study Recommended",
};

const RISK_STYLE = {
  low: "bg-success/10 text-[#065F46]",
  medium: "bg-amber/10 text-amber-darker",
  high: "bg-red-50 text-red-700",
};

const RISK_LABEL = {
  low: "Low spec risk",
  medium: "Moderate spec impact",
  high: "High spec impact",
};

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function useCountUp(target: number, duration = 450) {
  const [val, setVal] = useState(target);
  const valRef = useRef(target);
  valRef.current = val;

  useEffect(() => {
    if (prefersReducedMotion()) {
      setVal(target);
      return;
    }
    const from = valRef.current;
    if (from === target) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(from + (target - from) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return val;
}

/**
 * Dual-axis gauge: shows required hourly vs estimated product capacity on the
 * same 0–max scale. Required = navy marker, estimated = amber marker.
 */
function CapacityGauge({
  required,
  estimated,
  hasSpec,
  direction,
}: {
  required: number;
  estimated: number;
  hasSpec: boolean;
  direction: ConfigurationDirection;
}) {
  const DOMAIN = 7500;
  const reqPct = Math.max(2, Math.min(97, (required / DOMAIN) * 100));
  const estPct = Math.max(2, Math.min(97, (estimated / DOMAIN) * 100));

  const overCapacity = required > estimated && hasSpec;

  return (
    <div className="rounded-xl bg-white p-4 shadow-shallow">
      <div className="flex items-center justify-between">
        <p className="text-caption text-text-muted">Configuration direction</p>
        {hasSpec && (
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${RESULT_STYLE[direction].badge}`}>
            {STATE_LABEL[direction]}
          </span>
        )}
      </div>

      {!hasSpec && (
        <p className="mt-1 flex items-center gap-2 text-body-sm font-semibold text-navy">
          <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${RESULT_STYLE[direction].dot}`} />
          {STATE_LABEL[direction]}
        </p>
      )}

      <div className="relative mt-4">
        {/* Track */}
        <div className="flex h-2.5 overflow-hidden rounded-full">
          <div className="bg-success/70" style={{ width: "46.7%" }} />
          <div className="bg-config-blue/70" style={{ width: "33.3%" }} />
          <div className="bg-amber/70" style={{ width: "20%" }} />
        </div>

        {/* Required marker — navy */}
        <div
          className="absolute -top-[3px] transition-[left] duration-500 ease-out"
          style={{ left: `${reqPct}%`, transform: "translateX(-50%)" }}
        >
          <div className={`h-4 w-4 rounded-full border-2 border-white shadow ${overCapacity ? "bg-red-600" : "bg-navy"}`} />
        </div>

        {/* Estimated capacity marker — amber (only when spec is provided) */}
        {hasSpec && (
          <div
            className="absolute -top-[3px] transition-[left] duration-500 ease-out"
            style={{ left: `${estPct}%`, transform: "translateX(-50%)" }}
          >
            <div className="h-4 w-4 rounded-full border-2 border-white bg-amber/80 shadow" />
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
        <span className="flex items-center gap-1.5 text-[10px] text-text-muted">
          <span className={`h-2 w-2 rounded-full ${overCapacity ? "bg-red-600" : "bg-navy"}`} />
          Required ({required.toLocaleString("en-US")} l/h)
        </span>
        {hasSpec && (
          <span className="flex items-center gap-1.5 text-[10px] text-text-muted">
            <span className="h-2 w-2 rounded-full bg-amber/80" />
            Est. capacity ({estimated.toLocaleString("en-US")} l/h)
          </span>
        )}
      </div>
    </div>
  );
}

function PillSelect<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: { label: string; value: T }[];
  value: T | undefined;
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div>
      <p className="mb-2 text-body-sm font-semibold text-text-body">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={`rounded-md border px-4 py-2 text-body-sm font-medium transition-all duration-200 active:scale-95 ${
              value === o.value
                ? "border-navy bg-navy text-white"
                : "border-steel-light bg-white text-text-body hover:border-navy"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function NumericInput({
  label,
  unit,
  value,
  onChange,
  min,
  max,
  placeholder,
}: {
  label: string;
  unit: string;
  value: string;
  onChange: (v: string) => void;
  min: number;
  max: number;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-body-sm font-semibold text-text-body">
        {label}
        <span className="ml-1 text-caption font-normal text-text-muted">({unit})</span>
      </span>
      <input
        type="number"
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={min}
        max={max}
        placeholder={placeholder}
        className="h-11 w-full rounded-md border border-[#D1D5DB] px-3.5 text-body text-navy placeholder:text-text-muted focus:border-navy focus:outline-none"
      />
    </label>
  );
}

export function ProductionCalculator({ content }: { content: LandingContent }) {
  const [dailyLoaves, setDailyLoaves] = useState<string>("50000");
  const [dailyHours, setDailyHours] = useState<string>("10");
  const [monthlyDays, setMonthlyDays] = useState<string>("26");
  const [loafShape, setLoafShape] = useState<LoafShape | undefined>();
  const [loafWeight, setLoafWeight] = useState<Weight | undefined>();
  const [loafWeightCustom, setLoafWeightCustom] = useState<string>("");
  const [loafSize, setLoafSize] = useState<Size | undefined>();
  const [loafSizeCustom, setLoafSizeCustom] = useState<string>("");
  const [needsMixing, setNeedsMixing] = useState<TriState | undefined>();
  const [needsPackaging, setNeedsPackaging] = useState<TriState | undefined>();

  const result = useMemo(() => {
    const d = parseInt(dailyLoaves) || 0;
    const h = parseFloat(dailyHours) || 1;
    const m = parseInt(monthlyDays) || 0;
    if (!d || !h || !m) return null;

    const weightGrams = parseLoafWeightGrams(
      loafWeight ?? "",
      loafWeight === "custom" ? parseFloat(loafWeightCustom) || undefined : undefined
    );
    const sizeCm = parseLoafSizeCm(
      loafSize ?? "",
      loafSize === "custom" ? parseFloat(loafSizeCustom) || undefined : undefined
    );

    return calculate({
      dailyLoaves: d,
      dailyWorkingHours: h,
      monthlyWorkingDays: m,
      loafShape: loafShape ? parseLoafShape(loafShape) : undefined,
      loafWeightGrams: weightGrams,
      loafSizeCm: sizeCm,
      isCustomWeight: loafWeight === "custom",
      isCustomSize: loafSize === "custom",
      needsMixing,
      needsPackaging,
    });
  }, [dailyLoaves, dailyHours, monthlyDays, loafShape, loafWeight, loafWeightCustom, loafSize, loafSizeCustom, needsMixing, needsPackaging]);

  const hourly = useCountUp(result?.requiredHourlyProduction ?? 0);
  const monthly = useCountUp(result?.monthlyProduction ?? 0);
  const estCap = useCountUp(result?.estimatedProductCapacity ?? 0);
  const utilPct = useCountUp(result?.capacityUtilizationPercent ?? 0);

  const fmt = (n: number) => n.toLocaleString("en-US");

  return (
    <section id="calculator" className="bg-slate">
      <div className="container-content py-16 md:py-20">
        {/* Header */}
        <div className="text-center">
          <p className="overline mb-3">{content.sections.calculator.overline}</p>
          <h2 className="text-h2 font-bold text-white">
            {content.sections.calculator.headline}
          </h2>
          <p className="mx-auto mt-4 max-w-[600px] text-body text-white/60">
            {content.calculator.introCopy}
          </p>
        </div>

        {/* Calculator card */}
        <div className="mx-auto mt-10 overflow-hidden rounded-2xl bg-white shadow-lg">
          <div className="grid md:grid-cols-2">
            {/* ── Inputs ── */}
            <div className="space-y-6 p-8">
              <h3 className="text-h4 font-bold text-navy">Your Production Details</h3>

              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="mb-1.5 block text-body-sm font-semibold text-text-body">
                    Loaves per Day
                  </span>
                  <input
                    type="number"
                    inputMode="numeric"
                    value={dailyLoaves}
                    onChange={(e) => setDailyLoaves(e.target.value)}
                    placeholder="50,000"
                    className="h-12 w-full rounded-md border border-[#D1D5DB] px-3.5 text-body text-navy placeholder:text-text-muted focus:border-navy focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-body-sm font-semibold text-text-body">
                    Working Hours / Day
                  </span>
                  <input
                    type="number"
                    inputMode="decimal"
                    value={dailyHours}
                    onChange={(e) => setDailyHours(e.target.value)}
                    placeholder="10"
                    className="h-12 w-full rounded-md border border-[#D1D5DB] px-3.5 text-body text-navy placeholder:text-text-muted focus:border-navy focus:outline-none"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-1.5 block text-body-sm font-semibold text-text-body">
                  Monthly Working Days
                </span>
                <input
                  type="number"
                  inputMode="numeric"
                  value={monthlyDays}
                  onChange={(e) => setMonthlyDays(e.target.value)}
                  placeholder="26"
                  className="h-12 w-full rounded-md border border-[#D1D5DB] px-3.5 text-body text-navy placeholder:text-text-muted focus:border-navy focus:outline-none"
                />
              </label>

              <PillSelect
                label="Target Loaf Shape"
                value={loafShape}
                onChange={setLoafShape}
                options={[
                  { label: "Round", value: "round" },
                  { label: "Square", value: "square" },
                  { label: "Rectangular", value: "rectangular" },
                  { label: "Not sure yet", value: "not_sure" },
                ]}
              />

              <div>
                <PillSelect
                  label="Target Loaf Weight"
                  value={loafWeight}
                  onChange={setLoafWeight}
                  options={[
                    { label: "30 g", value: "30" },
                    { label: "50 g", value: "50" },
                    { label: "70 g", value: "70" },
                    { label: "100 g", value: "100" },
                    { label: "Custom", value: "custom" },
                  ]}
                />
                {loafWeight === "custom" && (
                  <div className="mt-3">
                    <NumericInput
                      label="Custom Weight"
                      unit="grams, 10–500"
                      value={loafWeightCustom}
                      onChange={setLoafWeightCustom}
                      min={10}
                      max={500}
                      placeholder="e.g. 80"
                    />
                  </div>
                )}
              </div>

              <div>
                <PillSelect
                  label="Target Loaf Size"
                  value={loafSize}
                  onChange={setLoafSize}
                  options={[
                    { label: "20 cm", value: "20" },
                    { label: "25 cm", value: "25" },
                    { label: "30 cm", value: "30" },
                    { label: "Custom", value: "custom" },
                  ]}
                />
                {loafSize === "custom" && (
                  <div className="mt-3">
                    <NumericInput
                      label="Custom Length"
                      unit="cm, 5–80"
                      value={loafSizeCustom}
                      onChange={setLoafSizeCustom}
                      min={5}
                      max={80}
                      placeholder="e.g. 27"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <PillSelect
                  label="Mixing System?"
                  value={needsMixing}
                  onChange={setNeedsMixing}
                  options={[
                    { label: "Yes", value: "yes" },
                    { label: "No", value: "no" },
                    { label: "Not sure", value: "not_sure" },
                  ]}
                />
                <PillSelect
                  label="Packaging Support?"
                  value={needsPackaging}
                  onChange={setNeedsPackaging}
                  options={[
                    { label: "Yes", value: "yes" },
                    { label: "No", value: "no" },
                    { label: "Not sure", value: "not_sure" },
                  ]}
                />
              </div>
            </div>

            {/* ── Results ── */}
            <div className="flex flex-col justify-between bg-off-white p-8">
              <div>
                <h3 className="text-h4 font-bold text-navy">Your Estimate</h3>

                {result ? (
                  <div className="mt-6 space-y-5">
                    {/* 4 result cards */}
                    <div className="grid grid-cols-2 gap-3">
                      {/* Required hourly */}
                      <div className="rounded-xl bg-white p-4 shadow-shallow">
                        <p className="text-caption text-text-muted">Required hourly</p>
                        <p className="mt-1 text-h3 font-bold tabular-nums text-navy">
                          {fmt(hourly)}
                        </p>
                        <p className="text-caption text-text-muted">loaves / hour</p>
                      </div>

                      {/* Est. product capacity */}
                      <div className="rounded-xl bg-white p-4 shadow-shallow">
                        <p className="text-caption text-text-muted">
                          {result.hasProductSpec ? "Est. product capacity" : "Nominal capacity"}
                        </p>
                        <p className="mt-1 text-h3 font-bold tabular-nums text-navy">
                          {fmt(estCap)}
                        </p>
                        <p className="text-caption text-text-muted">loaves / hour</p>
                      </div>

                      {/* Utilization */}
                      <div className="rounded-xl bg-white p-4 shadow-shallow">
                        <p className="text-caption text-text-muted">Capacity utilization</p>
                        <p className={`mt-1 text-h3 font-bold tabular-nums ${utilPct > 100 ? "text-red-600" : "text-navy"}`}>
                          {utilPct}%
                        </p>
                        <p className="text-caption text-text-muted">of est. capacity</p>
                      </div>

                      {/* Monthly */}
                      <div className="rounded-xl bg-white p-4 shadow-shallow">
                        <p className="text-caption text-text-muted">Monthly output</p>
                        <p className="mt-1 text-h3 font-bold tabular-nums text-navy">
                          {fmt(monthly)}
                        </p>
                        <p className="text-caption text-text-muted">loaves / month</p>
                      </div>
                    </div>

                    {/* Capacity gauge */}
                    <CapacityGauge
                      required={result.requiredHourlyProduction}
                      estimated={result.estimatedProductCapacity}
                      hasSpec={result.hasProductSpec}
                      direction={result.direction}
                    />

                    {/* Config direction message */}
                    <div
                      className={`rounded-lg p-4 text-body-sm transition-colors duration-300 ${RESULT_STYLE[result.direction].card}`}
                    >
                      <div className="flex items-start gap-2">
                        <span
                          className={`mt-1 h-2 w-2 shrink-0 rounded-full ${RESULT_STYLE[result.direction].dot}`}
                        />
                        {content.calculator.resultMessages[result.direction]}
                      </div>
                    </div>

                    {/* Product spec impact panel */}
                    {result.hasProductSpec && (
                      <div className="rounded-xl border border-steel-light bg-white p-4 shadow-shallow">
                        <div className="mb-2 flex items-center justify-between">
                          <p className="text-body-sm font-semibold text-navy">
                            Product Spec Impact
                          </p>
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${RISK_STYLE[result.productSpecRisk]}`}>
                            {RISK_LABEL[result.productSpecRisk]}
                          </span>
                        </div>
                        <div className="mb-3 flex items-center gap-4 text-body-sm">
                          <span className="text-text-muted">
                            Multiplier:{" "}
                            <span className={`font-bold ${result.capacityMultiplier >= 1 ? "text-[#065F46]" : "text-amber-darker"}`}>
                              ×{result.capacityMultiplier.toFixed(2)}
                            </span>
                          </span>
                          <span className="text-text-muted">
                            vs nominal:{" "}
                            <span className={`font-bold ${result.capacityDeltaPercent >= 0 ? "text-[#065F46]" : "text-amber-darker"}`}>
                              {result.capacityDeltaPercent > 0 ? "+" : ""}
                              {result.capacityDeltaPercent}%
                            </span>
                          </span>
                        </div>
                        <p className="text-caption text-text-muted leading-relaxed">
                          {result.productSpecNote}
                        </p>
                      </div>
                    )}

                    {/* Configuration path */}
                    <div className="rounded-xl border border-steel-light bg-white p-4 shadow-shallow">
                      <p className="mb-3 text-body-sm font-semibold text-navy">
                        Indicative Configuration Path
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {result.configPath.map((stage, i) => (
                          <span key={stage} className="flex items-center gap-1.5">
                            <span className="rounded bg-navy/5 px-2 py-0.5 text-[10px] font-medium text-navy">
                              {stage}
                            </span>
                            {i < result.configPath.length - 1 && (
                              <span className="text-[10px] text-steel-light">→</span>
                            )}
                          </span>
                        ))}
                      </div>
                      {result.configurationProfile.hasProvisionNote && result.configurationProfile.provisionNote && (
                        <p className="mt-2 text-caption italic text-text-muted">
                          {result.configurationProfile.provisionNote}
                        </p>
                      )}
                    </div>

                    {/* Suggested add-ons */}
                    {result.suggestedAddons.length > 0 && (
                      <div>
                        <p className="mb-2 text-body-sm font-semibold text-navy">
                          Suggested add-ons to consider
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {result.suggestedAddons.map((a, i) => (
                            <span
                              key={a}
                              className="nl-fade-in rounded-full bg-amber-light px-3 py-1 text-micro font-medium text-amber-dark"
                              style={{ animationDelay: `${i * 50}ms` }}
                            >
                              {a}
                            </span>
                          ))}
                        </div>
                        <p className="mt-2 text-caption text-text-muted">
                          {content.calculator.addonsNote}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="mt-6 flex h-48 items-center justify-center rounded-xl border-2 border-dashed border-steel-light">
                    <p className="text-center text-body-sm text-text-muted">
                      Enter your daily loaves and working hours
                      <br />
                      to see your production estimate.
                    </p>
                  </div>
                )}
              </div>

              {/* CTA + disclaimer */}
              <div className="mt-6 space-y-4">
                <CTAButton href="#quotation" variant="primary" className="w-full">
                  {content.calculator.cta}
                </CTAButton>
                <p className="border-t border-steel-light pt-4 text-caption italic text-text-muted">
                  {content.calculator.disclaimer}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
