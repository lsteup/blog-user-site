/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Charter", "serif"],
        sans: ["Helvetica Neue", "sans-serif"],
      },
    },
    transitionDuration: { default: "700ms" },
  },
  plugins: [],
};
