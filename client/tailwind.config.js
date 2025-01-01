/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        custom: ["Space Grotesk", "cursive"],
      },
      colors: {
        primary: "#4CAF50", // Customize as needed
        "primary-hover": "#45A049", // Hover color for buttons
      },
    },
  },
  plugins: [],
};
