import { CTAButton } from "./ui/CTAButton";
import { Reveal } from "@/components/ui/Reveal";
import type { LandingContent } from "@/content/types";

const PAIN_POINTS = [
  {
    title: "Inconsistent loaf weight and shape",
    detail:
      "Manual or semi-manual production makes it difficult to maintain consistent loaf weight and shape at industrial scale.",
  },
  {
    title: "Higher waste from unstable forming",
    detail:
      "Uncontrolled cutting, forming, and handling increases product waste and reduces yield per batch.",
  },
  {
    title: "Limited bread format flexibility",
    detail:
      "Fixed setups cannot easily switch between round and square bread or accommodate different loaf sizes.",
  },
  {
    title: "Pressure during high-volume demand",
    detail:
      "Production teams face bottlenecks when demand spikes and manual capacity cannot keep pace.",
  },
  {
    title: "Need for consistent industrial quality",
    detail:
      "Modern healthy bread markets require consistent quality and presentation that only industrial automation can reliably deliver.",
  },
];

export function ProblemSection({ content }: { content: LandingContent }) {
  return (
    <section className="bg-white">
      <div className="container-content py-16 md:py-20">
        {/* Header */}
        <Reveal>
          <div className="max-w-[600px]">
            <p className="overline mb-3">{content.sections.problem.overline}</p>
            <h2 className="text-h2 font-bold text-navy">
              {content.sections.problem.headline}
            </h2>
            <p className="mt-4 text-body-lg text-text-body">
              Modern bakery markets are changing fast. Customers may need
              different loaf sizes, different weights, different shapes, and
              higher daily production volumes. Traditional or fixed production
              setups can limit your ability to respond to demand.
            </p>
            <p className="mt-3 text-body text-text-body">
              The NL-RM210 helps solve this by giving your factory a configurable
              production line designed around your product, your output target,
              and your growth plan.
            </p>
          </div>
        </Reveal>

        {/* Pain points + visual */}
        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
          <Reveal>
          <ul className="space-y-4">
            {PAIN_POINTS.map(({ title, detail }) => (
              <li
                key={title}
                className="rounded-lg border-l-4 border-amber bg-steel-pale p-5"
              >
                <h3 className="text-body font-semibold text-navy">{title}</h3>
                <p className="mt-1 text-body-sm text-text-body">{detail}</p>
              </li>
            ))}
          </ul>
          </Reveal>

          {/* Comparison visual */}
          <Reveal delay={120}>
          <div className="flex flex-col gap-5">
            <div className="overflow-hidden rounded-xl border border-steel-light">
              <div className="bg-steel-pale px-5 py-3">
                <p className="text-body-sm font-semibold text-steel">
                  Without a Configured Line
                </p>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-8 items-end gap-1.5" style={{ height: "90px" }}>
                  {[28, 72, 44, 85, 32, 68, 50, 78].map((h, i) => (
                    <div
                      key={i}
                      className="w-full rounded-sm bg-steel"
                      style={{ height: `${h}px` }}
                    />
                  ))}
                </div>
                <div className="mt-1 grid grid-cols-8 gap-1.5">
                  {[1,2,3,4,5,6,7,8].map((n) => (
                    <span key={n} className="text-center text-[9px] text-text-muted">B{n}</span>
                  ))}
                </div>
                <p className="mt-2 text-caption text-text-muted">
                  Inconsistent output — varied loaf size, weight, and shape.
                </p>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-amber/30">
              <div className="bg-amber-light px-5 py-3">
                <p className="text-body-sm font-semibold text-amber-dark">
                  With the NL-RM210
                </p>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-8 items-end gap-1.5" style={{ height: "90px" }}>
                  {[60, 60, 60, 60, 60, 60, 60, 60].map((h, i) => (
                    <div
                      key={i}
                      className="w-full rounded-sm bg-amber/60"
                      style={{ height: `${h}px` }}
                    />
                  ))}
                </div>
                <div className="mt-1 grid grid-cols-8 gap-1.5">
                  {[1,2,3,4,5,6,7,8].map((n) => (
                    <span key={n} className="text-center text-[9px] text-text-muted">B{n}</span>
                  ))}
                </div>
                <p className="mt-2 text-caption text-text-muted">
                  Consistent industrial output — controlled weight, shape, and
                  flow.
                </p>
              </div>
            </div>

            <CTAButton href="#flexibility" variant="ghost" className="self-start">
              Build a Line Around Your Product →
            </CTAButton>
          </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
