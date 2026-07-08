# Screen Graph — MeisterTask

Human-readable map of the cloned app's navigation, backing `app-spec.json`.

## Navigation model

**Type:** mixed (bottom **tabs** + **stack** pushes over them)
**Tab bar (dark):** Notifications · Focus · Agenda · Projects — Agenda is the landing tab.

## Graph

```
Login  (/)  — auth is backend → mocked; any button enters the app
  └──▶ [Tabs]

[Tabs]
 ├── Notifications  ─▶ TaskDetail   (tap a mention → its linked task)
 ├── Focus          ─▶ TaskDetail   (in-progress tasks)
 ├── Agenda ★default ─▶ TaskDetail   (tap a card)
 │                   └▶ AddTask      (header +, modal)
 └── Projects       ─▶ Board         (tap a project)

Board  /board/[id]      — stack push, has close (X); ─▶ TaskDetail, ─▶ AddTask (FAB)
TaskDetail /task/[id]   — stack push, has close (X); ─▶ Automations
Automations /automations — stack push, has back
AddTask /add-task       — modal
```

## Screens

| Screen | Route | States | Reached via | Goes to | From screenshot |
| --- | --- | --- | --- | --- | --- |
| Login | `/` | default | app launch | Agenda | — (brand entry) |
| Agenda | `/agenda` | default | tab | TaskDetail, AddTask | ✅ `agenda.png` |
| Notifications | `/notifications` | default | tab | TaskDetail | ✅ `notifications.png` |
| Projects | `/projects` | default | tab | Board | — (derived) |
| Focus | `/focus` | default, empty | tab | TaskDetail | — (derived) |
| Board | `/board/[id]` | default | push from Projects | TaskDetail, AddTask | ✅ `board.png` |
| TaskDetail | `/task/[id]` | default, completed | push from cards/notifs | Automations | ✅ `task-detail.png` |
| Automations | `/automations` | default | push | — | ✅ `automations.png` |
| AddTask | `/add-task` | modal | header + / FAB | — | — (derived) |
