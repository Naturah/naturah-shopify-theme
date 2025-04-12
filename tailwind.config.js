/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/*.liquid',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'naturah-green': '#BAD452', // Primary lime green
        'naturah-light': '#f4f7ed',
        'naturah-beige': '#DEC0A2', // Option color beige
        'naturah-blue': '#648187', // Option color blue
        'naturah-pink': '#e7b9b8', // Option color pink
        'naturah-black': '#282B2B', // Primary black
        'naturah-gray': '#D0D0D0', // Primary gray/white
      },
      fontFamily: {
        'heading': ['Nunito', 'sans-serif'],
        'sans': ['Nunito Sans', 'sans-serif'],
        'script': ['Dancing Script', 'cursive']
      }
    },
  },
  plugins: [],
}