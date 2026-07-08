/** @type {import('tailwindcss').Config} */
// ────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS — cloned from MeisterTask (iOS, light theme) via /clone-app.
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
        background: '#F1F2F6', // grouped content bg (light lavender-gray)
        surface: '#FFFFFF', // cards
        surface2: '#F7F8FA', // insets / search fields
        foreground: '#1C1E2E', // near-black text
        secondary: '#8A8D9C', // secondary gray text
        tertiary: '#B4B7C4', // faint text / icons
        muted: '#EEEFF3',
        'muted-foreground': '#9A9DAB',
        border: '#E7E8EE',
        primary: '#0087F2', // MeisterTask brand blue (actions, links, active tab)
        'primary-foreground': '#FFFFFF',
        'grad-from': '#3F63E3', // header gradient — blue
        'grad-to': '#6E4FCF', // header gradient — purple
        green: '#22B14C', // board header, "Open" tag, checkmarks
        'green-soft': '#E6F8EE',
        pink: '#F0486B', // "In Progress" accent, urgent due pills
        amber: '#F5A623', // focus / guest accents
        purple: '#7B4FD1',
        tabbar: '#1B1E2E', // dark bottom tab bar
        'tabbar-muted': '#6B6F82', // inactive tab icon
      },
      borderRadius: {
        card: '14px',
        xl2: '18px',
      },
      fontFamily: {
        sans: ['System'],
        mono: ['Menlo'],
      },
    },
  },
  plugins: [],
};
