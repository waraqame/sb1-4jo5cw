/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0d6efd',
      },
      container: {
        center: true,
        padding: '1rem',
      },
    },
  },
  plugins: [],
};