import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F5EDDC",
        cream: "#EBDFC6",
        ink: "#2B2119",
        muted: "#6A5B4C",
        line: "#D8C8AA",
        brick: "#9A3A22",
        brickdark: "#7E2C17",
        olive: "#3F4A2B",
        ochre: "#C9963A",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
