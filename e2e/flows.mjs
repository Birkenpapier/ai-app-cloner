// ────────────────────────────────────────────────────────────────────────────
// Per-clone verification spec (Discord). `/clone-app` writes this per app:
//   - `routes`: every screen to smoke-test (must render with no errors)
//   - `flows`:  the on-device features to prove actually work
// Consumed by e2e/verify.mjs.
// ────────────────────────────────────────────────────────────────────────────

export const routes = [
  '/',
  '/messages',
  '/notifications',
  '/you',
  '/server/hangout',
  '/channel/general',
  '/dm/dnd',
];

export const flows = [
  {
    name: 'send a message in #general -> it appears and persists across a reload',
    run: async (page, base, { wait }) => {
      const text = 'anyone up for valorant tonight';
      await page.goto(base + '/channel/general', { waitUntil: 'networkidle' });
      await wait(400);
      await page.getByLabel('Message input').fill(text);
      await wait(120);
      await page.getByLabel('Send message').click();
      await wait(300);
      if ((await page.getByText(text).count()) === 0) throw new Error('message did not appear');
      await page.reload({ waitUntil: 'networkidle' });
      await wait(700);
      if ((await page.getByText(text).count()) === 0) throw new Error('message did NOT persist');
    },
  },
  {
    name: 'edit your own message -> the text changes and persists',
    run: async (page, base, { wait }) => {
      await page.goto(base + '/channel/general', { waitUntil: 'networkidle' });
      await wait(400);
      await page.getByLabel('Message input').fill('draft one');
      await wait(120);
      await page.getByLabel('Send message').click();
      await wait(300);
      await page.getByLabel('msg draft one').click({ delay: 600 }); // long-press -> actions
      await wait(280);
      await page.getByLabel('Edit message').click();
      await wait(220);
      await page.getByLabel('Edit message input').fill('final answer');
      await page.getByLabel('Edit message input').press('Enter');
      await wait(300);
      if ((await page.getByText('final answer').count()) === 0) throw new Error('edit did not take');
      if ((await page.getByText('draft one').count()) !== 0) throw new Error('old text still present');
      await page.reload({ waitUntil: 'networkidle' });
      await wait(700);
      if ((await page.getByText('final answer').count()) === 0) throw new Error('edit did NOT persist');
    },
  },
  {
    name: 'delete your own message -> it disappears and stays gone',
    run: async (page, base, { wait }) => {
      await page.goto(base + '/channel/general', { waitUntil: 'networkidle' });
      await wait(400);
      await page.getByLabel('Message input').fill('temporary message');
      await wait(120);
      await page.getByLabel('Send message').click();
      await wait(300);
      await page.getByLabel('msg temporary message').click({ delay: 600 }); // long-press
      await wait(280);
      await page.getByLabel('Delete message').click();
      await wait(300);
      if ((await page.getByText('temporary message').count()) !== 0) throw new Error('message was not deleted');
      await page.reload({ waitUntil: 'networkidle' });
      await wait(700);
      if ((await page.getByText('temporary message').count()) !== 0) throw new Error('delete did NOT persist');
    },
  },
  {
    name: 'react to a message -> the reaction shows and persists (gesture)',
    run: async (page, base, { wait }) => {
      await page.goto(base + '/channel/general', { waitUntil: 'networkidle' });
      await wait(400);
      await page.getByLabel('msg bwhaahahah').click({ delay: 600 }); // long-press opens the actions sheet
      await wait(280);
      await page.getByLabel('Add reaction ❤️').click();
      await wait(300);
      if ((await page.getByLabel('React ❤️').count()) === 0) throw new Error('reaction was not added');
      await page.reload({ waitUntil: 'networkidle' });
      await wait(700);
      if ((await page.getByLabel('React ❤️').count()) === 0) throw new Error('reaction did NOT persist');
    },
  },
  {
    name: 'navigate: DM list -> a server -> a channel, and open a DM',
    run: async (page, base, { wait }) => {
      await page.goto(base + '/messages', { waitUntil: 'networkidle' });
      await wait(400);
      await page.getByLabel('Open The Hangout').click();
      await wait(500);
      await page.getByLabel('Open #general').click();
      await wait(500);
      if ((await page.getByLabel('Message input').count()) === 0) throw new Error('channel chat did not open');
      await page.goto(base + '/messages', { waitUntil: 'networkidle' });
      await wait(300);
      await page.getByLabel('Open Caitlyn').click();
      await wait(500);
      if ((await page.getByLabel('Message input').count()) === 0) throw new Error('DM did not open');
    },
  },
  {
    name: 'search the DM list -> it filters',
    run: async (page, base, { wait }) => {
      await page.goto(base + '/messages', { waitUntil: 'networkidle' });
      await wait(400);
      await page.getByLabel('Search DMs').fill('cait');
      await wait(300);
      if ((await page.getByLabel('Open Caitlyn').count()) === 0) throw new Error('expected match missing');
      if ((await page.getByLabel('Open kirbs').count()) !== 0) throw new Error('non-match was not filtered out');
    },
  },
];
