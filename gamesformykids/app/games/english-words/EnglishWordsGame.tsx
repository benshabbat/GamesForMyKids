'use client';

import { useEnglishWordsGame } from './useEnglishWordsGame';
import type { EnglishCategory } from './data/words';
import EnglishWordsMenuScreen from './components/EnglishWordsMenuScreen';
import EnglishWordsQuestion from './components/EnglishWordsQuestion';
import EnglishWordsResultScreen from './components/EnglishWordsResultScreen';

export default function EnglishWordsGame() {
  const { phase, categories, index, score, selected, isCorrect, current, choices, total, correctCount, startGame, selectAnswer, next, goMenu, restart } = useEnglishWordsGame();

  if (phase === 'menu') return (
    <EnglishWordsMenuScreen categories={categories as readonly EnglishCategory[]} onStart={startGame} />
  );

  if (phase === 'result') return (
    <EnglishWordsResultScreen correctCount={correctCount} total={total} score={score} onRestart={restart} onMenu={goMenu} />
  );

  if (!current) return null;

  return (
    <EnglishWordsQuestion
      index={index} total={total} score={score}
      current={current} choices={choices} selected={selected}
      isCorrect={isCorrect} onSelect={selectAnswer} onNext={next}
    />
  );
}
