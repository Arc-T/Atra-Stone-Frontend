/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: [
    "./src/**/*.{html,js,ts,tsx}",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Vazirmatn", "Shabnam", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
