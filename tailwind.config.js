const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: _ => ({
        "5vh": "5vh",
        "95vh": "95vh",
      }),
      inset: _ => ({
        "5vh": "5vh",
        "95vh": "95vh",
      }),
      colors: {
        lime: colors.lime,
        orange: colors.orange,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
