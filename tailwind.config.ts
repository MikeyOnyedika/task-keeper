import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: "white",
      secondary: "#1B161D",
      accent: {
        DEFAULT: "#D778FA",
        dark: "#865498",
      },
      "gray-5": "#EDEDED",
      "gray-25": "#B6B6B6",
      "gray-50": "#818181",
      "gray-75": "#3E3E3E",
      red: {
        DEFAULT: "#C33636",
        dark: "#8A0000",
      },
      green: "#41C336",
    },
    backgroundImage: {
      checkmark: "url('./assets/checkmark.svg')",
    },
    extend: {
      boxShadow: {
        outline: "0 0 0 1.5px black",
      },
    },
  },
  plugins: [],
};
export default config;
