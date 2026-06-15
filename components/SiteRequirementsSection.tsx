import { SectionHeader } from "./ui/SectionHeader";
import { ScaffoldNote } from "./ui/ScaffoldNote";
import type { LandingContent } from "@/content/types";

export function SiteRequirementsSection({
  content,
}: {
  content: LandingContent;
}) {
  return (
    <section id="site" className="bg-white">
      <div className="container-content py-6xl">
        <SectionHeader intro={content.sections.site} />
        <ScaffoldNote label="Requirement cards + 8 × 22 m factory layout diagram" />
      </div>
    </section>
  );
}
