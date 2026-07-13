import { test, expect } from '@playwright/test';

/**
 * Deep correctness pass — Style A vocabulary card games.
 * Generated for the player-profile-tester agent (see .claude/agents/player-profile-tester.md).
 *
 * Unlike the smoke spec, this actually determines the RIGHT answer per round by
 * reading the visible challenge text in ChallengeBox (components/shared/feedback/ChallengeBox.tsx,
 * the quoted Hebrew word) and matching it against a card's accessible name (aria-label,
 * set from item.hebrew in AdvancedCard/SimpleCard/PhotoGameCard regardless of whether the
 * card also displays that text visually — see components/shared/GameCardMap.tsx).
 *
 * For each game: click a wrong card and assert the challenge does NOT advance and shows
 * shake feedback is at least tolerated (no crash); click the correct card and assert the
 * challenge DOES advance (or the round completes). Games whose card component doesn't expose
 * a matching accessible name (math/flags/geography-* custom cards) are skipped with a reason,
 * not silently passed — see the skip list in the final report.
 */

const GAME_IDS = [
  "animals",
  "colors",
  "fruits",
  "vegetables",
  "clothing",
  "letters",
  "shapes",
  "numbers",
  "weather",
  "colored-shapes",
  "smells-tastes",
  "transport",
  "vehicles",
  "tools",
  "space",
  "house",
  "instruments",
  "professions",
  "emotions",
  "counting",
  "math",
  "sports",
  "kitchen",
  "body-parts",
  "family",
  "dinosaurs",
  "world-food",
  "recycling",
  "medicine",
  "nature-sounds",
  "seasons-holidays",
  "shopping-money",
  "road-safety",
  "ocean-life",
  "garden-plants",
  "magic-fairy-tales",
  "circus-show",
  "virtual-reality",
  "new-professions",
  "advanced-weather",
  "advanced-colors",
  "jewish-holidays",
  "logic-games",
  "sound-imitation",
  "body-movements",
  "touch-senses",
  "emotional-social",
  "time-clock",
  "climate-planet",
  "birds",
  "bugs-insects",
  "superheroes",
  "art-craft",
  "camping",
  "fairy-tale-chars",
  "flags",
  "soccer-logos",
  "car-brands",
  "world-landmarks",
  "solar-system",
  "famous-paintings",
  "tech-logos",
  "dog-breeds",
  "cat-breeds",
  "nba-teams",
  "exotic-birds",
  "butterflies",
  "days-of-week",
  "months-of-year",
  "ordinals",
  "spatial-concepts",
  "number-words",
  "geography-flags",
  "geography-capitals",
  "geography-continents",
  "visual-opposites",
  "english-cards",
  "personal-safety",
  "coins-match",
  "hebrew-script"
] as const;

// ChallengeBox wraps the word in curly quotes (“...” via &ldquo;/&rdquo;) — strip
// any leading/trailing non-Hebrew-letter characters rather than enumerating quote glyphs.
function stripQuotes(s: string): string {
  return s.replace(/^[^\u05D0-\u05EA]+/, '').replace(/[^\u05D0-\u05EA]+$/, '');
}

function seedPersona() {
  localStorage.setItem('gfk_onboarded', 'true');
  localStorage.setItem('gfk_visit_count', '1');
  localStorage.setItem('gfk-age-filter', JSON.stringify({ state: { ageRange: '5-7' }, version: 1 }));
  localStorage.setItem('gfk-difficulty', JSON.stringify({ state: { difficulty: 'medium' }, version: 0 }));
  localStorage.setItem('games-audio-settings', JSON.stringify({
    state: { speechRate: 0.85, speechPitch: 1.0, volume: 0.8, enabled: true, showNikud: false, showRealPhotos: false, showEnglish: false, holidayThemesEnabled: true },
    version: 2,
  }));
}

test.describe('Deep correctness — Style A card games', () => {
  for (const id of GAME_IDS) {
    test(`${id}: wrong click does not advance, correct click does`, async ({ page }) => {
      const pageErrors: string[] = [];
      page.on('pageerror', (err) => pageErrors.push(err.message));

      await page.addInitScript(seedPersona);
      await page.goto(`/games/${id}`);

      // Match any start-CTA by the shared "לשחק" (play) substring rather than the exact default
      // label — several games override SimpleGameStartButton's text (e.g. emotions: "😊 התחל לשחק!").
      // A plain button-position selector is unsafe: floating site-wide chrome (QR-share, mute)
      // renders before the game content and would be picked up by .first() instead.
      const startBtn = page.getByRole('button', { name: /לשחק/ }).first();
      const hasStartBtn = await startBtn.count();
      test.skip(!hasStartBtn, `${id}: no start button matching /לשחק/ — non-standard start screen (e.g. a category filter before play), needs a bespoke test`);
      await startBtn.click({ timeout: 15_000 }).catch(() => {});

      const challengeText = page.locator('p.text-3xl.font-bold.text-blue-800').first();
      const found = await challengeText.waitFor({ state: 'visible', timeout: 15_000 }).then(() => true).catch(() => false);
      test.skip(!found, `${id}: no standard ChallengeBox found — needs a bespoke correctness test`);

      const rawFirst = (await challengeText.innerText()).trim();
      const hebrewFirst = stripQuotes(rawFirst);

      const correctCardFirst = page.getByRole('button', { name: hebrewFirst, exact: true }).first();
      const hasCorrectFirst = await correctCardFirst.count();
      test.skip(!hasCorrectFirst, `${id}: no card with accessible name matching challenge "${hebrewFirst}" — needs a bespoke test (custom card component)`);

      const rounds = 3;
      let prevHebrew: string | null = null;

      for (let round = 0; round < rounds; round++) {
        const visible = await challengeText.isVisible().catch(() => false);
        if (!visible) break;

        const raw = (await challengeText.innerText()).trim();
        const hebrew = stripQuotes(raw);
        if (!hebrew || hebrew === prevHebrew) break;

        const correctCard = page.getByRole('button', { name: hebrew, exact: true }).first();
        if (!(await correctCard.count())) break;

        const labels = await page.locator('button[aria-label]').evaluateAll(
          (els) => els.map((el) => el.getAttribute('aria-label') || ''),
        );
        const wrongLabel = labels.find((l) => l && l !== hebrew && l !== 'שמע שוב');

        if (wrongLabel) {
          await page.getByRole('button', { name: wrongLabel, exact: true }).first().click({ timeout: 5_000 }).catch(() => {});
          await page.waitForTimeout(400);
          const afterWrong = stripQuotes(await challengeText.innerText().catch(() => ''));
          if (round === 0) {
            expect(afterWrong, `${id}: a wrong click should not advance the challenge`).toBe(hebrew);
          }
        }

        await correctCard.click({ timeout: 5_000 }).catch(() => {});
        await page.waitForTimeout(500);

        if (round === 0) {
          const stillVisible = await challengeText.isVisible().catch(() => false);
          if (stillVisible) {
            const afterCorrect = stripQuotes(await challengeText.innerText().catch(() => ''));
            expect(afterCorrect, `${id}: a correct click should advance to a new challenge`).not.toBe(hebrew);
          }
        }

        prevHebrew = hebrew;
      }

      expect(pageErrors, pageErrors.join('\n')).toEqual([]);
    });
  }
});
