// @ts-ignore
const colors = require("tailwindcss/colors")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      height: {
        "screen-1/2": "50vh",
        "screen-1/3": "33vh",
        "screen-2/3": "66vh",
        "screen-1/4": "25vh",
        "screen-3/4": "75vh",
        "screen-1/5": "20vh",
        "screen-2/5": "40vh",
        "screen-3/5": "60vh",
        "screen-4/5": "80vh",
        "screen-1/10": "90vh",
      },

      colors: {
        background: "#08090c",
        primary: {
          default: colors.blue["500"],
          dark: colors.blue["700"],
          light: colors.blue["300"],
        },
        secondary: {
          default: colors.purple["500"],
          dark: colors.purple["700"],
          light: colors.purple["300"],
        },
      },
    },
  },
  plugins: [],
}
