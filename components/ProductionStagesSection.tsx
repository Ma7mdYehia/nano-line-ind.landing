"use client";

import { useState } from "react";
import { CTAButton } from "./ui/CTAButton";
import type { LandingContent } from "@/content/types";

const STAGES = [
  {
    name: "Dough Divider",
    description:
      "Accurately divides dough pieces with controlled weight and production speed, helping improve consistency from the first stage of production.",
    why: "Precise division sets the foundation for consistent loaf weight across the entire batch.",
    gradient: "from-[#1E3A5F] to-[#0D2646]",
    icon: "M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z",
  },
  {
    name: "Proofer",
    description:
      "Supports the initial proofing process to help improve dough texture, stability, and final product quality.",
    why: "Controlled proofing gives the dough the right structure before rounding and forming.",
    gradient: "from-[#78350F] to-[#451B07]",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    name: "Dough Rounding",
    description:
      "Helps create more uniform dough pieces before they move into the forming and sheeting stages.",
    why: "Uniform dough balls improve the consistency of the final loaf shape and texture.",
    gradient: "from-[#1E3A5F] to-[#1E3A8A]",
    icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
  },
  {
    name: "Dough Arrangement",
    description:
      "Organizes dough pieces before sheeting and forming, improving production flow and reducing unnecessary manual handling.",
    why: "Consistent spacing and arrangement ensure smooth flow into the sheeter and forming stages.",
    gradient: "from-[#065F46] to-[#024735]",
    icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z",
  },
  {
    name: "Dough Sheeter",
    description:
      "Sheets the dough with precision to prepare it for the required final format and improve product consistency.",
    why: "Precise sheeting controls final loaf thickness and prepares it for forming.",
    gradient: "from-[#312E81] to-[#1E1B4B]",
    icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4",
  },
  {
    name: "Bread Forming Unit",
    description:
      "Forms the bread into the required shape and prepares it for baking according to the selected configuration.",
    why: "The forming unit determines whether output is round or square — the core of the customization.",
    gradient: "from-[#92400E] to-[#78350F]",
    icon: "M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z",
  },
  {
    name: "Transfer Conveyors",
    description:
      "Moves the product smoothly between production stages, helping maintain flow, reduce handling, and support operational efficiency.",
    why: "Smooth product transfer minimizes disruption between stages and reduces manual intervention.",
    gradient: "from-[#1E3A5F] to-[#0F2745]",
    icon: "M13 5l7 7-7 7M5 5l7 7-7 7",
  },
  {
    name: "Baking Chamber",
    description:
      "Bakes the product through a controlled heating stage designed for consistent baking and reliable industrial performance.",
    why: "The baking chamber is the most critical stage — controlled heat ensures consistent texture and color.",
    gradient: "from-[#7C1D07] to-[#4A1007]",
    icon: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z",
  },
  {
    name: "Cooling Conveyors",
    description:
      "Gradually cools the finished bread before packaging, helping preserve texture, quality, and product stability.",
    why: "Proper cooling stabilizes the bread structure and prepares it for consistent, damage-free packaging.",
    gradient: "from-[#1E3A5F] to-[#164E63]",
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  },
];

export function ProductionStagesSection({
  content,
}: {
  content: LandingContent;
}) {
  const [active, setActive] = useState(0);

  return (
    <section id="stages" className="bg-navy">
      <div className="container-content py-16 md:py-20">
        {/* Header */}
        <div className="mb-10 max-w-[640px]">
          <p className="overline mb-3">{content.sections.stages.overline}</p>
          <h2 className="text-h2 font-bold text-white">
            {content.sections.stages.headline}
          </h2>
          <p className="mt-4 text-body text-white/60">
            The NL-RM210 is designed as a complete production flow, helping
            manufacturers move from prepared dough to finished bread through
            organized, controlled, and scalable stages.
          </p>
        </div>

        {/* Desktop: sticky nav + panel */}
        <div className="hidden md:grid md:grid-cols-[260px_1fr] md:gap-8">
          {/* Left nav */}
          <nav className="sticky top-20 self-start">
            <div className="relative pl-4">
              {/* Animated production-flow progress line */}
              <div className="absolute left-0 top-0 h-full w-1 overflow-hidden rounded-full bg-white/10">
                <div
                  className="w-full rounded-full bg-amber transition-[height] duration-500 ease-out"
                  style={{ height: `${((active + 1) / STAGES.length) * 100}%` }}
                />
              </div>
              <ul className="space-y-0.5 overflow-hidden rounded-xl border border-white/10">
                {STAGES.map((stage, i) => (
                  <li key={stage.name}>
                    <button
                      onClick={() => setActive(i)}
                      className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
                        active === i
                          ? "border-l-4 border-amber bg-white/10 text-white"
                          : "border-l-4 border-transparent text-white/50 hover:bg-white/5 hover:text-white/80"
                      }`}
                    >
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-micro font-bold transition-colors ${
                          active === i
                            ? "nl-ring bg-amber text-white"
                            : "bg-white/10 text-white/50"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span className="text-body-sm font-medium">
                        {stage.name}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Right content */}
          <div className="min-h-[500px]">
            <div key={active} className="nl-fade-in overflow-hidden rounded-2xl bg-slate">
              {/* Stage visual */}
              <div
                className={`flex h-56 items-center justify-center bg-gradient-to-br ${STAGES[active].gradient}`}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
                    <svg
                      className="text-white/80"
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d={STAGES[active].icon} />
                    </svg>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber text-micro font-bold text-white">
                    {active + 1}
                  </div>
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-h3 font-bold text-white">
                  {STAGES[active].name}
                </h3>
                <p className="mt-3 text-body text-white/70">
                  {STAGES[active].description}
                </p>
                <div className="mt-5 border-t border-white/10 pt-5">
                  <p className="text-body-sm font-semibold text-amber">
                    Why it matters
                  </p>
                  <p className="mt-1.5 text-body-sm text-white/60">
                    {STAGES[active].why}
                  </p>
                </div>

                {/* Stage counter */}
                <div className="mt-6 flex gap-1.5">
                  {STAGES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        i === active
                          ? "w-6 bg-amber"
                          : "w-1.5 bg-white/20"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: accordion */}
        <div className="space-y-2 md:hidden">
          {STAGES.map((stage, i) => (
            <details
              key={stage.name}
              className="overflow-hidden rounded-xl border border-white/10"
            >
              <summary className="flex cursor-pointer select-none items-center gap-3 p-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber text-micro font-bold text-white">
                  {i + 1}
                </span>
                <span className="flex-1 text-body-sm font-semibold text-white">
                  {stage.name}
                </span>
                <svg
                  className="shrink-0 text-white/40"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="border-t border-white/10 bg-slate p-4">
                <div
                  className={`mb-4 flex h-32 items-center justify-center rounded-xl bg-gradient-to-br ${stage.gradient}`}
                >
                  <svg
                    className="text-white/70"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={stage.icon} />
                  </svg>
                </div>
                <p className="text-body-sm text-white/70">{stage.description}</p>
                <p className="mt-3 text-body-sm text-white/50">{stage.why}</p>
              </div>
            </details>
          ))}
        </div>

        <div className="mt-10">
          <CTAButton href="#quotation" variant="secondary-inverse">
            Discuss Your Required Production Flow
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
