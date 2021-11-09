const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
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
        sky: colors.sky,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
