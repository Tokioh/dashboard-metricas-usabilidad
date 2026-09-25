/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0c0e12',
          card: '#14171f',
          'card-hover': '#1a1e28',
          border: '#232836',
          muted: '#8e96a5',
          text: '#f1f3f7',
          inner: '#0f1117'
        },
        lime: {
          DEFAULT: '#ccff00',
          50: '#f7fee7',
          100: '#ecfccb',
          200: '#d9f99d',
          300: '#bef264',
          400: '#a3e635',
          500: '#84cc16',
          600: '#65a30d',
          glow: 'rgba(204, 255, 0, 0.25)'
        },
        accent: {
          green: '#22c55e',
          red: '#f43f5e',
          orange: '#f97316',
          blue: '#3b82f6',
          cyan: '#06b6d4'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'lime-glow': '0 0 20px -3px rgba(204, 255, 0, 0.35)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.45)',
      }
    },
  },
  plugins: [],
}
