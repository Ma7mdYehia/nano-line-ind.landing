import type { SectionIntro } from "@/content/types";

interface SectionHeaderProps {
  intro: SectionIntro;
  /** Use light text on dark backgrounds (Session 5 §1.6). */
  inverse?: boolean;
  align?: "left" | "center";
}

export function SectionHeader({
  intro,
  inverse = false,
  align = "left",
}: SectionHeaderProps) {
  return (
    <header className={align === "center" ? "text-center" : ""}>
      <p className="overline mb-3">{intro.overline}</p>
      <h2
        className={`text-h3 md:text-h2 ${inverse ? "text-white" : "text-navy"}`}
      >
        {intro.headline}
      </h2>
      {intro.copy ? (
        <p
          className={`mt-4 max-w-[640px] text-body-lg ${
            inverse ? "text-steel-light" : "text-text-body"
          } ${align === "center" ? "mx-auto" : ""}`}
        >
          {intro.copy}
        </p>
      ) : null}
    </header>
  );
}
