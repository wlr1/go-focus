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
          'url("https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg?cs=srgb&dl=pexels-eberhard-grossgasteiger-443446.jpg&fm=jpg")',
        auth: 'url("https://images.unsplash.com/photo-1480497490787-505ec076689f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        notes:
          'url("https://images.unsplash.com/photo-1475727946784-2890c8fdb9c8?q=80&w=2084&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
      },
      fontFamily: {
        custom: ["Poppins-Regular", "sans"],
      },
    },
  },
  plugins: [],
};
// https://images.hdqwalls.com/download/xiaomi-mi-gaming-laptop-abstract-4k-hl-1920x1080.jpg
//https://images.unsplash.com/photo-1475727946784-2890c8fdb9c8?q=80&w=2084&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
