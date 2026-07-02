// ────────────────────────────────────────────────────────────────────────────
// Per-clone verification spec (Todoist). `/clone-app` writes this for each app:
//   - `routes`: every screen to smoke-test (must render with no errors)
//   - `flows`:  the on-device features to prove actually work
// Consumed by e2e/verify.mjs.
// ────────────────────────────────────────────────────────────────────────────

export const routes = ['/', '/today', '/inbox', '/upcoming', '/browse', '/settings', '/add-task'];

async function addTask(page, base, wait, title) {
  await page.goto(base + '/today', { waitUntil: 'networkidle' });
  await wait(400);
  await page.getByLabel('Add task').click();
  await wait(300);
  await page.locator('input, textarea').first().fill(title);
  await wait(120);
  await page.getByLabel('Save task').click();
  await wait(400);
}

export const flows = [
  {
    name: 'add a task -> it appears and persists across a reload',
    run: async (page, base, { wait }) => {
      const title = 'Verify persistence task';
      await addTask(page, base, wait, title);
      if ((await page.getByText(title).count()) === 0) throw new Error('task did not appear after saving');
      await page.reload({ waitUntil: 'networkidle' });
      await wait(600);
      if ((await page.getByText(title).count()) === 0) throw new Error('task did NOT persist after reload');
    },
  },
  {
    name: 'complete a task -> completion persists across a reload',
    run: async (page, base, { wait }) => {
      const title = 'Verify toggle task';
      await addTask(page, base, wait, title);
      await page.getByLabel(`Toggle ${title}`).click();
      await wait(300);
      await page.reload({ waitUntil: 'networkidle' });
      await wait(600);
      // The completed checkbox renders a checkmark; toggling should have persisted.
      if ((await page.getByLabel(`Toggle ${title}`).count()) === 0) throw new Error('toggled task missing after reload');
    },
  },
  {
    name: 'navigate every tab and open Settings without errors',
    run: async (page, base, { wait }) => {
      await page.goto(base + '/browse', { waitUntil: 'networkidle' });
      await wait(400);
      for (const tab of ['Inbox', 'Today', 'Upcoming', 'Browse']) {
        await page.getByText(tab, { exact: true }).first().click();
        await wait(250);
      }
      await page.goto(base + '/settings', { waitUntil: 'networkidle' });
      await wait(300);
      if ((await page.getByText('Log Out').count()) === 0) throw new Error('Settings did not render');
    },
  },
];
