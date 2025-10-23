import { test, expect } from '@playwright/test';
import { version } from 'node:os';
import path from 'node:path';

test('has title', async ({ page }, testInfo) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
  
  const isHeadless = testInfo.project.use?.headless ?? true;
  const mode = isHeadless ? 'headless' : 'headed';
  
  const screenshotDir = path.join(__dirname, `../screenshots/${version()}/`, mode);
  await page.screenshot({ 
    path: path.join(screenshotDir, 'homepage.png'), 
    fullPage: true 
  });
});

test('get started link', async ({ page }, testInfo) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Get started' }).click();
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  
  const isHeadless = testInfo.project.use?.headless ?? true;
  const mode = isHeadless ? 'headless' : 'headed';
  
  const installationHeading = page.getByRole('heading', { name: 'Installation' });
  await installationHeading.screenshot({ 
    path: path.join(__dirname, `../screenshots/${version()}/`, mode, 'installation-heading.png') 
  });
});