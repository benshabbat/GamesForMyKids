import { test, expect } from '@playwright/test';

/**
 * Persona-driven smoke test — generated for the player-profile-tester agent.
 * Seeds real persisted-store keys (see .claude/agents/player-profile-tester.md)
 * then visits every SUPPORTED_GAMES route as two personas, checking:
 *  - no HTTP 500
 *  - at least one interactive element renders
 *  - no uncaught page error (pageerror) after attempting the primary CTA
 * This is a breadth smoke pass, not a full-round gameplay check — see the
 * agent doc for how to extend a specific game to a real answer-correctness test.
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
  "smells-tastes",
  "weather",
  "vehicles",
  "tools",
  "space",
  "house",
  "professions",
  "math",
  "colored-shapes",
  "sports",
  "kitchen",
  "body-parts",
  "dinosaurs",
  "world-food",
  "recycling",
  "medicine",
  "nature-sounds",
  "seasons-holidays",
  "shopping-money",
  "road-safety",
  "birds",
  "bugs-insects",
  "superheroes",
  "art-craft",
  "camping",
  "fairy-tale-chars",
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
  "counting",
  "days-of-week",
  "months-of-year",
  "geography-flags",
  "geography-capitals",
  "geography-continents",
  "ordinals",
  "spatial-concepts",
  "number-words",
  "visual-opposites",
  "english-cards",
  "coins-match",
  "arithmetic",
  "balloon-pop",
  "brick-breaker",
  "bubbles",
  "building",
  "catch-fruit",
  "checkers",
  "chess",
  "color-tap",
  "coloring",
  "dino-runner",
  "drawing",
  "emoji-math",
  "flappy-bird",
  "frogger",
  "hebrew-letters",
  "jumper",
  "math-race",
  "memory",
  "meteor-dodge",
  "multiplication",
  "number-bubbles",
  "pong",
  "puzzles",
  "reflex",
  "shesh-besh",
  "simon",
  "snake",
  "space-defender",
  "stack",
  "taki",
  "tetris",
  "true-false",
  "tzedakah",
  "whack-a-mole",
  "word-builder",
  "word-scramble",
  "snakes-ladders",
  "letter-trace",
  "riddles",
  "capitals",
  "fractions",
  "spelling",
  "emotions",
  "instruments",
  "world-languages",
  "opposites",
  "sports-quiz",
  "trivia",
  "science",
  "continents",
  "israel",
  "nature",
  "healthy-food",
  "family",
  "human-body",
  "sequences",
  "color-mix",
  "clock",
  "english-words",
  "shapes-3d",
  "transport",
  "holidays",
  "tzadikim",
  "singular-plural",
  "morning-routine",
  "phonics",
  "rhyming",
  "adjectives",
  "verbs",
  "soccer",
  "sorting",
  "patterns",
  "skip-counting",
  "life-cycles",
  "maze",
  "nikud",
  "division",
  "gender",
  "final-letters",
  "alphabet-order",
  "personal-safety",
  "visual-addition",
  "gematria",
  "word-chain",
  "letter-defender",
  "visual-logic",
  "puppet-story",
  "proverbs",
  "blessings",
  "number-slide",
  "math-stories",
  "story-builder",
  "escape-room",
  "robot-coder",
  "find-in-scene",
  "hangman",
  "choose-adventure",
  "picture-dictionary",
  "word-search",
  "israel-map",
  "kids-songs",
  "melody-maker",
  "kids-encyclopedia",
  "age-calculator",
  "craft-guide",
  "jokes-browser",
  "word-maze",
  "riddles-pro",
  "trivia-categories",
  "avatar-maker",
  "sound-quiz",
  "spinner",
  "team-picker",
  "dice",
  "timer",
  "letter-race",
  "city-builder",
  "drag-sort",
  "word-wheel",
  "answer-cannon",
  "typing-race",
  "word-fishing",
  "letter-grow",
  "letter-slingshot",
  "syllable-drums",
  "dress-up",
  "letter-bubble-shooter",
  "letter-slicer",
  "cooking-game",
  "spot-the-difference",
  "market-game",
  "crossword",
  "number-merge",
  "mispar-bonds",
  "nikud-drag",
  "letter-merge",
  "word-clicker",
  "hebrew-racer"
] as const;

type Persona = {
  name: string;
  seed: () => void;
};

const PERSONAS: Persona[] = [
  {
    name: 'grade-schooler',
    seed: () => {
      localStorage.setItem('gfk_onboarded', 'true');
      localStorage.setItem('gfk_visit_count', '1');
      localStorage.setItem('gfk-age-filter', JSON.stringify({ state: { ageRange: '5-7' }, version: 1 }));
      localStorage.setItem('gfk-difficulty', JSON.stringify({ state: { difficulty: 'medium' }, version: 0 }));
      localStorage.setItem('games-audio-settings', JSON.stringify({
        state: { speechRate: 0.85, speechPitch: 1.0, volume: 0.8, enabled: true, showNikud: false, showRealPhotos: false, showEnglish: false, holidayThemesEnabled: true },
        version: 2,
      }));
    },
  },
  {
    name: 'advanced-sound-off',
    seed: () => {
      localStorage.setItem('gfk_onboarded', 'true');
      localStorage.setItem('gfk_visit_count', '1');
      localStorage.setItem('gfk-age-filter', JSON.stringify({ state: { ageRange: '8-10' }, version: 1 }));
      localStorage.setItem('gfk-difficulty', JSON.stringify({ state: { difficulty: 'hard' }, version: 0 }));
      localStorage.setItem('games-audio-settings', JSON.stringify({
        state: { speechRate: 0.85, speechPitch: 1.0, volume: 0.8, enabled: false, showNikud: false, showRealPhotos: false, showEnglish: true, holidayThemesEnabled: true },
        version: 2,
      }));
    },
  },
];

for (const persona of PERSONAS) {
  test.describe(`Smoke [${persona.name}]`, () => {
    for (const id of GAME_IDS) {
      test(`${id} loads and survives primary CTA`, async ({ page }) => {
        const pageErrors: string[] = [];
        page.on('pageerror', (err) => pageErrors.push(err.message));

        await page.addInitScript(persona.seed);
        const response = await page.goto(`/games/${id}`);
        expect(response?.status(), `${id}: HTTP ${response?.status()}`).not.toBe(500);

        await page.locator('button, a, [role="button"]').first().waitFor({ state: 'visible', timeout: 15_000 });

        const cta = page.getByRole('button', { name: /(בואו נתחיל|התחל|שחק|נסה|start|play)/i }).first();
        if (await cta.count() > 0) {
          await cta.click({ timeout: 5_000 }).catch(() => {});
          await page.waitForTimeout(500);
        }

        expect(pageErrors, pageErrors.join('\n')).toEqual([]);
      });
    }
  });
}
