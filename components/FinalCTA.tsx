import { CTAButton } from "./ui/CTAButton";
import type { LandingContent } from "@/content/types";

export function FinalCTA({ content }: { content: LandingContent }) {
  return (
    <section className="bg-navy">
      <div className="container-content py-7xl text-center">
        <p className="overline mb-3">{content.sections.finalCta.overline}</p>
        <h2 className="mx-auto max-w-[760px] text-h2 font-bold text-white">
          {content.sections.finalCta.headline}
        </h2>
        <p className="mx-auto mt-4 max-w-[640px] text-body-lg text-steel-light">
          Tell us what bread you want to produce, how much output you need, and
          what level of automation you are planning. Our team will review your
          requirements and prepare a customized proposal for your project.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <CTAButton href="#calculator" variant="primary">
            Calculate Required Capacity
          </CTAButton>
          <CTAButton href="#quotation" variant="secondary-inverse">
            Request a Custom Quotation
          </CTAButton>
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
