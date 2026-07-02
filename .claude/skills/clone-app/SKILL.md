---
name: clone-app
description: Reverse-engineer and clone a mobile app into a working Expo / React Native codebase from a folder of screenshots of the app's states. Also clones a web app into React Native (web mode). Use whenever the user wants to clone, replicate, rebuild, reverse-engineer, or copy an app. Triggers on "clone this app", "rebuild this app's UI", "copy this app from screenshots", "turn these screenshots into an app". Provide a screenshots folder (default docs/screenshots/) or a URL for web mode.
argument-hint: "[<screenshots-dir> | <url>]"
user-invocable: true
---

# Clone App

You are about to reverse-engineer and rebuild a mobile app as a working **Expo / React Native** clone.

This is not a two-phase process (inspect then build). You are a **foreman walking the job site** — as you understand each screen, you write a detailed specification to a file, then hand that file to a specialist builder agent with everything they need. Understanding and construction happen in parallel.

But your job site is different from a website cloner's. A website exposes a live DOM with exact computed styles. **You do not have that.** Your only source of truth is a pile of screenshots (or, in web mode, a DOM). So the rules are different, and the single most important one is:

> **The visual-diff loop is the engine, not the final QA pass.** Because you have no exact CSS values, you cannot get it right in one shot. You get it right by rendering what you built, screenshotting it, diffing it against the original, and fixing the deltas — over and over until they match. Internalize this: build → render → screenshot → diff → fix → repeat.

## Modes

- **Screenshot mode (default, the USP).** Input is a folder of screenshots capturing most of the app's states. Works for any app, iOS or Android, with zero instrumentation. Lower raw fidelity (no exact values) — the diff loop compensates.
- **Web mode (bonus, higher fidelity).** Input is a URL to a web app. You drive it with a browser MCP tool and extract exact computed styles and real asset files via the DOM, then emit React Native. Use this when the target is a web app.

Detect the mode from `$ARGUMENTS`: a URL → web mode; a directory (or nothing → `docs/screenshots/`) → screenshot mode.

## Scope Defaults

Unless the user says otherwise:

- **Fidelity:** As close as the input allows. Screenshot mode targets visual parity under the diff loop; web mode targets exact parity.
- **In scope:** Visual layout, component structure, navigation between screens, per-screen states (empty/loading/filled/dark/modal), mock data for demo purposes.
- **Out of scope:** Real backend / database, authentication logic, real-time features, push, in-app purchases. Data calls become typed mocks with `// TODO: wire backend`.
- **Platforms:** Expo runs iOS, Android, and web from one codebase. The diff loop renders on **web** (fastest to screenshot).

## Pre-Flight

1. **Verify the base project builds:** `npx tsc --noEmit` passes and `npm run web` boots. The Expo Router + NativeWind scaffold is already in place. If not, tell the user to run `npm install` first.
2. **Browser automation is required.** Check for a browser MCP tool (Chrome MCP, Playwright MCP, Puppeteer MCP). You need it to **screenshot your rendered clone** for the diff loop (both modes) and to **extract the DOM** (web mode). If none is detected, ask the user which one they have. This skill's engine cannot run without it.
3. **Screenshot mode:** confirm the screenshots directory exists and list its contents. If empty, ask the user to drop screenshots in (and point them at the filename conventions below). **Web mode:** normalize and verify the URL is reachable.
4. Create output dirs if missing: `docs/research/`, `docs/research/components/`, `docs/design-references/`.

### Filename conventions (screenshot mode — optional but high-leverage)

A folder of screenshots has no inherent structure, and inferring it is the hard part of this skill. The user can bootstrap your accuracy for free by naming files. Honor these if present; fall back to inference if not:

- `screen-state.png` → `home-empty.png`, `home-filled.png`, `home-loading.png`, `profile-dark.png`
- `screen→target.png` (a transition) → `home→detail.png` means "tapping here on Home opens Detail"
- A subfolder per screen → `home/`, `search/`, `profile/` each holding that screen's states

## Guiding Principles

### 1. The Diff Loop Is the Engine
No exact values means no first-shot perfection. Every screen goes through the render→screenshot→diff→fix loop until it matches the original (Phase 6). Do not declare any screen done after writing its code once — that produces the "AI-ish, close-but-wrong" result this tool exists to beat. Plan for 2-4 diff rounds per screen.

### 2. Distinguish Screens From States Before Anything Else
Ten screenshots might be four screens. The same screen appears in multiple states — empty vs. filled, light vs. dark, default vs. modal-open, tab A vs. tab B. **Clustering screenshots into `{screen → [states]}` is the first real step** (Phase 2). Get this wrong and you build duplicate screens or miss states entirely.

### 3. Identify the Navigation Model Before Building
Apps are a **graph of screens**, not one page. Determine the navigation container — bottom **tabs**, a **stack** (push/back), a **drawer**, or a mix — from visual cues: a persistent bottom tab bar across screens means tabs; a back chevron in a header means a stack push. Document it in the screen graph (Phase 3). Getting this wrong means rebuilding the routing, not tweaking a style.

### 4. Completeness Beats Speed
Every builder agent must receive **everything** it needs: the screen's screenshot(s), every state's screenshot, the extracted layout description, exact-where-known values, the color/font/spacing tokens, and verbatim text. If a builder has to guess, you under-specified. In screenshot mode you will estimate some values — say so explicitly in the spec ("estimated ~16px") so the diff loop knows what to scrutinize.

### 5. Small Tasks, Perfect Results
One builder agent per **screen** by default. If a screen is complex (a feed with 3 distinct card types, each with its own layout), split it: one agent per card component plus one for the screen that composes them. If a builder prompt exceeds ~150 lines of spec, the screen is too big — split it. Mechanical rule, don't override it.

### 6. Real Content, Real Layout
Transcribe the **actual text** from the screenshots verbatim (labels, headings, button text, list items). Use real-looking mock data that matches what's shown, not lorem ipsum. Match the actual layout — counts of items, grid vs. list, spacing rhythm.

### 7. Foundation First
Nothing is built until the foundation exists: design tokens in `tailwind.config.js` + `src/lib/tokens.ts`, fonts loaded in `src/app/_layout.tsx`, and the navigation skeleton from the screen graph. This is sequential and you do it yourself (Phase 4). Everything after is parallel.

### 8. Spec Files Are the Source of Truth
Every screen gets a spec file in `docs/research/components/` BEFORE any builder is dispatched. The builder receives the spec inline in its prompt. No spec file → the builder guesses from whatever you remember. Not optional.

### 9. Build Must Always Compile
Every builder verifies `npx tsc --noEmit` before finishing. After each merge you verify `npm run web` still boots. A broken build is never acceptable, even temporarily.

### 10. Be Honest About What You Can't Recover
Assets are baked into the screenshot's pixels. You cannot extract a crisp logo SVG or icon file from a raster screenshot — you re-create icons with a vector icon library (lucide-react-native, already idiomatic) matched by eye, or crop the raster as a last resort. App icons, custom illustrations, and photos are approximated or cropped. **Say this in the spec and the final report.** (Web mode recovers real asset files from the DOM — use them.)

### 11. Triage Data Operations — Implement the On-Device Ones For Real
A clone that can't *do* anything is a dead shell. Not every action needs a backend. For every data action the app performs, classify it:

- **Backend** (server auth, sync, real-time feeds, remote search, payments) → you can't clone it → mock it with typed stubs and a `// TODO: wire backend`.
- **On-device** (local CRUD, drafts, toggles, settings, reordering, a local list the user builds) → **implement it for real** with on-device storage so the clone actually works offline.

Use the ready-made helper `src/lib/store.ts` (`useCollection<T>(key, seed)` → persisted `items` + `add`/`update`/`remove`, backed by AsyncStorage, which also persists on web). Example: a to-do app's "add task", "check off", "delete", and "reorder" are all on-device — build them so tapping **+** genuinely saves and survives a reload. Its "sync across devices" or "log in" is backend — stub it.

In the completion report, state exactly which actions are **real (on-device)** vs **mocked (backend)**. This honesty is also the differentiator: the clone runs.

## Phase 1: Ingest & Inventory

**Screenshot mode:** Read every screenshot in the directory (they are images — view them). Build an inventory table: filename, what screen it appears to be, what state it shows, and any obvious navigation chrome (tab bar, header, back button). Save to `docs/research/INVENTORY.md`.

**Web mode:** Navigate to the URL with browser MCP. Take full-page screenshots at a mobile viewport (390px). Extract global design tokens (fonts via computed `font-family`, the color palette via `getComputedStyle`, spacing) and download real asset files to `assets/`. Then proceed as if those screenshots + the DOM are your input — you have the luxury of exact values, use them.

## Phase 2: Cluster Into Screens & States

Group the inventory into a `{screen → [states]}` map. Two screenshots are the **same screen, different state** if they share layout skeleton, navigation chrome, and header — differing only in content (empty vs. filled), theme (light vs. dark), or an overlay (modal/sheet open). They are **different screens** if the structure or the active nav target differs.

For each screen, record: its canonical name, the list of states with the screenshot backing each, and which state is the "default" (what you'll build first). Honor filename conventions if the user provided them. Record this in `docs/research/SCREEN_GRAPH.md` (alongside the navigation map from Phase 3).

## Phase 3: Infer the Navigation Graph

Produce `docs/research/app-spec.json` (validate it against `docs/research/app-spec.schema.json`). Determine:

- **Navigation type** — tabs / stack / drawer / mixed, from the chrome (a persistent bottom bar across screens → tabs; a back chevron → stack).
- **The graph** — for each screen, which screens it transitions to (from `→` filename hints, from buttons/rows whose labels match another screen's title, or from obvious affordances like a list row opening a detail).
- **Tokens** — the palette, fonts, spacing, radii you observed.

Also write `docs/research/SCREEN_GRAPH.md` as a human-readable map of the navigation. This is your assembly blueprint.

## Phase 4: Foundation Build (sequential, do it yourself)

1. **Tokens** — write the real palette/fonts/spacing/radii into `tailwind.config.js` (semantic color names) and `src/lib/tokens.ts` (runtime values). These two must agree.
2. **Fonts** — if the app uses a recognizable typeface, load it via `expo-font`/`@expo-google-fonts/*` in `src/app/_layout.tsx` and wire `fontFamily` in `tailwind.config.js`. If unsure, pick the closest system/Google font and note the guess.
3. **Navigation skeleton** — from the screen graph, set up Expo Router: a `(tabs)` group with a tab bar for tabs apps, or a `Stack` for stack apps. Create an empty route file per screen so the structure compiles before screens are filled.
4. **Icons** — install `lucide-react-native` if the app uses standard icons; map each observed icon to the closest lucide icon by eye.
5. Verify: `npx tsc --noEmit` and `npm run web` both pass.

## Phase 5: Per-Screen Spec & Dispatch

The core loop. For each screen in the graph (start from the default/home screen), do THREE things: **describe**, **write the spec file**, **dispatch builder(s)**.

### Step 1: Describe the screen from its screenshot(s)
For the screen and each of its states, read the screenshot carefully and extract:
- **Layout** — the structural hierarchy top to bottom (header, content regions, lists/grids, footer/tab bar). Describe flex direction, alignment, and the spacing rhythm.
- **Components** — each distinct UI element: type (button, card, list row, avatar, input, chip), its text, its styling (color, size, weight, radius, border, shadow) to the precision you can judge. Mark estimates as estimates.
- **Per-state deltas** — for each non-default state, what changes vs. the default (e.g., "loading: list replaced by 6 skeleton rows"; "dark: bg #0a0a0a, text #fafafa").
- **Assets** — which images/icons appear; for each, decide: lucide icon match, re-create, or crop raster. Note the decision.
- **Data actions** — for every interactive action on the screen (add, edit, delete, toggle, reorder, search), triage it **backend** (mock) vs **on-device** (implement for real via `src/lib/store.ts`). See Principle 11.
- **Verbatim text** — every visible string.

### Step 2: Write the spec file
`docs/research/components/<screen-name>.spec.md`, using the template at the end of this skill. Fill every section. Mark non-applicable sections "N/A" but think twice before doing so.

### Step 3: Dispatch builder(s)
Based on complexity:
- **Simple screen:** one builder agent gets the whole screen.
- **Complex screen (3+ distinct sub-components):** one agent per sub-component (built first) + one for the screen route that composes them.

Each builder receives, inline in its prompt:
- The full spec file contents (don't say "go read the file")
- The path(s) to the screen's screenshot(s) in `docs/design-references/` so it can view them directly
- The target route/component file path (e.g. `src/app/profile.tsx`, `src/components/ProfileCard.tsx`)
- Which shared things to use: NativeWind `className` styling, tokens from `tailwind.config.js`, `src/lib/tokens.ts`, lucide icons
- Instruction to verify `npx tsc --noEmit` before finishing

Dispatch builders in **git worktrees** so they work in parallel without colliding. Don't wait — once a screen's builders are dispatched, move to describing the next screen.

### Step 4: Merge
As builders finish: merge their worktree branch, run `npm run web` to confirm it still boots, fix any type errors immediately. Continue describe→spec→dispatch→merge until all screens are built.

## Phase 6: Visual-Diff Loop (the engine)

**Functional gate first — a screenshot proves it *rendered*, not that it *runs*.**
Before (and during) the visual diff, drive the app in the browser and **capture the
console**: load every route and assert **zero** `pageerror` / `console.error`, then
exercise the on-device actions (add / edit / delete / toggle) and a **reload** to
confirm they actually work and persist. Any runtime error is a FAILURE even if the
screenshot looks perfect — do not rely on the screenshot alone. Automate this
(e.g. Playwright collecting `page.on('pageerror')` and `page.on('console')`), and
test the **dev server**, not just the production export (some errors only surface
in one). Only once the app runs clean do you compare pixels:

For every screen, after it's built and merged, run the loop:

1. **Render** the screen in the running Expo web app at the device viewport (e.g. 390px wide). Navigate to its route.
2. **Screenshot** the rendered clone via browser MCP.
3. **Diff** against the original screenshot, side by side, region by region top to bottom. Look for: wrong spacing/padding, off colors, wrong font size/weight, missing elements, missing layered/overlay elements, wrong border radius, wrong layout (stacked vs. row), missing states.
4. **Fix** each discrepancy: update the component (or the tokens if the whole app is off). If a value was a guess, this is where you correct it.
5. **Repeat** until the rendered clone matches the original. Then do the same for each non-default **state** (toggle dark mode, trigger the modal, switch the tab).

This loop is what turns "close" into "right." Budget multiple rounds per screen. Do not skip it.

## Phase 7: Assembly & Completion

1. Wire the full navigation in Expo Router per the screen graph (tabs/stack/drawer, transitions between screens). Connect mock data to screen props.
2. Verify `npm run web` boots clean and `npx tsc --noEmit` passes.
3. Walk the whole app: tap through every navigation path, toggle every state, confirm transitions work.
4. **Completion report** — see below.

## Spec File Template

```markdown
# <ScreenName> Specification

## Overview
- **Target route/file:** `src/app/<route>.tsx`
- **Screenshots:** `docs/design-references/<default>.png` (+ states)
- **Navigation:** reached via <tab | push from X | drawer>; transitions to <Y, Z>
- **States:** default, <empty | loading | dark | modal | tab-variants...>

## Layout
<Top-to-bottom structural hierarchy: regions, flex direction, alignment, spacing rhythm>

## Components
### <Component 1, e.g. Header>
- type: <header/card/row/button/...>
- text: "<verbatim>"
- styling: bg <color>, text <color/size/weight>, padding <est. value>, radius <value>, border/shadow <...>
- (mark estimated values as "~estimate")

### <Component N>
...

## States & Deltas
### State: <loading>
- <what changes vs. default — e.g. "list → 6 skeleton rows, shimmer">
### State: <dark>
- <bg, text, border color overrides>

## Assets
- <icon/image>: <lucide match `SearchIcon` | re-create | crop raster> — <note>

## Text Content (verbatim)
<every visible string>

## Mock Data
<the shape + sample values matching what's shown; mark backend calls as TODO>
```

## Pre-Dispatch Checklist

Before dispatching ANY builder, confirm:
- [ ] Spec file written with all sections filled
- [ ] The screen's screenshot path(s) included for the builder to view
- [ ] Navigation in/out of the screen is documented
- [ ] Every state's delta is captured
- [ ] Estimated values are flagged as estimates
- [ ] Asset decisions (lucide / re-create / crop) are made
- [ ] Text is verbatim, not paraphrased
- [ ] The builder prompt is under ~150 lines; if over, split the screen

## What NOT to Do

- **Don't declare a screen done after writing it once.** The diff loop (Phase 6) is mandatory — skipping it is how you ship the AI-ish near-miss.
- **Don't treat every screenshot as a separate screen.** Cluster into screens-and-states first (Phase 2), or you'll build duplicates and miss states.
- **Don't guess the navigation model.** Read the chrome — persistent bottom bar = tabs, back chevron = stack. Wrong guess = routing rewrite.
- **Don't pretend you recovered assets you didn't.** Raster screenshots don't contain SVGs. Match icons with lucide, re-create, or crop — and say which in the report.
- **Don't hand a builder a whole complex screen.** Split feeds/grids with multiple card types into per-component agents.
- **Don't reference docs from builder prompts.** Spec contents go inline; the builder shouldn't need to read external files.
- **Don't skip states.** If the app shows empty/loading/dark/modal, build them. They're half of what makes a clone feel real.
- **Don't dispatch without a spec file.**

## Honest Limitations (state these to the user)

- **Screenshot mode has no exact values** — fidelity comes from the diff loop, not from measurement. Some spacing/colors are best-effort.
- **Assets baked into pixels** — logos, app icons, custom illustrations, and photos are approximated (lucide / re-created) or cropped raster, not original files.
- **Coverage is bounded by the screenshots provided** — screens or states the user didn't capture can't be cloned. Report what wasn't covered.
- **No backend** — data is mocked; every data call is a typed stub marked `// TODO: wire backend`.

## Completion

Report:
- Screens built / total screens in the graph
- States built per screen
- Navigation model implemented (tabs/stack/drawer)
- Components created; spec files written (should match)
- Diff-loop rounds run per screen and final match quality
- Asset decisions (how many lucide-matched / re-created / cropped)
- Build status (`npm run web`, `npx tsc --noEmit`)
- **Honest gaps:** screens/states not provided, assets approximated, values still uncertain
