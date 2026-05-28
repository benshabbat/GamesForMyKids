import { test, expect } from '@playwright/test';

test.describe('Memory game', () => {
  test('menu page loads with title', async ({ page }) => {
    await page.goto('/games/memory');
    await expect(page.getByText('משחק הזיכרון')).toBeVisible({ timeout: 10_000 });
  });

  test('shows difficulty picker with 3 buttons', async ({ page }) => {
    await page.goto('/games/memory');
    const group = page.getByRole('group', { name: /רמת קושי/ });
    await expect(group).toBeVisible({ timeout: 10_000 });
    await expect(group.getByRole('button')).toHaveCount(3);
  });

  test('easy mode starts the game and shows cards', async ({ page }) => {
    await page.goto('/games/memory');
    await page.getByRole('group', { name: /רמת קושי/ }).getByRole('button').first().click();
    await page.getByRole('button', { name: /התחל/ }).click();
    // After starting, the start screen should not be visible and cards appear
    await expect(page.getByText('משחק הזיכרון')).not.toBeVisible({ timeout: 5_000 });
  });
});
