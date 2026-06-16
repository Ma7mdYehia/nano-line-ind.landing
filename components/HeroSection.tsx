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
 * Industrial aesthetic: stroked geometry, rails, chambers, rollers and
 * conveyors, with amber as the single active accent and monospace
 * annotations. No filled blobs, no cartoon shapes.
 */
function StageScene({ index }: { index: number }) {
  switch (index) {
    case 0: // Divider — intake hopper, cutting blade, equal portion outputs
      return (
        <svg
          viewBox="0 0 200 84"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          {/* Guide rails */}
          <line x1="12" y1="6" x2="12" y2="64" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          <line x1="188" y1="6" x2="188" y2="64" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          {/* Intake hopper — narrows toward the blade */}
          <path d="M70 6 L130 6 L112 26 L88 26 Z"
            fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" strokeLinejoin="round" />
          <line x1="84" y1="13" x2="116" y2="13" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
          {/* Divider blade — amber, heavy, with tip */}
          <line x1="100" y1="26" x2="100" y2="48" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M95 45 L100 53 L105 45 Z" fill="#D97706" />
          {/* Split paths to the two outputs */}
          <path d="M94 50 Q70 56 50 60" stroke="rgba(217,119,6,0.3)" strokeWidth="1" fill="none" strokeLinecap="round" />
          <path d="M106 50 Q130 56 150 60" stroke="rgba(217,119,6,0.3)" strokeWidth="1" fill="none" strokeLinecap="round" />
          {/* Equal-weight output blocks */}
          <rect x="18" y="60" width="64" height="13" rx="2"
            fill="rgba(217,119,6,0.08)" stroke="rgba(217,119,6,0.4)" strokeWidth="1" />
          <rect x="118" y="60" width="64" height="13" rx="2"
            fill="rgba(217,119,6,0.08)" stroke="rgba(217,119,6,0.4)" strokeWidth="1" />
          {/* Weight annotations */}
          <text x="50" y="69" textAnchor="middle" fill="rgba(217,119,6,0.7)" fontSize="6.5" fontFamily="monospace">30–100 g</text>
          <text x="150" y="69" textAnchor="middle" fill="rgba(217,119,6,0.7)" fontSize="6.5" fontFamily="monospace">30–100 g</text>
          {/* Schematic label */}
          <text x="100" y="82" textAnchor="middle" fill="rgba(255,255,255,0.16)" fontSize="5" letterSpacing="1.2" fontFamily="monospace">
            DOUGH DIVIDER · PORTION CONTROL
          </text>
        </svg>
      );

    case 1: // Proofer — insulated chamber, heating element, temp gauge
      return (
        <svg
          viewBox="0 0 200 84"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          {/* Outer insulated wall */}
          <rect x="6" y="6" width="188" height="62" rx="3" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
          {/* Inner chamber */}
          <rect x="12" y="12" width="176" height="50" rx="2" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
          {/* Heating element — segmented amber coil along the top */}
          {[24, 48, 72, 96, 120, 144].map((x) => (
            <line key={x} x1={x} y1="22" x2={x + 18} y2="22" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />
          ))}
          {/* Temperature gauge — small dial, top right inside chamber */}
          <circle cx="172" cy="24" r="8" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
          <line x1="172" y1="24" x2="176" y2="20" stroke="#D97706" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="172" cy="24" r="1.2" fill="#D97706" />
          {/* Shelf rail */}
          <line x1="18" y1="54" x2="160" y2="54" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          {/* Dough pieces resting on shelf */}
          {[34, 84, 134].map((x) => (
            <rect key={x} x={x} y="40" width="24" height="14" rx="2"
              fill="rgba(217,119,6,0.14)" stroke="rgba(217,119,6,0.4)" strokeWidth="1" />
          ))}
          {/* Heat circulation arrows */}
          {[46, 96, 146].map((cx) => (
            <g key={cx}>
              <line x1={cx} y1="38" x2={cx} y2="28" stroke="rgba(217,119,6,0.28)" strokeWidth="1" strokeDasharray="2 2" />
              <path d={`M${cx - 3} 30 L${cx} 26 L${cx + 3} 30`} fill="none" stroke="rgba(217,119,6,0.28)" strokeWidth="1" strokeLinecap="round" />
            </g>
          ))}
          {/* Schematic label */}
          <text x="100" y="80" textAnchor="middle" fill="rgba(255,255,255,0.16)" fontSize="5" letterSpacing="1.2" fontFamily="monospace">
            TEMPERATURE-CONTROLLED PROOFER
          </text>
        </svg>
      );

    case 2: // Forming — sheeter rollers, forked output to round / square
      return (
        <svg
          viewBox="0 0 200 84"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          {/* Incoming dough strip */}
          <rect x="80" y="4" width="40" height="9" rx="1" fill="rgba(217,119,6,0.18)" stroke="rgba(217,119,6,0.3)" strokeWidth="1" />
          {/* Sheeter roller pair — two stacked bars with amber nip line */}
          <rect x="10" y="18" width="180" height="9" rx="4.5" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" />
          <line x1="14" y1="29.5" x2="186" y2="29.5" stroke="#D97706" strokeWidth="1.5" opacity="0.5" />
          <rect x="10" y="32" width="180" height="9" rx="4.5" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
          {/* Roller end caps (axles) */}
          <circle cx="10" cy="22.5" r="3.5" fill="rgba(255,255,255,0.18)" />
          <circle cx="190" cy="22.5" r="3.5" fill="rgba(255,255,255,0.18)" />
          {/* Forked output paths */}
          <path d="M78 46 Q56 52 42 60" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M122 46 Q144 52 158 60" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Round loaf output */}
          <circle cx="40" cy="68" r="12" fill="rgba(217,119,6,0.1)" stroke="rgba(217,119,6,0.5)" strokeWidth="1.5" />
          <text x="40" y="71" textAnchor="middle" fill="rgba(217,119,6,0.72)" fontSize="5.5" fontWeight="700" fontFamily="monospace">ROUND</text>
          {/* Square loaf output */}
          <rect x="146" y="56" width="24" height="24" rx="2" fill="rgba(217,119,6,0.1)" stroke="rgba(217,119,6,0.5)" strokeWidth="1.5" />
          <text x="158" y="71" textAnchor="middle" fill="rgba(217,119,6,0.72)" fontSize="5.5" fontWeight="700" fontFamily="monospace">SQUARE</text>
          {/* Schematic label */}
          <text x="100" y="82" textAnchor="middle" fill="rgba(255,255,255,0.16)" fontSize="5" letterSpacing="1.2" fontFamily="monospace">
            SHEETER + FORMING UNIT
          </text>
        </svg>
      );

    case 3: // Baking — insulated chamber, rack, burner bar, convection
      return (
        <svg
          viewBox="0 0 200 84"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          {/* Outer shell */}
          <rect x="6" y="6" width="188" height="64" rx="3" fill="rgba(124,29,7,0.3)" stroke="rgba(217,119,6,0.4)" strokeWidth="1.5" />
          {/* Inner insulation wall */}
          <rect x="12" y="12" width="176" height="52" rx="2" fill="rgba(124,29,7,0.16)" stroke="rgba(217,119,6,0.14)" strokeWidth="1" />
          {/* Temperature gauge — top right */}
          <circle cx="172" cy="22" r="8" fill="none" stroke="rgba(217,119,6,0.35)" strokeWidth="1" />
          <line x1="172" y1="22" x2="177" y2="19" stroke="#D97706" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="172" cy="22" r="1.2" fill="#D97706" />
          {/* Baking rack rail + supports */}
          <line x1="20" y1="54" x2="150" y2="54" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
          {[36, 86, 136].map((x) => (
            <line key={x} x1={x} y1="54" x2={x} y2="62" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          ))}
          {/* Loaves on rack */}
          {[22, 72, 122].map((x) => (
            <rect key={x} x={x} y="40" width="30" height="14" rx="7"
              fill="#92400E" stroke="rgba(217,119,6,0.42)" strokeWidth="1" />
          ))}
          {/* Burner bar at chamber floor */}
          <rect x="20" y="62" width="148" height="3" rx="1.5" fill="#D97706" opacity="0.5" />
          {/* Convection paths rising through the rack */}
          {[37, 87, 137].map((cx) => (
            <path key={cx} d={`M${cx} 60 Q${cx + 5} 50 ${cx} 40 Q${cx - 5} 32 ${cx} 24`}
              stroke="rgba(217,119,6,0.2)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          ))}
          {/* Schematic label */}
          <text x="100" y="80" textAnchor="middle" fill="rgba(217,119,6,0.35)" fontSize="5" letterSpacing="1.2" fontFamily="monospace">
            HIGH-TEMP BAKING CHAMBER
          </text>
        </svg>
      );

    case 4: // Cooling — conveyor with end rollers, temp-gradient loaves, cool air
      return (
        <svg
          viewBox="0 0 200 84"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          {/* End rollers */}
          <circle cx="16" cy="54" r="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
          <circle cx="16" cy="54" r="2.6" fill="rgba(255,255,255,0.14)" />
          <circle cx="184" cy="54" r="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
          <circle cx="184" cy="54" r="2.6" fill="rgba(255,255,255,0.14)" />
          {/* Belt rails */}
          <line x1="24" y1="46" x2="176" y2="46" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
          <line x1="24" y1="62" x2="176" y2="62" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          {/* Return run, dashed */}
          <line x1="24" y1="62" x2="176" y2="62" stroke="rgba(255,255,255,0.07)" strokeWidth="1" strokeDasharray="6 4" />
          {/* Loaves cooling along belt — amber (hot) → steel (cool) */}
          <rect x="30" y="35" width="30" height="11" rx="5.5" fill="#D97706" opacity="0.6" stroke="rgba(217,119,6,0.45)" strokeWidth="1" />
          <rect x="85" y="35" width="30" height="11" rx="5.5" fill="#D97706" opacity="0.3" stroke="rgba(217,119,6,0.28)" strokeWidth="1" />
          <rect x="140" y="35" width="30" height="11" rx="5.5" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
          {/* Cool-air downflow arrows, steel-blue */}
          {[45, 100, 155].map((cx) => (
            <g key={cx}>
              <line x1={cx} y1="8" x2={cx} y2="24" stroke="rgba(147,197,253,0.4)" strokeWidth="1.5" />
              <path d={`M${cx - 4} 21 L${cx} 27 L${cx + 4} 21`} fill="none" stroke="rgba(147,197,253,0.4)" strokeWidth="1.5" strokeLinecap="round" />
            </g>
          ))}
          {/* Flow direction marker */}
          <path d="M172 40 L182 40" stroke="rgba(255,255,255,0.22)" strokeWidth="1" markerEnd="url(#cool-arr)" />
          <defs>
            <marker id="cool-arr" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
              <path d="M0,0 L4,2 L0,4 Z" fill="rgba(255,255,255,0.22)" />
            </marker>
          </defs>
          {/* Schematic label */}
          <text x="100" y="80" textAnchor="middle" fill="rgba(147,197,253,0.3)" fontSize="5" letterSpacing="1.2" fontFamily="monospace">
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
  const isLocked = lockedStage === activeStage;

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
            className="relative flex h-[440px] flex-col gap-3 overflow-hidden rounded-2xl border-t-4 border-t-amber bg-navy p-5 shadow-lg md:h-[560px] md:p-7"
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
              className={`pointer-events-none absolute left-[65%] top-[46%] h-44 w-44 rounded-full transition-all duration-500 ${isBaking ? "nl-glow" : ""}`}
              style={{
                background: isBaking
                  ? "radial-gradient(circle, rgba(217,119,6,0.45) 0%, rgba(217,119,6,0) 70%)"
                  : isCooling
                  ? "radial-gradient(circle, rgba(147,197,253,0.16) 0%, rgba(147,197,253,0) 70%)"
                  : "radial-gradient(circle, rgba(217,119,6,0.16) 0%, rgba(217,119,6,0) 70%)",
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
                  const active = activeStage === i;
                  const locked = lockedStage === i;
                  return (
                    <div key={stage.name} className="flex items-center gap-1">
                      <button
                        type="button"
                        aria-pressed={locked}
                        aria-label={`${stage.name}${locked ? " — selected" : ""}`}
                        onMouseEnter={() => handleStageHover(i)}
                        onFocus={() => handleStageHover(i)}
                        onClick={() => handleStageClick(i)}
                        className={[
                          "flex flex-col items-center gap-0.5 rounded-lg border px-1 py-1.5 transition-all duration-200",
                          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber focus-visible:outline-offset-2",
                          active
                            ? "border-amber/45 bg-amber/10"
                            : "border-white/10 bg-white/5 hover:border-white/22 hover:bg-white/[0.08]",
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "flex h-7 w-7 items-center justify-center rounded-md text-[10px] font-bold transition-all duration-200",
                            locked
                              ? "nl-ring bg-amber text-navy"
                              : active
                              ? "bg-amber/20 text-amber"
                              : "bg-white/10 text-white/45",
                          ].join(" ")}
                        >
                          {i + 1}
                        </span>
                        <span
                          className={[
                            "hidden text-[8px] font-medium leading-none transition-colors duration-200 sm:block",
                            active ? "text-amber/75" : "text-white/30",
                          ].join(" ")}
                        >
                          {stage.name}
                        </span>
                      </button>
                      {i < STAGES.length - 1 && (
                        <svg
                          className={`mb-3 shrink-0 transition-colors duration-300 ${
                            active ? "text-amber/35" : "text-white/[0.12]"
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

            {/* Technical viewport — schematic chrome around the live scene */}
            <div
              className="relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-white/10 bg-black/15"
              style={layer(22)}
            >
              {/* Viewport status bar */}
              <div className="flex items-center justify-between border-b border-white/[0.06] px-2.5 py-1.5">
                <span className="text-[8px] font-medium uppercase tracking-[0.12em] text-white/30">
                  {`Stage 0${activeStage + 1} / 0${STAGES.length}`}
                </span>
                <span className="flex items-center gap-1.5">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      isLocked ? "bg-amber" : "bg-white/40"
                    }`}
                  />
                  <span
                    className={`text-[8px] font-medium uppercase tracking-[0.12em] ${
                      isLocked ? "text-amber/70" : "text-white/30"
                    }`}
                  >
                    {isLocked ? "Selected" : "Preview"}
                  </span>
                </span>
              </div>

              {/* Live scene */}
              <div
                key={`scene-${activeStage}`}
                className="nl-fade-in flex min-h-0 flex-1 items-center px-3 py-2"
                aria-live="polite"
                aria-atomic="true"
              >
                <StageScene index={activeStage} />
              </div>

              {/* Corner ticks */}
              <span className="pointer-events-none absolute left-1.5 top-1.5 h-1.5 w-1.5 border-l border-t border-amber/30" />
              <span className="pointer-events-none absolute right-1.5 top-1.5 h-1.5 w-1.5 border-r border-t border-amber/30" />
              <span className="pointer-events-none absolute bottom-1.5 left-1.5 h-1.5 w-1.5 border-b border-l border-amber/30" />
              <span className="pointer-events-none absolute bottom-1.5 right-1.5 h-1.5 w-1.5 border-b border-r border-amber/30" />
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

            {/* Spec cards — static, supporting role */}
            <div className="relative z-10 grid grid-cols-3 gap-1.5" style={layer(26)}>
              {SPEC_CARDS.map((card) => (
                <div
                  key={card.label}
                  className="rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-center"
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
