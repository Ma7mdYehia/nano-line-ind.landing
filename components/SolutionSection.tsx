import { CTAButton } from "./ui/CTAButton";
import { Reveal } from "@/components/ui/Reveal";
import type { LandingContent } from "@/content/types";

const BENEFITS = [
  {
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Higher Consistency",
    body: "Improve control over loaf weight, shape, and production flow across every batch.",
  },
  {
    icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4",
    title: "Lower Manual Handling",
    body: "Reduce unnecessary labor involvement across critical production stages.",
  },
  {
    icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",
    title: "Flexible Product Format",
    body: "Produce round or square bread based on the final configuration and market need.",
  },
  {
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    title: "Scalable Output",
    body: "Configure the line according to your current production target and future growth.",
  },
  {
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    title: "Better Production Flow",
    body: "Move product smoothly through cutting, proofing, forming, baking, and cooling.",
  },
  {
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    title: "Quotation Based on Real Needs",
    body: "Receive a customized quotation after technical review, not a generic price.",
  },
];

export function SolutionSection({ content }: { content: LandingContent }) {
  return (
    <section className="bg-off-white">
      <div className="container-content py-16 md:py-20">
        <Reveal>
          <div className="max-w-[640px]">
            <p className="overline mb-3">{content.sections.solution.overline}</p>
            <h2 className="text-h2 font-bold text-navy">
              {content.sections.solution.headline}
            </h2>
            <p className="mt-4 text-body-lg text-text-body">
              The NL-RM210 / Steel Master is an integrated industrial line for
              healthy bread production. It supports the full production journey —
              from dough dividing and proofing to forming, baking, and cooling.
            </p>
            <p className="mt-3 text-body text-text-body">
              Instead of forcing your product into a fixed setup, the line can
              be configured around your required loaf shape, size, weight,
              capacity, automation needs, and available factory space.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map(({ icon, title, body }, i) => (
            <Reveal key={title} delay={i * 70} className="h-full">
            <div
              className="group h-full rounded-xl border border-steel-light bg-white p-6 shadow-shallow transition-shadow hover:shadow-sm"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-light text-amber">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={icon} />
                </svg>
              </div>
              <h3 className="text-body font-semibold text-navy">{title}</h3>
              <p className="mt-2 text-body-sm text-text-body">{body}</p>
            </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10">
          <CTAButton href="#quotation" variant="secondary">
            Request a Technical Review
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
