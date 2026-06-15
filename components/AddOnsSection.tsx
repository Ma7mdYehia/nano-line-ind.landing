import { CTAButton } from "./ui/CTAButton";
import { Reveal } from "@/components/ui/Reveal";
import type { LandingContent } from "@/content/types";

const ADDONS = [
  {
    name: "Spiral Mixer",
    benefit: "Supports dough preparation for industrial production needs.",
    icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
  },
  {
    name: "Electronic Mixing System with Weighing Scale",
    benefit: "Helps improve ingredient accuracy and repeatability in the dough preparation process.",
    icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3",
  },
  {
    name: "Packing and Preparation Table",
    benefit: "Supports organized product handling before final packaging.",
    icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
  },
  {
    name: "Bag Sealing Machine",
    benefit: "Helps seal packaged products efficiently and consistently.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    name: "Automatic Bread Counter",
    benefit: "Supports counting and grouping bread pieces for packing and distribution.",
    icon: "M7 20l4-16m2 16l4-16M6 9h14M4 15h14",
  },
  {
    name: "Air Compressor",
    benefit: "Supports pneumatic systems required for line operation.",
    icon: "M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2",
  },
  {
    name: "Additional Control Systems",
    benefit: "Can be added depending on the required monitoring and automation level.",
    icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4",
  },
];

export function AddOnsSection({ content }: { content: LandingContent }) {
  return (
    <section id="addons" className="bg-white">
      <div className="container-content py-16 md:py-20">
        <Reveal>
          <div className="max-w-[600px]">
            <p className="overline mb-3">{content.sections.addons.overline}</p>
            <h2 className="text-h2 font-bold text-navy">
              {content.sections.addons.headline}
            </h2>
            <p className="mt-4 text-body-lg text-text-body">
              Every production project has different automation needs. Depending
              on your factory setup, product type, labor plan, and packaging
              process, additional systems can be added to support higher
              efficiency and smoother operation.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ADDONS.map(({ name, benefit, icon }, i) => (
            <Reveal key={name} delay={i * 70} className="h-full">
            <div
              className="group relative h-full overflow-hidden rounded-xl border border-steel-light bg-white p-6 shadow-shallow transition-shadow hover:shadow-sm"
            >
              <div className="mb-1 flex items-start justify-between gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-steel-pale text-steel transition-colors group-hover:bg-amber-light group-hover:text-amber">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={icon} />
                  </svg>
                </div>
                <span className="rounded-full bg-amber-light px-3 py-1 text-micro font-semibold text-amber">
                  Optional
                </span>
              </div>
              <h3 className="mt-4 text-body font-semibold text-navy">{name}</h3>
              <p className="mt-1.5 text-body-sm text-text-body">{benefit}</p>
            </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 max-w-[560px] text-body-sm text-text-muted">
          Optional systems are selected after reviewing production volume, product
          type, site layout, and packaging workflow.
        </p>

        <div className="mt-6">
          <CTAButton href="#quotation" variant="secondary">
            Choose the Right Add-ons for Your Project
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
