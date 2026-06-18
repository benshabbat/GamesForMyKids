import type { GameDifficulty } from '@/lib/types/games/base';

const DIFFICULTY_MAP: Record<string, GameDifficulty> = {
  // ─── ⭐ Level 1 — ages 3–5, simple recognition ────────────────────────────
  colors: 1, letters: 1, shapes: 1, 'colored-shapes': 1, numbers: 1,
  fruits: 1, animals: 1, weather: 1, vegetables: 1, space: 1,
  clothing: 1, 'smells-tastes': 1, house: 1, tools: 1, professions: 1,
  sports: 1, kitchen: 1, 'body-parts': 1, dinosaurs: 1,
  'world-food': 1, recycling: 1, medicine: 1, 'nature-sounds': 1,
  'ocean-life': 1, 'garden-plants': 1, 'magic-fairy-tales': 1,
  'circus-show': 1, birds: 1, 'bugs-insects': 1, superheroes: 1,
  'art-craft': 1, camping: 1, 'fairy-tale-chars': 1,
  bubbles: 1, drawing: 1, coloring: 1, building: 1, tzedakah: 1,
  flags: 1, 'soccer-logos': 1, 'car-brands': 1, 'world-landmarks': 1,
  'solar-system': 1, 'famous-paintings': 1, 'tech-logos': 1,
  'dog-breeds': 1, 'cat-breeds': 1, 'nba-teams': 1,
  'exotic-birds': 1, butterflies: 1, 'days-of-week': 1, 'months-of-year': 1,
  'hebrew-letters': 1, 'body-movements': 1, 'sound-imitation': 1,
  'emotional-social': 1, 'touch-senses': 1, 'kids-songs': 1,
  'avatar-maker': 1, spinner: 1, 'team-picker': 1,

  // ─── ⭐⭐ Level 2 — ages 5–7, reading / basic counting ────────────────────
  memory: 2, math: 2, counting: 2, puzzles: 2, tetris: 2,
  'emoji-math': 2, 'math-race': 2, 'number-bubbles': 2,
  'word-scramble': 2, 'true-false': 2, 'seasons-holidays': 2,
  'shopping-money': 2, 'road-safety': 2, 'virtual-reality': 2,
  'new-professions': 2, 'advanced-weather': 2, 'advanced-colors': 2,
  'jewish-holidays': 2, 'logic-games': 2, 'time-clock': 2,
  'climate-planet': 2, emotions: 2, instruments: 2, vehicles: 2,
  'world-languages': 2, 'healthy-food': 2, 'human-body': 2,
  sequences: 2, 'color-mix': 2, clock: 2, 'english-words': 2,
  'shapes-3d': 2, holidays: 2, tzadikim: 2, 'life-cycles': 2, nikud: 2,
  rhyming: 2, adjectives: 2, 'spatial-concepts': 2, 'number-words': 2,
  verbs: 2, 'visual-opposites': 2, 'english-cards': 2, 'coins-match': 2,
  ordinals: 2, 'singular-plural': 2, 'morning-routine': 2,
  gender: 2, 'final-letters': 2, 'alphabet-order': 2,
  'visual-addition': 2, 'skip-counting': 2, 'number-slide': 2,
  'math-stories': 2, sorting: 2, patterns: 2, blessings: 2,
  proverbs: 2, 'personal-safety': 2, 'visual-logic': 2, 'puppet-story': 2,
  'word-builder': 2, 'word-search': 2, 'word-chain': 2, phonics: 2,
  'israel-map': 2, 'melody-maker': 2, 'kids-encyclopedia': 2,
  'age-calculator': 2, 'craft-guide': 2, 'jokes-browser': 2,
  'word-maze': 2, 'story-builder': 2, 'choose-adventure': 2,
  'picture-dictionary': 2, 'sound-quiz': 2, simon: 2,
  'geography-flags': 2, 'geography-capitals': 2, 'geography-continents': 2,
  'snakes-ladders': 2, taki: 2, checkers: 2, 'shesh-besh': 2,

  // ─── ⭐⭐⭐ Level 3 — ages 7+, spelling / arithmetic / strategy ────────────
  arithmetic: 3, multiplication: 3, division: 3, fractions: 3,
  capitals: 3, spelling: 3, opposites: 3, 'sports-quiz': 3,
  trivia: 3, science: 3, continents: 3, israel: 3, nature: 3,
  'trivia-categories': 3, 'riddles-pro': 3, riddles: 3,
  'escape-room': 3, 'robot-coder': 3, 'find-in-scene': 3,
  hangman: 3, 'letter-defender': 3, maze: 3, gematria: 3,
  chess: 3, pong: 3, 'flappy-bird': 3, snake: 3, 'dino-runner': 3,
  'catch-fruit': 3, 'space-defender': 3, 'whack-a-mole': 3,
  'brick-breaker': 3, 'balloon-pop': 3, frogger: 3, stack: 3,
  jumper: 3, 'color-tap': 3, 'meteor-dodge': 3, reflex: 3,
  family: 2, transport: 2,
};

export function getGameDifficulty(gameId: string): GameDifficulty {
  return DIFFICULTY_MAP[gameId] ?? 2;
}
