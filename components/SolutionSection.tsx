import { SectionHeader } from "./ui/SectionHeader";
import { ScaffoldNote } from "./ui/ScaffoldNote";
import type { LandingContent } from "@/content/types";

export function SolutionSection({ content }: { content: LandingContent }) {
  return (
    <section className="bg-off-white">
      <div className="container-content py-6xl">
        <SectionHeader intro={content.sections.solution} />
        <ScaffoldNote label="Solution copy + 6 benefit cards + process strip" />
      </div>
    </section>
  );
}
