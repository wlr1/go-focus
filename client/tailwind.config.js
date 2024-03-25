/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkpal: "#D8D9DA",
      },
      backgroundImage: {
        bgmain:
          'url("https://images.hdqwalls.com/download/xiaomi-mi-gaming-laptop-abstract-4k-hl-1920x1080.jpg")',
      },
    },
  },
  plugins: [],
};
