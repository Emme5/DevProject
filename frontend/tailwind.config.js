/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FF5841',
        'secondary': '#0D0842',
        'blackBG': '#828282',
        'Favorite': '#FF9500'
      },
      fontFamily: {
        'primary': ["Roboto", "sans-serif"],
        'secondary':["Faculty Glyphic", "sans-serif"]
      }
    },
  },
  plugins: [],
}

