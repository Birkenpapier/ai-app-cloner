# Screen Graph

Human-readable map of the cloned app's navigation. `/clone-app` writes this in
Phase 3 alongside `app-spec.json`; it's the blueprint for Phase 7 assembly.

> The content below is an **example** (matching `app-spec.example.json`). The
> clone-app run overwrites it with the real app's graph.

## Navigation model

**Type:** tabs · **Tab bar:** Home · Search · Profile

## Graph

```
[Tabs]
 ├── Home  (default, empty, loading, dark)
 │     └──▶ NoteDetail   (tap a note row)
 ├── Search  (default, results)
 │     └──▶ NoteDetail   (tap a result)
 └── Profile  (default, dark)
       └──▶ Settings     (tap "Settings" row)

NoteDetail  — stack push, has back
Settings    — stack push, has back
```

## Screens

| Screen | Route | States | Reached via | Goes to |
| --- | --- | --- | --- | --- |
| Home | `/` | default, empty, loading, dark | tab | NoteDetail |
| Search | `/search` | default, results | tab | NoteDetail |
| Profile | `/profile` | default, dark | tab | Settings |
| NoteDetail | `/note/[id]` | default | push from Home/Search | — |
| Settings | `/settings` | default | push from Profile | — |
