import type { LandingContent } from "@/content/types";

const BADGES = [
  { label: "Custom Manufacturing", icon: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" },
  { label: "CE Certified Machines", icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
  { label: "Flexible Capacity", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { label: "Round / Square Bread", icon: "M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" },
  { label: "20–30 cm Loaf Size", icon: "M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" },
  { label: "30–100 g Loaf Weight", icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" },
  { label: "Industrial Production Flow", icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" },
];

export function TrustBar({ content: _content }: { content: LandingContent }) {
  return (
    <section className="border-y border-steel-light bg-steel-pale">
      <div className="container-content py-5">
        <ul className="flex gap-3 overflow-x-auto pb-1 scrollbar-none md:flex-wrap md:justify-center md:overflow-visible">
          {BADGES.map(({ label, icon }) => (
            <li
              key={label}
              className="flex shrink-0 items-center gap-2.5 rounded-full border border-steel-light/80 bg-white px-4 py-2.5 shadow-shallow"
            >
              <svg
                className="shrink-0 text-amber"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d={icon} />
              </svg>
              <span className="whitespace-nowrap text-body-sm font-medium text-text-body">
                {label}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-center text-caption italic text-text-muted">
          Final specifications may vary depending on the approved configuration,
          loaf format, automation level, and site requirements.
        </p>
      </div>
    </section>
  );
}
