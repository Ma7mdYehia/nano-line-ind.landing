import { SectionHeader } from "./ui/SectionHeader";
import { ScaffoldNote } from "./ui/ScaffoldNote";
import type { LandingContent } from "@/content/types";

export function NoFixedPriceSection({ content }: { content: LandingContent }) {
  return (
    <section className="bg-navy">
      <div className="container-content py-6xl">
        <SectionHeader intro={content.sections.noFixedPrice} inverse />
        <ScaffoldNote
          label="Why-no-fixed-price copy + quotation variables graphic"
          inverse
        />
      </div>
    </section>
  );
}
