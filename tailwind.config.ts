import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "l-yellow": "#e4de41",
        "l-beige": "#ffb370",
        "l-orange": "#ff7f00",
        "l-vermillion": "#ff6448",
        "l-red": "#ff1a1a",
        "l-french-fuchsia": "#fd3f92",
        "l-orchid": "#f47bf0",
        "l-lilac": "#eba2e8",
        "l-violet": "#c390e8",
        "l-blue-violet": "#9554e8",
        "l-cyan": "#53e2ed",
        "l-mint-green": "#4fe399",
        "l-white": "#e3e3e3",
        "l-silver": "#d7d7d7",
        "l-dark-silver": "#9f9f9f",
        "l-light-gray": "#5f5f5f",
        "l-gray": "#4e4e4e",
        "l-dark-gray": "#282428",
        "l-black": "#1a1a1a",
        "l-calm-black": "#180f18",
        "l-calm-gray": "#24242e",
        "l-centrist": "#7f7f7f"
      },
      animation: {
        corona: "corona 0.5s linear infinite"
      },
      keyframes: {
        corona: {
          "0%, 100%": {
            "box-shadow": "0px 20px 25px -5px #ff6347",
            "-webkit-box-shadow": "0px -20px 25px -5px #ff6347",
            "-moz-box-shadow": "0px -20px 25px -5px #ff6347"
          },
          "50%": {
            "box-shadow": "0px -20px 25px -5px #9554e8",
            "-webkit-box-shadow": "0px -20px 25px -5px #9554e8",
            "-moz-box-shadow": "0px -20px 25px -5px #9554e8"
          },
          "25%": {
            "box-shadow": "20px 0px 25px -5px #f6299b",
            "-webkit-box-shadow": "0px -20px 25px -5px #f6299b",
            "-moz-box-shadow": "0px -20px 25px -5px #f6299b"
          },
          "75%": {
            "box-shadow": "-20px 0px 25px -5px #f6299b",
            "-webkit-box-shadow": "0px -20px 25px -5px #f6299b",
            "-moz-box-shadow": "0px -20px 25px -5px #f6299b"
          }
        }
      }
    },
  },
  darkMode: "class",
  plugins: [],
};
export default config;
