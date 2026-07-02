// Runtime design tokens — cloned from Spendee (iOS, dark theme) via /clone-app.
export const tokens = {
  colors: {
    background: '#0f1113',
    surface: '#1b1d21',
    surface2: '#262a30',
    foreground: '#ffffff',
    secondary: '#8b909a',
    border: '#2a2e34',
    green: '#2ec27e', // Spendee brand accent
    red: '#ff5b5b', // expenses
    // category icon colors
    cat: {
      food: '#f5a623',
      shopping: '#a78bfa',
      transport: '#60a5fa',
      home: '#f472b6',
      fun: '#34d399',
    },
  },
  fonts: { sans: 'System', mono: 'Menlo' },
  radii: { card: 14, pill: 999 },
  spacing: { screenX: 16 },
} as const;

export type Tokens = typeof tokens;
