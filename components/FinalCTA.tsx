import { CTAButton } from "./ui/CTAButton";
import type { LandingContent } from "@/content/types";

export function FinalCTA({ content }: { content: LandingContent }) {
  return (
    <section className="relative overflow-hidden bg-navy">
      {/* Amber accent line */}
      <div className="absolute inset-x-0 top-0 h-1 bg-amber" />

      {/* Grid overlay pattern */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container-content relative py-7xl text-center">
        <p className="overline mb-3">{content.sections.finalCta.overline}</p>
        <h2 className="mx-auto max-w-[760px] text-h2 font-bold text-white">
          {content.sections.finalCta.headline}
        </h2>
        <p className="mx-auto mt-4 max-w-[640px] text-body-lg text-white/70">
          Tell us what bread you want to produce, how much output you need, and
          what level of automation you are planning. Our team will review your
          requirements and prepare a customized proposal for your project.
        </p>

        {/* Primary CTA group */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <CTAButton href="#calculator" variant="primary">
            Calculate Required Capacity
          </CTAButton>
          <CTAButton href="#quotation" variant="secondary-inverse">
            Request a Custom Quotation
          </CTAButton>
        </div>

        {/* Secondary CTA group */}
        <div className="mt-6">
          <p className="mb-3 text-caption text-white/40">
            Prefer to talk directly?
          </p>
          <CTAButton href="#" variant="whatsapp">
            Contact Us on WhatsApp
          </CTAButton>
        </div>

        <p className="mt-6 text-caption text-steel-light">
          Custom configuration. Industrial production flow. Technical review
          before quotation.
        </p>
      </div>
    </section>
  );
}
