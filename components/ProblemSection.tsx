import { SectionHeader } from "./ui/SectionHeader";
import { ScaffoldNote } from "./ui/ScaffoldNote";
import type { LandingContent } from "@/content/types";

export function ProblemSection({ content }: { content: LandingContent }) {
  return (
    <section className="bg-white">
      <div className="container-content py-6xl">
        <SectionHeader intro={content.sections.problem} />
        <ScaffoldNote label="Problem copy, pain-point cards, split comparison visual" />
      </div>
    </section>
  );
}
