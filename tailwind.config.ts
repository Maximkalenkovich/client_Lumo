import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        app: {
          bg: "var(--app-bg)",
          text: "var(--app-text)",
          hint: "var(--app-hint)",
          secondary: "var(--app-secondary-bg)",
          button: "var(--app-button)",
          "button-text": "var(--app-button-text)",
          link: "var(--app-link)",
          destructive: "var(--app-destructive)",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
