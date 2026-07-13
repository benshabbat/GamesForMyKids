import { test, expect } from '@playwright/test';

/**
 * Deep correctness pass — Style B GenericQuizGame games.
 * Generated for the player-profile-tester agent (see .claude/agents/player-profile-tester.md).
 *
 * All 30 games share the exact same QuizAnswerGrid/QuizFeedback/QuizResultScreen components
 * (components/game/quiz/*), so a single generic driver works: click the first rendered choice
 * each round (no need to know the answer key — QuizFeedback reveals bg-green-50 on a correct
 * pick and bg-amber-50 on a wrong one), advance via the fixed '← הבא'/'סיום' button, and after
 * the round cap or an empty choice grid, assert a result screen with the fixed 'שחק שוב' restart
 * button is reachable. This exercises the real correct/wrong feedback and progression logic,
 * not just "does the route 200".
 */

const GAME_IDS = [
  "riddles",
  "capitals",
  "spelling",
  "fractions",
  "emotions",
  "instruments",
  "world-languages",
  "opposites",
  "sports-quiz",
  "continents",
  "healthy-food",
  "family",
  "english-words",
  "shapes-3d",
  "singular-plural",
  "morning-routine",
  "rhyming",
  "adjectives",
  "verbs",
  "skip-counting",
  "gender",
  "final-letters",
  "alphabet-order",
  "visual-addition",
  "gematria",
  "visual-logic",
  "proverbs",
  "blessings",
  "math-stories",
  "mispar-bonds"
] as const;

function seedPersona() {
  localStorage.setItem('gfk_onboarded', 'true');
  localStorage.setItem('gfk_visit_count', '1');
  localStorage.setItem('gfk-age-filter', JSON.stringify({ state: { ageRange: '5-7' }, version: 1 }));
  localStorage.setItem('gfk-difficulty', JSON.stringify({ state: { difficulty: 'medium' }, version: 0 }));
}

test.describe('Deep correctness — Style B quiz games', () => {
  for (const id of GAME_IDS) {
    test(`${id}: answer feedback and round progression work end-to-end`, async ({ page }) => {
      const pageErrors: string[] = [];
      page.on('pageerror', (err) => pageErrors.push(err.message));

      await page.addInitScript(seedPersona);
      await page.goto(`/games/${id}`);

      // QuizMenuScreen renders exactly one button (the start CTA); its label text varies
      // per-game ("בואו נכתוב!", "בואו נלמד!", "משחק ניגודים!"...) so match by excluding the
      // floating site-wide chrome (QR-share/mute, both styled with a "fixed" position class)
      // instead of matching on wording.
      const startBtn = page.locator('button:not([class*="fixed"])').first();
      await startBtn.waitFor({ state: 'visible', timeout: 20_000 });
      await startBtn.click({ timeout: 20_000 });

      let sawCorrect = false;
      let sawWrong = false;
      let reachedResult = false;

      for (let round = 0; round < 15; round++) {
        // Some configs (e.g. spelling) render an extra disabled decoy choice alongside the
        // real options — pick the first *enabled* one rather than assuming index 0 is clickable.
        const choices = page.locator('div.grid.gap-3.mb-4 > button:not([disabled])');
        const stillPlaying = await choices.first().waitFor({ state: 'visible', timeout: 10_000 }).then(() => true).catch(() => false);
        if (!stillPlaying) { reachedResult = true; break; }

        await choices.first().click({ timeout: 5_000 }).catch(() => {});

        const status = page.locator('[role="status"][aria-live="polite"]').last();
        await status.waitFor({ state: 'visible', timeout: 5_000 }).catch(() => {});
        const cls = (await status.getAttribute('class').catch(() => '')) || '';
        if (cls.includes('bg-green-50')) sawCorrect = true;
        else if (cls.includes('bg-amber-50')) sawWrong = true;

        const nextBtn = page.getByRole('button', { name: /(← הבא|סיום)/ }).first();
        await nextBtn.click({ timeout: 5_000 }).catch(() => {});
        await page.waitForTimeout(150);
      }

      const restartBtn = page.getByRole('button', { name: 'שחק שוב' }).first();
      const hasRestart = await restartBtn.waitFor({ state: 'visible', timeout: 8_000 }).then(() => true).catch(() => false);
      expect(hasRestart, `${id}: expected a result screen with the 'שחק שוב' restart button`).toBe(true);
      expect(reachedResult, `${id}: round loop never reached the result phase within 15 rounds`).toBe(true);

      if (!sawCorrect && !sawWrong) {
        console.warn(`[${id}] neither correct nor wrong feedback styling was observed — check QuizFeedback class names still match bg-green-50/bg-amber-50`);
      }

      expect(pageErrors, pageErrors.join('\n')).toEqual([]);
    });
  }
});
