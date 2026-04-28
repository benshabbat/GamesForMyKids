'use client';
import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import { makeQuizGame } from './makeQuizGame';
import { QuizMenuScreen, QuizResultScreen } from '@/components/game/quiz';

import { useClockGame } from '@/lib/quiz/useClockGame';
import { useColorMixGame } from '@/lib/quiz/useColorMixGame';
import { useSequencesGame } from '@/lib/quiz/useSequencesGame';
import { useGeographyGame } from '@/lib/quiz/useGeographyGame';
import { useHumanBodyGame } from '@/lib/quiz/useHumanBodyGame';
import { useTriviaGame } from '@/lib/quiz/useTriviaGame';
import { useScienceGame } from '@/lib/quiz/useScienceGame';
import { useNatureGame } from '@/lib/quiz/useNatureGame';
import { useIsraelGame } from '@/lib/quiz/useIsraelGame';

import ClockMenuScreen from '@/components/game/quiz/screens/ClockMenuScreen';
import ClockQuestion from '@/components/game/quiz/screens/ClockQuestion';
import ClockResultScreen from '@/components/game/quiz/screens/ClockResultScreen';
import ColorMixQuestion from '@/components/game/quiz/screens/ColorMixQuestion';
import SequencesMenuScreen from '@/components/game/quiz/screens/SequencesMenuScreen';
import SequencesQuestion from '@/components/game/quiz/screens/SequencesQuestion';
import GeographyMenuScreen from '@/components/game/quiz/screens/GeographyMenuScreen';
import GeographyQuestion from '@/components/game/quiz/screens/GeographyQuestion';
import HumanBodyMenuScreen from '@/components/game/quiz/screens/HumanBodyMenuScreen';
import HumanBodyQuestion from '@/components/game/quiz/screens/HumanBodyQuestion';
import TriviaMenuScreen from '@/components/game/quiz/screens/TriviaMenuScreen';
import TriviaQuestion from '@/components/game/quiz/screens/TriviaQuestion';
import ScienceMenuScreen from '@/components/game/quiz/screens/ScienceMenuScreen';
import ScienceQuestion from '@/components/game/quiz/screens/ScienceQuestion';
import NatureMenuScreen from '@/components/game/quiz/screens/NatureMenuScreen';
import IsraelMenuScreen from '@/components/game/quiz/screens/IsraelMenuScreen';
import { CategoryIndexedQuestion } from '@/components/game/quiz';
import type { NatureCategory } from '@/lib/quiz/data/nature';
import { CATEGORY_COLORS as NATURE_COLORS } from '@/lib/quiz/data/nature';
import type { IsraelCategory } from '@/lib/quiz/data/israel';
import { CATEGORY_COLORS as ISRAEL_COLORS } from '@/lib/quiz/data/israel';

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

  // ── Custom games (makeQuizGame) ─────────────────────────────────────────────
  'clock': makeQuizGame(
    useClockGame,
    ({ current, choices, startGame, selectAnswer, restart }) => ({
      menu:     <ClockMenuScreen onStart={startGame} />,
      question: current ? <ClockQuestion current={current} choices={choices} onSelect={selectAnswer} /> : null,
      result:   <ClockResultScreen onRestart={restart} />,
    }),
  ),

  'color-mix': makeQuizGame(
    useColorMixGame,
    ({ current, startGame, selectAnswer, restart }) => ({
      menu:     <QuizMenuScreen emoji="🎨" title="ערבוב צבעים" description="מה מקבלים כשמערבבים שני צבעים?" theme="violet" buttonLabel="🖌️ בואו נערבב!" onStart={startGame} />,
      question: current ? <ColorMixQuestion mix={current.mix} choices={current.choices} onSelect={selectAnswer} /> : null,
      result:   <QuizResultScreen onRestart={restart} theme="violet" />,
    }),
  ),

  'sequences': makeQuizGame(
    useSequencesGame,
    ({ level, levels, current, choices, startGame, selectAnswer, restart }) => ({
      menu:     <SequencesMenuScreen levels={levels} onStart={startGame} />,
      question: current ? <SequencesQuestion level={level} current={current} choices={choices as number[]} onSelect={selectAnswer} /> : null,
      result:   <QuizResultScreen onRestart={restart} theme="sky" />,
    }),
  ),

  'geography': makeQuizGame(
    useGeographyGame,
    ({ current, startGame, selectAnswer, restart }) => ({
      menu:     <GeographyMenuScreen onStart={startGame} />,
      question: current ? <GeographyQuestion current={current} onSelect={selectAnswer} /> : null,
      result:   <QuizResultScreen onRestart={restart} theme="teal" />,
    }),
  ),

  'human-body': makeQuizGame(
    useHumanBodyGame,
    ({ category, currentQuestion, choices, startGame, selectAnswer }) => ({
      menu:     <HumanBodyMenuScreen onStart={startGame} />,
      question: currentQuestion ? <HumanBodyQuestion currentQuestion={currentQuestion} choices={choices} onSelect={selectAnswer} /> : null,
      result:   <QuizResultScreen onRestart={() => startGame(category)} theme="red" />,
    }),
  ),

  'trivia': makeQuizGame(
    useTriviaGame,
    ({ current, choices, correctLabel, startGame, selectAnswer, restart }) => ({
      menu:     <TriviaMenuScreen onStart={startGame} />,
      question: current ? <TriviaQuestion current={current} choices={choices} correctLabel={correctLabel} onSelect={selectAnswer} /> : null,
      result:   <QuizResultScreen onRestart={restart} theme="amber" />,
    }),
  ),

  'science': makeQuizGame(
    useScienceGame,
    ({ current, choices, correctLabel, startGame, selectAnswer, restart }) => ({
      menu:     <ScienceMenuScreen onStart={startGame} />,
      question: current ? <ScienceQuestion current={current} choices={choices} correctLabel={correctLabel} onSelect={selectAnswer} /> : null,
      result:   <QuizResultScreen onRestart={restart} theme="cyan" />,
    }),
  ),

  'nature': makeQuizGame(
    useNatureGame,
    ({ current, choices, correctLabel, startGame, selectAnswer, restart }) => ({
      menu:     <NatureMenuScreen onStart={startGame as (cat: NatureCategory) => void} />,
      question: current ? <CategoryIndexedQuestion current={current} choices={choices} correctLabel={correctLabel} onSelect={selectAnswer} theme="green" categoryColors={NATURE_COLORS} /> : null,
      result:   <QuizResultScreen onRestart={restart} theme="green" />,
    }),
  ),

  'israel': makeQuizGame(
    useIsraelGame,
    ({ current, choices, correctLabel, startGame, selectAnswer, restart }) => ({
      menu:     <IsraelMenuScreen onStart={startGame as (cat: IsraelCategory) => void} />,
      question: current ? <CategoryIndexedQuestion current={current} choices={choices} correctLabel={correctLabel} onSelect={selectAnswer} theme="blue" categoryColors={ISRAEL_COLORS} /> : null,
      result:   <QuizResultScreen onRestart={restart} theme="blue" />,
    }),
  ),

  // ── Complex state (own store / multi-phase) ─────────────────────────────────
  'transport': dynamic(() => import('@/components/game/quiz/games/transport/TransportGame')),
  'holidays':  dynamic(() => import('@/components/game/quiz/games/holidays/HolidaysGame')),
  'tzadikim':  dynamic(() => import('@/components/game/quiz/games/tzadikim/TzadikimGame')),
};

export function getQuizGameComponent(gameType: string): ComponentType | null {
  return QUIZ_COMPONENTS[gameType] ?? null;
}
