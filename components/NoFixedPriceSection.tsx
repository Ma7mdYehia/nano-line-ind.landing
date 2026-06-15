import { CTAButton } from "./ui/CTAButton";
import type { LandingContent } from "@/content/types";

const VARIABLES = [
  { label: "Loaf shape", sub: "Round or square" },
  { label: "Loaf weight", sub: "30–100 g range" },
  { label: "Loaf size", sub: "20–30 cm range" },
  { label: "Hourly capacity", sub: "3,500–6,000+ loaves/hr" },
  { label: "Automation level", sub: "Mixing, counting, packaging" },
  { label: "Optional add-ons", sub: "7 configurable systems" },
  { label: "Site conditions", sub: "Space, power, fuel, layout" },
  { label: "Installation scope", sub: "Training, commissioning" },
];

const REASONS = [
  {
    headline: "Every project is different.",
    body: "The same line model can be configured in dozens of ways based on loaf size, weight, shape, automation level, and optional systems. A single fixed price cannot fairly represent that range.",
    icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4",
  },
  {
    headline: "Site conditions vary significantly.",
    body: "Installation complexity, utility requirements, and site readiness all affect the final project scope. These need to be reviewed before a quotation can be prepared accurately.",
    icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",
  },
  {
    headline: "You deserve a quotation built for your project.",
    body: "Rather than showing a price that may not fit your situation, we review your production requirements first and prepare a short, customized quotation that reflects your actual project scope.",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

export function NoFixedPriceSection({ content }: { content: LandingContent }) {
  return (
    <section className="bg-navy">
      <div className="container-content py-16 md:py-20">
        {/* Header */}
        <div className="max-w-[640px]">
          <p className="overline mb-3">{content.sections.noFixedPrice.overline}</p>
          <h2 className="text-h2 font-bold text-white">
            {content.sections.noFixedPrice.headline}
          </h2>
          <p className="mt-4 text-body text-white/60">
            Displaying a public price for a custom industrial production line
            would be misleading. Here is why.
          </p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-start">
          {/* Left: reasons */}
          <div className="space-y-6">
            {REASONS.map(({ headline, body, icon }) => (
              <div key={headline} className="flex gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                  <svg
                    className="text-amber"
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
                <div>
                  <h3 className="text-body font-semibold text-white">{headline}</h3>
                  <p className="mt-1.5 text-body-sm text-white/60">{body}</p>
                </div>
              </div>
            ))}

            <div className="mt-2 rounded-xl border border-amber/30 bg-amber/10 p-5">
              <p className="text-body-sm font-semibold text-amber">
                What happens instead?
              </p>
              <p className="mt-2 text-body-sm text-white/70">
                You submit your production requirements through the form above.
                Our technical team reviews your details — loaf type, capacity
                needs, automation level, and site conditions — and sends you a
                short, customized quotation within 2–3 business days.
              </p>
            </div>
          </div>

          {/* Right: variables graphic */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="mb-5 text-body-sm font-semibold text-white/50">
              Variables that affect the final project quotation
            </p>
            <div className="grid grid-cols-2 gap-3">
              {VARIABLES.map(({ label, sub }) => (
                <div
                  key={label}
                  className="rounded-lg border border-white/10 bg-white/5 px-4 py-3"
                >
                  <p className="text-body-sm font-medium text-white">{label}</p>
                  <p className="mt-0.5 text-caption text-white/40">{sub}</p>
                </div>
              ))}
            </div>

            {/* Arrow + result */}
            <div className="mt-5 flex flex-col items-center gap-2">
              <div className="flex w-full items-center gap-2">
                <div className="flex-1 border-t border-dashed border-white/20" />
                <svg
                  className="text-white/30"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 5v14m0 0l-4-4m4 4l4-4" />
                </svg>
                <div className="flex-1 border-t border-dashed border-white/20" />
              </div>
              <div className="w-full rounded-lg border border-amber/40 bg-amber/10 py-3 text-center">
                <p className="text-body-sm font-semibold text-amber">
                  Customized Technical Quotation
                </p>
                <p className="mt-0.5 text-caption text-amber/70">
                  Prepared after reviewing your project details
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <CTAButton href="#quotation" variant="secondary-inverse">
            Submit Your Requirements
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
