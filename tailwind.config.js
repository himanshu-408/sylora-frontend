/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      display: ["Poppins", "san-serif"]
    },
    extend: {
      color: {
        primary: "#05B6D3",
        secondary: "#EF863E"
      },
      backgroundImage: {
        'login-bg-img': "url('./src/assets/images/login-bg-image.webp')",
        'signup-bg-img': "url('./src/assets/images/signup-bg-image.png')",
      }
    },
  },
  plugins: [],
}

