/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary, #0999e0)",
        secondary: "var(--color-secondary, #000000)",
        accent: "var(--color-accent, #f3f4f6)",
        success: "var(--color-success, #10b981)",
        warning: "var(--color-warning, #f59e0b)",
        error: "var(--color-error, #ef4444)",
        background: "var(--color-background, #ffffff)",
        foreground: "var(--color-text-primary, #111827)",
        muted: "var(--color-text-secondary, #6b7280)",
      },
      borderRadius: {
        small: "var(--border-radius-small, 2px)",
        medium: "var(--border-radius-medium, 4px)",
        large: "var(--border-radius-large, 8px)",
      },
      boxShadow: {
        custom:
          "var(--shadow-medium, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06))",
      },
    },
  },
  plugins: [],
};
