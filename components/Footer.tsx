import type { LandingContent } from "@/content/types";

export function Footer({ content }: { content: LandingContent }) {
  return (
    <footer className="bg-navy">
      <div className="container-content py-5xl">
        <div className="flex flex-col gap-6 border-b border-slate pb-8 md:flex-row md:justify-between">
          <div className="max-w-[360px]">
            <span className="text-h4 font-bold text-white">Nano Line</span>
            <p className="mt-3 text-body-sm text-text-muted">
              {content.footer.description}
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-2">
            {content.nav.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-body-sm text-steel-light hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <p className="pt-6 text-caption text-text-muted">
          {content.footer.legal}
        </p>
      </div>
    </footer>
  );
}
