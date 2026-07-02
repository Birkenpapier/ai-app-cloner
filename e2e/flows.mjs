// Per-clone verification spec (Spendee). Consumed by e2e/verify.mjs.
export const routes = ['/', '/timeline', '/wallets', '/budgets', '/activity', '/more', '/add-transaction'];

export const flows = [
  {
    name: 'add an expense -> timeline total updates and persists across a reload',
    run: async (page, base, { wait }) => {
      await page.goto(base + '/timeline', { waitUntil: 'networkidle' });
      await wait(500);
      // seed total is -€111
      await page.getByLabel('Add transaction').click();
      await wait(400);
      await page.locator('input').first().fill('25');
      await wait(120);
      await page.getByLabel('Save transaction').click();
      await wait(500);
      // -111 + -25 = -136
      if ((await page.getByText('-€136').count()) === 0) throw new Error('total did not update after adding expense');
      await page.reload({ waitUntil: 'networkidle' });
      await wait(700);
      if ((await page.getByText('-€136').count()) === 0) throw new Error('expense did NOT persist after reload');
    },
  },
  {
    name: 'navigate every tab without errors',
    run: async (page, base, { wait }) => {
      for (const tab of ['/wallets', '/budgets', '/activity', '/more', '/timeline']) {
        await page.goto(base + tab, { waitUntil: 'networkidle' });
        await wait(300);
      }
      if ((await page.getByText('Cash Flow').count()) === 0) throw new Error('timeline did not render');
    },
  },
];
