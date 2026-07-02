/** @type {import('tailwindcss').Config} */
// ────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS — cloned from Apple Passwords (iOS) via /clone-app.
// Values estimated from screenshots; refined against the originals.
// ────────────────────────────────────────────────────────────────────────────
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Surfaces & text (iOS system colors)
        background: '#f2f2f7', // systemGroupedBackground (home / modals)
        surface: '#ffffff', // cells, detail screens
        foreground: '#000000', // primary label
        secondary: '#8e8e93', // secondary label / counts / placeholder
        tertiary: '#c7c7cc', // chevrons, tertiary label
        separator: '#c6c6c8',
        blue: '#007aff', // systemBlue — links, actions
        search: '#e3e3e9', // search field fill
        // Category icon circle colors
        'cat-all': '#007aff',
        'cat-passkeys': '#34c759',
        'cat-codes': '#ffcc00',
        'cat-security': '#8e8e93',
        'cat-deleted': '#ff9500',
      },
      borderRadius: {
        card: '16px',
        cell: '10px',
        search: '10px',
      },
      fontFamily: {
        sans: ['System'],
        mono: ['Menlo'],
      },
    },
  },
  plugins: [],
};
