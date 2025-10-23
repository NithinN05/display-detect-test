import { test, expect } from '@playwright/test';
import path from 'node:path';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);

  // Take a screenshot of the full page
  await page.screenshot({ path: path.join(__dirname, '../screenshots', 'homepage.png'), fullPage: true });
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();

  // Take a screenshot of the specific element
  const installationHeading = page.getByRole('heading', { name: 'Installation' });
  await installationHeading.screenshot({ path: path.join(__dirname, '../screenshots', 'installation-heading.png') });
});
