// ────────────────────────────────────────────────────────────────────────────
// Per-clone verification spec (MeisterTask). `/clone-app` writes this per app:
//   - `routes`: every screen to smoke-test (must render with no errors)
//   - `flows`:  the on-device features to prove actually work
// Consumed by e2e/verify.mjs.
// ────────────────────────────────────────────────────────────────────────────

export const routes = [
  '/',
  '/agenda',
  '/notifications',
  '/projects',
  '/focus',
  '/board/marketing-requests',
  '/task/t-csr',
  '/automations',
  '/add-task',
];

async function addTask(page, base, wait, title) {
  await page.goto(base + '/agenda', { waitUntil: 'networkidle' });
  await wait(400);
  await page.getByLabel('Add task').first().click();
  await wait(300);
  await page.getByLabel('Task title').fill(title);
  await wait(120);
  await page.getByLabel('Save task').click();
  await wait(500);
}

export const flows = [
  {
    name: 'add a task -> it appears in Agenda and persists across a reload',
    run: async (page, base, { wait }) => {
      const title = 'Verify persistence task';
      await addTask(page, base, wait, title);
      if ((await page.getByText(title).count()) === 0) throw new Error('task did not appear after saving');
      await page.reload({ waitUntil: 'networkidle' });
      await wait(700);
      if ((await page.getByText(title).count()) === 0) throw new Error('task did NOT persist after reload');
    },
  },
  {
    name: "edit a task's title -> it changes and persists across a reload",
    run: async (page, base, { wait }) => {
      await page.goto(base + '/task/t-csr', { waitUntil: 'networkidle' });
      await wait(400);
      await page.getByLabel('Edit task title').click();
      await wait(200);
      await page.getByLabel('Task title input').fill('CSR deck (edited)');
      await page.getByLabel('Task title input').press('Enter');
      await wait(300);
      if ((await page.getByText('CSR deck (edited)').count()) === 0) throw new Error('title did not change');
      if ((await page.getByText('[CR] CSR @ Fulenn').count()) !== 0) throw new Error('old title still present');
      await page.reload({ waitUntil: 'networkidle' });
      await wait(700);
      if ((await page.getByText('CSR deck (edited)').count()) === 0) throw new Error('title edit did NOT persist');
    },
  },
  {
    name: 'move a card to another board section -> it lands there and persists',
    run: async (page, base, { wait }) => {
      await page.goto(base + '/board/marketing-requests', { waitUntil: 'networkidle' });
      await wait(400);
      // "Done" has no seed tasks, so its header is hidden until a card lands there.
      if ((await page.getByText('Done', { exact: true }).count()) !== 0) throw new Error('Done section unexpectedly shown');
      await page.getByLabel('Open [Internal] Pandemic Rules').click({ delay: 600 }); // long-press -> sheet
      await wait(300);
      await page.getByLabel('Move to Done').click();
      await wait(300);
      if ((await page.getByText('Done', { exact: true }).count()) === 0) throw new Error('card did not move to Done');
      await page.reload({ waitUntil: 'networkidle' });
      await wait(700);
      if ((await page.getByText('Done', { exact: true }).count()) === 0) throw new Error('move did NOT persist');
    },
  },
  {
    name: 'delete a card via the actions sheet -> it disappears and stays gone',
    run: async (page, base, { wait }) => {
      await page.goto(base + '/board/marketing-requests', { waitUntil: 'networkidle' });
      await wait(400);
      const card = page.getByLabel('Open [Whitepaper] The Social Media Era, an opportunity for businesses?');
      await card.click({ delay: 600 }); // long-press -> sheet
      await wait(300);
      await page.getByLabel('Delete task').click();
      await wait(300);
      if ((await card.count()) !== 0) throw new Error('card was not deleted');
      await page.reload({ waitUntil: 'networkidle' });
      await wait(700);
      if ((await card.count()) !== 0) throw new Error('delete did NOT persist');
    },
  },
  {
    name: 'complete a task -> completion persists across a reload',
    run: async (page, base, { wait }) => {
      await page.goto(base + '/task/t-pandemic', { waitUntil: 'networkidle' });
      await wait(400);
      await page.getByLabel('Complete Task').click();
      await wait(300);
      if ((await page.getByText('Completed').count()) === 0) throw new Error('button did not flip to Completed');
      await page.reload({ waitUntil: 'networkidle' });
      await wait(700);
      if ((await page.getByText('Completed').count()) === 0) throw new Error('completion did NOT persist');
    },
  },
  {
    name: 'add a comment on a task -> it shows and persists',
    run: async (page, base, { wait }) => {
      const text = 'Shipping the CSR deck today.';
      await page.goto(base + '/task/t-csr', { waitUntil: 'networkidle' });
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
    name: 'toggle an automation -> it stays enabled across a reload',
    run: async (page, base, { wait }) => {
      await page.goto(base + '/automations', { waitUntil: 'networkidle' });
      await wait(400);
      await page.getByLabel('Assign Task', { exact: true }).click();
      await wait(300);
      if ((await page.getByLabel('Assign Task enabled').count()) === 0) throw new Error('automation did not enable');
      await page.reload({ waitUntil: 'networkidle' });
      await wait(700);
      if ((await page.getByLabel('Assign Task enabled').count()) === 0) throw new Error('automation did NOT persist');
    },
  },
  {
    name: 'open a notification -> it opens the linked task',
    run: async (page, base, { wait }) => {
      await page.goto(base + '/notifications', { waitUntil: 'networkidle' });
      await wait(400);
      await page.getByLabel('Notification from Alan Dale').click();
      await wait(500);
      if ((await page.getByText('[Newsletter] Digital Week 34').count()) === 0)
        throw new Error('notification did not open its task');
    },
  },
  {
    name: 'navigate every tab and open the board without errors',
    run: async (page, base, { wait }) => {
      for (const tab of ['/notifications', '/focus', '/agenda', '/projects']) {
        await page.goto(base + tab, { waitUntil: 'networkidle' });
        await wait(300);
      }
      await page.goto(base + '/projects', { waitUntil: 'networkidle' });
      await wait(300);
      await page.getByLabel('Open Marketing Requests').click();
      await wait(500);
      if ((await page.getByText('Requests', { exact: true }).count()) === 0) throw new Error('board did not open');
    },
  },
];
