const { createThemes } = require("tw-colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      "max-sm": { max: "639px" },
      "max-md": { max: "767px" },
      "max-lg": { max: "1023px" },
      "max-xl": { max: "1279px" },
      "max-2xl": { max: "1399px" },
    },
  },
  darkMode: "class",
  plugins: [
    createThemes({
      "public-light": {
        primary: "#0027b3",
        secondary: "#1772f8",
      },
      "public-dark": {
        primary: "#00aaff",
        secondary: "#1772f8",
      },
      "meta5-light": {
        primary: "#0027b3",
        secondary: "#1772f8",
      },
      "meta5-dark": {
        primary: "#00aaff",
        secondary: "#1772f8",
      },
      "ocbc-light": {
        primary: "#ed1c24",
        secondary: "#ed1c24",
      },
      "ocbc-dark": {
        primary: "#FF4C4C",
        secondary: "#ed1c24",
      },
    }),
  ],
};
