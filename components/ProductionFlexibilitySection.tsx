"use client";

import { useState } from "react";
import { CTAButton } from "./ui/CTAButton";
import type { LandingContent } from "@/content/types";

const SPECS = [
  {
    label: "Loaf Size",
    value: "20–30 cm",
    note: "depending on final product design and technical configuration",
  },
  {
    label: "Loaf Weight",
    value: "30–100 g",
    note: "depending on recipe, product type, and production setup",
  },
  {
    label: "Production Capacity",
    value: "3,500–6,000",
    unit: "loaves/hour",
    note: "depending on loaf weight, size, shape, and configuration",
  },
];

export function ProductionFlexibilitySection({
  content,
}: {
  content: LandingContent;
}) {
  const [shape, setShape] = useState<"round" | "square">("round");

  return (
    <section id="flexibility" className="bg-white">
      <div className="container-content py-16 md:py-20">
        <div className="max-w-[580px]">
          <p className="overline mb-3">
            {content.sections.flexibility.overline}
          </p>
          <h2 className="text-h2 font-bold text-navy">
            {content.sections.flexibility.headline}
          </h2>
          <p className="mt-4 text-body-lg text-text-body">
            Every market is different. Some customers need round healthy bread.
            Others need square bread for packaging, retail display, or food
            service use. The NL-RM210 can be configured to support different
            loaf formats based on your product strategy.
          </p>
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-2 md:items-center">
          {/* Left — bread shape toggle + visual */}
          <div>
            {/* Toggle */}
            <div className="mb-6 inline-flex overflow-hidden rounded-lg border border-steel-light bg-steel-pale p-1">
              {(["round", "square"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setShape(s)}
                  className={`rounded-md px-6 py-2.5 text-body-sm font-semibold transition-all ${
                    shape === s
                      ? "bg-navy text-white shadow-sm"
                      : "text-text-body hover:text-navy"
                  }`}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)} Bread
                </button>
              ))}
            </div>

            {/* Bread shape visual */}
            <div className="flex h-56 items-center justify-center rounded-2xl border border-steel-light bg-steel-pale">
              <div className="flex flex-col items-center gap-3">
                <div
                  className="bg-gradient-to-br from-amber/30 to-amber/10 border-2 border-amber/20 transition-all duration-300"
                  style={{
                    width: shape === "round" ? "120px" : "130px",
                    height: shape === "round" ? "120px" : "90px",
                    borderRadius: shape === "round" ? "50%" : "12px",
                  }}
                />
                <p className="text-body-sm font-medium text-text-muted">
                  {shape === "round" ? "Round" : "Square"} healthy bread
                </p>
                <div className="flex gap-3 text-caption text-text-muted">
                  <span>20–30 cm</span>
                  <span>·</span>
                  <span>30–100 g</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right — spec cards */}
          <div className="space-y-4">
            {SPECS.map(({ label, value, unit, note }) => (
              <div
                key={label}
                className="rounded-xl border border-steel-light bg-white p-5 shadow-shallow"
              >
                <p className="text-caption uppercase tracking-overline text-text-muted">
                  {label}
                </p>
                <div className="mt-1 flex items-baseline gap-1.5">
                  <span className="text-h3 font-bold tabular-nums text-navy">
                    {value}
                  </span>
                  {unit && (
                    <span className="text-body-sm text-text-muted">{unit}</span>
                  )}
                </div>
                <p className="mt-1 text-caption text-text-muted">{note}</p>
              </div>
            ))}

            <p className="rounded-lg border border-amber/30 bg-amber-light p-4 text-body-sm text-amber-dark">
              Production capacity is not a fixed number. It depends on product
              specifications, technical configuration, and the final production
              setup.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <CTAButton href="#calculator" variant="primary">
            Estimate Your Required Capacity
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
