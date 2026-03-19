/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1A56A0",
        dark: "#1A1A1A",
        light: "#F5F5F5",
      },
      fontFamily: {
        sans: ["Inter", "Noto Sans SC", "sans-serif"],
      },
    },
  },
  plugins: [],
}
