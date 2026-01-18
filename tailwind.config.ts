import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // optional, future-proof
  content: [
     "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        primary: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5", // main brand color
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },

        // Semantic colors
        success: {
          500: "#22c55e",
          600: "#16a34a",
        },
        error: {
          500: "#ef4444",
          600: "#dc2626",
        },
        warning: {
          500: "#f59e0b",
        },

        // UI neutrals (optional aliasing)
        surface: "#ffffff",
        background: "#f9fafb",
        border: "#e5e7eb",
        muted: "#6b7280",
      },

      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },

      borderRadius: {
        lg: "0.75rem",
        xl: "1rem",
      },

      boxShadow: {
        soft: "0 10px 25px -10px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
