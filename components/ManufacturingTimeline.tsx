import { CTAButton } from "./ui/CTAButton";
import { LEAD_TIME } from "@/lib/constants";
import type { LandingContent } from "@/content/types";

const STEPS = [
  {
    number: 1,
    name: "Requirement Review",
    description:
      "We review your product, capacity, site, and automation requirements.",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
  },
  {
    number: 2,
    name: "Technical Configuration",
    description:
      "Our team defines the suitable line setup based on your production goals.",
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
  },
  {
    number: 3,
    name: "Manufacturing",
    description:
      "The line is manufactured and prepared according to the approved configuration.",
    icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
  },
  {
    number: 4,
    name: "Inspection & Shipping",
    description:
      "Equipment is checked before shipping according to the agreed project scope.",
    icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
  },
  {
    number: 5,
    name: "Installation & Initial Operation",
    description:
      "A technical team supports installation, initial operation, and operator training.",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

export function ManufacturingTimeline({
  content,
}: {
  content: LandingContent;
}) {
  return (
    <section className="bg-off-white">
      <div className="container-content py-16 md:py-20">
        <div className="max-w-[600px]">
          <p className="overline mb-3">
            {content.sections.manufacturing.overline}
          </p>
          <h2 className="text-h2 font-bold text-navy">
            {content.sections.manufacturing.headline}
          </h2>
          <p className="mt-4 text-body-lg text-text-body">
            The NL-RM210 is not a ready-stock machine sold with one fixed
            configuration. Each line is manufactured and prepared based on the
            client&apos;s approved technical requirements.
          </p>
        </div>

        {/* Lead time callout */}
        <div className="mt-8 flex items-start gap-4 rounded-xl border-l-4 border-amber bg-white p-6 shadow-shallow">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-light">
            <svg
              className="text-amber"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-navy">
              Average lead time:{" "}
              <span className="text-amber">
                {LEAD_TIME.MIN_DAYS}–{LEAD_TIME.MAX_DAYS} days
              </span>
            </p>
            <p className="mt-1 text-body-sm text-text-body">
              Manufacturing and preparation lead time depends on the final
              approved configuration, customization level, selected add-ons,
              and site readiness.
            </p>
          </div>
        </div>

        {/* Timeline — desktop horizontal */}
        <div className="mt-12 hidden md:block">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-0 right-0 top-8 h-0.5 bg-steel-light" />

            <div className="relative grid grid-cols-5 gap-4">
              {STEPS.map((step) => (
                <div key={step.number} className="flex flex-col items-center">
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-navy shadow-sm">
                    <svg
                      className="text-white/80"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d={step.icon} />
                    </svg>
                    <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-amber text-[10px] font-bold text-white">
                      {step.number}
                    </div>
                  </div>
                  <h3 className="mt-4 text-center text-body-sm font-semibold text-navy">
                    {step.name}
                  </h3>
                  <p className="mt-2 text-center text-caption text-text-muted">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline — mobile vertical */}
        <div className="mt-10 space-y-6 md:hidden">
          {STEPS.map((step, i) => (
            <div key={step.number} className="relative flex gap-4">
              {/* Left: circle + line */}
              <div className="flex flex-col items-center">
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy">
                  <svg
                    className="text-white/80"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={step.icon} />
                  </svg>
                  <div className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-amber text-[10px] font-bold text-white">
                    {step.number}
                  </div>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="mt-1 w-0.5 flex-1 bg-steel-light" />
                )}
              </div>
              {/* Right: content */}
              <div className="pb-6">
                <h3 className="text-body font-semibold text-navy">
                  {step.name}
                </h3>
                <p className="mt-1 text-body-sm text-text-body">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <CTAButton href="#quotation" variant="secondary">
            Start Your Technical Review
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
