import { SectionHeader } from "./ui/SectionHeader";
import { ScaffoldNote } from "./ui/ScaffoldNote";
import type { LandingContent } from "@/content/types";

export function ProductionStagesSection({
  content,
}: {
  content: LandingContent;
}) {
  return (
    <section id="stages" className="bg-navy">
      <div className="container-content py-6xl">
        <SectionHeader intro={content.sections.stages} inverse />
        <ScaffoldNote
          label="9-stage timeline: sticky left nav + changing visual (desktop), accordion (mobile)"
          inverse
        />
      </div>
    </section>
  );
}
