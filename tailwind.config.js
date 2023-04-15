/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,}',
    './pages/**/*.{js,jsx,}',
    './components/**/*.{js,jsx}',
    './dashboard_components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      transitionProperty: {
        height: 'height',
      },
    },
  },
  plugins: [],
};
