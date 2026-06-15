"use client";

import { useMemo, useState } from "react";
import { calculate, type ConfigurationDirection } from "@/lib/calculator";
import { CTAButton } from "./ui/CTAButton";
import { SectionHeader } from "./ui/SectionHeader";
import type { LandingContent } from "@/content/types";

const RESULT_STYLES: Record<ConfigurationDirection, string> = {
  standard: "bg-success-light border-success text-[#065F46]",
  custom: "bg-config-blue-light border-config-blue text-[#1E3A8A]",
  higher_capacity: "bg-amber-light border-amber text-[#92400E]",
};

/**
 * Minimal interactive calculator wired to lib/calculator.ts. The full multi-step
 * UI, validation, and form prefill are a Session 8 build target (Session 6 spec).
 */
export function ProductionCalculator({ content }: { content: LandingContent }) {
  const [dailyLoaves, setDailyLoaves] = useState(50000);
  const [dailyWorkingHours, setDailyWorkingHours] = useState(10);
  const [monthlyWorkingDays, setMonthlyWorkingDays] = useState(26);

  const result = useMemo(
    () => calculate({ dailyLoaves, dailyWorkingHours, monthlyWorkingDays }),
    [dailyLoaves, dailyWorkingHours, monthlyWorkingDays]
  );

  const fmt = (n: number) => n.toLocaleString("en-US");

  return (
    <section id="calculator" className="bg-slate">
      <div className="container-content py-6xl">
        <SectionHeader intro={content.sections.calculator} inverse align="center" />
        <p className="mx-auto mt-4 max-w-[640px] text-center text-body text-steel-light">
          {content.calculator.introCopy}
        </p>

        <div className="mx-auto mt-8 grid max-w-wide gap-0 overflow-hidden rounded-2xl bg-white shadow-lg md:grid-cols-2">
          {/* Inputs */}
          <div className="space-y-5 p-8">
            <NumberField
              label="Required Loaves Per Day"
              value={dailyLoaves}
              onChange={setDailyLoaves}
            />
            <NumberField
              label="Daily Working Hours"
              value={dailyWorkingHours}
              onChange={setDailyWorkingHours}
            />
            <NumberField
              label="Monthly Working Days"
              value={monthlyWorkingDays}
              onChange={setMonthlyWorkingDays}
            />
          </div>

          {/* Results */}
          <div className="space-y-4 bg-off-white p-8">
            <div className="flex flex-wrap gap-6">
              <Stat
                label="Required hourly production"
                value={`${fmt(result.requiredHourlyProduction)}/h`}
              />
              <Stat
                label="Estimated monthly output"
                value={fmt(result.monthlyProduction)}
              />
            </div>

            <div
              className={`rounded-lg border-l-4 p-4 text-body-sm ${RESULT_STYLES[result.direction]}`}
            >
              {content.calculator.resultMessages[result.direction]}
            </div>

            {result.suggestedAddons.length > 0 && (
              <div>
                <p className="mb-2 text-body-sm font-semibold text-navy">
                  Suggested add-ons
                </p>
                <ul className="flex flex-wrap gap-2">
                  {result.suggestedAddons.map((a) => (
                    <li
                      key={a}
                      className="rounded-full bg-amber-light px-3 py-1 text-micro text-amber"
                    >
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <CTAButton href="#quotation" variant="primary" className="w-full">
              {content.calculator.cta}
            </CTAButton>

            <p className="border-t border-steel-light pt-3 text-caption italic text-text-muted">
              {content.calculator.disclaimer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-body-sm font-semibold text-text-body">
        {label}
      </span>
      <input
        type="number"
        inputMode="numeric"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-12 w-full rounded-md border border-[#D1D5DB] px-3.5 text-body text-navy focus:border-navy"
      />
    </label>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-caption text-text-muted">{label}</p>
      <p className="text-h3 font-bold tabular-nums text-navy">{value}</p>
    </div>
  );
}
