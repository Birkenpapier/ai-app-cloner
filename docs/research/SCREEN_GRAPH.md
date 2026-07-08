# Screen Graph — MindMeister

Human-readable map of the cloned app's navigation, backing `app-spec.json`.

## Navigation model

**Type:** mixed (bottom **tabs** + **stack**/modal pushes over them)
**Tab bar (light):** Recent · Favorites · Templates — Recent is the landing tab.

## Graph

```
Login  (/)  — auth is backend → mocked; any button enters the app
  └──▶ [Tabs]

[Tabs]
 ├── Recent ★default ─▶ Editor    (tap a map card)
 │                    └▶ NewMap    (header +, modal)
 ├── Favorites       ─▶ Editor    (starred maps; star toggles on the card)
 └── Templates       ─▶ Editor    (tap a template → creates a map)

Editor  /map/[id]       — stack push, has back
  ├── icon-picker        — bottom-sheet STATE (brush tool → style a node)
  └──▶ Comments /comments/[id]  — modal (comment thread + composer)
NewMap  /new-map        — modal → creates a map, opens Editor
```

## Screens

| Screen | Route | States | Reached via | Goes to | From screenshot |
| --- | --- | --- | --- | --- | --- |
| Login | `/` | default | app launch | Recent | — (brand entry) |
| Recent | `/recent` | default | tab | Editor, NewMap | ✅ `recent.png` |
| Favorites | `/favorites` | default, empty | tab | Editor | — (derived) |
| Templates | `/templates` | default | tab | Editor | — (derived) |
| Editor | `/map/[id]` | default, icon-picker | push from a map | Comments | ✅ `editor.png`, `icon-picker.png` |
| Comments | `/comments/[id]` | modal | push from Editor | — | ✅ `comments.png` |
| NewMap | `/new-map` | modal | header + | Editor | — (derived) |
