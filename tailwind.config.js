/** @type {import('tailwindcss').Config} */
// ────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS — the `/clone-app` foundation phase OVERWRITES the values below
// with the cloned app's real palette/typography/spacing. This file is the home
// for the cloned app's design system (the analog of a web project's globals.css
// `:root` block). Keep the shape; replace the values.
//
// Note: these are flat token colors (e.g. `bg-background`, `text-primary`), not
// Tailwind's numbered scales — `bg-blue-500` etc. are intentionally not defined.
// ────────────────────────────────────────────────────────────────────────────
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  // NativeWind's web runtime manages color scheme via a class observer; without
  // this it throws "Cannot manually set color scheme, as dark mode is type 'media'".
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        foreground: '#0a0a0a',
        primary: '#208aef',
        'primary-foreground': '#ffffff',
        muted: '#f4f4f5',
        'muted-foreground': '#71717a',
        border: '#e4e4e7',
        accent: '#f4f4f5',
      },
      borderRadius: {
        card: '16px',
      },
      fontFamily: {
        sans: ['System'],
        mono: ['Menlo'],
      },
    },
  },
  plugins: [],
};
