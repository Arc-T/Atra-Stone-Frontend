/** @type {import('tailwindcss').Config} */
import { colors, getNeutral, getThemeColors } from "./src/styles/theme";
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: [
    "./src/**/*.{html,js,ts,tsx}",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Vazirmatn",
          "Shabnam",
          "Dynalight",
          ...defaultTheme.fontFamily.sans,
        ],
      },
      colors: {
        dark: getNeutral("dark"),
        light: getNeutral("light"),
        neutral: getThemeColors(colors.neutral),
        brand: getThemeColors(colors.brand),
        success: getThemeColors(colors.success),
        warn: getThemeColors(colors.warn),
        danger: getThemeColors(colors.danger),
        info: getThemeColors(colors.info),
      },
    },
  },
  plugins: [],
};
