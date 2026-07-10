# Roadmap

**Screenshots in, a real app out.** v1 gives you the working UI. v2 gives it a
backend. v3 goes native.

Everything ships behind an opt-in flag, and nothing is ever claimed that the
verify harness can't prove. Honesty about limits is a feature, not an apology.

---

## ✅ v1 — Screenshots → working Expo / React Native (shipped)

Drop a folder of screenshots, get a running cross-platform app.

- **Cluster** screenshots into `{screen → states}`, **infer the navigation graph**
  (tabs / stack / drawer) from the chrome.
- **Foundation**: real palette/typography/spacing into `tailwind.config.js` +
  `tokens.ts`; nav skeleton from the graph.
- **Per-screen builders** dispatched in parallel from spec files.
- **Visual-diff loop** as the engine: render → screenshot → diff → fix → repeat.
- **On-device persistence** (`useCollection`) so the clone actually works, not a
  dead shell. Data-op triage marks each action ON-DEVICE (real) or BACKEND (mocked).
- **Verify harness** (`npm run verify`): every route renders with zero console
  errors, every feature flow proven (add/edit/persist across reload).
- **Multi-agent**: one source of truth generates `/clone-app` for 13 AI coding agents.
- **5 demo branches**: Todoist, Google Keep, Spendee, **MeisterTask**, **MindMeister**
  (the last two cloned end-to-end from real App Store screenshots).

The one gap v1 leaves on purpose: **data is mocked on-device.** That's what v2 fixes.

---

## 🔜 v2 — Full-stack mode: infer a backend from the screenshots

> The pitch: **the only tool that turns screenshots into a running full-stack app,
> not just a UI.** A clone whose data survives, syncs, and is real.

The screenshots already show the data model if you look: a list of tasks *is* a
`tasks` table; a card's fields *are* columns; a row opening a detail *is* a foreign
key. v2 reads that, generates a typed backend, and wires the v1 UI to it.

Shipped in **two tiers** so there's a win early and a real backend later.

### v2.0 — Mock backend (typed, local, offline) — the fast win

> **Status: engine built and proven end-to-end** (branch `feat/v2-backend`). The IR
> now carries a `dataModel`; `npm run gen:backend` emits a Drizzle schema +
> drizzle-zod validators + in-process tRPC routers + typed hooks over the on-device
> store; and the example (a Notes app) passes `npm run verify` — create through the
> tRPC API renders and survives a reload. Still to do: wire it into more demo clones
> and add the `/clone-app --backend=mock` inference pass on real screenshots.

Generate a real API surface with local persistence. No cloud, no auth, runs offline.

- Infer entities + fields + types + relations from the screens.
- Emit a **Drizzle schema** → **drizzle-zod** validators.
- Generate a **typed API layer** (tRPC routers) backed by **SQLite / in-memory**.
- Rewire the UI's `// TODO: wire backend` stubs to call the generated client.
- Verify: seed → API round-trip → UI reads it back → persists across reload.

Ships as `/clone-app --backend=mock`. This alone is demo-gold: the clone now has a
real data layer you can inspect, query, and extend.

### v2.1 — Real backend (Supabase) — the upgrade

Promote the same schema to a real Postgres on **Supabase**.

- Same inferred model → **Supabase Postgres** (runnable DDL).
- Generated **CRUD** per entity (tRPC over Hono), deployed or run locally.
- **Auth** (Supabase Auth) replacing the mocked login, plus starter **Row-Level
  Security** policies (owner-scoped by default, flagged as a starting point).
- Scaffold from **create-t3-turbo** so client + server + db share types end-to-end.

Ships as `/clone-app --backend=supabase`. Now the clone is a real multi-device app.

### The inference pipeline (both tiers)

1. **Two-pass extraction.** Pass A reads the GUI (already done for v1). Pass B
   re-reads the same screenshots asking a different question: *what is the data
   model behind this?* Structured-output LLM call → candidate entities.
2. **Merge + reconcile.** Fold per-screen entities into one model; unify duplicate
   entities, infer FKs from list→detail transitions and matching labels.
3. **Codegen.** entities → Drizzle schema → drizzle-zod → tRPC routers (one CRUD
   set per entity) → typed client.
4. **Wire.** Replace the v1 mock stubs with client calls; keep `useCollection` as
   the offline cache in mock mode.
5. **Verify.** Extend the harness with API round-trip flows on top of the UI flows.

Roughly ~200 lines of glue on top of the existing skill; most of the work is the
extraction prompt and the codegen templates.

### What's deducible — and what isn't (stated honestly, always)

| ✅ Deducible from screenshots | ❌ NOT deducible (we say so) |
| --- | --- |
| Entities & their fields | Business logic / workflows |
| Field types (text, number, date, bool, enum) | Auth rules beyond owner-scoped defaults |
| CRUD operations | Hidden tables never shown on screen |
| Foreign-key hints (list → detail) | Computed columns, triggers |
| Obvious enums (status chips, tags) | Constraints, indexes, uniqueness rules |

Realistic ceiling: **~60–80% of the schema**, and that's genuinely useful. The
report names every guess and every gap. No pretending.

### Prior art we learn from

BESSER / IFML (ICWE 2025) and DataMock for UI→model extraction; Supabase's AI
Assistant for the runnable-DDL + RLS pattern. Our edge is the **end-to-end**
path: screenshots all the way to a running, typed, wired app.

---

## 🧭 v3 — Native output (later)

Once the UI and the backend are solid, go truly native.

- **Screenshots → SwiftUI / Jetpack Compose** from the same app-spec IR (the IR
  was designed platform-agnostic for exactly this).
- **Stretch: decompile → native.** APK/IPA teardown to recover exact layouts for
  apps you own or are authorized to analyze.

Native is deliberately last: Expo already *looks* native, so this is the smallest
marginal win of the three and the biggest lift. Backend first, native later.

---

## Principles (all versions)

- **Opt-in.** Every stage is a flag. v1 stays a two-minute magic trick.
- **Verify or it didn't happen.** If the harness can't prove it, we don't claim it.
- **Honest limits.** Every clone reports what was approximated, mocked, or not
  recoverable. That candor is the brand.
