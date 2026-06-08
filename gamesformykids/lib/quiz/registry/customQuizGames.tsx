'use client';
import type { ComponentType } from 'react';
import dynamic from 'next/dynamic';
import { makeQuizGame } from '../makeQuizGame';
import { QuizMenuScreen, QuizResultScreen, CategoryIndexedQuestion } from '@/components/game/quiz';
import { useNikudGame } from '@/lib/quiz/useNikudGame';

// Hooks — small, kept static so tree-shaking inlines only what's used
import { useClockGame } from '@/lib/quiz/useClockGame';
import { usePhonicsGame } from '@/lib/quiz/usePhonicsGame';
import { useColorMixGame } from '@/lib/quiz/useColorMixGame';
import { useSequencesGame } from '@/lib/quiz/useSequencesGame';
import { useHumanBodyGame } from '@/lib/quiz/useHumanBodyGame';
import { useTriviaGame } from '@/lib/quiz/useTriviaGame';
import { useScienceGame } from '@/lib/quiz/useScienceGame';
import { useNatureGame } from '@/lib/quiz/useNatureGame';
import { useIsraelGame } from '@/lib/quiz/useIsraelGame';
import { useSoccerGame } from '@/lib/quiz/useSoccerGame';
import { useSortingGame } from '@/lib/quiz/useSortingGame';
import { usePatternsGame } from '@/lib/quiz/usePatternsGame';
import { useLifeCyclesGame } from '@/lib/quiz/useLifeCyclesGame';

// Category data constants needed synchronously in render props
import type { NatureCategory } from '@/lib/quiz/data/nature';
import { CATEGORY_COLORS as NATURE_COLORS } from '@/lib/quiz/data/nature';
import type { IsraelCategory } from '@/lib/quiz/data/israel';
import { CATEGORY_COLORS as ISRAEL_COLORS } from '@/lib/quiz/data/israel';

// Screen components — lazy-loaded so each game page only downloads its own screens
const ClockMenuScreen    = dynamic(() => import('@/components/game/quiz/screens/ClockMenuScreen'));
const ClockQuestion      = dynamic(() => import('@/components/game/quiz/screens/ClockQuestion'));
const ClockResultScreen  = dynamic(() => import('@/components/game/quiz/screens/ClockResultScreen'));
const ColorMixQuestion   = dynamic(() => import('@/components/game/quiz/screens/ColorMixQuestion'));
const SequencesMenuScreen = dynamic(() => import('@/components/game/quiz/screens/SequencesMenuScreen'));
const SequencesQuestion  = dynamic(() => import('@/components/game/quiz/screens/SequencesQuestion'));
const HumanBodyMenuScreen = dynamic(() => import('@/components/game/quiz/screens/HumanBodyMenuScreen'));
const HumanBodyQuestion  = dynamic(() => import('@/components/game/quiz/screens/HumanBodyQuestion'));
const TriviaMenuScreen   = dynamic(() => import('@/components/game/quiz/screens/TriviaMenuScreen'));
const TriviaQuestion     = dynamic(() => import('@/components/game/quiz/screens/TriviaQuestion'));
const ScienceMenuScreen  = dynamic(() => import('@/components/game/quiz/screens/ScienceMenuScreen'));
const ScienceQuestion    = dynamic(() => import('@/components/game/quiz/screens/ScienceQuestion'));
const NatureMenuScreen   = dynamic(() => import('@/components/game/quiz/screens/NatureMenuScreen'));
const IsraelMenuScreen   = dynamic(() => import('@/components/game/quiz/screens/IsraelMenuScreen'));
const SoccerMenuScreen   = dynamic(() => import('@/app/games/soccer/components/SoccerMenuScreen'));
const SoccerQuestion     = dynamic(() => import('@/app/games/soccer/components/SoccerQuestion'));
const SoccerResultScreen = dynamic(() => import('@/app/games/soccer/components/SoccerResultScreen'));
const PhonicsQuestion    = dynamic(() => import('@/components/game/quiz/screens/PhonicsQuestion'));
const SortingQuestion    = dynamic(() => import('@/components/game/quiz/screens/SortingQuestion'));
const PatternQuestion    = dynamic(() => import('@/components/game/quiz/screens/PatternQuestion'));
const LifeCyclesQuestion = dynamic(() => import('@/components/game/quiz/screens/LifeCyclesQuestion'));
const NikudQuestion      = dynamic(() => import('@/components/game/quiz/screens/NikudQuestion'));

/**
 * Games built with makeQuizGame — custom hooks + lazy-loaded screen components.
 * Opening /games/clock does NOT download soccer/phonics/nature screens (and vice versa).
 */
export const CUSTOM_QUIZ_GAMES: Record<string, ComponentType> = {
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

  'human-body': makeQuizGame(
    useHumanBodyGame,
    ({ currentQuestion, choices, startGame, selectAnswer, restart }) => ({
      menu:     <HumanBodyMenuScreen onStart={startGame} />,
      question: currentQuestion ? <HumanBodyQuestion currentQuestion={currentQuestion} choices={choices} onSelect={selectAnswer} /> : null,
      result:   <QuizResultScreen onRestart={restart} theme="red" />,
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

  'soccer': makeQuizGame(
    useSoccerGame,
    ({ current }) => ({
      menu:     <SoccerMenuScreen />,
      question: current ? <SoccerQuestion /> : null,
      result:   <SoccerResultScreen />,
    }),
  ),

  'phonics': makeQuizGame(
    usePhonicsGame,
    ({ current, choices, startGame, selectAnswer, restart }) => ({
      menu:     <QuizMenuScreen emoji="🔊" title="פוניקה עברית" description="שמע צליל ובחר את האות הנכונה!" theme="violet" buttonLabel="🔊 בואו נתחיל!" onStart={startGame} />,
      question: current ? <PhonicsQuestion current={current} choices={choices as string[]} onSelect={selectAnswer} /> : null,
      result:   <QuizResultScreen onRestart={restart} theme="violet" />,
    }),
  ),

  'sorting': makeQuizGame(
    useSortingGame,
    ({ current, startGame, selectAnswer, restart }) => ({
      menu:     <QuizMenuScreen emoji="🗂️" title="מיון לקטגוריות" description="כלב או כסא? — מיין כל פריט לקטגוריה שלו!" theme="emerald" buttonLabel="🗂️ בואו נמיין!" onStart={startGame} />,
      question: current ? <SortingQuestion current={current} onSelect={selectAnswer} /> : null,
      result:   <QuizResultScreen onRestart={restart} theme="emerald" />,
    }),
  ),

  'patterns': makeQuizGame(
    usePatternsGame,
    ({ current, startGame, selectAnswer, restart }) => ({
      menu:     <QuizMenuScreen emoji="🔵🔴" title="זיהוי דפוסים" description="🔴🔵🔴🔵🔴❓ — מה בא הלאה?" theme="sky" buttonLabel="🔵 בואו נגלה!" onStart={startGame} />,
      question: current ? <PatternQuestion current={current} onSelect={selectAnswer} /> : null,
      result:   <QuizResultScreen onRestart={restart} theme="sky" />,
    }),
  ),

  'life-cycles': makeQuizGame(
    useLifeCyclesGame,
    ({ current, startGame, completeLifeCycle, restart }) => ({
      menu:     <QuizMenuScreen emoji="🦋" title="מחזור חיים" description="סדר את שלבי מחזור החיים בסדר הנכון!" theme="green" buttonLabel="🌱 בואו נסדר!" onStart={startGame} />,
      question: current ? <LifeCyclesQuestion current={current} onComplete={completeLifeCycle as () => void} /> : null,
      result:   <QuizResultScreen onRestart={restart} theme="green" />,
    }),
  ),

  'nikud': makeQuizGame(
    useNikudGame,
    ({ current, choices, startGame, selectAnswer, restart }) => ({
      menu:     <QuizMenuScreen emoji="🔤" title="ניקוד עברי" description="זהה את הניקוד — פַּתַח, חִירִיק, חוֹלֵם ועוד!" theme="violet" buttonLabel="🔤 בואו נלמד!" onStart={startGame} />,
      question: current ? <NikudQuestion current={current} choices={choices as string[]} onSelect={selectAnswer} /> : null,
      result:   <QuizResultScreen onRestart={restart} theme="violet" />,
    }),
  ),
};
