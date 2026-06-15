"use client";

import { useEffect, useRef, useState } from "react";
import { CTAButton } from "./ui/CTAButton";
import type { LandingContent } from "@/content/types";

const SPEC_CARDS = [
  { value: "3,500–6,000", label: "loaves / hour", depth: 22 },
  { value: "Round or Square", label: "bread formats", depth: 14 },
  { value: "Built-to-Order", label: "manufacturing", depth: 30 },
];

const FLOW_STAGES = [
  { name: "Divider", hot: false },
  { name: "Proofer", hot: false },
  { name: "Forming", hot: false },
  { name: "Baking", hot: true },
  { name: "Cooling", hot: false },
];

/** Bread pieces travelling along the conveyor, staggered by animation-delay. */
const BREAD_PIECES = [0, 1.1, 2.2, 3.3];

export function HeroSection({ content }: { content: LandingContent }) {
  const { hero } = content;
  const panelRef = useRef<HTMLDivElement>(null);
  // Normalized pointer position (-1..1) relative to the panel centre.
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [interactive, setInteractive] = useState(false);

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

  // Depth helper: shift a layer opposite the tilt for parallax separation.
  const layer = (depth: number) => ({
    transform: interactive
      ? `translate3d(${(-tilt.x * depth).toFixed(2)}px, ${(-tilt.y * depth).toFixed(2)}px, 0)`
      : undefined,
    transition: "transform 0.25s ease-out",
  });

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

        {/*
          Right — layered industrial stage.
          NOTE (sound/video readiness): this CSS/SVG stage is the V1.2
          placeholder. If a hero video replaces it later, it MUST be rendered
          muted + playsInline + loop with NO autoplay sound; any audio is
          video-only and user-initiated. No website sound effects.
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
            className="relative flex h-[320px] flex-col justify-between overflow-hidden rounded-2xl border-t-4 border-t-amber bg-navy p-6 shadow-lg md:h-[540px] md:p-8"
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

            {/* Depth layer 2 — soft amber production glow */}
            <div
              className="nl-glow pointer-events-none absolute left-[68%] top-[46%] h-40 w-40 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(217,119,6,0.55) 0%, rgba(217,119,6,0) 70%)",
                ...layer(38),
              }}
            />

            {/* CE badge */}
            <div className="absolute right-5 top-5 z-20 rounded-full border border-amber bg-amber/20 px-3 py-1">
              <span className="text-micro font-semibold text-amber">CE Certified</span>
            </div>

            {/* Model badge */}
            <div className="relative z-10" style={layer(10)}>
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

            {/* Production flow + conveyor */}
            <div className="relative z-10" style={layer(18)}>
              {/* Flow stages */}
              <div className="hidden sm:block">
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
                              ? "nl-ring border border-amber/60 bg-amber/15 text-amber"
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

              {/* Conveyor belt with travelling bread pieces */}
              <div className="relative mt-4 h-7 overflow-hidden rounded-full border border-white/10 bg-white/5">
                <div className="nl-belt absolute inset-0 opacity-60" />
                {BREAD_PIECES.map((delay, i) => (
                  <span
                    key={i}
                    className="nl-bread absolute top-1/2 hidden h-3 w-5 -translate-y-1/2 rounded-full bg-gradient-to-b from-amber to-amber-dark shadow-sm sm:block"
                    style={{ animationDelay: `${delay}s` }}
                  />
                ))}
              </div>
            </div>

            {/* Floating spec cards */}
            <div className="relative z-10 grid grid-cols-3 gap-2 md:gap-3">
              {SPEC_CARDS.map((card, i) => (
                <div
                  key={card.label}
                  className="nl-float rounded-xl border border-white/15 bg-white/10 p-2.5 text-center backdrop-blur md:p-3"
                  style={{ animationDelay: `${i * 0.6}s`, ...layer(card.depth) }}
                >
                  <p className="text-body-sm font-bold text-amber md:text-body">
                    {card.value}
                  </p>
                  <p className="mt-0.5 text-[10px] text-white/50 md:text-[11px]">
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
