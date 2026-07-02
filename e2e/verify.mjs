// ────────────────────────────────────────────────────────────────────────────
// Automated functional verification.
//
// Drives the built web app in a headless browser and proves the clone actually
// WORKS — not just that it renders:
//   1. every route loads with ZERO runtime / console errors,
//   2. every declared feature flow passes (e.g. "add a task -> it persists"),
//   3. a screenshot of each screen is saved to e2e/shots/ for visual review.
//
// A screenshot proves it rendered; this proves it runs. Run: `npm run verify`
// (which exports the web build first). To test a running dev server instead:
//   VERIFY_URL=http://localhost:8081 node e2e/verify.mjs
//
// The routes + flows are declared per-clone in ./flows.mjs (the /clone-app skill
// writes that file for the app it just built).
// ────────────────────────────────────────────────────────────────────────────
import { chromium } from 'playwright';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

import { flows, routes } from './flows.mjs';

const OUT = path.resolve('e2e/shots');
fs.mkdirSync(OUT, { recursive: true });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// Target: a running server (VERIFY_URL) or a local static server over dist/.
let base = process.env.VERIFY_URL || null;
let server = null;
if (!base) {
  const DIST = path.resolve('dist');
  if (!fs.existsSync(DIST)) {
    console.error('No dist/ found — run `expo export --platform web` first (or `npm run verify`).');
    process.exit(2);
  }
  const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml', '.ttf': 'font/ttf', '.woff2': 'font/woff2', '.ico': 'image/x-icon' };
  server = http.createServer((req, res) => {
    const url = decodeURIComponent(req.url.split('?')[0]);
    let file = path.join(DIST, url);
    if (url === '/' || !path.extname(url) || !fs.existsSync(file)) file = path.join(DIST, 'index.html');
    res.writeHead(200, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  });
  await new Promise((r) => server.listen(0, r));
  base = `http://localhost:${server.address().port}`;
}

const errors = [];
let where = 'init';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 402, height: 874 }, deviceScaleFactor: 2 });
page.on('pageerror', (e) => errors.push(`[${where}] pageerror: ${e.message}`));
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(`[${where}] console.error: ${m.text().slice(0, 200)}`);
});

// 1. Every route renders clean.
const routeResults = [];
for (const r of routes) {
  where = `route ${r}`;
  const before = errors.length;
  await page.goto(base + r, { waitUntil: 'networkidle' });
  await wait(600);
  const name = r === '/' ? 'index' : r.replace(/^\//, '').replace(/\//g, '_');
  await page.screenshot({ path: path.join(OUT, `${name}.png`) });
  routeResults.push({ route: r, errors: errors.length - before });
}

// 2. Every feature flow passes.
const flowResults = [];
for (const f of flows) {
  where = `flow "${f.name}"`;
  const before = errors.length;
  let ok = true;
  let msg = '';
  try {
    await f.run(page, base, { wait });
  } catch (e) {
    ok = false;
    msg = e.message;
  }
  flowResults.push({ name: f.name, ok, msg, errors: errors.length - before });
}

await browser.close();
if (server) server.close();

// Report.
console.log('\n=== ROUTES (render + console) ===');
for (const r of routeResults) console.log(`  ${r.errors === 0 ? '✅' : '❌'} ${r.route}  (${r.errors} error${r.errors === 1 ? '' : 's'})`);
console.log('\n=== FEATURE FLOWS ===');
for (const f of flowResults) console.log(`  ${f.ok && f.errors === 0 ? '✅' : '❌'} ${f.name}${f.msg ? '  — ' + f.msg : ''}`);
if (errors.length) {
  console.log('\n=== ERROR DETAIL ===');
  for (const e of errors) console.log('  ' + e);
}
const failed = routeResults.some((r) => r.errors > 0) || flowResults.some((f) => !f.ok || f.errors > 0);
console.log(`\nRESULT: ${failed ? '❌ FAIL' : '✅ ALL PASS'}   (screenshots in e2e/shots/)\n`);
process.exit(failed ? 1 : 0);
