/** @type {import('tailwindcss').Config} */
// DESIGN TOKENS — cloned from Spendee (iOS, dark theme) via /clone-app.
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0f1113',
        surface: '#1b1d21',
        surface2: '#262a30',
        foreground: '#ffffff',
        secondary: '#8b909a',
        border: '#2a2e34',
        green: '#2ec27e',
        red: '#ff5b5b',
      },
      borderRadius: {
        card: '14px',
      },
      fontFamily: {
        sans: ['System'],
        mono: ['Menlo'],
      },
    },
  },
  plugins: [],
};
