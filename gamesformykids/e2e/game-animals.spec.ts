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

  test('clicking start begins the game and hides the start screen', async ({ page }) => {
    await page.goto('/games/animals');
    const startBtn = page.getByRole('button', { name: /בואו נתחיל לשחק/i });
    await startBtn.waitFor({ state: 'visible', timeout: 10_000 });
    await startBtn.click();
    // Start screen is replaced by the game challenge
    await expect(startBtn).not.toBeVisible({ timeout: 5_000 });
  });
});
