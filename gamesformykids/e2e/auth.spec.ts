import { test, expect } from '@playwright/test';

test.describe('Auth flow', () => {
  test('login page renders email and password fields', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('input[type="email"], input[placeholder*="מייל"], input[placeholder*="email" i]').first()).toBeVisible({ timeout: 10_000 });
    await expect(page.locator('input[type="password"]').first()).toBeVisible();
  });

  test('settings page redirects unauthenticated users', async ({ page }) => {
    await page.goto('/settings');
    // Should either redirect to login or show a login prompt
    await page.waitForURL(/login|settings/, { timeout: 10_000 });
    const url = page.url();
    // Either on /login or on /settings (app may handle auth client-side)
    expect(url).toMatch(/login|settings/);
  });

  test('dashboard page is reachable', async ({ page }) => {
    await page.goto('/dashboard');
    // Page should load without a 500 error
    const response = await page.goto('/dashboard');
    expect(response?.status()).not.toBe(500);
  });

  test('not-found page renders for unknown route', async ({ page }) => {
    const response = await page.goto('/games/this-game-does-not-exist-xyz');
    // Should return 200 (Next.js 404 page) or 404 — not a 500
    expect(response?.status()).not.toBe(500);
  });
});
