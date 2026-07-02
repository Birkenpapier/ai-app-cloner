// Runtime design tokens — cloned from Google Keep (iOS, dark theme) via /clone-app.
export const tokens = {
  colors: {
    background: '#202124',
    surface: '#2d2e30',
    search: '#35363a',
    foreground: '#e8eaed',
    secondary: '#9aa0a6',
    border: '#5f6368',
    blue: '#8ab4f8',
    // Note background colors (Keep dark-mode palette).
    note: {
      default: '#2d2e30',
      teal: '#16504b',
      olive: '#635d19',
      brown: '#614a19',
      green: '#345920',
      blue: '#2d555e',
      pink: '#5b2245',
    },
  },
  fonts: { sans: 'System', mono: 'Menlo' },
  radii: { card: 8, search: 28 },
  spacing: { screenX: 12 },
} as const;

export type Tokens = typeof tokens;
