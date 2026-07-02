# Inspection Guide (screenshot mode)

How to read a pile of screenshots well enough to rebuild the app. This is the
recon discipline behind `/clone-app` — the agent follows it, and you can use it
to judge whether the screenshots you captured are enough.

## What makes a good screenshot set

Coverage is everything — the clone can only contain what the screenshots show.
For each screen, capture:

- **The default state** (the screen as it normally appears, with content)
- **Empty state** (no data yet) and **loading state** (skeletons/spinners) if they exist
- **Dark mode** if the app supports it
- **Overlays** — any modal, bottom sheet, dropdown, or dialog, captured while open
- **Tab/segment variants** — if a screen has switchable content, capture each one

Aim for breadth over polish. A blurry screenshot of a state you have beats a
crisp screenshot of a state you skipped.

## Filename conventions (optional, high-leverage)

Inferring structure from unnamed files is the hardest step. You can hand the
agent the answer for free:

| Pattern | Means |
| --- | --- |
| `home-filled.png` | the `Home` screen, `filled` state |
| `home-empty.png` / `home-loading.png` / `home-dark.png` | other states of `Home` |
| `home→detail.png` | tapping here on `Home` opens `Detail` (a graph edge) |
| `home/` subfolder | a folder per screen, holding that screen's states |

If you don't name them, the agent clusters by visual similarity instead — it
works, but labels make it accurate.

## How the agent reads each screen

1. **Cluster** screenshots into `{screen → [states]}`. Same layout skeleton +
   same nav chrome + different content/theme/overlay = same screen, new state.
2. **Read the navigation chrome.** A persistent bottom bar across screens means
   **tabs**. A back chevron in the header means a **stack** push. A hamburger /
   slide-in panel means a **drawer**.
3. **Map the graph.** Edges come from `→` filenames, from buttons/rows whose text
   matches another screen's title, and from obvious affordances (a list row opens
   a detail screen).
4. **Describe layout** top to bottom: regions, flex direction, spacing rhythm,
   grids vs. lists, the tab bar / header.
5. **Transcribe text** verbatim and decide each asset's fate (match to a lucide
   icon, re-create, or crop the raster).

## Values you can and can't trust

- **Colors:** sample from the pixels — reliable for solid fills, approximate for
  gradients and anti-aliased edges.
- **Spacing & sizes:** estimated from the image. Mark them as estimates in the
  spec; the visual-diff loop corrects them.
- **Fonts:** identify the family by eye (or accept the closest Google/system
  font). Exact weights are a best guess until the diff loop.
- **Assets:** not recoverable as files. Icons → lucide matches; logos/photos →
  re-created or cropped raster.

This uncertainty is expected and fine — it's exactly why the **visual-diff loop**
(render → screenshot → diff → fix) is the engine, not an afterthought.

> Web mode is different: the DOM gives exact computed styles and real asset files,
> so trust those values directly.
