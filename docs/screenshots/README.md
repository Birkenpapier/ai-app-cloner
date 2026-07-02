# Drop your screenshots here

Put screenshots of the app you want to clone in this folder, then run `/clone-app`.

## What to capture

Capture **most of the app's states**, not just the home screen. For each screen:
default state, plus empty / loading / dark / any open modal or sheet / each tab
variant. Coverage decides what the clone can contain — see
[`../research/INSPECTION_GUIDE.md`](../research/INSPECTION_GUIDE.md).

## Naming (optional but recommended)

Names let the cloner skip the guesswork of figuring out structure:

- `home-filled.png`, `home-empty.png`, `home-dark.png` — a screen and its states
- `home→detail.png` — tapping here on Home opens Detail (a navigation edge)
- or a subfolder per screen: `home/`, `search/`, `profile/`

Unnamed files work too — the cloner clusters them by visual similarity.

(This folder's images are git-ignored by default; only this README is tracked.)
