import type { LandingContent } from "@/content/types";

const BADGES = [
  "Custom Manufacturing",
  "CE Certified Machines",
  "Flexible Capacity",
  "Round / Square Bread",
  "20–30 cm Loaf Size",
  "30–100 g Loaf Weight",
  "Industrial Production Flow",
];

export function TrustBar({ content }: { content: LandingContent }) {
  return (
    <section className="border-y border-steel-light bg-steel-pale">
      <div className="container-content py-6">
        <p className="mb-4 text-center text-body-sm text-text-muted">
          {content.sections.trustBar.headline}
        </p>
        <ul className="flex gap-3 overflow-x-auto pb-1 md:flex-wrap md:justify-center md:overflow-visible">
          {BADGES.map((badge) => (
            <li
              key={badge}
              className="flex shrink-0 items-center gap-2 rounded-full border border-steel-light bg-white px-4 py-2.5 text-body-sm font-medium text-text-body"
            >
              <span className="text-amber">●</span>
              {badge}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
