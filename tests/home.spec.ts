import { expect, test } from '@playwright/test';

test('homepage displays the class notes landing page', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: 'UH Class Notes' }),
  ).toBeVisible();
});
