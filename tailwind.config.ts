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
      accent: "#D778FA",
      "accent-dark": "#865498",
      "gray-5": "#EDEDED",
      "gray-25": "#B6B6B6",
      "gray-50": "#818181",
      "gray-75": "#3E3E3E",
      red: "#C33636",
      green: "#41C336",
    },
  },
  plugins: [],
};
export default config;
