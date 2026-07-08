// ────────────────────────────────────────────────────────────────────────────
// Runtime design tokens — cloned from MindMeister (iOS, light theme) via
// /clone-app. Prefer NativeWind classes (see tailwind.config.js); reach for
// these only where a `className` can't — a color on a native prop, the
// StatusBar, or an SVG connector stroke.
// ────────────────────────────────────────────────────────────────────────────
export const tokens = {
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    surface2: '#F4F4F7',
    canvas: '#FBFBFD',
    foreground: '#1C1E2E',
    secondary: '#8A8D9C',
    tertiary: '#B4B7C4',
    border: '#EAEAEF',
    primary: '#E5187F',
    primaryForeground: '#FFFFFF',
    violet: '#7B5EDC',
    yellow: '#FFC53D',
  },
  // Node color palette (central idea → branches), keyed by name.
  nodeColors: {
    blue: '#4B7BEC',
    purple: '#7B5EDC',
    red: '#F0486B',
    orange: '#F5A623',
    teal: '#12B5A6',
    green: '#22B14C',
  },
  fonts: { sans: 'System', mono: 'Menlo' },
  radii: { card: 14, node: 10, pill: 999 },
  spacing: { screenX: 16 },
} as const;

export type Tokens = typeof tokens;
export type NodeColor = keyof typeof tokens.nodeColors;
