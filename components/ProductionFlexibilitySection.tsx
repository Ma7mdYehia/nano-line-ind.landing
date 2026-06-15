import { SectionHeader } from "./ui/SectionHeader";
import { ScaffoldNote } from "./ui/ScaffoldNote";
import type { LandingContent } from "@/content/types";

export function ProductionFlexibilitySection({
  content,
}: {
  content: LandingContent;
}) {
  return (
    <section id="flexibility" className="bg-white">
      <div className="container-content py-6xl">
        <SectionHeader intro={content.sections.flexibility} />
        <ScaffoldNote label="Round/Square toggle, bread render, loaf size/weight/capacity spec cards" />
      </div>
    </section>
  );
}
