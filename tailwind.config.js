/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#06070F",
        canvas2: "#0B0D1C",
        ink: {
          100: "#F4F2FF",
          300: "#C7C3E0",
          500: "#8B87A8",
          700: "#565272",
        },
        violet: { light: "#B6A6FF", DEFAULT: "#7C5CFF", dark: "#5B3FE0" },
        blue: { light: "#6FE3FF", DEFAULT: "#3FA9FF" },
        teal: { light: "#6CF2E4", DEFAULT: "#17D6C4" },
        pink: { light: "#FFB0E8", DEFAULT: "#FF6FD8" },
        amber: { light: "#FFD79A", DEFAULT: "#FFB25E" },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
      borderRadius: {
        glass: "28px",
        pill: "999px",
      },
      boxShadow: {
        glass: "0 8px 40px -8px rgba(0,0,0,0.55)",
        glow: "0 0 60px -10px rgba(124,92,255,0.45)",
      },
      backgroundImage: {
        "grain": "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0,0)" },
          "50%": { transform: "translate(10px,-10px)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        driftSlow: "drift 10s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
