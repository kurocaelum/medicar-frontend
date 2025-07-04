/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
    colors: {
      white: '#FFFFFF',
      primary: {
        DEFAULT: '#49B4BB',
        hover: '#D9F1F3'
      },
      secondary: '#D9F1F3',
      gray: {
        DEFAULT: '#A8A8A8',
        light: "#F8F8F8"
      }
    }
  },
  plugins: [],
}

