import Link from "next/link";
import type { ReactNode } from "react";

/** Button variants from Session 5 §7. */
export type CTAVariant =
  | "primary" // amber
  | "secondary" // navy outline
  | "secondary-inverse" // white outline (on dark)
  | "whatsapp"
  | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px]";

const variants: Record<CTAVariant, string> = {
  primary: "bg-amber text-white hover:bg-amber-dark active:bg-amber-darker px-7 py-3.5 text-base",
  secondary:
    "border-2 border-navy text-navy hover:bg-navy hover:text-white px-7 py-3 text-base",
  "secondary-inverse":
    "border-2 border-white text-white hover:bg-white hover:text-navy px-7 py-3 text-base",
  whatsapp: "bg-whatsapp text-white hover:opacity-90 px-7 py-3.5 text-base",
  ghost: "text-amber hover:text-amber-dark hover:underline px-0 py-2 text-body-sm",
};

interface CTAButtonProps {
  variant?: CTAVariant;
  href?: string;
  children: ReactNode;
  className?: string;
}

export function CTAButton({
  variant = "primary",
  href,
  children,
  className = "",
}: CTAButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes}>
      {children}
    </button>
  );
}
