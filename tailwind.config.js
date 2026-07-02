/** @type {import('tailwindcss').Config} */
// DESIGN TOKENS — cloned from Google Keep (iOS, dark theme) via /clone-app.
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#202124',
        surface: '#2d2e30',
        search: '#35363a',
        foreground: '#e8eaed',
        secondary: '#9aa0a6',
        border: '#5f6368',
        blue: '#8ab4f8',
      },
      borderRadius: {
        card: '8px',
        search: '28px',
      },
      fontFamily: {
        sans: ['System'],
        mono: ['Menlo'],
      },
    },
  },
  plugins: [],
};
