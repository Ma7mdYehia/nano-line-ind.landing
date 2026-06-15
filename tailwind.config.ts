import type { Config } from "tailwindcss";

/**
 * Design tokens mapped from Session 5 — UI Direction / Design System.
 * See docs/05-session-5-ui-design-system.md for the source of truth.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand
        navy: "#0D1F3C",
        slate: "#1E3A5F",
        steel: "#4B5563",
        "steel-light": "#E5E9EF",
        "steel-pale": "#F1F4F8",
        "off-white": "#F7F8FA",
        // Accent
        amber: {
          DEFAULT: "#D97706",
          dark: "#B45309",
          darker: "#92400E",
          light: "#FEF3C7",
        },
        // Semantic
        success: "#16A34A",
        "success-light": "#D1FAE5",
        error: "#DC2626",
        "error-light": "#FEE2E2",
        "config-blue": "#1D4ED8",
        "config-blue-light": "#DBEAFE",
        whatsapp: "#25D366",
        // Text
        "text-primary": "#0D1F3C",
        "text-body": "#374151",
        "text-muted": "#6B7280",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Helvetica Neue", "Arial", "sans-serif"],
      },
      fontSize: {
        // [size, lineHeight]
        display: ["3.75rem", { lineHeight: "4.25rem", fontWeight: "700" }],
        h1: ["3rem", { lineHeight: "3.5rem", fontWeight: "700" }],
        h2: ["2.25rem", { lineHeight: "2.75rem", fontWeight: "700" }],
        h3: ["1.75rem", { lineHeight: "2.25rem", fontWeight: "600" }],
        h4: ["1.375rem", { lineHeight: "1.875rem", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.75rem" }],
        body: ["1rem", { lineHeight: "1.625rem" }],
        "body-sm": ["0.875rem", { lineHeight: "1.375rem" }],
        caption: ["0.8125rem", { lineHeight: "1.25rem" }],
        overline: ["0.75rem", { lineHeight: "1rem", fontWeight: "600" }],
        micro: ["0.75rem", { lineHeight: "1.125rem", fontWeight: "500" }],
      },
      spacing: {
        // 4px base unit scale (Session 5 §3)
        "3xl": "2.5rem", // 40px
        "4xl": "3rem", // 48px
        "5xl": "4rem", // 64px
        "6xl": "5rem", // 80px
        "7xl": "6rem", // 96px
        "8xl": "8rem", // 128px
      },
      maxWidth: {
        content: "1280px",
        wide: "1440px",
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "10px",
        xl: "12px",
        "2xl": "16px",
      },
      boxShadow: {
        shallow: "0 1px 3px rgba(0,0,0,0.08)",
        sm: "0 4px 12px rgba(0,0,0,0.08)",
        md: "0 8px 32px rgba(0,0,0,0.12)",
        lg: "0 16px 64px rgba(0,0,0,0.20)",
      },
      letterSpacing: {
        overline: "0.1em",
      },
    },
  },
  plugins: [],
};

export default config;
