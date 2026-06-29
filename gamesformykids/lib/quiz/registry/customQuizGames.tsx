'use client';
import type { ComponentType } from 'react';
import dynamic from 'next/dynamic';
import { makeQuizGame } from '../makeQuizGame';
import { QuizMenuScreen, QuizResultScreen, CategoryIndexedQuestion } from '@/components/game/quiz';
import { useNikudGame } from '@/lib/quiz/useNikudGame';
import { useDivisionGame } from '@/lib/quiz/useDivisionGame';
import { useStoryBuilderGame } from '@/lib/quiz/useStoryBuilderGame';
import { useRiddlesProGame } from '@/lib/quiz/useRiddlesProGame';
import { useTriviaCategoriesGame } from '@/lib/quiz/useTriviaCategoriesGame';
import { useCityBuilderGame } from '@/lib/quiz/useCityBuilderGame';
import { useWordWheelGame } from '@/lib/quiz/useWordWheelGame';

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
import type { TriviaCatCategory, TriviaCatDifficulty } from '@/lib/quiz/data/trivia-categories';
import type { NatureCategory } from '@/lib/quiz/data/nature';
import { NATURE_CATEGORY_COLORS as NATURE_COLORS } from '@/lib/quiz/data/nature';
import type { IsraelCategory } from '@/lib/quiz/data/israel';
import { ISRAEL_CATEGORY_COLORS as ISRAEL_COLORS } from '@/lib/quiz/data/israel';

import QuizGameSkeleton from '@/components/ui/QuizGameSkeleton';

// Screen components — lazy-loaded so each game page only downloads its own screens
// Options must be object literals (Turbopack static analysis requirement)
const WordWheelQuestion    = dynamic(() => import('@/components/game/quiz/screens/WordWheelQuestion'),   { loading: () => <QuizGameSkeleton /> });
const RiddleProQuestion  = dynamic(() => import('@/components/game/quiz/screens/RiddleProQuestion'), { loading: () => <QuizGameSkeleton /> });
const TriviaCategoryPicker = dynamic(() => import('@/components/game/quiz/screens/TriviaCategoryPicker'), { loading: () => <QuizGameSkeleton /> });
const TriviaCategoriesQuestion = dynamic(() => import('@/components/game/quiz/screens/TriviaCategoriesQuestion'), { loading: () => <QuizGameSkeleton /> });
const ClockMenuScreen    = dynamic(() => import('@/components/game/quiz/screens/ClockMenuScreen'), { loading: () => <QuizGameSkeleton /> });
const ClockQuestion      = dynamic(() => import('@/components/game/quiz/screens/ClockQuestion'), { loading: () => <QuizGameSkeleton /> });
const ClockResultScreen  = dynamic(() => import('@/components/game/quiz/screens/ClockResultScreen'), { loading: () => <QuizGameSkeleton /> });
const ColorMixQuestion   = dynamic(() => import('@/components/game/quiz/screens/ColorMixQuestion'), { loading: () => <QuizGameSkeleton /> });
const SequencesMenuScreen = dynamic(() => import('@/components/game/quiz/screens/SequencesMenuScreen'), { loading: () => <QuizGameSkeleton /> });
const SequencesQuestion  = dynamic(() => import('@/components/game/quiz/screens/SequencesQuestion'), { loading: () => <QuizGameSkeleton /> });
const HumanBodyMenuScreen = dynamic(() => import('@/components/game/quiz/screens/HumanBodyMenuScreen'), { loading: () => <QuizGameSkeleton /> });
const HumanBodyQuestion  = dynamic(() => import('@/components/game/quiz/screens/HumanBodyQuestion'), { loading: () => <QuizGameSkeleton /> });
const TriviaMenuScreen   = dynamic(() => import('@/components/game/quiz/screens/TriviaMenuScreen'), { loading: () => <QuizGameSkeleton /> });
const TriviaQuestion     = dynamic(() => import('@/components/game/quiz/screens/TriviaQuestion'), { loading: () => <QuizGameSkeleton /> });
const ScienceMenuScreen  = dynamic(() => import('@/components/game/quiz/screens/ScienceMenuScreen'), { loading: () => <QuizGameSkeleton /> });
const ScienceQuestion    = dynamic(() => import('@/components/game/quiz/screens/ScienceQuestion'), { loading: () => <QuizGameSkeleton /> });
const NatureMenuScreen   = dynamic(() => import('@/components/game/quiz/screens/NatureMenuScreen'), { loading: () => <QuizGameSkeleton /> });
const IsraelMenuScreen   = dynamic(() => import('@/components/game/quiz/screens/IsraelMenuScreen'), { loading: () => <QuizGameSkeleton /> });
const SoccerMenuScreen   = dynamic(() => import('@/app/games/soccer/components/SoccerMenuScreen'), { loading: () => <QuizGameSkeleton /> });
const SoccerQuestion     = dynamic(() => import('@/app/games/soccer/components/SoccerQuestion'), { loading: () => <QuizGameSkeleton /> });
const SoccerResultScreen = dynamic(() => import('@/app/games/soccer/components/SoccerResultScreen'), { loading: () => <QuizGameSkeleton /> });
const PhonicsQuestion    = dynamic(() => import('@/components/game/quiz/screens/PhonicsQuestion'), { loading: () => <QuizGameSkeleton /> });
const SortingQuestion    = dynamic(() => import('@/components/game/quiz/screens/SortingQuestion'), { loading: () => <QuizGameSkeleton /> });
const PatternQuestion    = dynamic(() => import('@/components/game/quiz/screens/PatternQuestion'), { loading: () => <QuizGameSkeleton /> });
const LifeCyclesQuestion = dynamic(() => import('@/components/game/quiz/screens/LifeCyclesQuestion'), { loading: () => <QuizGameSkeleton /> });
const NikudQuestion        = dynamic(() => import('@/components/game/quiz/screens/NikudQuestion'), { loading: () => <QuizGameSkeleton /> });
const DivisionQuestion     = dynamic(() => import('@/components/game/quiz/screens/DivisionQuestion'), { loading: () => <QuizGameSkeleton /> });
const StoryBuilderQuestion = dynamic(() => import('@/components/game/quiz/screens/StoryBuilderQuestion'), { loading: () => <QuizGameSkeleton /> });
const StoryBuilderResult   = dynamic(() => import('@/components/game/quiz/screens/StoryBuilderResult'), { loading: () => <QuizGameSkeleton /> });
const CityBuilderStage     = dynamic(() => import('@/components/game/quiz/screens/CityBuilderStage'),   { loading: () => <QuizGameSkeleton /> });

/**
 * Games built with makeQuizGame — custom hooks + lazy-loaded screen components.
 * Opening /games/clock does NOT download soccer/phonics/nature screens (and vice versa).
 */
export const CUSTOM_QUIZ_GAMES: Record<string, ComponentType> = {
  'trivia-categories': makeQuizGame(
    useTriviaCategoriesGame,
    ({ current, choices, correctLabel, difficulty, streak, startGame, selectAnswer, restart }) => ({
      menu:     <TriviaCategoryPicker onStart={startGame as (cat: TriviaCatCategory, diff: TriviaCatDifficulty) => void} />,
      question: current ? <TriviaCategoriesQuestion current={current} choices={choices as string[]} correctLabel={correctLabel as string} difficulty={difficulty as TriviaCatDifficulty} streak={streak as number} onSelect={selectAnswer} /> : null,
      result:   <QuizResultScreen onRestart={restart} theme="amber" />,
    }),
  ),

  'riddles-pro': makeQuizGame(
    useRiddlesProGame,
    ({ current, choices, cluesRevealed, answersShown, questionNumber, total, score, lastPoints, lastCorrect, revealClue, showAnswers, selectAnswer, startGame, restart }) => ({
      menu:     <QuizMenuScreen emoji="🧩" title="חידות מדורגות" description="השב מוקדם יותר — קבל יותר נקודות! עד 3 נקודות לחידה!" theme="violet" buttonLabel="🧩 בואו ניגש!" onStart={startGame} />,
      question: current ? <RiddleProQuestion current={current} choices={choices as string[]} cluesRevealed={cluesRevealed as number} answersShown={answersShown as boolean} questionNumber={questionNumber as number} total={total as number} score={score} lastPoints={lastPoints as number | null} lastCorrect={lastCorrect as boolean | null} onRevealClue={revealClue as () => void} onShowAnswers={showAnswers as () => void} onSelect={selectAnswer} /> : null,
      result:   <QuizResultScreen onRestart={restart} theme="violet" />,
    }),
  ),

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

  'division': makeQuizGame(
    useDivisionGame,
    ({ current, choices, startGame, selectAnswer, restart }) => ({
      menu:     <QuizMenuScreen emoji="➗" title="חילוק" description="12 ÷ 3 = ? — חלק פריטים לקבוצות שוות!" theme="blue" buttonLabel="➗ בואו נחלק!" onStart={startGame} />,
      question: current ? <DivisionQuestion current={current} choices={choices as string[]} onSelect={selectAnswer} /> : null,
      result:   <QuizResultScreen onRestart={restart} theme="blue" />,
    }),
  ),

  'city-builder': makeQuizGame(
    useCityBuilderGame,
    ({ current, choices, startGame, selectAnswer, restart }) => ({
      menu:     <QuizMenuScreen emoji="🏙️" title="בנה את העיר" description="ענה נכון — ובנה בניין חדש בעיר! 10 שאלות מכל התחומים." theme="sky" buttonLabel="🏗️ בואו לבנות!" onStart={startGame} />,
      question: current ? <CityBuilderStage current={current} choices={choices as string[]} onSelect={selectAnswer} /> : null,
      result:   <QuizResultScreen onRestart={restart} theme="sky" title="העיר שלך מוכנה!" subtitle="כל הכבוד על הבניין!" />,
    }),
  ),

  'story-builder': makeQuizGame(
    useStoryBuilderGame,
    ({ story, currentBlank, currentBlankIdx, filledWords, completedStory, startGame, selectWord, restart }) => ({
      menu:     <QuizMenuScreen emoji="📖" title="בניית סיפור" description="מלא את החסר — בנה סיפור מצחיק בעברית!" theme="amber" buttonLabel="📖 בואו נכתוב!" onStart={startGame} />,
      question: currentBlank ? <StoryBuilderQuestion story={story} currentBlank={currentBlank} currentBlankIdx={currentBlankIdx} filledWords={filledWords} onSelect={selectWord} /> : null,
      result:   completedStory ? <StoryBuilderResult story={story} completedStory={completedStory} onRestart={restart} /> : <QuizResultScreen onRestart={restart} theme="amber" />,
    }),
  ),

  'word-wheel': makeQuizGame(
    useWordWheelGame,
    ({ current, choices, startGame, selectAnswer, restart }) => ({
      menu:     <QuizMenuScreen emoji="🎡" title="ספין של מילים" description="סובב את הגלגל וגלה אות — אחר כך מצא מילה שמתחילה בה!" theme="violet" buttonLabel="🌀 בואו לסובב!" onStart={startGame} />,
      question: current ? <WordWheelQuestion current={current} choices={choices as string[]} onSelect={selectAnswer} /> : null,
      result:   <QuizResultScreen onRestart={restart} theme="violet" title="כל הכבוד!" />,
    }),
  ),
};
