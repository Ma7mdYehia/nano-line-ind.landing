import { CTAButton } from "./ui/CTAButton";
import { Reveal } from "@/components/ui/Reveal";
import type { LandingContent } from "@/content/types";

const REQUIREMENTS = [
  {
    label: "Production Space",
    value: "≈ 8 × 22 m",
    detail: "Minimum recommended floor area for the full line configuration.",
    icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",
  },
  {
    label: "Electrical Supply",
    value: "Three-Phase",
    detail: "Industrial three-phase power supply required for line operation.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    label: "Fuel / Energy Source",
    value: "Gas or Diesel",
    detail: "Fuel supply required for the baking chamber heating system.",
    icon: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z",
  },
  {
    label: "Ventilation",
    value: "Required",
    detail: "Adequate exhaust and ventilation system for the baking chamber area.",
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  },
  {
    label: "Compressed Air",
    value: "Recommended",
    detail: "Air compressor required for pneumatic systems (available as add-on or site-provided).",
    icon: "M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2",
  },
  {
    label: "Maintenance Clearance",
    value: "Recommended",
    detail: "Sufficient clearance around equipment for safe operation and maintenance.",
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
  },
  {
    label: "Operating Team",
    value: "Trained Staff",
    detail: "Trained production operators and a technical contact required before installation.",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  },
];

export function SiteRequirementsSection({
  content,
}: {
  content: LandingContent;
}) {
  return (
    <section id="site" className="bg-off-white">
      <div className="container-content py-16 md:py-20">
        <Reveal>
          <div className="max-w-[600px]">
            <p className="overline mb-3">{content.sections.site.overline}</p>
            <h2 className="text-h2 font-bold text-navy">
              {content.sections.site.headline}
            </h2>
            <p className="mt-4 text-body-lg text-text-body">
              Before manufacturing begins, our technical team conducts a site
              readiness review. Understanding your facility helps us configure the
              line correctly and avoid delays during installation.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
          {/* Requirement cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {REQUIREMENTS.map(({ label, value, detail, icon }, i) => (
              <Reveal key={label} delay={i * 60} className="h-full">
              <div
                className="flex h-full gap-4 rounded-xl border border-steel-light bg-white p-5 shadow-shallow"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy/5 text-navy">
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
                <div>
                  <p className="text-caption uppercase tracking-overline text-text-muted">
                    {label}
                  </p>
                  <p className="mt-0.5 text-body font-semibold text-navy">
                    {value}
                  </p>
                  <p className="mt-1 text-body-sm text-text-body">{detail}</p>
                </div>
              </div>
              </Reveal>
            ))}
          </div>

          {/* Floor plan diagram */}
          <Reveal delay={120}>
          <div className="rounded-2xl border border-steel-light bg-white p-6 shadow-shallow">
            <p className="mb-4 text-caption font-semibold uppercase tracking-overline text-text-muted">
              Typical Floor Layout — 8 × 22 m
            </p>
            <div className="relative">
              <svg
                viewBox="0 0 340 130"
                className="w-full"
                aria-label="Factory floor plan showing production line layout approximately 8 by 22 meters"
              >
                {/* Outer building */}
                <rect
                  x="4"
                  y="4"
                  width="332"
                  height="122"
                  rx="6"
                  fill="#F8F9FA"
                  stroke="#D1D5DB"
                  strokeWidth="1.5"
                />

                {/* Main production line — horizontal flow */}
                {/* Dough divider */}
                <rect x="18" y="28" width="34" height="74" rx="4" fill="#1E3A5F" opacity="0.85" />
                <text x="35" y="66" textAnchor="middle" fill="white" fontSize="6" fontWeight="600">Dough</text>
                <text x="35" y="74" textAnchor="middle" fill="white" fontSize="6" fontWeight="600">Divider</text>

                {/* Arrow */}
                <path d="M53 65 L62 65" stroke="#D1D5DB" strokeWidth="1.5" markerEnd="url(#arrow)" />

                {/* Proofer */}
                <rect x="63" y="28" width="34" height="74" rx="4" fill="#78350F" opacity="0.85" />
                <text x="80" y="70" textAnchor="middle" fill="white" fontSize="6" fontWeight="600">Proofer</text>

                {/* Arrow */}
                <path d="M98 65 L107 65" stroke="#D1D5DB" strokeWidth="1.5" markerEnd="url(#arrow)" />

                {/* Rounding */}
                <rect x="108" y="28" width="34" height="74" rx="4" fill="#065F46" opacity="0.85" />
                <text x="125" y="66" textAnchor="middle" fill="white" fontSize="6" fontWeight="600">Dough</text>
                <text x="125" y="74" textAnchor="middle" fill="white" fontSize="6" fontWeight="600">Rounding</text>

                {/* Arrow */}
                <path d="M143 65 L152 65" stroke="#D1D5DB" strokeWidth="1.5" markerEnd="url(#arrow)" />

                {/* Sheeter */}
                <rect x="153" y="28" width="34" height="74" rx="4" fill="#312E81" opacity="0.85" />
                <text x="170" y="70" textAnchor="middle" fill="white" fontSize="6" fontWeight="600">Sheeter</text>

                {/* Arrow */}
                <path d="M188 65 L197 65" stroke="#D1D5DB" strokeWidth="1.5" markerEnd="url(#arrow)" />

                {/* Baking */}
                <rect x="198" y="16" width="60" height="98" rx="4" fill="#7C1D07" opacity="0.9" />
                <text x="228" y="62" textAnchor="middle" fill="white" fontSize="7" fontWeight="700">Baking</text>
                <text x="228" y="72" textAnchor="middle" fill="white" fontSize="7" fontWeight="700">Chamber</text>
                <text x="228" y="84" textAnchor="middle" fill="#FCD34D" fontSize="6">High Temp Zone</text>

                {/* Arrow */}
                <path d="M259 65 L268 65" stroke="#D1D5DB" strokeWidth="1.5" markerEnd="url(#arrow)" />

                {/* Cooling */}
                <rect x="269" y="28" width="55" height="74" rx="4" fill="#1E3A5F" opacity="0.75" />
                <text x="296" y="62" textAnchor="middle" fill="white" fontSize="6" fontWeight="600">Cooling</text>
                <text x="296" y="70" textAnchor="middle" fill="white" fontSize="6" fontWeight="600">Conveyors</text>
                <text x="296" y="83" textAnchor="middle" fill="#93C5FD" fontSize="5.5">Output Ready</text>

                {/* Dimension labels */}
                {/* Width */}
                <line x1="4" y1="116" x2="336" y2="116" stroke="#9CA3AF" strokeWidth="0.75" strokeDasharray="2,2" />
                <text x="170" y="126" textAnchor="middle" fill="#6B7280" fontSize="7">≈ 22 m</text>

                {/* Height */}
                <line x1="336" y1="4" x2="336" y2="112" stroke="#9CA3AF" strokeWidth="0.75" strokeDasharray="2,2" />
                <text x="338" y="60" textAnchor="start" fill="#6B7280" fontSize="7" transform="rotate(90,338,60) translate(-30,0)">≈ 8 m</text>

                {/* Arrow marker */}
                <defs>
                  <marker id="arrow" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
                    <path d="M0,0 L4,2 L0,4 Z" fill="#D1D5DB" />
                  </marker>
                </defs>
              </svg>
            </div>
            <p className="mt-3 text-caption text-text-muted">
              Actual dimensions may vary depending on the final line configuration and optional systems.
            </p>
          </div>
          </Reveal>
        </div>

        <div className="mt-10">
          <CTAButton href="#quotation" variant="secondary">
            Discuss Your Site Requirements
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
