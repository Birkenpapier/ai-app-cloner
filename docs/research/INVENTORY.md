# MindMeister — Screenshot Inventory

Source: 11 App Store screenshots (`460x996bb*.webp`), covering **two apps** from
MeisterLabs. This clone targets **MindMeister**; MeisterTask is a separate clone.

Marketing chrome (headline caption + device frame) was ignored — only the app UI
inside each phone was reconstructed. The 1 cover tile is branding art, not a screen.

| Screenshot | Screen | State | Nav chrome |
| --- | --- | --- | --- |
| `460x996bb-7.webp` | — (marketing cover) | — | logo + illustration |
| `editor.png` (`-8`) | **Map editor** | default | top bar (back/undo/info/share), bottom toolbar |
| `comments.png` (`-9`) | **Comments** | default | header (X / Comments), input bar |
| `icon-picker.png` (`-10`) | **Map editor** | icon-picker (bottom sheet) | sheet over the editor |
| `recent.png` (`-11`) | **Recent maps** | default | header + bottom tab bar |

The bottom tab bar (visible in `recent`) shows **3 destinations**: clock (Recent),
star (Favorites), grid (Templates). `icon-picker` is not a separate screen — it's a
**state** of the editor (styling the selected node), so it was built as a bottom
sheet toggled from the editor's brush tool. Favorites and Templates had no dedicated
screenshot, so they were built as real, functional screens off the same data store.
