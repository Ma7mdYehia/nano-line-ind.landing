import { CTAButton } from "./ui/CTAButton";
import type { LandingContent } from "@/content/types";

const SPEC_CARDS = [
  { value: "3,500–6,000", label: "loaves / hour" },
  { value: "Round or Square", label: "bread formats" },
  { value: "Built-to-Order", label: "manufacturing" },
];

const FLOW_STAGES = ["Divider", "Proofer", "Sheeter", "Forming", "Baking", "Cooling"];

export function HeroSection({ content }: { content: LandingContent }) {
  const { hero } = content;

  return (
    <section id="overview" className="bg-white">
      <div className="container-content grid items-center gap-12 py-16 md:grid-cols-2 md:gap-16 md:py-24">
        {/* Left — copy */}
        <div>
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber bg-amber-light px-4 py-1.5 text-micro font-semibold text-amber">
            <span className="h-1.5 w-1.5 rounded-full bg-amber" />
            {hero.badge}
          </span>

          <h1 className="mt-2 text-h2 font-bold leading-tight text-navy md:text-display">
            {hero.headline}
          </h1>

          <p className="mt-5 max-w-[520px] text-body-lg text-text-body">
            {hero.subheadline}
          </p>

          <ul className="mt-6 space-y-2.5">
            {hero.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-body text-text-body">
                <svg
                  className="mt-1 shrink-0 text-amber"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M3 8l3.5 3.5L13 4.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-4">
            <CTAButton href="#calculator" variant="primary">
              {hero.primaryCta}
            </CTAButton>
            <CTAButton href="#quotation" variant="secondary">
              {hero.secondaryCta}
            </CTAButton>
          </div>

          <p className="mt-6 max-w-[460px] text-caption text-text-muted">
            {hero.trustText}
          </p>
        </div>

        {/* Right — industrial visual placeholder */}
        <div className="relative flex h-[480px] flex-col justify-between overflow-hidden rounded-2xl bg-navy p-8 shadow-lg">
          {/* Grid overlay */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* Model badge */}
          <div className="relative z-10">
            <p className="text-micro uppercase tracking-overline text-amber">
              Model
            </p>
            <p className="mt-1 text-h3 font-bold text-white">
              NL-RM210 / Steel Master
            </p>
            <p className="mt-1 text-body-sm text-white/50">
              Custom Healthy Bread Production Line
            </p>
          </div>

          {/* Production flow diagram */}
          <div className="relative z-10">
            <p className="mb-4 text-caption uppercase tracking-overline text-white/40">
              Production Flow
            </p>
            <div className="flex items-center gap-1">
              {FLOW_STAGES.map((stage, i) => (
                <div key={stage} className="flex items-center gap-1">
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-micro font-semibold text-white/80">
                      {i + 1}
                    </div>
                    <span className="mt-1 text-center text-[9px] leading-tight text-white/40">
                      {stage}
                    </span>
                  </div>
                  {i < FLOW_STAGES.length - 1 && (
                    <svg
                      className="mb-4 shrink-0 text-amber/40"
                      width="14"
                      height="8"
                      viewBox="0 0 14 8"
                    >
                      <path
                        d="M1 4h11M8 1l4 3-4 3"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Spec cards row */}
          <div className="relative z-10 grid grid-cols-3 gap-3">
            {SPEC_CARDS.map((card) => (
              <div
                key={card.label}
                className="rounded-xl border border-white/15 bg-white/10 p-3 text-center backdrop-blur"
              >
                <p className="text-body-sm font-bold text-amber">{card.value}</p>
                <p className="mt-0.5 text-[10px] text-white/50">{card.label}</p>
              </div>
            ))}
          </div>

          {/* CE badge */}
          <div className="absolute right-6 top-6 z-10 rounded-full border border-amber/40 bg-amber/10 px-3 py-1">
            <span className="text-micro font-semibold text-amber">CE Certified</span>
          </div>
        </div>
      </div>
    </section>
  );
}
