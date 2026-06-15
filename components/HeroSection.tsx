import { CTAButton } from "./ui/CTAButton";
import type { LandingContent } from "@/content/types";

const SPEC_CARDS = [
  { value: "3,500–6,000", label: "loaves / hour" },
  { value: "Round or Square", label: "bread formats" },
  { value: "Built-to-Order", label: "manufacturing" },
];

const FLOW_STAGES = [
  { name: "Divider", hot: false },
  { name: "Proofer", hot: false },
  { name: "Forming", hot: false },
  { name: "Baking", hot: true },
  { name: "Cooling", hot: false },
];

export function HeroSection({ content }: { content: LandingContent }) {
  const { hero } = content;

  return (
    <section id="overview" className="bg-gradient-to-br from-white to-steel-pale">
      <div className="container-content grid items-center gap-12 py-16 md:grid-cols-2 md:gap-16 md:py-24 lg:min-h-[calc(100vh-72px)]">
        {/* Left — copy */}
        <div>
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber bg-amber-light px-4 py-1.5 text-micro font-semibold text-amber">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber" />
            {hero.badge}
          </span>

          <h1 className="mt-2 text-h2 font-bold leading-tight text-navy md:text-h1 lg:text-display">
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

        {/* Right — industrial visual */}
        <div className="relative flex h-[320px] flex-col justify-between overflow-hidden rounded-2xl border-t-4 border-t-amber bg-navy p-6 shadow-lg md:h-[540px] md:p-8">
          {/* Grid overlay */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* CE badge */}
          <div className="absolute right-5 top-5 z-10 rounded-full border border-amber bg-amber/20 px-3 py-1">
            <span className="text-micro font-semibold text-amber">CE Certified</span>
          </div>

          {/* Model badge */}
          <div className="relative z-10">
            <p className="text-micro uppercase tracking-overline text-amber">
              Model
            </p>
            <p className="mt-1 text-h4 font-bold text-white md:text-h3">
              NL-RM210 / Steel Master
            </p>
            <p className="mt-1 text-body-sm text-white/50">
              Custom Healthy Bread Production Line
            </p>
          </div>

          {/* Production flow diagram — hidden on small mobile */}
          <div className="relative z-10 hidden sm:block">
            <p className="mb-3 text-caption uppercase tracking-overline text-white/40">
              Production Flow
            </p>
            <div className="flex items-center gap-1.5">
              {FLOW_STAGES.map((stage, i) => (
                <div key={stage.name} className="flex items-center gap-1.5">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg text-micro font-bold ${
                        stage.hot
                          ? "border border-amber/60 bg-amber/15 text-amber"
                          : "border border-white/20 bg-white/10 text-white/80"
                      }`}
                    >
                      {i + 1}
                    </div>
                    <span
                      className={`mt-1 text-center text-[9px] leading-tight ${
                        stage.hot ? "text-amber/70" : "text-white/40"
                      }`}
                    >
                      {stage.name}
                    </span>
                  </div>
                  {i < FLOW_STAGES.length - 1 && (
                    <svg
                      className="mb-4 shrink-0 text-amber/30"
                      width="12"
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
          <div className="relative z-10 grid grid-cols-3 gap-2 md:gap-3">
            {SPEC_CARDS.map((card) => (
              <div
                key={card.label}
                className="rounded-xl border border-white/15 bg-white/10 p-2.5 text-center backdrop-blur md:p-3"
              >
                <p className="text-body-sm font-bold text-amber md:text-body">{card.value}</p>
                <p className="mt-0.5 text-[10px] text-white/50 md:text-[11px]">{card.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
