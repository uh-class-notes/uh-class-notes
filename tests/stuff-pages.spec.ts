import { expect, test } from '@playwright/test';

for (const path of [
  '/list',
  '/add',
  '/admin',
  '/edit/1',
  '/classes',
  '/classes/add',
]) {
  test(`${path} requires a signed-in user`, async ({ page }) => {
    await page.goto(path);
    await expect(page).toHaveURL(/\/auth\/signin$/);
  });
}
