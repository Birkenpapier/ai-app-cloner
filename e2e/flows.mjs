// ────────────────────────────────────────────────────────────────────────────
// Per-clone verification spec (MindMeister). `/clone-app` writes this per app:
//   - `routes`: every screen to smoke-test (must render with no errors)
//   - `flows`:  the on-device features to prove actually work
// Consumed by e2e/verify.mjs.
// ────────────────────────────────────────────────────────────────────────────

export const routes = [
  '/',
  '/recent',
  '/favorites',
  '/templates',
  '/map/campaign',
  '/comments/campaign',
  '/new-map',
];

export const flows = [
  {
    name: 'create a map -> it appears in Recent and persists across a reload',
    run: async (page, base, { wait }) => {
      const title = 'Verification map';
      await page.goto(base + '/recent', { waitUntil: 'networkidle' });
      await wait(400);
      await page.getByLabel('New map').click();
      await wait(300);
      await page.getByLabel('Map title').fill(title);
      await wait(120);
      await page.getByLabel('Create map').click();
      await wait(500);
      await page.goto(base + '/recent', { waitUntil: 'networkidle' });
      await wait(400);
      if ((await page.getByText(title).count()) === 0) throw new Error('new map did not appear in Recent');
      await page.reload({ waitUntil: 'networkidle' });
      await wait(700);
      if ((await page.getByText(title).count()) === 0) throw new Error('new map did NOT persist');
    },
  },
  {
    name: 'add a node in the editor -> it appears and persists',
    run: async (page, base, { wait }) => {
      await page.goto(base + '/map/campaign', { waitUntil: 'networkidle' });
      await wait(400);
      const before = await page.getByText('New idea').count();
      await page.getByLabel('Add node').click();
      await wait(300);
      if ((await page.getByText('New idea').count()) <= before) throw new Error('node was not added');
      await page.reload({ waitUntil: 'networkidle' });
      await wait(700);
      if ((await page.getByText('New idea').count()) === 0) throw new Error('added node did NOT persist');
    },
  },
  {
    name: 'favorite a map -> it shows in Favorites and persists',
    run: async (page, base, { wait }) => {
      await page.goto(base + '/recent', { waitUntil: 'networkidle' });
      await wait(400);
      await page.getByLabel('Favorite Marketing Campaign Plan').click();
      await wait(300);
      await page.goto(base + '/favorites', { waitUntil: 'networkidle' });
      await wait(400);
      if ((await page.getByText('Marketing Campaign Plan').count()) === 0)
        throw new Error('favorited map missing from Favorites');
      await page.reload({ waitUntil: 'networkidle' });
      await wait(700);
      if ((await page.getByText('Marketing Campaign Plan').count()) === 0) throw new Error('favorite did NOT persist');
    },
  },
  {
    name: 'add a comment -> it shows and persists across a reload',
    run: async (page, base, { wait }) => {
      const text = 'Sounds awesome, shipping it!';
      await page.goto(base + '/comments/campaign', { waitUntil: 'networkidle' });
      await wait(400);
      await page.getByLabel('Comment input').fill(text);
      await wait(150);
      await page.getByLabel('Send comment').click();
      await wait(400);
      if ((await page.getByText(text).count()) === 0) throw new Error('comment did not appear');
      await page.reload({ waitUntil: 'networkidle' });
      await wait(700);
      if ((await page.getByText(text).count()) === 0) throw new Error('comment did NOT persist');
    },
  },
  {
    name: 'navigate every tab, open a map and its comments without errors',
    run: async (page, base, { wait }) => {
      for (const tab of ['/recent', '/favorites', '/templates']) {
        await page.goto(base + tab, { waitUntil: 'networkidle' });
        await wait(300);
      }
      await page.goto(base + '/recent', { waitUntil: 'networkidle' });
      await wait(300);
      await page.getByLabel('Open Campaign Brainstorming').click();
      await wait(500);
      await page.getByLabel('Open comments').click();
      await wait(500);
      if ((await page.getByText('Comments', { exact: true }).count()) === 0) throw new Error('comments did not open');
    },
  },
];
