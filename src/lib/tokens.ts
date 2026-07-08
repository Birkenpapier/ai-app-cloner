// ────────────────────────────────────────────────────────────────────────────
// Runtime design tokens — cloned from Discord (iOS, dark theme) via /clone-app.
// Prefer NativeWind classes (see tailwind.config.js); reach for these only where
// a `className` can't — a color on a native prop, the StatusBar, an avatar tint.
// ────────────────────────────────────────────────────────────────────────────
export const tokens = {
  colors: {
    background: '#313338', // chat area
    sidebar: '#2B2D31', // channel / DM list
    rail: '#1E1F22', // server rail
    composer: '#383A40', // input box
    elevated: '#111214', // sheets / popovers
    foreground: '#DBDEE1', // body text
    header: '#F2F3F5', // bright text
    muted: '#949BA4', // muted / inactive
    interactive: '#B5BAC1', // icons at rest
    blurple: '#5865F2',
    blurpleHover: '#4752C4',
    online: '#23A55A',
    idle: '#F0B232',
    dnd: '#F23F43',
    mention: '#F23F43',
    divider: '#3F4147',
    link: '#00A8FC',
    white: '#FFFFFF',
  },
  // Avatar / server-icon background tints (Discord's default color set).
  avatarTints: ['#5865F2', '#3BA55D', '#FAA61A', '#ED4245', '#EB459E', '#9B59B6', '#1ABC9C'],
  fonts: { sans: 'System', mono: 'Menlo' },
  radii: { card: 8, server: 16, avatar: 999 },
  spacing: { screenX: 16 },
} as const;

export type Tokens = typeof tokens;
export type Status = 'online' | 'idle' | 'dnd' | 'offline';
