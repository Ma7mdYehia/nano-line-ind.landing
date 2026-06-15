"use client";

import { useMemo, useState } from "react";
import { calculate, type ConfigurationDirection, type TriState, type LoafShape } from "@/lib/calculator";
import { CTAButton } from "./ui/CTAButton";
import type { LandingContent } from "@/content/types";

type Weight = "30" | "50" | "70" | "100" | "custom";
type Size = "20" | "25" | "30" | "custom";

const RESULT_STYLE: Record<ConfigurationDirection, { card: string; dot: string }> = {
  standard: {
    card: "bg-success-light border-l-4 border-success text-[#065F46]",
    dot: "bg-success",
  },
  custom: {
    card: "bg-config-blue-light border-l-4 border-config-blue text-[#1E3A8A]",
    dot: "bg-config-blue",
  },
  higher_capacity: {
    card: "bg-amber-light border-l-4 border-amber text-amber-darker",
    dot: "bg-amber",
  },
};

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
            className={`rounded-md border px-4 py-2 text-body-sm font-medium transition-colors ${
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

export function ProductionCalculator({ content }: { content: LandingContent }) {
  const [dailyLoaves, setDailyLoaves] = useState<string>("50000");
  const [dailyHours, setDailyHours] = useState<string>("10");
  const [monthlyDays, setMonthlyDays] = useState<string>("26");
  const [loafShape, setLoafShape] = useState<LoafShape | undefined>();
  const [loafWeight, setLoafWeight] = useState<Weight | undefined>();
  const [loafSize, setLoafSize] = useState<Size | undefined>();
  const [needsMixing, setNeedsMixing] = useState<TriState | undefined>();
  const [needsPackaging, setNeedsPackaging] = useState<TriState | undefined>();

  const result = useMemo(() => {
    const d = parseInt(dailyLoaves) || 0;
    const h = parseFloat(dailyHours) || 1;
    const m = parseInt(monthlyDays) || 0;
    if (!d || !h || !m) return null;
    return calculate({
      dailyLoaves: d,
      dailyWorkingHours: h,
      monthlyWorkingDays: m,
      loafShape,
      needsMixing,
      needsPackaging,
    });
  }, [dailyLoaves, dailyHours, monthlyDays, loafShape, needsMixing, needsPackaging]);

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
            {/* Inputs */}
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
                  { label: "Not sure yet", value: "not_sure" },
                ]}
              />

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

            {/* Results */}
            <div className="flex flex-col justify-between bg-off-white p-8">
              <div>
                <h3 className="text-h4 font-bold text-navy">Your Estimate</h3>

                {result ? (
                  <div className="mt-6 space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-xl bg-white p-4 shadow-shallow">
                        <p className="text-caption text-text-muted">
                          Required hourly
                        </p>
                        <p className="mt-1 text-h3 font-bold tabular-nums text-navy">
                          {fmt(result.requiredHourlyProduction)}
                        </p>
                        <p className="text-caption text-text-muted">
                          loaves / hour
                        </p>
                      </div>
                      <div className="rounded-xl bg-white p-4 shadow-shallow">
                        <p className="text-caption text-text-muted">
                          Monthly output
                        </p>
                        <p className="mt-1 text-h3 font-bold tabular-nums text-navy">
                          {fmt(result.monthlyProduction)}
                        </p>
                        <p className="text-caption text-text-muted">
                          loaves / month
                        </p>
                      </div>
                    </div>

                    <div
                      className={`rounded-lg p-4 text-body-sm ${RESULT_STYLE[result.direction].card}`}
                    >
                      <div className="flex items-start gap-2">
                        <span
                          className={`mt-1 h-2 w-2 shrink-0 rounded-full ${RESULT_STYLE[result.direction].dot}`}
                        />
                        {content.calculator.resultMessages[result.direction]}
                      </div>
                    </div>

                    {result.suggestedAddons.length > 0 && (
                      <div>
                        <p className="mb-2 text-body-sm font-semibold text-navy">
                          Suggested add-ons to consider
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {result.suggestedAddons.map((a) => (
                            <span
                              key={a}
                              className="rounded-full bg-amber-light px-3 py-1 text-micro font-medium text-amber-dark"
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
