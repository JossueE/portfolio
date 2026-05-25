import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Adaptive text colors -- respond to dark/light via CSS vars */
        fg: "rgb(var(--fg-rgb) / <alpha-value>)",
        muted: "rgb(var(--muted-rgb) / <alpha-value>)",
        dim: "rgb(var(--dim-rgb) / <alpha-value>)",
        /* Adaptive surface -- white in dark, black in light */
        surface: "rgb(var(--surface-rgb) / <alpha-value>)",
        /* Adaptive edge -- borders */
        edge: "rgb(var(--edge-rgb) / <alpha-value>)",
        /* Cyan accent */
        accent: "rgb(var(--accent-rgb) / <alpha-value>)",
        ink: {
          50:  "#f7f7f8",
          100: "#ececee",
          200: "#d8d8dc",
          300: "#b8b8be",
          400: "#8e8e95",
          500: "#6b6b72",
          600: "#4a4a50",
          700: "#33333a",
          800: "#1f1f24",
          900: "#121216",
          950: "#08080a",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Text",
          "SF Pro Display",
          "system-ui",
          "Segoe UI",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        mono: [
          "var(--font-mono)",
          "SF Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
        display: [
          "var(--font-sans)",
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "system-ui",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
      backgroundImage: {
        noise:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.12 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        "grid-faint":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(60% 40% at 50% 0%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%)",
        "radial-cyan":
          "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(34,211,238,0.12) 0%, transparent 65%)",
      },
      boxShadow: {
        glass:
          "0 1px 0 0 rgba(255,255,255,0.10) inset, 0 0 0 1px rgba(255,255,255,0.06), 0 30px 60px -20px rgba(0,0,0,0.55), 0 10px 25px -10px rgba(0,0,0,0.5)",
        "glass-sm":
          "0 1px 0 0 rgba(255,255,255,0.08) inset, 0 0 0 1px rgba(255,255,255,0.05), 0 12px 30px -12px rgba(0,0,0,0.45)",
        "glow-cyan":
          "0 0 0 1px rgba(34,211,238,0.15), 0 0 40px -8px rgba(34,211,238,0.35)",
        "glow-cyan-lg":
          "0 0 0 1px rgba(34,211,238,0.18), 0 0 60px -12px rgba(34,211,238,0.45)",
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-12px,0)" },
        },
        drift: {
          "0%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(20px,-30px,0) scale(1.05)" },
          "100%": { transform: "translate3d(0,0,0) scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        floaty: "floaty 7s ease-in-out infinite",
        drift: "drift 18s ease-in-out infinite",
        shimmer: "shimmer 3.5s linear infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out both",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
