/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightpink: "#faeff0",
        primary: "#ad343e",
        btnborder: "#333",
        hoverprimary: "#122622",
        active: "#5f1d22",
        border: "#ccc",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
