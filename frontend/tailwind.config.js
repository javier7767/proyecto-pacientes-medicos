/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Esto es crucial para que Tailwind escanee tus componentes React
    "./public/index.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}