import { SectionHeader } from "./ui/SectionHeader";
import { ScaffoldNote } from "./ui/ScaffoldNote";
import type { LandingContent } from "@/content/types";

export function AddOnsSection({ content }: { content: LandingContent }) {
  return (
    <section id="addons" className="bg-white">
      <div className="container-content py-6xl">
        <SectionHeader intro={content.sections.addons} />
        <ScaffoldNote label="7 optional add-on cards (mixer, weighing, packing, sealing, counter, compressor, controls)" />
      </div>
    </section>
  );
}
