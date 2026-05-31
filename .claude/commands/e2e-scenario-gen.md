# E2E Scenario Generator — GamesForMyKids

You are the **E2E Scenario Generator** for GamesForMyKids.

Your job: generate ready-to-use Playwright test scenarios for a game, derived from the game's config, data, and component flow — without requiring manual test writing.

---

## When invoked

`$ARGUMENTS` should be a game ID (e.g., `animals`, `clock-reading`).
If no argument is provided, detect the most recently added game from the diff:

```bash
git diff HEAD -- gamesformykids/lib/types/core/base.ts | grep "^+" | grep "'" | tail -1
```

---

## Phase 1 — Discover game structure

```bash
# Determine style
GAME_ID="<game-id>"

# Style A?
grep "'$GAME_ID'" gamesformykids/lib/constants/gameItemsMap.ts

# Style B?
grep "'$GAME_ID'" gamesformykids/lib/quiz/registry/genericQuizGames.tsx

# Style C?
grep "'$GAME_ID'" gamesformykids/lib/quiz/registry/customQuizGames.tsx

# Style D?
grep "'$GAME_ID'" gamesformykids/app/games/\[gameType\]/gamePageConstants.ts | grep "CUSTOM_GAME"
```

Then load game data:

```bash
# Style A — items
grep -A 5 "'$GAME_ID'" gamesformykids/lib/constants/gameItemsMap.ts
cat gamesformykids/lib/constants/gameData/*.ts | grep -A 5 "name:"

# Style B/C — questions
ls gamesformykids/lib/quiz/data/
cat gamesformykids/lib/quiz/data/<game-id>.ts | head -40

# UI config
grep -A 30 "'$GAME_ID'" gamesformykids/lib/constants/ui/gameConfigs.*.ts

# Registry entry
grep -A 8 "\"$GAME_ID\"" gamesformykids/lib/registry/registryData/batch*.ts
```

---

## Phase 2 — Detect existing test infrastructure

```bash
# Check if Playwright is configured
cat gamesformykids/playwright.config.ts 2>/dev/null || cat gamesformykids/playwright.config.js 2>/dev/null

# Check existing test patterns
ls gamesformykids/tests/ 2>/dev/null || ls gamesformykids/e2e/ 2>/dev/null || ls gamesformykids/__tests__/ 2>/dev/null
ls gamesformykids/tests/e2e/ 2>/dev/null

# Look at an existing test for style reference
ls gamesformykids/tests/ --sort=time 2>/dev/null | head -3 | xargs -I{} cat gamesformykids/tests/{} 2>/dev/null | head -60
```

Determine:
- Base URL (likely `http://localhost:3000`)
- Test file naming convention
- Page Object pattern usage (if any)
- Whether tests use `data-testid` selectors

---

## Phase 3 — Generate Playwright test file

Generate a complete test file following the project's existing conventions.

**Test file path:** `gamesformykids/tests/e2e/<game-id>.spec.ts`

### Core scenarios to generate (adapt based on game style):

---

#### Scenario 1 — Page loads and shows start screen

```typescript
test('game page loads and shows start screen', async ({ page }) => {
  await page.goto('/games/<game-id>');
  // Check title is visible
  await expect(page.getByText(/<Hebrew title>/)).toBeVisible();
  // Check start button is visible
  await expect(page.getByRole('button', { name: /<start text>/i })).toBeVisible();
});
```

---

#### Scenario 2 — Game appears in home page grid

```typescript
test('game appears in home page category grid', async ({ page }) => {
  await page.goto('/');
  // Check the game card is visible on home page
  await expect(page.getByRole('link', { name: /<game title>/i })).toBeVisible();
});
```

---

#### Scenario 3 — Start button begins game (Style A/B/C)

```typescript
test('clicking start begins the game', async ({ page }) => {
  await page.goto('/games/<game-id>');
  await page.getByRole('button', { name: /<start>/i }).click();
  // Game content should be visible (a question, card grid, or challenge)
  await expect(page.locator('<challenge-selector>')).toBeVisible();
});
```

---

#### Scenario 4 — Correct answer gives positive feedback (Style A)

```typescript
test('correct answer shows positive feedback', async ({ page }) => {
  await page.goto('/games/<game-id>');
  await page.getByRole('button', { name: /<start>/i }).click();
  // Wait for a challenge to appear
  await page.waitForSelector('<challenge-text-selector>');
  // Click the correct answer (this requires knowing what was asked — use data-correct attr or similar)
  // Check for positive feedback
  await expect(page.locator('[data-correct="true"]')).toBeVisible({ timeout: 5000 });
});
```

---

#### Scenario 5 — Game completes and shows result screen

```typescript
test('game completes and shows result screen', async ({ page }) => {
  await page.goto('/games/<game-id>');
  await page.getByRole('button', { name: /<start>/i }).click();
  // Play through minimum required rounds (depends on game config)
  // This may need to be a longer test or use page evaluation
  // At minimum, verify the result screen exists in the component
  await expect(page.locator('<result-screen-selector>')).not.toBeVisible();
  // A placeholder — fill in game-specific completion logic
});
```

---

#### Scenario 6 — Mobile viewport (375px)

```typescript
test('game is usable on mobile (375px)', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/games/<game-id>');
  // No horizontal scroll
  const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
  const clientWidth = await page.evaluate(() => document.body.clientWidth);
  expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);
  // Title is visible
  await expect(page.getByText(/<Hebrew title>/)).toBeVisible();
});
```

---

#### Scenario 7 — RTL layout direction

```typescript
test('page uses RTL layout direction', async ({ page }) => {
  await page.goto('/games/<game-id>');
  const dir = await page.evaluate(() => document.documentElement.dir);
  expect(dir).toBe('rtl');
});
```

---

#### Scenario 8 — Audio replay button exists (if audio game)

```typescript
test('audio replay button is present for challenge', async ({ page }) => {
  await page.goto('/games/<game-id>');
  await page.getByRole('button', { name: /<start>/i }).click();
  await page.waitForSelector('<challenge-selector>');
  // Check for replay button
  await expect(page.getByRole('button', { name: /<replay|שמע שוב>/i })).toBeVisible();
});
```

---

## Phase 4 — Generate the output file

Output the complete test file content with all applicable scenarios, substituting real values (Hebrew text, selectors) based on what was found in Phase 1.

Mark any selector that needs manual verification with `// TODO: verify selector`:

```typescript
// TODO: verify selector — adjust to match actual rendered element
```

---

## Phase 5 — Check for existing Playwright config and adapt

```bash
cat gamesformykids/playwright.config.ts 2>/dev/null
```

If no config exists, also output a minimal `playwright.config.ts`:

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://localhost:3000',
    locale: 'he-IL',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

---

## Phase 6 — Ask before writing

Show the generated test file content and ask:

```
Generated <N> test scenarios for `<game-id>` (Style <X>).
File would be written to: tests/e2e/<game-id>.spec.ts

Write the file now? (yes / no / show all tests first)
```

After writing, show how to run:

```bash
cd gamesformykids
npx playwright test tests/e2e/<game-id>.spec.ts --headed
```

---

## Rules

- **Generate based on real game data** — don't use placeholder Hebrew that doesn't match the actual config.
- **Mark uncertain selectors as TODO** — don't guess DOM structure.
- **Always include the mobile viewport test** — mobile is the primary platform for children.
- **Always include the RTL direction test.**
- **Never run the tests automatically** — only write the file and show the run command.
- **Follow the project's existing test file conventions** if any exist.
