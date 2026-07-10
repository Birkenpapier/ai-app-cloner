# Changelog

All notable changes are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/), and the project aims for
[Semantic Versioning](https://semver.org/).

## [Unreleased]

### Added

- **Claude Code plugin packaging.** The `/clone-app` skill is now distributable as a
  Claude Code plugin (`.claude-plugin/plugin.json` + `.claude-plugin/marketplace.json` +
  `skills/clone-app/`). Install it directly with
  `claude plugin marketplace add Birkenpapier/ai-app-cloner` then
  `claude plugin install ai-app-cloner@ai-app-cloner`. The plugin skill is generated
  from the same source of truth (`.claude/skills/clone-app/SKILL.md`) as the per-agent
  commands, so there is no second copy to keep in sync.

## [1.1.0] - 2026-07-09

The demos now move. v1.0 proved the clones run; v1.1 shows it.

### Added

- **Native interaction GIFs.** The demo GIFs are recorded on the iOS simulator and
  show the real interactions, not just tab-switching: Discord (send a message, edit
  it in place, react), MeisterTask (move cards across the kanban board, delete one),
  MindMeister (rename a node in place, add a branch, delete one). All of it persists.
- **Discord** joins the lineup as the sixth demo clone.

### Changed

- README hero is now six apps with an interaction-focused caption.

## [1.0.0] - 2026-07-08

The first release. Give a coding agent a folder of an app's screenshots, and it
reconstructs a working Expo / React Native project that reproduces them.

### Added

- **The `/clone-app` skill** ([`.claude/skills/clone-app/SKILL.md`](.claude/skills/clone-app/SKILL.md)),
  the whole engine in one English file: cluster screenshots into screens and states,
  infer the navigation graph, extract design tokens, dispatch one builder per screen
  in git worktrees, then run the visual-diff loop (render, screenshot, diff, fix)
  until the output matches the input.
- **Screenshot mode** (the default, works on any iOS or Android app) and a
  **web app to React Native** mode that reads exact values from the DOM.
- **Six demo clones**, each on its own `demo/*` branch, each `npm run verify` green:
  Discord, MeisterTask, MindMeister, Todoist, Google Keep, Spendee. They are working
  apps, not static mockups. You send, edit, delete, drag, react, and it persists.
- **A functional verification harness** (`npm run verify`): every route renders with
  zero console errors, and every feature flow is replayed headlessly and asserted to
  survive a reload.
- **On-device persistence** (`src/lib/store.ts`) so cloned apps work offline.
- **Multi-agent support**: the skill is generated for 13 AI coding agents from a
  single source of truth.
- **The `app-spec.json` IR**, the platform-agnostic app description that the native
  and full-stack targets on the roadmap will read.

### Known limits (on purpose, and stated up front)

- Screenshot mode has no exact values; fidelity comes from the diff loop.
- Assets baked into pixels are re-created (icons via lucide) or cropped, never
  recovered as real files. Web mode downloads the real assets.
- Coverage equals what you screenshot. Data is mocked or on-device; a real backend
  is [v2](ROADMAP.md).

[Unreleased]: https://github.com/Birkenpapier/ai-app-cloner/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/Birkenpapier/ai-app-cloner/releases/tag/v1.1.0
[1.0.0]: https://github.com/Birkenpapier/ai-app-cloner/releases/tag/v1.0.0
