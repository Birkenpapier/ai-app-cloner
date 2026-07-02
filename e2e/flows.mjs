// ────────────────────────────────────────────────────────────────────────────
// Per-clone verification spec. `/clone-app` OVERWRITES this for the app it builds:
//   - `routes`: every screen to smoke-test (each must render with no errors)
//   - `flows`:  the on-device features to prove actually work (add/edit/persist…)
// Consumed by e2e/verify.mjs. Run everything with `npm run verify`.
//
// Blank-template version below (just the placeholder home). Example flow shape:
//
//   export const flows = [
//     {
//       name: 'add an item -> it persists across a reload',
//       run: async (page, base, { wait }) => {
//         await page.goto(base + '/', { waitUntil: 'networkidle' });
//         await page.getByLabel('Add').click();
//         await page.locator('input').first().fill('Test');
//         await page.getByLabel('Save').click();
//         if ((await page.getByText('Test').count()) === 0) throw new Error('not shown');
//         await page.reload({ waitUntil: 'networkidle' });
//         await wait(600);
//         if ((await page.getByText('Test').count()) === 0) throw new Error('did not persist');
//       },
//     },
//   ];
// ────────────────────────────────────────────────────────────────────────────

export const routes = ['/'];

export const flows = [];
