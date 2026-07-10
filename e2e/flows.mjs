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

// v2.0 backend-mode round-trip: seed renders -> create through the in-process tRPC
// API re-renders the list (proves the typed API path + store reactivity) -> the new
// row survives a reload (proves on-device persistence). This is the flow that proves
// the generated backend actually executes in the web build.
export const flows = [
  {
    name: 'create a note via the tRPC API -> renders + persists across reload',
    run: async (page, base) => {
      await page.goto(base + '/', { waitUntil: 'networkidle' });
      // seed hydrates from the on-device store (async), so wait for it rather than a fixed delay
      await page.getByText('Welcome').waitFor({ timeout: 8000 });
      await page.getByPlaceholder('New note title').fill('Buy milk');
      await page.getByLabel('Add note').click();
      // tRPC create -> storeRepository write -> useSyncExternalStore re-render
      await page.getByText('Buy milk').waitFor({ timeout: 8000 });
      // survives a full reload (on-device persistence)
      await page.reload({ waitUntil: 'networkidle' });
      await page.getByText('Buy milk').waitFor({ timeout: 8000 });
    },
  },
];
