/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  // purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#404040",
      },
      fontFamily: { 
        Syne: ["syne", "sans-serif"]
      },
      screens: { },
      backgroundImage: {   },
    },
  },
  plugins: [ ],
};
