import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "white": "#FFFFFF",
      "black": "#000000",
      "yellow": "#FBD269",
      "green": "#69FA76",
      "orange": "#FC9E6A",
      "dirt-blue": "#1C232B",
      "hover-blue": "#122B47",
      "light-red": "#FB6969",
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-roboto)'],
        cond: ['var(--font-roboto-cond)'],
      },
    },
  },
  plugins: [],
};
export default config;
