#!/usr/bin/env node

/**
 * Generates the /clone-app command + skill files for every supported AI coding agent.
 * Source of truth: .claude/skills/clone-app/SKILL.md
 *
 * Usage: node scripts/sync-skills.mjs
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = join(ROOT, '.claude', 'skills', 'clone-app', 'SKILL.md');

// --- Parse source skill ---

let raw;
try {
  raw = readFileSync(SOURCE, 'utf8').replace(/\r\n/g, '\n');
} catch {
  console.error('Error: source skill not found at .claude/skills/clone-app/SKILL.md');
  process.exit(1);
}

// Strip YAML frontmatter if present; fall back to the whole file.
const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
const body = match ? match[2] : raw;

const shortDesc =
  'Clone a mobile app into a working Expo / React Native project from screenshots (or a web app URL)';

// --- Helpers ---

function write(relPath, content) {
  const full = join(ROOT, relPath);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content, 'utf8');
  console.log(`  ✓ ${relPath}`);
}

const HEADER =
  '<!-- AUTO-GENERATED from .claude/skills/clone-app/SKILL.md — do not edit directly.\n' +
  '     Run `node scripts/sync-skills.mjs` to regenerate. -->\n\n';

// What the user passes to /clone-app: a screenshots dir or a URL (both optional).
const ARG = 'the screenshots directory or web app URL the user provided (default: docs/screenshots/)';
const noArgs = (text) => text.replace(/\$ARGUMENTS/g, ARG);

// --- Generate ---

console.log('Syncing clone-app skill to all platforms...');
console.log('  Source: .claude/skills/clone-app/SKILL.md\n');

// 0. Claude Code plugin — verbatim skill copy distributed via the marketplace (skills/<name>/SKILL.md)
write('skills/clone-app/SKILL.md', raw);

// 1. Codex CLI — same SKILL.md format, same $ARGUMENTS syntax
write('.codex/skills/clone-app/SKILL.md', raw);

// 2. GitHub Copilot (coding agent) — same SKILL.md format
write('.github/skills/clone-app/SKILL.md', raw);

// 3. Cursor — plain markdown command, no argument substitution
write('.cursor/commands/clone-app.md', HEADER + noArgs(body));

// 4. Windsurf — markdown workflow
write('.windsurf/workflows/clone-app.md', HEADER + noArgs(body));

// 5. Gemini CLI — TOML format, {{args}} for arguments
const geminiBody = body.replace(/\$ARGUMENTS/g, '{{args}}');
write(
  '.gemini/commands/clone-app.toml',
  `# AUTO-GENERATED from .claude/skills/clone-app/SKILL.md\n` +
    `# Run \`node scripts/sync-skills.mjs\` to regenerate.\n\n` +
    `description = "${shortDesc}"\n` +
    `name = "clone-app"\n\n` +
    `prompt = '''\n${geminiBody}\n'''\n`
);

// 6. OpenCode — markdown + YAML frontmatter, $ARGUMENTS works natively
write('.opencode/commands/clone-app.md', `---\ndescription: "${shortDesc}"\n---\n${HEADER}${body}`);

// 7. Augment Code — markdown + YAML frontmatter
write(
  '.augment/commands/clone-app.md',
  `---\ndescription: "${shortDesc}"\nargument-hint: "[<screenshots-dir> | <url>]"\n---\n${HEADER}${body}`
);

// 8. Continue — prompt file with invokable: true
write(
  '.continue/commands/clone-app.md',
  `---\nname: clone-app\ndescription: "${shortDesc}"\ninvokable: true\n---\n${HEADER}${body}`
);

// 9. Amazon Q — JSON agent definition
write(
  '.amazonq/cli-agents/clone-app.json',
  JSON.stringify(
    {
      name: 'clone-app',
      description: shortDesc,
      prompt: noArgs(body),
      fileContext: ['AGENTS.md', 'docs/research/**'],
    },
    null,
    2
  ) + '\n'
);

console.log('\nDone. Generated the Claude Code plugin skill + 9 platform command files from the source skill.');
