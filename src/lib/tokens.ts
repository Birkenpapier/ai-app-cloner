// ────────────────────────────────────────────────────────────────────────────
// Runtime design tokens. The `/clone-app` foundation phase OVERWRITES these with
// the cloned app's real values (extracted from screenshots, or from the DOM in
// web mode). Prefer NativeWind classes (see tailwind.config.js) for styling;
// reach for these only where a `className` can't — e.g. a color passed to a
// native prop, the StatusBar, or navigation theming.
// ────────────────────────────────────────────────────────────────────────────
export const tokens = {
  colors: {
    background: '#ffffff',
    foreground: '#0a0a0a',
    primary: '#208aef',
    primaryForeground: '#ffffff',
    muted: '#f4f4f5',
    mutedForeground: '#71717a',
    border: '#e4e4e7',
    accent: '#f4f4f5',
  },
  fonts: {
    sans: 'System',
    mono: 'Menlo',
  },
  radii: {
    card: 16,
  },
  spacing: {
    screenX: 24,
  },
} as const;

export type Tokens = typeof tokens;
