/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily : {
      'montserrat' : ['"Montserrat"', ...defaultTheme.fontFamily.montserrat]
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],

}