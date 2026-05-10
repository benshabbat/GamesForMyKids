import { test, expect } from '@playwright/test';

test.describe('Animals game', () => {
  test('menu page loads with title', async ({ page }) => {
    await page.goto('/games/animals');
    await expect(page.getByText('בעלי חיים')).toBeVisible({ timeout: 10_000 });
  });

  test('shows category selection buttons', async ({ page }) => {
    await page.goto('/games/animals');
    // Category buttons are rendered from CATEGORY_ORDER — at least 2 should exist
    const buttons = page.getByRole('button');
    await expect(buttons.first()).toBeVisible({ timeout: 10_000 });
    expect(await buttons.count()).toBeGreaterThanOrEqual(2);
  });

  test('clicking a category starts the game and leaves the menu', async ({ page }) => {
    await page.goto('/games/animals');
    const firstBtn = page.getByRole('button').first();
    await firstBtn.waitFor({ state: 'visible', timeout: 10_000 });
    await firstBtn.click();
    // Menu heading should no longer be the only content — game UI takes over
    await expect(page.getByText('בחר קטגוריה')).not.toBeVisible({ timeout: 5_000 });
  });
});
