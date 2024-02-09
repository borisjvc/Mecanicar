/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {

    extend: {
      colors: {
        'azulito': '#0B265B',
        'miniazul': '#D8F1FF',
        'verde': '#319F16',
        'rojo': '#CD0000',

        primary: {
          100: "#3A00B0",
          300: "#29007D",
          900: "#120037",
        },
      },
    },
  },
  plugins: [],
};
