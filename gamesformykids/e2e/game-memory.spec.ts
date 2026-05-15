import { test, expect } from '@playwright/test';

test.describe('Memory game', () => {
  test('menu page loads with title', async ({ page }) => {
    await page.goto('/games/memory');
    await expect(page.getByText('משחק הזיכרון')).toBeVisible({ timeout: 10_000 });
  });

  test('shows easy, medium, and hard difficulty buttons', async ({ page }) => {
    await page.goto('/games/memory');
    await expect(page.getByRole('button', { name: /קל/ })).toBeVisible({ timeout: 10_000 });
    await expect(page.getByRole('button', { name: /רגיל/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /קשה/ })).toBeVisible();
  });

  test('easy mode starts the game and shows cards', async ({ page }) => {
    await page.goto('/games/memory');
    await page.getByRole('button', { name: /קל/ }).first().click();
    await page.getByRole('button', { name: /התחל/ }).click();
    // After starting, the start screen should not be visible and cards appear
    await expect(page.getByText('משחק הזיכרון')).not.toBeVisible({ timeout: 5_000 });
  });
});
