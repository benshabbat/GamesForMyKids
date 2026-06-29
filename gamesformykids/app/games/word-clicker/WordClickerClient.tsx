'use client';
import { useEffect } from 'react';
import { useWordClickerStore } from './wordClickerStore';
import WordClickerMenu from './components/WordClickerMenu';
import WordClickerScreen from './components/WordClickerScreen';
import WordClickerResult from './components/WordClickerResult';

export default function WordClickerClient() {
  const { phase, score, words, wordComplete, nextWord, startGame, reset } = useWordClickerStore();

  // Advance to next word after 1.2 s so the "correct" feedback is visible
  useEffect(() => {
    if (!wordComplete) return;
    const id = setTimeout(nextWord, 1200);
    return () => clearTimeout(id);
  }, [wordComplete, nextWord]);

  if (phase === 'idle') return <WordClickerMenu onStart={startGame} />;
  if (phase === 'result') return <WordClickerResult score={score} total={words.length} onRestart={reset} />;
  return <WordClickerScreen />;
}
