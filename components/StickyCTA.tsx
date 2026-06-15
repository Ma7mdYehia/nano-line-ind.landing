"use client";

import { useEffect, useState } from "react";
import { CTAButton } from "./ui/CTAButton";

/**
 * Mobile sticky bottom CTA bar (Session 5 §12.2). Appears after the user
 * scrolls past the hero.
 */
export function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex gap-3 border-t border-steel-light bg-white px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] lg:hidden">
      <div className="absolute inset-x-0 top-0 h-0.5 bg-amber" />
      <CTAButton href="#quotation" variant="primary" className="flex-1 !py-3">
        Get Quotation
      </CTAButton>
      <CTAButton href="#" variant="whatsapp" className="flex-1 !py-3">
        Chat on WhatsApp
      </CTAButton>
    </div>
  );
}
