// ────────────────────────────────────────────────────────────────────────────
// Runtime design tokens — cloned from Apple Passwords (iOS) via /clone-app.
// Prefer NativeWind classes (tailwind.config.js); use these where a className
// can't reach (icon colors passed as props, StatusBar, navigation theming).
// ────────────────────────────────────────────────────────────────────────────
export const tokens = {
  colors: {
    background: '#f2f2f7',
    surface: '#ffffff',
    foreground: '#000000',
    secondary: '#8e8e93',
    tertiary: '#c7c7cc',
    separator: '#c6c6c8',
    blue: '#007aff',
    search: '#e3e3e9',
    category: {
      all: '#007aff',
      passkeys: '#34c759',
      codes: '#ffcc00',
      security: '#8e8e93',
      deleted: '#ff9500',
    },
  },
  fonts: {
    sans: 'System',
    mono: 'Menlo',
  },
  radii: {
    card: 16,
    cell: 10,
    search: 10,
  },
  spacing: {
    screenX: 16,
  },
} as const;

export type Tokens = typeof tokens;
