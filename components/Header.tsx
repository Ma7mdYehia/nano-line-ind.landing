import { CTAButton } from "./ui/CTAButton";
import type { LandingContent } from "@/content/types";

export function Header({ content }: { content: LandingContent }) {
  const { nav } = content;
  return (
    <header className="sticky top-0 z-50 border-b border-steel-light bg-white/95 backdrop-blur">
      <div className="container-content flex h-16 items-center justify-between">
        <span className="text-h4 font-bold text-navy">Nano Line</span>

        <nav className="hidden items-center gap-6 lg:flex">
          {nav.items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-body-sm text-text-body transition-colors hover:text-navy"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <CTAButton href="#quotation" variant="primary" className="!px-5 !py-2.5 !text-body-sm">
          {nav.cta}
        </CTAButton>
      </div>
    </header>
  );
}
