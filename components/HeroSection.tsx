"use client";

import { useEffect, useRef, useState } from "react";
import { CTAButton } from "./ui/CTAButton";
import type { LandingContent } from "@/content/types";

const SPEC_CARDS = [
  { value: "3,500–6,000", label: "loaves / hour" },
  { value: "Round or Square", label: "bread formats" },
  { value: "Built-to-Order", label: "manufacturing" },
];

const STAGES = [
  {
    name: "Divider",
    detail:
      "Portions bulk dough into equal-weight pieces — 30 to 100 g per piece, consistent across every batch.",
  },
  {
    name: "Proofer",
    detail:
      "Portioned pieces rest in a temperature-controlled chamber, developing volume and structure before forming.",
  },
  {
    name: "Forming",
    detail:
      "Sheeter and forming unit produces round or square loaves — format is switchable per product run.",
  },
  {
    name: "Baking",
    detail:
      "Gas or diesel chamber bakes loaves to a consistent golden crust at controlled temperature, batch after batch.",
  },
  {
    name: "Cooling",
    detail:
      "Baked loaves travel through cooling conveyors to reach packaging temperature, ready for counting or wrapping.",
  },
] as const;

/**
 * Technical line-art SVG scene for each production stage.
 * Industrial aesthetic: stroked geometry, amber accent for the active element,
 * monospace annotations. No filled blobs or cartoon shapes.
 */
function StageScene({ index }: { index: number }) {
  switch (index) {
    case 0: // Divider
      return (
        <svg
          viewBox="0 0 200 88"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          {/* Feed block */}
          <rect x="62" y="4" width="76" height="26" rx="2"
            fill="rgba(217,119,6,0.07)" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
          {/* Interior texture lines */}
          <line x1="68" y1="12" x2="132" y2="12" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
          <line x1="68" y1="20" x2="132" y2="20" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
          {/* Divider blade — amber, heavy */}
          <line x1="100" y1="30" x2="100" y2="60"
            stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M94 57 L100 67 L106 57 Z" fill="#D97706" />
          {/* Guide rails */}
          <line x1="14" y1="30" x2="14" y2="70" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <line x1="186" y1="30" x2="186" y2="70" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          {/* Left output block */}
          <rect x="14" y="70" width="70" height="14" rx="2"
            fill="rgba(217,119,6,0.08)" stroke="rgba(217,119,6,0.38)" strokeWidth="1" />
          {/* Right output block */}
          <rect x="116" y="70" width="70" height="14" rx="2"
            fill="rgba(217,119,6,0.08)" stroke="rgba(217,119,6,0.38)" strokeWidth="1" />
          {/* Weight annotations */}
          <text x="49" y="81" textAnchor="middle"
            fill="rgba(217,119,6,0.65)" fontSize="6.5" fontFamily="monospace">30–100 g</text>
          <text x="151" y="81" textAnchor="middle"
            fill="rgba(217,119,6,0.65)" fontSize="6.5" fontFamily="monospace">30–100 g</text>
          {/* Stage label */}
          <text x="100" y="88" textAnchor="middle"
            fill="rgba(255,255,255,0.18)" fontSize="5" letterSpacing="1.2" fontFamily="monospace">
            DOUGH DIVIDER
          </text>
        </svg>
      );

    case 1: // Proofer
      return (
        <svg
          viewBox="0 0 200 88"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          {/* Outer insulated wall */}
          <rect x="6" y="8" width="188" height="66" rx="3"
            fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
          {/* Inner chamber */}
          <rect x="13" y="15" width="174" height="52" rx="2"
            fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
          {/* Heating element — amber segmented bar */}
          <line x1="26" y1="25" x2="44" y2="25" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
          <line x1="50" y1="25" x2="68" y2="25" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
          <line x1="74" y1="25" x2="92" y2="25" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
          <line x1="98" y1="25" x2="116" y2="25" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
          <line x1="122" y1="25" x2="140" y2="25" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
          <line x1="146" y1="25" x2="164" y2="25" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
          <line x1="170" y1="25" x2="176" y2="25" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
          {/* Shelf rail */}
          <line x1="20" y1="58" x2="180" y2="58"
            stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          {/* Dough pieces — upright rectangles on shelf */}
          <rect x="36" y="44" width="24" height="14" rx="1"
            fill="rgba(217,119,6,0.14)" stroke="rgba(217,119,6,0.38)" strokeWidth="1" />
          <rect x="88" y="44" width="24" height="14" rx="1"
            fill="rgba(217,119,6,0.14)" stroke="rgba(217,119,6,0.38)" strokeWidth="1" />
          <rect x="140" y="44" width="24" height="14" rx="1"
            fill="rgba(217,119,6,0.14)" stroke="rgba(217,119,6,0.38)" strokeWidth="1" />
          {/* Heat circulation arrows */}
          {[48, 100, 152].map((cx) => (
            <g key={cx}>
              <line x1={cx} y1="42" x2={cx} y2="32"
                stroke="rgba(217,119,6,0.28)" strokeWidth="1" strokeDasharray="2 2" />
              <path d={`M${cx - 3} 34 L${cx} 29 L${cx + 3} 34`}
                fill="none" stroke="rgba(217,119,6,0.28)" strokeWidth="1" strokeLinecap="round" />
            </g>
          ))}
          {/* Stage label */}
          <text x="100" y="84" textAnchor="middle"
            fill="rgba(255,255,255,0.18)" fontSize="5" letterSpacing="1.2" fontFamily="monospace">
            TEMPERATURE-CONTROLLED PROOFER
          </text>
        </svg>
      );

    case 2: // Forming
      return (
        <svg
          viewBox="0 0 200 88"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          {/* Input dough block */}
          <rect x="74" y="4" width="52" height="16" rx="1"
            fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
          <line x1="74" y1="10" x2="126" y2="10" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          {/* Dough strip feeding in */}
          <rect x="82" y="20" width="36" height="10" rx="1"
            fill="rgba(217,119,6,0.18)" stroke="rgba(217,119,6,0.3)" strokeWidth="1" />
          {/* Sheeter roller — thick bar with amber nip line */}
          <rect x="10" y="30" width="180" height="10" rx="5"
            fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" />
          <line x1="10" y1="35" x2="190" y2="35"
            stroke="#D97706" strokeWidth="1" opacity="0.45" />
          {/* Roller end caps */}
          <rect x="6" y="30" width="6" height="10" rx="3" fill="rgba(255,255,255,0.18)" />
          <rect x="188" y="30" width="6" height="10" rx="3" fill="rgba(255,255,255,0.18)" />
          {/* Fork dividing paths */}
          <path d="M72 46 L38 64"
            stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M128 46 L162 64"
            stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" />
          {/* Round loaf */}
          <circle cx="34" cy="75" r="13"
            fill="rgba(217,119,6,0.1)" stroke="rgba(217,119,6,0.5)" strokeWidth="1.5" />
          <text x="34" y="79" textAnchor="middle"
            fill="rgba(217,119,6,0.72)" fontSize="5.5" fontWeight="700" fontFamily="monospace">ROUND</text>
          {/* Square loaf */}
          <rect x="149" y="62" width="26" height="26" rx="2"
            fill="rgba(217,119,6,0.1)" stroke="rgba(217,119,6,0.5)" strokeWidth="1.5" />
          <text x="162" y="79" textAnchor="middle"
            fill="rgba(217,119,6,0.72)" fontSize="5.5" fontWeight="700" fontFamily="monospace">SQUARE</text>
          {/* Stage label */}
          <text x="100" y="88" textAnchor="middle"
            fill="rgba(255,255,255,0.18)" fontSize="5" letterSpacing="1.2" fontFamily="monospace">
            SHEETER + FORMING UNIT
          </text>
        </svg>
      );

    case 3: // Baking Chamber
      return (
        <svg
          viewBox="0 0 200 88"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          {/* Outer shell */}
          <rect x="6" y="8" width="188" height="68" rx="3"
            fill="rgba(124,29,7,0.32)" stroke="rgba(217,119,6,0.38)" strokeWidth="1.5" />
          {/* Insulation inner wall */}
          <rect x="12" y="14" width="176" height="56" rx="2"
            fill="rgba(124,29,7,0.18)" stroke="rgba(217,119,6,0.14)" strokeWidth="1" />
          {/* Baking rack rail */}
          <line x1="22" y1="58" x2="178" y2="58"
            stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
          {/* Rack vertical supports */}
          {[40, 100, 160].map((x) => (
            <line key={x} x1={x} y1="58" x2={x} y2="68"
              stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          ))}
          {/* Baked loaves on rack — rounded rectangle silhouette */}
          <rect x="24" y="44" width="32" height="14" rx="7"
            fill="#92400E" stroke="rgba(217,119,6,0.42)" strokeWidth="1" />
          <rect x="84" y="44" width="32" height="14" rx="7"
            fill="#92400E" stroke="rgba(217,119,6,0.42)" strokeWidth="1" />
          <rect x="144" y="44" width="32" height="14" rx="7"
            fill="#92400E" stroke="rgba(217,119,6,0.42)" strokeWidth="1" />
          {/* Burner bar — amber, bottom of chamber */}
          <rect x="22" y="66" width="156" height="3" rx="1.5"
            fill="#D97706" opacity="0.55" />
          {/* Heat convection paths */}
          {[48, 100, 152].map((cx) => (
            <path key={cx}
              d={`M${cx} 64 Q${cx + 5} 54 ${cx} 44 Q${cx - 5} 34 ${cx} 24`}
              stroke="rgba(217,119,6,0.2)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          ))}
          {/* Stage label */}
          <text x="100" y="86" textAnchor="middle"
            fill="rgba(217,119,6,0.38)" fontSize="5" letterSpacing="1.2" fontFamily="monospace">
            HIGH-TEMP BAKING CHAMBER
          </text>
        </svg>
      );

    case 4: // Cooling Line
      return (
        <svg
          viewBox="0 0 200 88"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          {/* Left end roller */}
          <circle cx="16" cy="56" r="8"
            fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
          <circle cx="16" cy="56" r="3" fill="rgba(255,255,255,0.14)" />
          {/* Right end roller */}
          <circle cx="184" cy="56" r="8"
            fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
          <circle cx="184" cy="56" r="3" fill="rgba(255,255,255,0.14)" />
          {/* Top belt rail */}
          <line x1="24" y1="48" x2="176" y2="48"
            stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
          {/* Bottom belt rail */}
          <line x1="24" y1="64" x2="176" y2="64"
            stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          {/* Return run — dashed */}
          <line x1="24" y1="64" x2="176" y2="64"
            stroke="rgba(255,255,255,0.07)" strokeWidth="1" strokeDasharray="6 4" />
          {/* Loaves on belt — three, temperature gradient: hot amber → cool steel */}
          <rect x="30" y="37" width="30" height="11" rx="5.5"
            fill="#D97706" opacity="0.62" stroke="rgba(217,119,6,0.45)" strokeWidth="1" />
          <rect x="85" y="37" width="30" height="11" rx="5.5"
            fill="#D97706" opacity="0.32" stroke="rgba(217,119,6,0.28)" strokeWidth="1" />
          <rect x="140" y="37" width="30" height="11" rx="5.5"
            fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
          {/* Cool air — downward arrows, steel-blue */}
          {[45, 100, 155].map((cx) => (
            <g key={cx}>
              <line x1={cx} y1="12" x2={cx} y2="28"
                stroke="rgba(147,197,253,0.38)" strokeWidth="1.5" />
              <path d={`M${cx - 4} 25 L${cx} 31 L${cx + 4} 25`}
                fill="none" stroke="rgba(147,197,253,0.38)" strokeWidth="1.5" strokeLinecap="round" />
            </g>
          ))}
          {/* Flow direction marker */}
          <path d="M172 38 L182 38"
            stroke="rgba(255,255,255,0.22)" strokeWidth="1" markerEnd="url(#cool-arr)" />
          <defs>
            <marker id="cool-arr" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
              <path d="M0,0 L4,2 L0,4 Z" fill="rgba(255,255,255,0.22)" />
            </marker>
          </defs>
          {/* Stage label */}
          <text x="100" y="82" textAnchor="middle"
            fill="rgba(147,197,253,0.28)" fontSize="5" letterSpacing="1.2" fontFamily="monospace">
            COOLING CONVEYOR LINE
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
            className="relative flex h-[400px] flex-col gap-2.5 overflow-hidden rounded-2xl border-t-4 border-t-amber bg-navy p-5 shadow-lg md:h-[560px] md:gap-3 md:p-7"
          >
            {/* Grid overlay */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
                ...layer(6),
              }}
            />

            {/* Stage-conditional ambient glow */}
            <div
              className={`pointer-events-none absolute left-[65%] top-[44%] h-44 w-44 rounded-full transition-all duration-500 ${isBaking ? "nl-glow" : ""}`}
              style={{
                background: isBaking
                  ? "radial-gradient(circle, rgba(217,119,6,0.5) 0%, rgba(217,119,6,0) 70%)"
                  : isCooling
                  ? "radial-gradient(circle, rgba(147,197,253,0.18) 0%, rgba(147,197,253,0) 70%)"
                  : "radial-gradient(circle, rgba(217,119,6,0.18) 0%, rgba(217,119,6,0) 70%)",
                ...layer(38),
              }}
            />

            {/* CE badge */}
            <div className="absolute right-4 top-4 z-20 rounded-full border border-amber/50 bg-amber/15 px-3 py-1">
              <span className="text-micro font-semibold text-amber">CE Certified</span>
            </div>

            {/* Model identifier */}
            <div className="relative z-10" style={layer(10)}>
              <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-amber/80">
                Model
              </p>
              <p className="mt-0.5 text-[17px] font-bold leading-tight text-white md:text-h3">
                NL-RM210 / Steel Master
              </p>
              <p className="text-[11px] text-white/40">
                Custom Healthy Bread Production Line
              </p>
            </div>

            {/* Stage selector */}
            <div className="relative z-10" style={layer(18)}>
              <p className="mb-2 text-[8px] font-medium uppercase tracking-[0.14em] text-white/30">
                Production Flow
              </p>
              <div className="flex items-center gap-1" role="group" aria-label="Production stages">
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
                          "flex flex-col items-center gap-0.5 rounded-lg border px-1 py-1.5 transition-all duration-200",
                          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber focus-visible:outline-offset-2",
                          isActive
                            ? "border-amber/45 bg-amber/10"
                            : "border-white/10 bg-white/5 hover:border-white/22 hover:bg-white/8",
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "flex h-7 w-7 items-center justify-center rounded-md text-[10px] font-bold transition-all duration-200",
                            isActive
                              ? isLocked
                                ? "nl-ring bg-amber text-navy"
                                : "nl-ring bg-amber/20 text-amber"
                              : "bg-white/10 text-white/45",
                          ].join(" ")}
                        >
                          {i + 1}
                        </span>
                        <span
                          className={[
                            "hidden text-[8px] font-medium leading-none transition-colors duration-200 sm:block",
                            isActive ? "text-amber/75" : "text-white/30",
                          ].join(" ")}
                        >
                          {stage.name}
                        </span>
                      </button>
                      {i < STAGES.length - 1 && (
                        <svg
                          className={`mb-3 shrink-0 transition-colors duration-300 ${
                            isActive ? "text-amber/35" : "text-white/12"
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

            {/* Stage visual scene — hidden below sm */}
            <div
              key={`scene-${activeStage}`}
              className="nl-fade-in relative z-10 hidden min-h-0 flex-1 items-center sm:flex"
              style={layer(22)}
              aria-live="polite"
              aria-atomic="true"
            >
              <StageScene index={activeStage} />
            </div>

            {/* Active stage detail card — compact, left amber accent */}
            <div
              key={`detail-${activeStage}`}
              className="nl-fade-in relative z-10 flex overflow-hidden rounded-lg border border-white/10 bg-white/5"
              style={layer(14)}
            >
              <div className="w-[3px] shrink-0 bg-amber/55" />
              <div className="px-3 py-2.5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-amber/80">
                  {STAGES[activeStage].name}
                </p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-white/48">
                  {STAGES[activeStage].detail}
                </p>
              </div>
            </div>

            {/* Spec cards */}
            <div className="relative z-10 grid grid-cols-3 gap-1.5" style={layer(26)}>
              {SPEC_CARDS.map((card, i) => (
                <div
                  key={card.label}
                  className="nl-float rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-center"
                  style={{ animationDelay: `${i * 0.6}s` }}
                >
                  <p className="text-[10px] font-bold leading-tight text-amber">
                    {card.value}
                  </p>
                  <p className="mt-0.5 text-[8px] leading-tight text-white/38">
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
