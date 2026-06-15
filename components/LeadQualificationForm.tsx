import { SectionHeader } from "./ui/SectionHeader";
import { ScaffoldNote } from "./ui/ScaffoldNote";
import type { LandingContent } from "@/content/types";

export function LeadQualificationForm({
  content,
}: {
  content: LandingContent;
}) {
  return (
    <section id="quotation" className="bg-steel-pale">
      <div className="container-content py-6xl">
        <SectionHeader intro={content.leadForm.intro} />
        <ScaffoldNote label="5-step lead form + live summary panel + prefill from calculator (Session 6 §8–§14)" />
      </div>
    </section>
  );
}
