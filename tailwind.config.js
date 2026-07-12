/** @type {import('tailwindcss').Config} */
export default {


  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'aurora-slow': 'aurora 12s ease infinite alternate',
        'aurora-delayed': 'aurora 16s ease infinite alternate-reverse',
      },
      keyframes: {
        aurora: {
          '0%': { transform: 'translate(0px, 0px) scale(1) rotate(0deg)', filter: 'blur(60px)' },
          '50%': { transform: 'translate(40px, -60px) scale(1.2) rotate(45deg)', filter: 'blur(80px)' },
          '100%': { transform: 'translate(-20px, 20px) scale(0.9) rotate(-20deg)', filter: 'blur(60px)' },
        }
      }
    },
  },
  plugins: [],
}