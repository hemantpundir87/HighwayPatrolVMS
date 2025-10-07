/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  "./src/**/*.{html,ts}"
],
theme: {
  extend: {
    fontFamily: {
      inter: ['Inter', 'Poppins', 'sans-serif'],
    },
    colors: {
      brand: {
        red: '#E53935',
      },
    },
  },
},
plugins: [],
};