import { SectionHeader } from "./ui/SectionHeader";
import { ScaffoldNote } from "./ui/ScaffoldNote";
import { LEAD_TIME } from "@/lib/constants";
import type { LandingContent } from "@/content/types";

export function ManufacturingTimeline({
  content,
}: {
  content: LandingContent;
}) {
  return (
    <section className="bg-off-white">
      <div className="container-content py-6xl">
        <SectionHeader intro={content.sections.manufacturing} />
        <div className="mt-6 rounded-lg border-l-4 border-amber bg-slate p-4 text-body text-white">
          Average manufacturing and preparation lead time is approximately{" "}
          {LEAD_TIME.MIN_DAYS} to {LEAD_TIME.MAX_DAYS} days, depending on the
          final approved configuration.
        </div>
        <ScaffoldNote label="5-step built-to-order timeline (horizontal desktop / vertical mobile)" />
      </div>
    </section>
  );
}
