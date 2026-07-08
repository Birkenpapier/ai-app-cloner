/** @type {import('tailwindcss').Config} */
// ────────────────────────────────────────────────────────────────────────────
// DESIGN TOKENS — cloned from Discord (iOS, dark theme) via /clone-app. The
// palette is Discord's current dark system: near-black server rail, dark-grey
// channel sidebar and chat, blurple accent, status greens/yellows/reds.
// Keep the shape; `bg-background` / `text-header` / `bg-blurple` etc. are the
// semantic classes the screens use.
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
        background: '#313338', // chat area (dark-3)
        sidebar: '#2B2D31', // channel list / DM list (dark-2)
        rail: '#1E1F22', // far-left server rail (dark-1)
        composer: '#383A40', // message input box
        elevated: '#111214', // sheets / popovers (darker)
        card: '#2B2D31',
        foreground: '#DBDEE1', // normal body text
        header: '#F2F3F5', // bright headings, active channel
        muted: '#949BA4', // muted text, inactive channel names
        interactive: '#B5BAC1', // icons at rest
        blurple: '#5865F2',
        'blurple-hover': '#4752C4',
        online: '#23A55A',
        idle: '#F0B232',
        dnd: '#F23F43',
        mention: '#F23F43',
        divider: '#3F4147',
        link: '#00A8FC',
        'primary-foreground': '#ffffff',
      },
      borderRadius: {
        card: '8px',
        server: '16px',
      },
      fontFamily: {
        sans: ['System'],
        mono: ['Menlo'],
      },
    },
  },
  plugins: [],
};
