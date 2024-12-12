/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        "primary" : "#f54842",
        "primary-light" : "#ffc929",
        "secondary" : "#2dad56",
        "secondary-light" : "#0b1a78"
      }
    },
  },
  plugins: [],
}

