/** @type {import('tailwindcss').Config} */
// ────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS — cloned from MindMeister (iOS, light theme) via /clone-app.
// Flat semantic token colors (e.g. `bg-background`, `text-foreground`), not
// Tailwind's numbered scales. Keep this in sync with src/lib/tokens.ts.
// ────────────────────────────────────────────────────────────────────────────
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        surface: '#FFFFFF',
        surface2: '#F4F4F7', // search fields, comment bubbles, sheets
        canvas: '#FBFBFD', // recent grid + editor backdrop
        foreground: '#1C1E2E',
        secondary: '#8A8D9C',
        tertiary: '#B4B7C4',
        border: '#EAEAEF',
        primary: '#E5187F', // MindMeister magenta (brand, send button)
        'primary-foreground': '#FFFFFF',
        violet: '#7B5EDC', // active tab, purple nodes
        yellow: '#FFC53D', // lightbulb / central idea
        'node-blue': '#4B7BEC',
        'node-purple': '#7B5EDC',
        'node-red': '#F0486B',
        'node-orange': '#F5A623',
        'node-teal': '#12B5A6',
        'node-green': '#22B14C',
      },
      borderRadius: {
        card: '14px',
        node: '10px',
      },
      fontFamily: {
        sans: ['System'],
        mono: ['Menlo'],
      },
    },
  },
  plugins: [],
};
