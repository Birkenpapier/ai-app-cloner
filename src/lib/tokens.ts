// Runtime design tokens — cloned from Todoist (iOS, dark theme) via /clone-app.
export const tokens = {
  colors: {
    background: '#1e1e1e',
    surface: '#282828',
    surface2: '#363636',
    foreground: '#ffffff',
    secondary: '#a0a0a0',
    tertiary: '#6b6b6b',
    separator: '#3a3a3a',
    red: '#dc4c3e', // Todoist brand accent
  },
  fonts: { sans: 'System', mono: 'Menlo' },
  radii: { card: 12, pill: 999 },
  spacing: { screenX: 16 },
} as const;

export type Tokens = typeof tokens;
