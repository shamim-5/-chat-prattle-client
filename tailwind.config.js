/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      // for background
      primary: "#1C2E4C",
      secondary: "#0C1A32",
      // for message background
      accent: "#112547",
      info: "#6993FF",
      cyan: "#114d63f9",
      // for text
      gray: "#bac0c7",
      "gray-light": "#DBDDE0",
      "accent-light": "#1890FF",
      "red-light": "#F6485B",
    },
    extend: {},
  },
  plugins: [require("tailwind-scrollbar")],
};
