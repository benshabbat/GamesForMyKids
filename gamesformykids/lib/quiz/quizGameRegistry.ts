import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

// Generic game handles all data-driven quiz games
const GenericQuizGame = dynamic(() => import('@/components/game/quiz/GenericQuizGame'));

const QUIZ_COMPONENTS: Record<string, ComponentType> = {
  // ── Generic (config-driven) ─────────────────────────────────────────────────
  'riddles':         GenericQuizGame,
  'capitals':        GenericQuizGame,
  'spelling':        GenericQuizGame,
  'fractions':       GenericQuizGame,
  'emotions':        GenericQuizGame,
  'instruments':     GenericQuizGame,
  'world-languages': GenericQuizGame,
  'opposites':       GenericQuizGame,
  'sports-quiz':     GenericQuizGame,
  'continents':      GenericQuizGame,
  'healthy-food':    GenericQuizGame,
  'family':          GenericQuizGame,
  'english-words':   GenericQuizGame,
  'shapes-3d':       GenericQuizGame,

  // ── Custom (category/mode selection or special flow) ────────────────────────
  'geography':  dynamic(() => import('@/components/game/quiz/games/geography/GeographyGame')),
  'trivia':     dynamic(() => import('@/components/game/quiz/games/trivia/TriviaGame')),
  'science':    dynamic(() => import('@/components/game/quiz/games/science/ScienceGame')),
  'nature':     dynamic(() => import('@/components/game/quiz/games/nature/NatureGame')),
  'israel':     dynamic(() => import('@/components/game/quiz/games/israel/IsraelGame')),
  'human-body': dynamic(() => import('@/components/game/quiz/games/human-body/HumanBodyGame')),
  'sequences':  dynamic(() => import('@/components/game/quiz/games/sequences/SequencesGame')),
  'color-mix':  dynamic(() => import('@/components/game/quiz/games/color-mix/ColorMixGame')),
  'clock':      dynamic(() => import('@/components/game/quiz/games/clock/ClockGame')),
  'transport':  dynamic(() => import('@/components/game/quiz/games/transport/TransportGame')),
  'holidays':   dynamic(() => import('@/components/game/quiz/games/holidays/HolidaysGame')),
  'tzadikim':   dynamic(() => import('@/components/game/quiz/games/tzadikim/TzadikimGame')),
};

export const QUIZ_GAME_TYPES = new Set(Object.keys(QUIZ_COMPONENTS));

export function getQuizGameComponent(gameType: string): ComponentType | null {
  return QUIZ_COMPONENTS[gameType] ?? null;
}
