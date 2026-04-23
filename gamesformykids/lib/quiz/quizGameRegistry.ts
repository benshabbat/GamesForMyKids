/**
 * ===============================================
 * Quiz Game Registry
 * ===============================================
 * מיפוי בין gameType לקומפוננט המשחק המתאים.
 * כל הייבוא הוא dynamic (code-split) כדי לא לטעון
 * את כל משחקי החידון ביחד.
 *
 * הרשימה מוזנת ל-[gameType]/page.tsx כדי לנתב
 * quiz games דרך הנתיב הדינמי הגנרי במקום
 * דפים נפרדים לכל משחק.
 */

import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

const QUIZ_COMPONENTS: Record<string, ComponentType> = {
  // ── createQuizHook pattern ──────────────────────────────
  'riddles':         dynamic(() => import('@/app/games/riddles/RiddlesGame')),
  'capitals':        dynamic(() => import('@/app/games/capitals/CapitalsGame')),
  'fractions':       dynamic(() => import('@/app/games/fractions/FractionsGame')),
  'spelling':        dynamic(() => import('@/app/games/spelling/SpellingGame')),
  'emotions':        dynamic(() => import('@/app/games/emotions/EmotionsGame')),
  'instruments':     dynamic(() => import('@/app/games/instruments/InstrumentsGame')),
  'world-languages': dynamic(() => import('@/app/games/world-languages/WorldLanguagesGame')),
  'opposites':       dynamic(() => import('@/app/games/opposites/OppositesGame')),
  'sports-quiz':     dynamic(() => import('@/app/games/sports-quiz/SportsQuizGame')),

  // ── custom hooks (useQuizGameStore directly) ────────────
  'geography':       dynamic(() => import('@/app/games/geography/GeographyGame')),
  'trivia':          dynamic(() => import('@/app/games/trivia/TriviaGame')),
  'science':         dynamic(() => import('@/app/games/science/ScienceGame')),
  'continents':      dynamic(() => import('@/app/games/continents/ContinentsGame')),
  'israel':          dynamic(() => import('@/app/games/israel/IsraelGame')),
  'nature':          dynamic(() => import('@/app/games/nature/NatureGame')),
  'healthy-food':    dynamic(() => import('@/app/games/healthy-food/HealthyFoodGame')),
  'family':          dynamic(() => import('@/app/games/family/FamilyGame')),
  'human-body':      dynamic(() => import('@/app/games/human-body/HumanBodyGame')),
  'sequences':       dynamic(() => import('@/app/games/sequences/SequencesGame')),
  'color-mix':       dynamic(() => import('@/app/games/color-mix/ColorMixGame')),
  'clock':           dynamic(() => import('@/app/games/clock/ClockGame')),
  'english-words':   dynamic(() => import('@/app/games/english-words/EnglishWordsGame')),
  'shapes-3d':       dynamic(() => import('@/app/games/shapes-3d/Shapes3DGame')),
  'transport':       dynamic(() => import('@/app/games/transport/TransportGame')),

  // ── special / story-based quiz games ───────────────────
  'holidays':        dynamic(() => import('@/app/games/holidays/HolidaysGame')),
  'tzadikim':        dynamic(() => import('@/app/games/tzadikim/TzadikimGame')),
};

/** Set of all gameType strings served by QuizGameRouter. */
export const QUIZ_GAME_TYPES = new Set(Object.keys(QUIZ_COMPONENTS));

/** Returns the dynamic component for a quiz gameType, or null if unknown. */
export function getQuizGameComponent(gameType: string): ComponentType | null {
  return QUIZ_COMPONENTS[gameType] ?? null;
}
