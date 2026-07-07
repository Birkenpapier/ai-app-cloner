// Per-clone verification spec (Google Keep). Consumed by e2e/verify.mjs.
export const routes = ['/', '/note', '/menu', '/labels'];

export const flows = [
  {
    name: 'add a note -> it appears in the grid and persists across a reload',
    run: async (page, base, { wait }) => {
      await page.goto(base + '/', { waitUntil: 'networkidle' });
      await wait(500);
      await page.getByLabel('Add note').click();
      await wait(400);
      await page.getByPlaceholder('Title').fill('Groceries note');
      await page.getByPlaceholder('Note', { exact: true }).fill('Milk, eggs, bread');
      await wait(150);
      await page.getByLabel('Back').click();
      await wait(500);
      if ((await page.getByText('Groceries note').count()) === 0) throw new Error('note did not appear after saving');
      await page.reload({ waitUntil: 'networkidle' });
      await wait(700);
      if ((await page.getByText('Groceries note').count()) === 0) throw new Error('note did NOT persist after reload');
    },
  },
  {
    name: 'open the navigation drawer without errors',
    run: async (page, base, { wait }) => {
      await page.goto(base + '/', { waitUntil: 'networkidle' });
      await wait(400);
      await page.getByLabel('Open menu').click();
      await wait(400);
      if ((await page.getByText('Archive').count()) === 0) throw new Error('drawer did not open');
    },
  },
];
