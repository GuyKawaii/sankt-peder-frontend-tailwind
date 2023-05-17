/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./html/**/*.html",
    "./js/**/*.js",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      logo: '1050px',
    },
    extend: {
      colors: {
        'primary': '#54714d',
        'secondary': {
          100: '#cf2b2b',
          200: '#408c42',
        },
      },
    },
  },
  plugins: [],
};