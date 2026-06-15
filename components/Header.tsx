"use client";

import { useState } from "react";
import Link from "next/link";
import { CTAButton } from "./ui/CTAButton";
import type { LandingContent } from "@/content/types";

export function Header({ content }: { content: LandingContent }) {
  const [open, setOpen] = useState(false);
  const { nav } = content;

  return (
    <header className="sticky top-0 z-50 border-b border-steel-light bg-white/95 backdrop-blur">
      <div className="container-content flex h-16 items-center justify-between">
        <Link href="/" className="text-h4 font-bold text-navy">
          Nano Line
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 lg:flex">
          {nav.items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-body-sm font-medium text-text-body transition-colors hover:text-navy"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <CTAButton
            href="#quotation"
            variant="primary"
            className="hidden !px-5 !py-2.5 !text-body-sm lg:inline-flex"
          >
            {nav.cta}
          </CTAButton>

          {/* Mobile hamburger */}
          <button
            className="rounded-md p-2 text-navy transition-colors hover:bg-steel-pale lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              {open ? (
                <>
                  <line x1="4" y1="4" x2="18" y2="18" />
                  <line x1="18" y1="4" x2="4" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="19" y2="6" />
                  <line x1="3" y1="11" x2="19" y2="11" />
                  <line x1="3" y1="16" x2="19" y2="16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-steel-light bg-white lg:hidden">
          <nav className="container-content flex flex-col py-2">
            {nav.items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-steel-light py-4 text-body font-medium text-text-body last:border-0"
              >
                {item.label}
              </a>
            ))}
            <div className="py-4">
              <CTAButton
                href="#quotation"
                variant="primary"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                {nav.cta}
              </CTAButton>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
