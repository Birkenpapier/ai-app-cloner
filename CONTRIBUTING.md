# Contributing

Thanks for being here. This project has a tiny core and an enormous surface area
(every app in the world is a new test case), so there is a lot of genuinely useful
work that has nothing to do with writing core code. Pick whatever sounds fun.

## Ways to help

- **Run it on an app and tell us what happened.** Point `/clone-app` at some
  screenshots, then open an issue with the ["Agent verification report"](.github/ISSUE_TEMPLATE/agent-report.md)
  template. What worked, what came out wrong, which agent you used. This is the
  single most valuable thing you can do, and it needs zero setup beyond running it.
- **Sharpen the skill.** The whole engine is one English file:
  [`.claude/skills/clone-app/SKILL.md`](.claude/skills/clone-app/SKILL.md). If the
  clone came out "close but wrong," the fix usually lives there. Edit the source,
  then run `node scripts/sync-skills.mjs` and `bash scripts/sync-agent-rules.sh` so
  every agent's copy stays in sync.
- **Add or repair a demo.** Each `demo/*` branch is one finished clone. A new one
  is a great PR (see below). A fix to an existing one is even better.
- **Docs, agent configs, examples.** Typos, clearer wording, a config for an agent
  we do not cover yet.

## Running it locally

```bash
git clone https://github.com/Birkenpapier/ai-app-cloner
cd ai-app-cloner
npm install
npx playwright install chromium   # one-time, used by npm run verify
npm run web                       # the blank template boots in a browser
```

Then, inside a skill-capable agent (Claude Code is the reference), connect a
browser-automation MCP and run `/clone-app`. Full walkthrough in the
[README](README.md#quickstart).

## The one rule: `verify` stays green

A clone that renders but does not work is exactly the thing this tool exists to
beat. So every demo has to pass:

```bash
npm run verify   # exports the web build, then drives it headlessly
```

`verify` loads every route and checks for zero console/runtime errors, then replays
the app's real features (`e2e/flows.mjs`) and asserts they actually happen and
survive a reload. If you touch a demo, keep its flows passing. If you add a feature
a user can see, add a flow that proves it.

## Contributing a new demo clone

1. Branch from `main`: `git checkout -b demo/<app>`.
2. Run `/clone-app` on the app's screenshots (App Store screenshots are fair game).
3. Make every visible control do something real, on-device and persisted. Tapping,
   editing an item's own text, deleting, a gesture. Not a dead button in sight.
4. Write `e2e/flows.mjs` so `npm run verify` proves it (one add, one edit, one
   delete at minimum), and get it green.
5. Do **not** commit the source screenshots (`docs/design-references/` is gitignored
   on purpose, so we never redistribute an app's images). Re-create icons; do not
   copy assets.
6. In the PR, be honest about the gaps: what you could not recover, what is mocked.

## PRs

Small and focused beats big and sprawling. Say what changed and why, and keep the
build green (`npx tsc --noEmit` and `npm run verify`). Be kind in reviews. Everyone
here is figuring out how to measure a screenshot without a ruler.

## Ethics

Read [Legal and ethics](README.md#legal-and-ethics) before publishing a clone of a
named product. Clone to learn and prototype, respect trademarks, and do not pass a
clone off as your own product.

Happy cloning. 💜
