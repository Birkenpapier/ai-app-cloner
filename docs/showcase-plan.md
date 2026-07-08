# Showcase Apps — build plan

WOW demos that double as **v2 backend proofs**.

**Principle:** pick apps whose backend is *inferable* from screenshots (CRUD-shaped),
so each demo shows not just a UI clone but a working data model. Visual-only apps
(Spotify, Duolingo) are hollow — their value is streamed content / course logic you
can't recover from pixels. Every app below has a schema you can read off the screens.

**Screenshot sourcing:** iTunes `screenshotUrls` where available — **Discord ✅ (6),
Reddit ✅ (6)**. Notion & Linear return 0 iPhone shots via the API (capture ~5 in-app
or pull from the web). Marketing chrome (caption + device frame) is ignored, as with
MeisterTask/MindMeister; copyrighted source shots are never committed.

**Why this ordering:** each schema here is hand-authored ground truth. Build the app
(v1), then later run v2 `--backend` and diff the *auto-inferred* schema against these.
The showcase apps and the v2 roadmap are the same work.

---

## 1. Discord ⭐ (screenshots ready, id 985746746)

**WOW:** iconic dark chat, universal recognition. **Audience:** devs (bullseye).

**Screens:** server rail + channel list + message view · DM list · thread/message
composer · member list · server-drawer. Nav: split (server rail → channels → messages).

**Anticipated schema (v2 ground truth):**
```
users(id, username, avatar, status: online|idle|dnd|offline)
guilds(id, name, icon, ownerId→users)
channels(id, guildId→guilds, name, type: text|voice|category, position, topic)
messages(id, channelId→channels, authorId→users, content, createdAt, editedAt?)
memberships(id, guildId→guilds, userId→users, nickname?, roleIds[])
roles(id, guildId→guilds, name, color, position)
reactions(id, messageId→messages, userId→users, emoji)
dm_channels(id, participantIds[]→users)
```
**Real flows (on-device / mock API):** send message · switch channel & server ·
add reaction · scroll history. Realtime/voice → mocked.
**Not deducible:** permissions matrix, voice infra, moderation rules.

---

## 2. Linear ⭐ (my add — dev-audience bullseye, id 1645587184)

**WOW:** gorgeous, beloved by exactly our HN/dev crowd. **Pure CRUD** = the cleanest
possible v2 demo. Screenshots: capture ~5 in-app (API gave 0).

**Screens:** issue list (grouped by status) · issue detail · board / kanban ·
project view · My Issues · create-issue sheet.

**Anticipated schema:**
```
users(id, name, avatar)
teams(id, name, key)
projects(id, teamId→teams, name, status, leadId→users, targetDate?)
issues(id, teamId→teams, projectId→projects?, title, description,
       status: backlog|todo|in_progress|done|canceled,
       priority: 0..4, assigneeId→users?, estimate?, createdAt)
labels(id, teamId→teams, name, color)
issue_labels(issueId→issues, labelId→labels)
comments(id, issueId→issues, authorId→users, body, createdAt)
cycles(id, teamId→teams, number, startsAt, endsAt)
```
**Real flows:** create issue · change status (select / drag on board) · assign ·
set priority · comment · filter by status. All genuinely mockable.
**Not deducible:** workflow automations, integrations, SLA logic.

---

## 3. Notion (his pick, id 1232780281)

**WOW:** tech-crowd darling, clean. Screenshots: capture ~5 in-app (API gave 0).

**Screens:** sidebar page tree · page editor (blocks) · block-type menu · a simple
database/table view.

**Anticipated schema:**
```
users(id, name, avatar)
workspaces(id, name)
pages(id, workspaceId→workspaces, parentPageId→pages?, title, icon?, cover?, createdBy→users)
blocks(id, pageId→pages, parentBlockId→blocks?, type: text|h1|h2|h3|todo|toggle|
       bullet|numbered|quote|divider|image|code, content(json), order, checked?)
databases(id, pageId→pages, name)            -- optional, if a table screen is provided
db_rows(id, databaseId→databases, values(json))
```
**Real flows:** add block · edit text inline · toggle a to-do · create/nest a page ·
reorder blocks. **Hardest UI** of the three (the block editor) — scope to a core set
of block types first.
**Not deducible:** formula/rollup logic, permissions, real-time cursors.

---

## Bonus (all screenshot-ready or trivial, same CRUD logic)

- **Reddit** (id 1064216828, 6 shots ✅) — `subreddits → posts → comments(nested) →
  votes`. Feed · subreddit · post+comments · compose. Flows: vote, comment, switch sub.
- **Slack** — workspaces → channels → messages (Discord-shaped).
- **X / Twitter** — users → tweets → likes/replies/follows (social graph).
- **GitHub Mobile** — repos → issues/PRs → comments (dev audience).

---

## Recommended first build: **Discord**

Screenshots are ready, recognition is highest, the schema is textbook-clean, and it
lands directly in our dev audience. Linear is the strongest #2 (needs a 5-shot capture).
Both make the v2 "it inferred a real backend" story concrete.
