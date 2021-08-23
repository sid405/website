const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      jetbrains: ["JetBrains Mono", "monospace"],
      ibm: ["IBM Plex Mono", "monospace"],
      sans: ["JetBrains Mono", "monospace"], // For convenience, so you don't have to set the font-jetbrains class everywhere
    },
    extend: {
      colors: {
        gray: colors.gray,
      },
    },
  },
};
