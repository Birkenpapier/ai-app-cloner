<div align="center">

# 📱 ai-app-cloner

### Give it screenshots of an app. Get a React Native app back.

[![License](https://img.shields.io/github/license/Birkenpapier/ai-app-cloner?color=blue)](LICENSE)
[![Stars](https://img.shields.io/github/stars/Birkenpapier/ai-app-cloner?style=flat&color=yellow)](https://github.com/Birkenpapier/ai-app-cloner/stargazers)
![Expo SDK 56](https://img.shields.io/badge/Expo-SDK%2056-000020?logo=expo&logoColor=white)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)](https://github.com/Birkenpapier/ai-app-cloner/issues)

You point your coding agent at a folder of screenshots. It works out the screens,
the navigation, and the design system, then writes a runnable Expo / React Native
project that reproduces them.

<p>
  <img src="assets/demo/meistertask.gif" width="220" alt="MeisterTask clone running natively on iOS" />
  &nbsp;
  <img src="assets/demo/mindmeister.gif" width="220" alt="MindMeister clone running natively on iOS" />
</p>
<p>
  <img src="assets/demo/todoist.gif" width="180" alt="Todoist clone running natively on iOS" />
  &nbsp;
  <img src="assets/demo/keep.gif" width="180" alt="Google Keep clone running natively on iOS" />
  &nbsp;
  <img src="assets/demo/spendee.gif" width="180" alt="Spendee clone running natively on iOS" />
</p>

<sub>Five apps rebuilt from screenshots, running natively on the iOS 26 simulator.
MeisterTask and MindMeister were cloned straight from their App Store screenshots.
The data persists on device. These are not static mockups.</sub>

</div>

---

## Why screenshots

A website hands you its source. Open the dev tools and the DOM, the CSS, the fonts,
and the asset URLs are all sitting right there. A phone app gives you none of that.
There is no markup to read and no stylesheet to copy, only the pixels on the screen.

So screenshots are the input, because they are the one thing you can capture from
any app without jailbreaking it, decompiling it, or installing anything. The same
folder of PNGs works whether the app runs on iOS or Android.

The hard part is that an image has no numbers in it. You cannot read "16px padding"
off a screenshot. That is why the core of the tool is a diff loop: it builds a
screen, renders it, screenshots its own output, compares that against your
screenshot, and fixes the differences. It repeats until the two match. That loop is
doing the measuring the DOM would have handed you for free on the web.

## Quickstart

```bash
git clone https://github.com/Birkenpapier/ai-app-cloner
cd ai-app-cloner
npm install
npx playwright install chromium   # one-time, used by npm run verify
npm run web                       # the blank template should boot in a browser tab
git checkout -b my-clone          # the clone builds into this repo, so keep main pristine
```

Then, inside your coding agent (Claude Code is the reference setup):

1. Connect a browser automation MCP (Chrome, Playwright, or Puppeteer). The diff loop
   cannot run without it, since it is how the agent screenshots the clone while it builds.
2. Drop screenshots into `docs/screenshots/`. See
   [`docs/screenshots/README.md`](docs/screenshots/README.md) for what to capture and how
   to name files so the agent can tell one screen from another.
3. Run `/clone-app`.

Want to see a finished result first? Each `demo/*` branch holds a complete clone:
`git checkout demo/meistertask` (or `demo/mindmeister`, `demo/todoist`, `demo/keep`, `demo/spendee`).

## Works in these agents

The `/clone-app` skill is generated for every major AI coding agent from one source
of truth (`.claude/skills/clone-app/SKILL.md` for the command, `AGENTS.md` for the
project rules). After editing the source, run `node scripts/sync-skills.mjs` and
`bash scripts/sync-agent-rules.sh` to regenerate the per-agent files.

| Agent | How it runs |
| --- | --- |
| Claude Code | `/clone-app` (reference implementation) |
| Codex CLI | `/clone-app` |
| Cursor | `/clone-app` command |
| Windsurf | `/clone-app` workflow |
| Gemini CLI | `/clone-app` |
| GitHub Copilot | `.github/` skill + instructions |
| Cline | reads `.clinerules` |
| Roo Code | reads `AGENTS.md` |
| Continue | `/clone-app` command |
| OpenCode | `/clone-app` |
| Amazon Q | `clone-app` agent |
| Augment Code | `/clone-app` command |
| Aider | reads `AGENTS.md` |

Claude Code is the only one verified end to end so far. The rest use each agent's
documented config format, generated from the same source. Reports from other agents
are welcome.

## Where the output goes

The repo you clone is a blank Expo app. Running `/clone-app` fills it in:

- screens go into `src/app/` (Expo Router)
- components go into `src/components/`
- the design tokens go into `tailwind.config.js` and `src/lib/tokens.ts`
- the agent's analysis (screen map, navigation graph, per-screen specs) goes into `docs/research/`

So the output *is* this project, now holding your clone. There is no separate export
step. If you would rather see a finished result before running anything, each
`demo/*` branch contains one complete clone.

## How it works

```
screenshots/  ──▶  cluster into     ──▶  infer navigation  ──▶  app-spec.json
(app states)       screens & states      graph (tabs/stack)      (the IR)
                                                                      │
        ┌─────────────────────────────────────────────────────────┘
        ▼
   foundation        per-screen spec        visual-diff loop        assembled
   (tokens, nav)  ▶  + builder agents   ▶   render→shot→diff→fix  ▶  Expo app
                     (parallel, worktrees)   (until it matches)
```

The whole engine is one file written in plain English:
[`.claude/skills/clone-app/SKILL.md`](.claude/skills/clone-app/SKILL.md).

Partway through, it writes `app-spec.json`, a description of the app (tokens,
navigation, screens, states) that never mentions React Native. That is on purpose.
The RN generator reads it today; the native targets on the roadmap will read the
same file. Its shape is documented in
[`docs/research/app-spec.schema.json`](docs/research/app-spec.schema.json), with a
worked [example](docs/research/app-spec.example.json).

## The demos

The clones at the top are built from screenshots of real apps, so you can judge the
output against something you already know. MeisterTask and MindMeister were rebuilt
straight from their App Store screenshots:

| Clone | Original | What it shows off |
| --- | --- | --- |
| MeisterTask | [MeisterTask](https://www.meistertask.com) | a gradient-header agenda, a kanban board, task detail with comments you post, automations |
| MindMeister | [MindMeister](https://www.mindmeister.com) | a mind-map outline editor, a maps grid, comments, favorites you toggle |
| Todoist | [Todoist](https://todoist.com) | tab navigation, a task list, add-task that saves on device |
| Keep | [Google Keep](https://keep.google.com) | a notes grid, a note editor, labels |
| Spendee | [Spendee](https://www.spendee.com) | tabs, and an expense you log that updates the running balance |

Each `demo/*` branch (`demo/meistertask`, `demo/mindmeister`, `demo/todoist`,
`demo/keep`, `demo/spendee`) holds one complete clone. They exist to demonstrate the
tool, not to be shipped. See [Legal and ethics](#legal-and-ethics).

## Two modes

| Mode | Input | Fidelity | Notes |
| --- | --- | --- | --- |
| **Screenshots** (the main use) | a folder of app-state screenshots | visual parity via the diff loop | any app, iOS or Android, nothing to install |
| **Web → RN** (bonus) | a web app URL | exact, from the DOM and real assets | for turning a web app into React Native |

## Stack

Expo SDK 56, Expo Router (file-based screens), React Native 0.85, NativeWind
(Tailwind syntax), TypeScript strict.

## Roadmap

Each stage reads the same `app-spec.json`, so a new target is a new code generator,
not a new pipeline. Full detail in [ROADMAP.md](ROADMAP.md).

| Version | Input | Output | Status |
| --- | --- | --- | --- |
| **v1** | screenshots of an app | Expo / React Native (data mocked on device) | ✅ shipping now |
| **v1** | a web app URL | Expo / React Native | ✅ bonus mode |
| **v2** | screenshots of an app | a full-stack app: an inferred schema + a typed CRUD backend | 🔜 next |
| **v3** | screenshots of an app | native SwiftUI and Jetpack Compose | 🧭 planned |

**Backend before native.** A running backend is the bigger unlock, and it is
inferable from the screens (a list is a table, a row that opens a detail is a
foreign key). Expo already looks native, so native codegen is the smaller marginal
win and comes last.

## Honest limitations

This reverse-engineers an app from its pixels, and the README is not going to pretend
otherwise:

- **Screenshot mode has no exact values.** Spacing and colors are best-effort, and
  the diff loop is what closes the gap. Web mode gets exact values from the DOM.
- **Assets are baked into the pixels.** Logos, app icons, and photos are re-created
  (icons via lucide) or cropped as raster, never recovered as real files. Web mode
  can download the real assets.
- **Coverage equals what you capture.** A screen or state you never screenshotted
  cannot be cloned.
- **No backend.** Data is mocked or kept on device. Every server call is a typed stub
  marked `// TODO: wire backend`.

## Legal and ethics

Clone apps you own, apps you have permission to clone, or clone for learning and
prototyping. Do not pass a clone of someone else's app off as your own product, and
respect trademarks, app-store rules, and the original's terms. What you build with
this is on you.

The tool reproduces layout and behavior, not brand assets. Icons are re-created
rather than copied, and it never redistributes an app's original image or logo files.
Reproducing a specific commercial app's look pixel-for-pixel can still raise
copyright, trade-dress, and design-patent questions, so clone responsibly and get
legal advice before publishing a clone of a named product.

The demos here are for demonstration only. This project is not affiliated with,
endorsed by, or sponsored by any app or company shown. All product names, logos, and
trademarks belong to their respective owners.

## License

MIT, see [LICENSE](LICENSE). Made by [Birkenpapier](https://github.com/Birkenpapier).
