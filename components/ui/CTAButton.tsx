import Link from "next/link";
import type { ReactNode } from "react";

export type CTAVariant =
  | "primary"
  | "secondary"
  | "secondary-inverse"
  | "whatsapp"
  | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<CTAVariant, string> = {
  primary:
    "bg-amber text-white hover:bg-amber-dark active:bg-amber-darker px-7 py-3.5 text-base",
  secondary:
    "border-2 border-navy text-navy hover:bg-navy hover:text-white px-7 py-3 text-base",
  "secondary-inverse":
    "border-2 border-white text-white hover:bg-white hover:text-navy px-7 py-3 text-base",
  whatsapp: "bg-whatsapp text-white hover:opacity-90 px-7 py-3.5 text-base",
  ghost:
    "text-amber hover:text-amber-dark hover:underline px-0 py-2 text-body-sm",
};

interface CTAButtonProps {
  variant?: CTAVariant;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  children: ReactNode;
  className?: string;
}

export function CTAButton({
  variant = "primary",
  href,
  onClick,
  disabled,
  type = "button",
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
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
