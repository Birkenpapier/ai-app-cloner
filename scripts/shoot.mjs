// Diff-loop helper: serve the static web export and screenshot each route at
// iPhone 16 Pro dimensions, so the clone can be compared against the originals.
// Usage: node scripts/shoot.mjs   (run `npx expo export --platform web` first)
import { chromium } from 'playwright';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve('dist');
const OUT = path.resolve('docs/diff');
fs.mkdirSync(OUT, { recursive: true });

const TYPES = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.ttf': 'font/ttf', '.woff': 'font/woff', '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
};

const routes = {
  home: '/', all: '/all', passkeys: '/passkeys', codes: '/codes',
  security: '/security', deleted: '/deleted',
  'new-password': '/new-password', 'about-passkeys': '/about-passkeys',
};

const server = http.createServer((req, res) => {
  let url = decodeURIComponent(req.url.split('?')[0]);
  let file = path.join(DIST, url);
  if (url === '/' || url === '') file = path.join(DIST, 'index.html');
  else if (!path.extname(url)) file = path.join(DIST, url + '.html');
  if (!fs.existsSync(file)) { res.writeHead(404); res.end('not found'); return; }
  res.writeHead(200, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});

await new Promise((r) => server.listen(8090, r));
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 402, height: 874 }, deviceScaleFactor: 3 });

for (const [name, route] of Object.entries(routes)) {
  await page.goto(`http://localhost:8090${route}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(OUT, `clone-${name}.png`) });
  console.log('shot', name);
}

await browser.close();
server.close();
