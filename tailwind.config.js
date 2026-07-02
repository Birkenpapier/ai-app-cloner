/** @type {import('tailwindcss').Config} */
// DESIGN TOKENS — cloned from Todoist (iOS, dark theme) via /clone-app.
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: '#1e1e1e',
        surface: '#282828',
        surface2: '#363636',
        foreground: '#ffffff',
        secondary: '#a0a0a0',
        tertiary: '#6b6b6b',
        separator: '#3a3a3a',
        red: '#dc4c3e',
      },
      borderRadius: {
        card: '12px',
      },
      fontFamily: {
        sans: ['System'],
        mono: ['Menlo'],
      },
    },
  },
  plugins: [],
};
