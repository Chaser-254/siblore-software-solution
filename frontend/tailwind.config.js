
/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#0EA5E9',
          cyan: '#38BDF8',
          hover: '#0284C7',
        },
        dark: {
          bg: '#020617',
          card: '#020617', // or #030712 based on preference, using darker for base
          cardAlt: '#030712',
          border: '#0F172A',
        },
        text: {
          primary: '#E5E7EB',
          secondary: '#9CA3AF',
        },
        success: '#22C55E',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 10px 40px -10px rgba(0,0,0,0.5)',
        'glow': '0 0 20px rgba(14, 165, 233, 0.15)',
      }
    },
  },
  plugins: [],
}
