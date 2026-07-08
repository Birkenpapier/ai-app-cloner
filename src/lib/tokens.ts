// ────────────────────────────────────────────────────────────────────────────
// Runtime design tokens — cloned from MeisterTask (iOS, light theme) via
// /clone-app. Prefer NativeWind classes (see tailwind.config.js); reach for
// these only where a `className` can't — a color passed to a native prop, the
// StatusBar, navigation theming, or a LinearGradient's `colors`.
// ────────────────────────────────────────────────────────────────────────────
export const tokens = {
  colors: {
    background: '#F1F2F6',
    surface: '#FFFFFF',
    surface2: '#F7F8FA',
    foreground: '#1C1E2E',
    secondary: '#8A8D9C',
    tertiary: '#B4B7C4',
    border: '#E7E8EE',
    primary: '#0087F2',
    primaryForeground: '#FFFFFF',
    gradFrom: '#3F63E3',
    gradTo: '#6E4FCF',
    green: '#22B14C',
    greenSoft: '#E6F8EE',
    pink: '#F0486B',
    amber: '#F5A623',
    purple: '#7B4FD1',
    tabbar: '#1B1E2E',
    tabbarMuted: '#6B6F82',
  },
  // The blue→purple header gradient used on Agenda and Notifications.
  headerGradient: ['#3F63E3', '#6E4FCF'] as const,
  fonts: { sans: 'System', mono: 'Menlo' },
  radii: { card: 14, xl2: 18, pill: 999 },
  spacing: { screenX: 16 },
} as const;

export type Tokens = typeof tokens;
