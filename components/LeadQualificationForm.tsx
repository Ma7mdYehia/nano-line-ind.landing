"use client";

import { useState, useCallback, useMemo } from "react";
import {
  computeRequiredHourly,
  calculate,
  parseLoafWeightGrams,
  parseLoafSizeCm,
  parseLoafShape,
} from "@/lib/calculator";
import { CTAButton } from "./ui/CTAButton";
import type { LandingContent } from "@/content/types";

const STEP_NAMES = [
  "Contact Details",
  "Product Requirements",
  "Production Capacity",
  "Automation & Add-ons",
  "Site Readiness",
] as const;

const ADDON_OPTIONS = [
  "Spiral Mixer",
  "Electronic Mixing System with Weighing Scale",
  "Packing and Preparation Table",
  "Bag Sealing Machine",
  "Automatic Bread Counter",
  "Air Compressor",
  "Additional Control Systems",
];

interface FormData {
  // Step 1
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  country: string;
  // Step 2
  loafShape: string;
  loafWeight: string;
  loafWeightCustom: string;
  loafSize: string;
  loafSizeCustom: string;
  // Step 3
  dailyLoaves: string;
  dailyHours: string;
  monthlyDays: string;
  // Step 4
  needsMixing: string;
  needsPackaging: string;
  selectedAddons: string[];
  // Step 5
  spaceAvailable: string;
  powerSupply: string;
  fuelType: string;
  notes: string;
}

const INITIAL_DATA: FormData = {
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
  country: "",
  loafShape: "",
  loafWeight: "",
  loafWeightCustom: "",
  loafSize: "",
  loafSizeCustom: "",
  dailyLoaves: "",
  dailyHours: "",
  monthlyDays: "",
  needsMixing: "",
  needsPackaging: "",
  selectedAddons: [],
  spaceAvailable: "",
  powerSupply: "",
  fuelType: "",
  notes: "",
};

function PillChoice({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(value === o ? "" : o)}
          className={`rounded-md border px-4 py-2 text-body-sm font-medium transition-colors ${
            value === o
              ? "border-navy bg-navy text-white"
              : "border-steel-light bg-white text-text-body hover:border-navy"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function CheckboxPill({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`flex items-center gap-2 rounded-md border px-3 py-2 text-body-sm font-medium transition-colors ${
        checked
          ? "border-amber bg-amber-light text-amber-dark"
          : "border-steel-light bg-white text-text-body hover:border-navy"
      }`}
    >
      <span
        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
          checked ? "border-amber bg-amber" : "border-steel-light"
        }`}
      >
        {checked && (
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 6l3 3 5-5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      {label}
    </button>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-body-sm font-semibold text-text-body">
        {label}
        {required && <span className="ml-1 text-amber">*</span>}
      </span>
      {children}
    </label>
  );
}

const inputCls =
  "h-12 w-full rounded-md border border-[#D1D5DB] px-3.5 text-body text-navy placeholder:text-text-muted focus:border-navy focus:outline-none";

export function LeadQualificationForm({ content }: { content: LandingContent }) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(INITIAL_DATA);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const set = useCallback(
    <K extends keyof FormData>(key: K, value: FormData[K]) => {
      setData((d) => ({ ...d, [key]: value }));
      setErrors((e) => ({ ...e, [key]: undefined }));
    },
    []
  );

  const toggleAddon = useCallback((addon: string) => {
    setData((d) => ({
      ...d,
      selectedAddons: d.selectedAddons.includes(addon)
        ? d.selectedAddons.filter((a) => a !== addon)
        : [...d.selectedAddons, addon],
    }));
  }, []);

  function validateStep(s: number): boolean {
    const errs: Partial<Record<keyof FormData, string>> = {};
    if (s === 1) {
      if (!data.companyName.trim()) errs.companyName = "Company name is required.";
      if (!data.contactName.trim()) errs.contactName = "Contact name is required.";
      if (!data.email.trim()) errs.email = "Email address is required.";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
        errs.email = "Please enter a valid email address.";
      if (!data.country.trim()) errs.country = "Country is required.";
    }
    if (s === 3) {
      if (!data.dailyLoaves || parseInt(data.dailyLoaves) < 1)
        errs.dailyLoaves = "Please enter your required daily output.";
      if (!data.dailyHours || parseFloat(data.dailyHours) < 1)
        errs.dailyHours = "Please enter daily working hours.";
      if (!data.monthlyDays || parseInt(data.monthlyDays) < 1)
        errs.monthlyDays = "Please enter monthly working days.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleNext() {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, 5));
  }

  function handleBack() {
    setStep((s) => Math.max(s - 1, 1));
    setErrors({});
  }

  function handleSubmit() {
    if (!validateStep(step)) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1400);
  }

  const requiredHourly =
    data.dailyLoaves && data.dailyHours
      ? computeRequiredHourly(
          parseInt(data.dailyLoaves) || 0,
          parseFloat(data.dailyHours) || 1
        )
      : null;

  const capacityEstimate = useMemo(() => {
    if (!data.dailyLoaves || !data.dailyHours || !data.monthlyDays) return null;
    const weightGrams = parseLoafWeightGrams(
      data.loafWeight === "Custom / Other" ? "custom" : data.loafWeight.replace(" g", ""),
      data.loafWeight === "Custom / Other" ? parseFloat(data.loafWeightCustom) || undefined : undefined
    );
    const sizeCm = parseLoafSizeCm(
      data.loafSize === "Custom / Other" ? "custom" : data.loafSize.replace(" cm", ""),
      data.loafSize === "Custom / Other" ? parseFloat(data.loafSizeCustom) || undefined : undefined
    );
    if (!weightGrams && !sizeCm) return null;
    return calculate({
      dailyLoaves: parseInt(data.dailyLoaves) || 0,
      dailyWorkingHours: parseFloat(data.dailyHours) || 1,
      monthlyWorkingDays: parseInt(data.monthlyDays) || 0,
      loafShape: data.loafShape ? parseLoafShape(data.loafShape.toLowerCase().replace(" ", "_").replace("not sure yet", "not_sure")) : undefined,
      loafWeightGrams: weightGrams,
      loafSizeCm: sizeCm,
    });
  }, [data.dailyLoaves, data.dailyHours, data.monthlyDays, data.loafShape, data.loafWeight, data.loafWeightCustom, data.loafSize, data.loafSizeCustom]);

  if (submitted) {
    return (
      <section id="quotation" className="bg-navy">
        <div className="container-content py-16 md:py-24">
          <div className="mx-auto max-w-xl rounded-2xl bg-white p-10 text-center shadow-lg">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-success-light">
              <svg
                className="text-success"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-h3 font-bold text-navy">{content.leadForm.successHeadline}</h2>
            <p className="mt-3 text-body text-text-body">{content.leadForm.successBody}</p>
            <p className="mt-6 text-body-sm text-text-muted">
              Reference: {data.companyName} · {data.email}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="quotation" className="bg-navy">
      <div className="container-content py-16 md:py-20">
        {/* Header */}
        <div className="mb-10 max-w-[640px]">
          <p className="overline mb-3">{content.sections.leadForm.overline}</p>
          <h2 className="text-h2 font-bold text-white">
            {content.sections.leadForm.headline}
          </h2>
          <p className="mt-4 text-body text-white/60">
            Share your production requirements. Our team will review your project
            details and prepare a customized technical quotation.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          {/* Form card */}
          <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
            {/* Progress bar */}
            <div className="border-b border-steel-light px-8 py-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-body-sm font-semibold text-navy">
                  Step {step} of {STEP_NAMES.length} — {STEP_NAMES[step - 1]}
                </p>
                <p className="text-caption text-text-muted">{step * 20}% complete</p>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-steel-light">
                <div
                  className="h-full rounded-full bg-amber transition-all duration-300"
                  style={{ width: `${step * 20}%` }}
                />
              </div>
              <div className="mt-3 flex gap-1">
                {STEP_NAMES.map((_, i) => (
                  <div
                    key={i}
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold transition-colors ${
                      i + 1 < step
                        ? "bg-success text-white"
                        : i + 1 === step
                        ? "bg-amber text-white"
                        : "bg-steel-pale text-text-muted"
                    }`}
                  >
                    {i + 1 < step ? (
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M2 6l3 3 5-5"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      i + 1
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step content */}
            <div className="p-8">
              <div key={step} className="nl-fade-in">
              {/* Step 1: Contact Details */}
              {step === 1 && (
                <div className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Company Name" required>
                      <input
                        type="text"
                        value={data.companyName}
                        onChange={(e) => set("companyName", e.target.value)}
                        placeholder="Your company or factory name"
                        className={inputCls}
                      />
                      {errors.companyName && (
                        <p className="mt-1 text-caption text-red-500">{errors.companyName}</p>
                      )}
                    </Field>
                    <Field label="Contact Name" required>
                      <input
                        type="text"
                        value={data.contactName}
                        onChange={(e) => set("contactName", e.target.value)}
                        placeholder="Your full name"
                        className={inputCls}
                      />
                      {errors.contactName && (
                        <p className="mt-1 text-caption text-red-500">{errors.contactName}</p>
                      )}
                    </Field>
                  </div>
                  <Field label="Email Address" required>
                    <input
                      type="email"
                      value={data.email}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder="you@company.com"
                      className={inputCls}
                    />
                    {errors.email && (
                      <p className="mt-1 text-caption text-red-500">{errors.email}</p>
                    )}
                  </Field>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Phone / WhatsApp">
                      <input
                        type="tel"
                        value={data.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        placeholder="+1 555 000 0000"
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Country" required>
                      <input
                        type="text"
                        value={data.country}
                        onChange={(e) => set("country", e.target.value)}
                        placeholder="e.g. Saudi Arabia"
                        className={inputCls}
                      />
                      {errors.country && (
                        <p className="mt-1 text-caption text-red-500">{errors.country}</p>
                      )}
                    </Field>
                  </div>
                </div>
              )}

              {/* Step 2: Product Requirements */}
              {step === 2 && (
                <div className="space-y-6">
                  <Field label="Target Loaf Shape">
                    <div className="mt-2">
                      <PillChoice
                        options={["Round", "Square", "Rectangular", "Not sure yet"]}
                        value={data.loafShape}
                        onChange={(v) => set("loafShape", v)}
                      />
                    </div>
                    {(data.loafShape === "Square" || data.loafShape === "Rectangular") && (
                      <p className="mt-2 rounded-lg border border-amber/30 bg-amber-light px-3 py-2 text-caption text-amber-dark">
                        {data.loafShape === "Rectangular"
                          ? "Rectangular forming requires a dedicated die — configuration will be confirmed at technical review."
                          : "Square forming configuration is available and will be confirmed at quotation stage."}
                      </p>
                    )}
                  </Field>
                  <Field label="Target Loaf Weight">
                    <div className="mt-2">
                      <PillChoice
                        options={["30 g", "50 g", "70 g", "100 g", "Custom / Other"]}
                        value={data.loafWeight}
                        onChange={(v) => set("loafWeight", v)}
                      />
                    </div>
                    {data.loafWeight === "Custom / Other" && (
                      <div className="mt-3">
                        <label className="block">
                          <span className="mb-1.5 block text-body-sm font-semibold text-text-body">
                            Custom Weight <span className="font-normal text-caption text-text-muted">(grams, 10–500)</span>
                          </span>
                          <input
                            type="number"
                            inputMode="numeric"
                            value={data.loafWeightCustom}
                            onChange={(e) => set("loafWeightCustom", e.target.value)}
                            min={10}
                            max={500}
                            placeholder="e.g. 80"
                            className={inputCls}
                          />
                        </label>
                      </div>
                    )}
                  </Field>
                  <Field label="Target Loaf Size">
                    <div className="mt-2">
                      <PillChoice
                        options={["20 cm", "25 cm", "30 cm", "Custom / Other"]}
                        value={data.loafSize}
                        onChange={(v) => set("loafSize", v)}
                      />
                    </div>
                    {data.loafSize === "Custom / Other" && (
                      <div className="mt-3">
                        <label className="block">
                          <span className="mb-1.5 block text-body-sm font-semibold text-text-body">
                            Custom Length <span className="font-normal text-caption text-text-muted">(cm, 5–80)</span>
                          </span>
                          <input
                            type="number"
                            inputMode="numeric"
                            value={data.loafSizeCustom}
                            onChange={(e) => set("loafSizeCustom", e.target.value)}
                            min={5}
                            max={80}
                            placeholder="e.g. 27"
                            className={inputCls}
                          />
                        </label>
                      </div>
                    )}
                  </Field>
                  <p className="rounded-lg border border-amber/30 bg-amber-light p-3 text-body-sm text-amber-dark">
                    If your target specifications fall outside these ranges, our
                    team will work with you during technical review to define
                    the suitable configuration.
                  </p>
                </div>
              )}

              {/* Step 3: Production Capacity */}
              {step === 3 && (
                <div className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Required Loaves per Day" required>
                      <input
                        type="number"
                        inputMode="numeric"
                        value={data.dailyLoaves}
                        onChange={(e) => set("dailyLoaves", e.target.value)}
                        placeholder="e.g. 50,000"
                        className={inputCls}
                      />
                      {errors.dailyLoaves && (
                        <p className="mt-1 text-caption text-red-500">{errors.dailyLoaves}</p>
                      )}
                    </Field>
                    <Field label="Working Hours per Day" required>
                      <input
                        type="number"
                        inputMode="decimal"
                        value={data.dailyHours}
                        onChange={(e) => set("dailyHours", e.target.value)}
                        placeholder="e.g. 10"
                        className={inputCls}
                      />
                      {errors.dailyHours && (
                        <p className="mt-1 text-caption text-red-500">{errors.dailyHours}</p>
                      )}
                    </Field>
                  </div>
                  <Field label="Monthly Working Days" required>
                    <input
                      type="number"
                      inputMode="numeric"
                      value={data.monthlyDays}
                      onChange={(e) => set("monthlyDays", e.target.value)}
                      placeholder="e.g. 26"
                      className={inputCls}
                    />
                    {errors.monthlyDays && (
                      <p className="mt-1 text-caption text-red-500">{errors.monthlyDays}</p>
                    )}
                  </Field>
                  {requiredHourly !== null && requiredHourly > 0 && (
                    <div className={`grid gap-3 ${capacityEstimate?.hasProductSpec ? "sm:grid-cols-2" : ""}`}>
                      <div className="rounded-xl bg-off-white p-4">
                        <p className="text-caption text-text-muted">
                          Required hourly production
                        </p>
                        <p className="mt-1 text-h3 font-bold tabular-nums text-navy">
                          {requiredHourly.toLocaleString("en-US")}
                        </p>
                        <p className="text-caption text-text-muted">loaves / hour</p>
                      </div>
                      {capacityEstimate?.hasProductSpec && (
                        <div className="rounded-xl bg-off-white p-4">
                          <p className="text-caption text-text-muted">
                            Est. product capacity
                          </p>
                          <p className="mt-1 text-h3 font-bold tabular-nums text-navy">
                            {capacityEstimate.estimatedProductCapacity.toLocaleString("en-US")}
                          </p>
                          <p className="text-caption text-text-muted">loaves / hour</p>
                        </div>
                      )}
                    </div>
                  )}
                  {capacityEstimate?.hasProductSpec && capacityEstimate.productSpecNote && (
                    <p className="rounded-lg border border-steel-light bg-off-white px-3 py-2 text-caption text-text-muted leading-relaxed">
                      {capacityEstimate.productSpecNote}
                    </p>
                  )}
                </div>
              )}

              {/* Step 4: Automation & Add-ons */}
              {step === 4 && (
                <div className="space-y-6">
                  <Field label="Mixing System Needed?">
                    <div className="mt-2">
                      <PillChoice
                        options={["Yes", "No", "Not sure"]}
                        value={data.needsMixing}
                        onChange={(v) => set("needsMixing", v)}
                      />
                    </div>
                  </Field>
                  <Field label="Packaging Support Needed?">
                    <div className="mt-2">
                      <PillChoice
                        options={["Yes", "No", "Not sure"]}
                        value={data.needsPackaging}
                        onChange={(v) => set("needsPackaging", v)}
                      />
                    </div>
                  </Field>
                  <div>
                    <p className="mb-2 text-body-sm font-semibold text-text-body">
                      Optional Add-ons of Interest
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {ADDON_OPTIONS.map((addon) => (
                        <CheckboxPill
                          key={addon}
                          label={addon}
                          checked={data.selectedAddons.includes(addon)}
                          onChange={() => toggleAddon(addon)}
                        />
                      ))}
                    </div>
                    <p className="mt-2 text-caption text-text-muted">
                      Optional — select any that may apply to your project.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 5: Site Readiness */}
              {step === 5 && (
                <div className="space-y-5">
                  <Field label="Available Production Space">
                    <div className="mt-2">
                      <PillChoice
                        options={[
                          "Under 150 m²",
                          "150–250 m²",
                          "Over 250 m²",
                          "Not confirmed yet",
                        ]}
                        value={data.spaceAvailable}
                        onChange={(v) => set("spaceAvailable", v)}
                      />
                    </div>
                  </Field>
                  <Field label="Power Supply Available">
                    <div className="mt-2">
                      <PillChoice
                        options={[
                          "Three-phase available",
                          "Single-phase only",
                          "Not confirmed yet",
                        ]}
                        value={data.powerSupply}
                        onChange={(v) => set("powerSupply", v)}
                      />
                    </div>
                  </Field>
                  <Field label="Fuel / Energy Source">
                    <div className="mt-2">
                      <PillChoice
                        options={["Natural Gas", "Diesel", "LPG", "Not confirmed yet"]}
                        value={data.fuelType}
                        onChange={(v) => set("fuelType", v)}
                      />
                    </div>
                  </Field>
                  <Field label="Additional Notes or Requirements">
                    <textarea
                      value={data.notes}
                      onChange={(e) => set("notes", e.target.value)}
                      rows={4}
                      placeholder="Tell us anything else about your project, site, or production goals…"
                      className="w-full rounded-md border border-[#D1D5DB] px-3.5 py-3 text-body text-navy placeholder:text-text-muted focus:border-navy focus:outline-none"
                    />
                  </Field>
                </div>
              )}
              </div>

              {/* Navigation */}
              <div className="mt-8 flex items-center justify-between border-t border-steel-light pt-6">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center gap-2 text-body-sm font-medium text-text-body hover:text-navy"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                    Back
                  </button>
                ) : (
                  <div />
                )}
                {step < 5 ? (
                  <CTAButton
                    variant="primary"
                    onClick={handleNext}
                    type="button"
                  >
                    Continue
                  </CTAButton>
                ) : (
                  <CTAButton
                    variant="primary"
                    onClick={handleSubmit}
                    type="button"
                    disabled={submitting}
                  >
                    {submitting ? "Submitting…" : content.leadForm.submitCta}
                  </CTAButton>
                )}
              </div>
            </div>
          </div>

          {/* Summary panel */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
              <p className="text-body-sm font-semibold text-white">
                Your Request Summary
              </p>

              {data.companyName && (
                <SummaryRow label="Company" value={data.companyName} />
              )}
              {data.country && (
                <SummaryRow label="Country" value={data.country} />
              )}
              {data.loafShape && (
                <SummaryRow label="Loaf Shape" value={data.loafShape} />
              )}
              {data.loafWeight && (
                <SummaryRow label="Loaf Weight" value={data.loafWeight} />
              )}
              {data.loafSize && (
                <SummaryRow label="Loaf Size" value={data.loafSize} />
              )}
              {data.dailyLoaves && (
                <SummaryRow
                  label="Daily Output"
                  value={`${parseInt(data.dailyLoaves).toLocaleString("en-US")} loaves`}
                />
              )}
              {requiredHourly !== null && requiredHourly > 0 && (
                <SummaryRow
                  label="Hourly Needed"
                  value={`${requiredHourly.toLocaleString("en-US")} / hr`}
                  highlight
                />
              )}
              {capacityEstimate?.hasProductSpec && (
                <SummaryRow
                  label="Est. Product Capacity"
                  value={`${capacityEstimate.estimatedProductCapacity.toLocaleString("en-US")} / hr`}
                />
              )}
              {capacityEstimate?.configurationProfile.hasProvisionNote && capacityEstimate.configurationProfile.provisionNote && (
                <div className="rounded-md border border-amber/30 bg-amber/5 px-2.5 py-2">
                  <p className="text-caption text-amber/80 leading-relaxed">
                    {capacityEstimate.configurationProfile.provisionNote}
                  </p>
                </div>
              )}
              {data.selectedAddons.length > 0 && (
                <div>
                  <p className="mb-1.5 text-caption text-white/40">Add-ons</p>
                  <div className="flex flex-wrap gap-1.5">
                    {data.selectedAddons.map((a) => (
                      <span
                        key={a}
                        className="rounded-full bg-amber-light px-2 py-0.5 text-micro font-medium text-amber-dark"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {!data.companyName && !data.loafShape && !data.dailyLoaves && (
                <p className="text-body-sm text-white/30">
                  Fill in the form steps to see your summary here.
                </p>
              )}

              <div className="border-t border-white/10 pt-4">
                <p className="text-caption text-white/40">
                  No pricing is generated from this form. Your requirements will
                  be reviewed by our technical team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SummaryRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <p className="text-caption text-white/40">{label}</p>
      <p
        className={`text-body-sm font-medium ${
          highlight ? "text-amber" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
