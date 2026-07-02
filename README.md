<div align="center">

# 📱 ai-app-cloner

### Drop in screenshots of any app. Get a working React Native clone.

Point your AI coding agent at a folder of screenshots — it figures out the
screens, the navigation, and the design system, then rebuilds the whole app as a
runnable **Expo / React Native** project.

<!-- TODO(launch): replace with the hero GIF — a folder of screenshots on the left,
     the running Expo clone on the right, building screen by screen. This GIF is
     50% of the launch. Record it before posting anywhere. -->

</div>

---

## Why

Cloning a **website** is easy-ish: the browser hands you the exact DOM and computed
styles. A **mobile app** is a locked box — no DOM, no source, just what you can see.
So `ai-app-cloner` works from the one thing you *can* always get: **screenshots of
the app's states.** It clusters them into screens, infers the navigation graph, and
rebuilds each screen — then runs a **visual-diff loop** (render → screenshot → diff
→ fix) until the clone matches the originals.

No jailbreak. No decompiling. No instrumentation. Works for **iOS and Android** apps
identically, because a screenshot is a screenshot.

## Quickstart

```bash
git clone https://github.com/dioptify/ai-app-cloner
cd ai-app-cloner
npm install
npm run web        # confirm the blank canvas boots

# then, in your AI coding agent (Claude Code recommended):
#   1. drop screenshots into docs/screenshots/
#   2. run:  /clone-app
```

You'll need a **browser automation MCP** (Chrome / Playwright / Puppeteer) connected
to your agent — it's how the diff loop screenshots your rendered clone. See
[`docs/screenshots/README.md`](docs/screenshots/README.md) for what to capture and
how to name files.

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

The engine lives in [`.claude/skills/clone-app/SKILL.md`](.claude/skills/clone-app/SKILL.md).
The intermediate representation it produces is documented by
[`docs/research/app-spec.schema.json`](docs/research/app-spec.schema.json) (with a
worked [example](docs/research/app-spec.example.json)). The IR is **platform-agnostic
on purpose** — today it feeds the Expo/React Native codegen; the native targets on
the roadmap read the same file.

## Two modes

| Mode | Input | Fidelity | Notes |
| --- | --- | --- | --- |
| **Screenshots** (the USP) | a folder of app-state screenshots | visual parity via the diff loop | any app, iOS or Android, zero setup |
| **Web → RN** (bonus) | a web app URL | exact (DOM + real assets) | for cloning web apps into React Native |

## Stack

Expo SDK 56 · Expo Router (file-based screens) · React Native 0.85 · NativeWind
(Tailwind syntax) · TypeScript strict.

## Roadmap

- **v1 — now:** screenshots → Expo / React Native (+ web → RN bonus mode)
- **v2:** screenshots → **native** (SwiftUI / Jetpack Compose) via the same IR
- **v3:** decompile → native (APK resources + live view hierarchy for exact fidelity)

## Honest limitations

This is reverse-engineering from pixels, and the README won't pretend otherwise:

- **No exact values in screenshot mode** — spacing/colors are best-effort; the
  diff loop is what closes the gap.
- **Assets are baked into the pixels** — logos, app icons, and photos get
  re-created (icons via lucide) or cropped as raster, not recovered as real files.
  (Web mode recovers real assets from the DOM.)
- **Coverage = what you capture** — screens or states you didn't screenshot can't
  be cloned.
- **No backend** — data is mocked; every data call is a typed `// TODO: wire backend`.

## Ethical use

Clone apps you own, apps you have permission to clone, or for learning and
prototyping. Don't pass off a clone of someone else's app as your own product, and
respect trademarks, app-store rules, and the original's terms. You are responsible
for what you build with this.

Cloning reproduces **function and layout**, not brand assets: icons are re-created
(not copied), and the tool never redistributes an app's original image/logo files.
Reproducing a specific commercial app's distinctive look pixel-for-pixel can raise
copyright ("look and feel"), trade-dress, and design-patent issues — clone
responsibly, and get legal advice before publishing a clone of a named product.

## Disclaimer

This project and its demos are for **educational and demonstration purposes**. It is
**not affiliated with, endorsed by, or sponsored by** any app or company shown. All
product names, logos, and trademarks are the property of their respective owners.

## License

MIT — see [LICENSE](LICENSE). A product of [dioptify](https://github.com/dioptify) / Birkenpapier.
