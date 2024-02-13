/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        gotham: "url('assets/other-images/gotham-city-background.png')",
      },
      colors: {
        "black-rgba": "rgba(0, 0, 0, 0.5)",
      },
      boxShadow: {
        "blue-under": "0px 0px 2px 2px rgba(0, 119, 242, 0.7)",
      },
      borderColor: {
        "dc-blue": "#0077f2",
      },
    },
  },
  plugins: [],
};
