/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        gotham: "url('assets/other-images/gotham-city-background.png')",
        "new-game": "url('assets/other-images/new_game_background.png')",
        "game-mode": "url('assets/other-images/game_mode_background.jpg')",
      },
      colors: {
        header: "rgba(0, 0, 0, 0.5)",
        card: "rgba(0, 0, 0, 0.7)",
      },
      boxShadow: {
        blue: "0px 0px 2px 2px rgba(0, 119, 242, 0.7)",
        skyBlue: "0px 0px 2px 2px skyblue",
      },
      borderColor: {
        "dc-blue": "rgba(0, 119, 242, 0.9)",
      },
      gridTemplateColumns: {
        "cards-sm": "repeat(auto-fit, minmax(160px, 1fr))",
        "cards-lg": "repeat(auto-fit, minmax(200px, 1fr))",
        "cards-xl": "repeat(auto-fit, minmax(240px, 1fr))",
      },
      screens: {
        "2xl": "1900px",
        "3xl": "2150px",
      },
      textColor: {
        "dc-blue": "rgba(0, 119, 242, 0.9)",
      },
    },
  },
  plugins: [],
};
