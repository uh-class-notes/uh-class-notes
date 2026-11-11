import { expect, test } from '@playwright/test';

test('homepage displays the starter content', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Project Name' })).toBeVisible();
  await expect(page.getByText('Start building your application here.')).toBeVisible();
});
