# ai-app-cloner — agent guide

This repo is a **template + skill**: an Expo / React Native starter plus the
`/clone-app` skill that rebuilds an app from screenshots. The starter is a blank
canvas the skill fills in. See the engine at
[`.claude/skills/clone-app/SKILL.md`](.claude/skills/clone-app/SKILL.md).

## Expo version

Expo **SDK 56** (React Native 0.85, React 19.2). APIs have changed across recent
SDKs — read the exact versioned docs at https://docs.expo.dev/versions/v56.0.0/
before writing Expo code. Don't assume older-SDK APIs.

## Conventions

- **Routing:** Expo Router, file-based, under `src/app/`. `typedRoutes` is on.
- **Styling:** **NativeWind** — use `className="..."` (Tailwind syntax) on RN core
  components. Semantic colors (`bg-background`, `text-foreground`, `text-primary`,
  etc.) are defined in `tailwind.config.js`. Don't hardcode hex in components;
  use the token classes so the cloned design system stays centralized.
- **Design tokens:** the source of truth is `tailwind.config.js` (for classes) and
  `src/lib/tokens.ts` (for runtime values a `className` can't reach). Keep them in
  sync. The `/clone-app` foundation phase overwrites both with the cloned app's palette.
- **Global styles / Tailwind entry:** `src/global.css`, imported once in
  `src/app/_layout.tsx`.
- **Icons:** prefer `lucide-react-native` for standard icons.
- **Path alias:** `@/*` → `src/*`.

## Build must always compile

Run `npx tsc --noEmit` before finishing any change. Boot check: `npm run web`.
Builder agents working in worktrees must type-check before reporting done.

## Where things go

| Path | Purpose |
| --- | --- |
| `src/app/` | screens (Expo Router routes) |
| `src/components/` , `src/components/ui/` | reusable components the cloner generates |
| `src/lib/tokens.ts` | runtime design tokens |
| `src/lib/store.ts` | on-device persistence (`useCollection`) for real local features |
| `tailwind.config.js` | design-token classes |
| `docs/screenshots/` | input: screenshots of the app to clone |
| `docs/research/` | recon output: `app-spec.json`, screen graph, per-screen specs |
| `docs/design-references/` | screenshots organized for builder reference + diff |
