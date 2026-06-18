import { test, expect } from '@playwright/test';

test.describe('Animals game', () => {
  test('menu page loads with title', async ({ page }) => {
    await page.goto('/games/animals');
    await expect(page.getByText('בעלי חיים')).toBeVisible({ timeout: 10_000 });
  });

  test('shows start screen with difficulty and start buttons', async ({ page }) => {
    await page.goto('/games/animals');
    const buttons = page.getByRole('button');
    // Wait for at least 2 buttons (DifficultyPicker + start button) to be rendered
    await expect(buttons.nth(1)).toBeVisible({ timeout: 10_000 });
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
