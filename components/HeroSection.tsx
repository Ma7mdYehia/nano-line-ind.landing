"use client";

import { useEffect, useRef, useState } from "react";
import { CTAButton } from "./ui/CTAButton";
import type { LandingContent } from "@/content/types";

const SPEC_CARDS = [
  { value: "3,500–6,000", label: "loaves / hour", depth: 22 },
  { value: "Round or Square", label: "bread formats", depth: 14 },
  { value: "Built-to-Order", label: "manufacturing", depth: 30 },
];

const STAGES = [
  {
    name: "Divider",
    detail:
      "Precisely portions bulk dough into uniform pieces at your target loaf weight — 30 to 100 g per piece.",
  },
  {
    name: "Proofer",
    detail:
      "Dough rests in a temperature-controlled proofer, developing volume and structure before shaping.",
  },
  {
    name: "Forming",
    detail:
      "Sheeter and forming unit shapes each piece into round or square loaves — switchable per product line.",
  },
  {
    name: "Baking",
    detail:
      "High-temperature baking chamber (gas or diesel) produces consistent golden-crust loaves, batch after batch.",
  },
  {
    name: "Cooling",
    detail:
      "Cooling conveyors bring baked loaves to packaging temperature, ready for counting, wrapping, or handling.",
  },
] as const;

/** Static SVG scene for each production stage. */
function StageScene({ index }: { index: number }) {
  switch (index) {
    case 0: // Divider
      return (
        <svg viewBox="0 0 160 72" className="w-full" aria-hidden="true">
          {/* Blade */}
          <line
            x1="80" y1="6" x2="80" y2="66"
            stroke="rgba(255,255,255,0.35)" strokeWidth="2"
            strokeDasharray="5 3" strokeLinecap="round"
          />
          {/* Left portion */}
          <ellipse cx="40" cy="36" rx="28" ry="20" fill="#D97706" opacity="0.65" />
          <text x="40" y="40" textAnchor="middle" fill="white" fontSize="8" fontWeight="700">
            ≈50 g
          </text>
          {/* Right portion */}
          <ellipse cx="120" cy="36" rx="28" ry="20" fill="#D97706" opacity="0.65" />
          <text x="120" y="40" textAnchor="middle" fill="white" fontSize="8" fontWeight="700">
            ≈50 g
          </text>
          {/* Split arrows */}
          <path
            d="M72 36 L56 36"
            stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"
            markerEnd="url(#arr-l)"
          />
          <path
            d="M88 36 L104 36"
            stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"
            markerEnd="url(#arr-r)"
          />
          <defs>
            <marker id="arr-l" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="180">
              <path d="M0,0 L4,2 L0,4 Z" fill="rgba(255,255,255,0.3)" />
            </marker>
            <marker id="arr-r" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
              <path d="M0,0 L4,2 L0,4 Z" fill="rgba(255,255,255,0.3)" />
            </marker>
          </defs>
          <text x="80" y="70" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="6">
            Uniform portion cutting
          </text>
        </svg>
      );

    case 1: // Proofer
      return (
        <svg viewBox="0 0 160 72" className="w-full" aria-hidden="true">
          {/* Chamber */}
          <rect
            x="4" y="10" width="152" height="52" rx="6"
            fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"
          />
          {/* Dough pieces */}
          {[28, 80, 132].map((cx, i) => (
            <g key={i}>
              <ellipse cx={cx} cy="50" rx="18" ry="11" fill="#D97706" opacity="0.6" />
              {/* Steam dots */}
              <circle cx={cx - 5} cy="32" r="2.5" fill="rgba(255,255,255,0.18)" />
              <circle cx={cx + 3} cy="22" r="2" fill="rgba(255,255,255,0.12)" />
              <circle cx={cx + 8} cy="30" r="1.5" fill="rgba(255,255,255,0.08)" />
            </g>
          ))}
          <text x="80" y="70" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="6">
            Controlled temperature fermentation
          </text>
        </svg>
      );

    case 2: // Forming
      return (
        <svg viewBox="0 0 160 72" className="w-full" aria-hidden="true">
          {/* Roller */}
          <rect
            x="16" y="10" width="128" height="10" rx="5"
            fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"
          />
          {/* Flattened dough under roller */}
          <ellipse cx="80" cy="30" rx="40" ry="7" fill="#D97706" opacity="0.35" />
          {/* Diverge arrows */}
          <path
            d="M60 42 L38 56"
            stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round"
          />
          <path
            d="M100 42 L122 56"
            stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round"
          />
          {/* Round loaf */}
          <circle cx="34" cy="60" r="10" fill="#D97706" opacity="0.8" />
          <text x="34" y="63" textAnchor="middle" fill="white" fontSize="6" fontWeight="700">
            Round
          </text>
          {/* Square loaf */}
          <rect x="112" y="50" width="20" height="20" rx="3" fill="#D97706" opacity="0.8" />
          <text x="122" y="63" textAnchor="middle" fill="white" fontSize="6" fontWeight="700">
            Square
          </text>
          <text x="80" y="70" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="6">
            Switchable format per product
          </text>
        </svg>
      );

    case 3: // Baking
      return (
        <svg viewBox="0 0 160 72" className="w-full" aria-hidden="true">
          {/* Oven body */}
          <rect
            x="4" y="8" width="152" height="50" rx="5"
            fill="#7C1D07" opacity="0.5"
          />
          <rect
            x="4" y="8" width="152" height="50" rx="5"
            fill="none" stroke="#D97706" strokeWidth="1.5" opacity="0.5"
          />
          {/* Inner glow */}
          <ellipse cx="80" cy="33" rx="55" ry="22" fill="rgba(217,119,6,0.12)" />
          {/* Bread loaves */}
          <ellipse cx="32" cy="38" rx="16" ry="10" fill="#92400E" opacity="0.9" />
          <ellipse cx="80" cy="38" rx="16" ry="10" fill="#92400E" opacity="0.9" />
          <ellipse cx="128" cy="38" rx="16" ry="10" fill="#92400E" opacity="0.9" />
          {/* Heat rising lines */}
          <path d="M42 18 Q46 10 42 2" stroke="#D97706" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.45" />
          <path d="M80 16 Q84 8 80 0" stroke="#D97706" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.45" />
          <path d="M118 18 Q122 10 118 2" stroke="#D97706" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.45" />
          <text
            x="80" y="68" textAnchor="middle"
            fill="#D97706" fontSize="6" fontWeight="600" opacity="0.7"
          >
            High Temp Zone — gas or diesel
          </text>
        </svg>
      );

    case 4: // Cooling
      return (
        <svg viewBox="0 0 160 72" className="w-full" aria-hidden="true">
          {/* Belt */}
          <rect
            x="4" y="46" width="152" height="14" rx="4"
            fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"
          />
          {/* Cool air lines descending */}
          {[24, 56, 88, 120, 148].map((cx) => (
            <line
              key={cx}
              x1={cx} y1="4" x2={cx} y2="40"
              stroke="#93C5FD" strokeWidth="1"
              strokeDasharray="3 3" opacity="0.3"
            />
          ))}
          {/* Snowflake crosses */}
          {[24, 88, 148].map((cx) => (
            <g key={cx}>
              <line x1={cx} y1="2" x2={cx} y2="12" stroke="#93C5FD" strokeWidth="1.5" opacity="0.45" />
              <line x1={cx - 5} y1="7" x2={cx + 5} y2="7" stroke="#93C5FD" strokeWidth="1.5" opacity="0.45" />
            </g>
          ))}
          {/* Cooled loaves */}
          <ellipse cx="28" cy="40" rx="18" ry="10" fill="#D97706" opacity="0.45" />
          <ellipse cx="80" cy="40" rx="18" ry="10" fill="#D97706" opacity="0.55" />
          <ellipse cx="132" cy="40" rx="18" ry="10" fill="#D97706" opacity="0.65" />
          <text x="80" y="70" textAnchor="middle" fill="rgba(147,197,253,0.5)" fontSize="6">
            Output ready for packaging
          </text>
        </svg>
      );

    default:
      return null;
  }
}

export function HeroSection({ content }: { content: LandingContent }) {
  const { hero } = content;
  const panelRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [interactive, setInteractive] = useState(false);
  const [activeStage, setActiveStage] = useState(3); // Baking by default
  const [lockedStage, setLockedStage] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const desktop = window.matchMedia("(min-width: 1024px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setInteractive(desktop && !reduce);
  }, []);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!interactive) return;
    const el = panelRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setTilt({ x, y });
  }

  function handleLeave() {
    setTilt({ x: 0, y: 0 });
  }

  function handleStageHover(i: number) {
    if (lockedStage !== null) return;
    setActiveStage(i);
  }

  function handleStageClick(i: number) {
    if (lockedStage === i) {
      setLockedStage(null);
    } else {
      setLockedStage(i);
      setActiveStage(i);
    }
  }

  const layer = (depth: number) => ({
    transform: interactive
      ? `translate3d(${(-tilt.x * depth).toFixed(2)}px, ${(-tilt.y * depth).toFixed(2)}px, 0)`
      : undefined,
    transition: "transform 0.25s ease-out",
  });

  const isBaking = activeStage === 3;
  const isCooling = activeStage === 4;

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
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                >
                  <path
                    d="M3 8l3.5 3.5L13 4.5"
                    stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"
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

        {/*
          Right — interactive production stage simulator.
          NOTE: future video replacement must be muted+playsInline+loop, no autoplay audio.
        */}
        <div style={{ perspective: "1200px" }}>
          <div
            ref={panelRef}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            style={{
              transform: interactive
                ? `rotateY(${(tilt.x * 4).toFixed(2)}deg) rotateX(${(-tilt.y * 4).toFixed(2)}deg)`
                : undefined,
              transformStyle: "preserve-3d",
              transition: "transform 0.25s ease-out",
            }}
            className="relative flex h-[380px] flex-col gap-3 overflow-hidden rounded-2xl border-t-4 border-t-amber bg-navy p-5 shadow-lg md:h-[560px] md:p-7"
          >
            {/* Depth layer 1 — grid overlay */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
                ...layer(6),
              }}
            />

            {/* Depth layer 2 — stage-conditional ambient glow */}
            <div
              className={`pointer-events-none absolute left-[65%] top-[44%] h-44 w-44 rounded-full transition-all duration-500 ${isBaking ? "nl-glow" : ""}`}
              style={{
                background: isBaking
                  ? "radial-gradient(circle, rgba(217,119,6,0.55) 0%, rgba(217,119,6,0) 70%)"
                  : isCooling
                  ? "radial-gradient(circle, rgba(147,197,253,0.22) 0%, rgba(147,197,253,0) 70%)"
                  : "radial-gradient(circle, rgba(217,119,6,0.22) 0%, rgba(217,119,6,0) 70%)",
                ...layer(38),
              }}
            />

            {/* CE badge */}
            <div className="absolute right-4 top-4 z-20 rounded-full border border-amber bg-amber/20 px-3 py-1">
              <span className="text-micro font-semibold text-amber">CE Certified</span>
            </div>

            {/* Model badge */}
            <div className="relative z-10" style={layer(10)}>
              <p className="text-micro uppercase tracking-overline text-amber">Model</p>
              <p className="mt-0.5 text-h4 font-bold text-white md:text-h3">
                NL-RM210 / Steel Master
              </p>
              <p className="text-body-sm text-white/50">Custom Healthy Bread Production Line</p>
            </div>

            {/* Interactive stage selector */}
            <div className="relative z-10" style={layer(18)}>
              <p className="mb-2 text-[9px] font-medium uppercase tracking-widest text-white/35">
                Production Flow — select a stage
              </p>
              <div
                className="flex items-center gap-1"
                role="group"
                aria-label="Production stages"
              >
                {STAGES.map((stage, i) => {
                  const isActive = activeStage === i;
                  const isLocked = lockedStage === i;
                  return (
                    <div key={stage.name} className="flex items-center gap-1">
                      <button
                        type="button"
                        aria-pressed={isLocked}
                        aria-label={`${stage.name}${isLocked ? " — locked" : ""}`}
                        onMouseEnter={() => handleStageHover(i)}
                        onFocus={() => handleStageHover(i)}
                        onClick={() => handleStageClick(i)}
                        className={[
                          "flex flex-col items-center gap-0.5 rounded-lg border px-1.5 py-1.5 transition-all duration-200",
                          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber focus-visible:outline-offset-2",
                          isActive
                            ? "border-amber/50 bg-amber/10"
                            : "border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10",
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "flex h-7 w-7 items-center justify-center rounded-md text-[10px] font-bold transition-all duration-200",
                            isActive
                              ? isLocked
                                ? "nl-ring bg-amber text-navy"
                                : "nl-ring bg-amber/20 text-amber"
                              : "bg-white/10 text-white/50",
                          ].join(" ")}
                        >
                          {i + 1}
                        </span>
                        <span
                          className={[
                            "hidden text-[8px] font-medium leading-none transition-colors duration-200 sm:block",
                            isActive ? "text-amber/80" : "text-white/35",
                          ].join(" ")}
                        >
                          {stage.name}
                        </span>
                      </button>
                      {i < STAGES.length - 1 && (
                        <svg
                          className={`mb-3 shrink-0 transition-colors duration-300 ${
                            isActive ? "text-amber/40" : "text-white/15"
                          }`}
                          width="10" height="7" viewBox="0 0 14 8"
                        >
                          <path
                            d="M1 4h11M8 1l4 3-4 3"
                            stroke="currentColor" strokeWidth="1.5"
                            strokeLinecap="round" strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stage visual scene — hidden on smallest screens */}
            <div
              key={`scene-${activeStage}`}
              className="nl-fade-in relative z-10 hidden flex-1 sm:block"
              style={layer(22)}
              aria-live="polite"
              aria-atomic="true"
            >
              <StageScene index={activeStage} />
            </div>

            {/* Active stage detail card */}
            <div
              key={`detail-${activeStage}`}
              className="nl-fade-in relative z-10 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur"
              style={layer(14)}
            >
              <div className="flex items-start gap-2.5">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-amber/20 text-[10px] font-bold text-amber">
                  {activeStage + 1}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-body-sm font-semibold text-amber">
                      {STAGES[activeStage].name}
                    </span>
                    <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[8px] uppercase tracking-wide text-white/40">
                      {lockedStage === activeStage ? "Locked" : "Active Stage"}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-white/55">
                    {STAGES[activeStage].detail}
                  </p>
                </div>
              </div>
            </div>

            {/* Floating spec cards */}
            <div className="relative z-10 grid grid-cols-3 gap-1.5 md:gap-2" style={layer(26)}>
              {SPEC_CARDS.map((card, i) => (
                <div
                  key={card.label}
                  className="nl-float rounded-xl border border-white/15 bg-white/10 p-2 text-center backdrop-blur"
                  style={{ animationDelay: `${i * 0.6}s` }}
                >
                  <p className="text-[11px] font-bold text-amber md:text-body-sm">
                    {card.value}
                  </p>
                  <p className="mt-0.5 text-[9px] text-white/45 md:text-[10px]">
                    {card.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
