import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    // Suppress first-visit overlays (onboarding modal, PWA banner) that block clicks
    await page.addInitScript(() => {
      localStorage.setItem('gfk_onboarded', 'true');
      localStorage.setItem('gfk_visit_count', '1');
    });
    await page.goto('/');
  });

  test('has page title', async ({ page }) => {
    await expect(page).toHaveTitle(/GamesForMyKids|משחקים|Games/i);
  });

  test('shows at least one game card link', async ({ page }) => {
    const gameLinks = page.locator('a[href*="/games/"]');
    await expect(gameLinks.first()).toBeVisible({ timeout: 10_000 });
  });

  test('game card link navigates to a game page', async ({ page }) => {
    const firstLink = page.locator('a[href*="/games/"]').first();
    const href = await firstLink.getAttribute('href');
    await firstLink.click();
    await expect(page).toHaveURL(new RegExp(href ?? '/games/'));
  });

  test('offline page renders the offline message', async ({ page }) => {
    await page.goto('/offline');
    await expect(page.getByText('אין חיבור לאינטרנט')).toBeVisible();
    await expect(page.getByRole('button', { name: /נסה שוב/ })).toBeVisible();
  });
});
