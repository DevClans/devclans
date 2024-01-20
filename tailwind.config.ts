import type { Config } from "tailwindcss";
export const tailwindColors = {
  border: "#132341",
  primary: "#457BE3",
  priDark: "#3E75E3",
  priDarker: "#284F9C",
  subH: "#596B91",
  heading: "#E2E8FF",
  cardBg: "#081121",
  text: "#E2E8FF8C",
  highlight: "#E1EBFFBF",
  bg: "#010816",
  yellowDark: "#A4A622",
  cardBg2: "#020b1c",
  cardBg1: "#020D23",
  green: "#2da519",
};
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      spacing: {
        "15": "3.75rem",
        "1": "5px",
        "2": "10px",
        "3": "15px",
        "4": "20px",
        // skipping 5 and 10s as they are already rounded to 5 or 0 at end
        "6": "25px",
        "7": "30px",
      },
      colors: tailwindColors,
    },
  },
  plugins: [],
};
export default config;
