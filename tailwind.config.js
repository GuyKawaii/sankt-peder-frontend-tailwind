/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./html/**/*.html",
    "./js/**/*.js",
  ],
  theme: {
    screens:{
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    }

  },
  theme: {
    extend: {
      colors: {
        'primary': '#20591d',
        'secondary': {
            100: '#cf2b2b',
            200: '#408c42',
        }
      }
    },
  },
  plugins: [],
}

