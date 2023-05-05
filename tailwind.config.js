/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./html/*.html", "./js/*.js"],
  theme: {
    screens:{
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    }

  },
  theme: {
    extend: {},
  },
  plugins: [],
}

