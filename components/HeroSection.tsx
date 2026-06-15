import { CTAButton } from "./ui/CTAButton";
import { ScaffoldNote } from "./ui/ScaffoldNote";
import type { LandingContent } from "@/content/types";

export function HeroSection({ content }: { content: LandingContent }) {
  const { hero } = content;
  return (
    <section id="overview" className="bg-white">
      <div className="container-content grid items-center gap-2xl py-6xl md:grid-cols-2 md:py-8xl">
        <div>
          <span className="inline-block rounded-md border border-amber bg-amber-light px-3 py-1 text-micro font-medium text-amber">
            {hero.badge}
          </span>
          <h1 className="mt-4 text-h2 font-bold text-navy md:text-display">
            {hero.headline}
          </h1>
          <p className="mt-5 max-w-[560px] text-body-lg text-text-body">
            {hero.subheadline}
          </p>
          <ul className="mt-6 space-y-2">
            {hero.bullets.map((b) => (
              <li key={b} className="flex gap-2 text-body-sm text-text-body">
                <span className="mt-1 text-amber">▸</span>
                <span>{b}</span>
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
          <p className="mt-6 max-w-[480px] text-caption text-text-muted">
            {hero.trustText}
          </p>
        </div>

        <div>
          <ScaffoldNote label="Hero production-line visual + floating spec cards" />
        </div>
      </div>
    </section>
  );
}
