import { expect, test } from '@playwright/test';

test('homepage displays the starter content', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'UH CLASS NOTES' })).toBeVisible();
});
