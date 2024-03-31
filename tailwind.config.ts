import { withUt } from "uploadthing/tw";
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
  red: "#D64343",
};

export const colorfulThemeColors = {
  cfYellow: "#f9df09",
  cfCyan: "#31dddd",
  cfOrangeLight: "#ffbb64",
  cfGreenLight: "#dcffb7",
  cfPinkLight: "#ffb7b7",
  cfBlueLight: "#b7e1ff",
  cfPurpleCircle: "rgba(129, 9, 249, 0.59)",
  cfPurple: "#6c0ce5",
  cfBlue: "#4e94fc",
  cfRed: "#fc4e78",
  cfCyanLight: "#01f3ff",
  cfDark: "#141414",
};

export default withUt({
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
      colors: { ...tailwindColors, ...colorfulThemeColors },
    },
  },
  plugins: [],
});
