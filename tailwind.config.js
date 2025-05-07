/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './**/*.liquid',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        // Neutral colors
        'neutral-dark': '#494E3B',  // Dark Gray/Green
        'neutral-medium': '#7E7F76', // Medium Gray
        'neutral-light': '#D9DAD5',  // Light Gray
        
        // Brand colors
        'brand-dark': '#748F24',    // Dark Green 
        'brand-medium': '#B4D455',   // Medium Green
        'brand-light': '#DBEBAD',    // Light Green
        
        // Background
        'background': '#FAFCF3',    // Page Background
      },
      fontFamily: {
        'sans': ['Nunito', 'sans-serif'],
        'heading': ['Nunito', 'sans-serif'],
        'body': ['Nunito', 'sans-serif']
      },
      fontSize: {
        'h1': '60px',
        'display': '24px'
      }
    },
  },
  plugins: [],
}