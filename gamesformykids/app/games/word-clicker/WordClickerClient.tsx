'use client';
import { useWordClickerStore } from './wordClickerStore';
import WordClickerMenu from './components/WordClickerMenu';
import WordClickerScreen from './components/WordClickerScreen';
import WordClickerResult from './components/WordClickerResult';

export default function WordClickerClient() {
  const { phase, score, total, startGame, reset } = useWordClickerStore();

  if (phase === 'idle') return <WordClickerMenu onStart={startGame} />;
  if (phase === 'result') return <WordClickerResult score={score} total={total} onRestart={reset} />;
  return <WordClickerScreen />;
}
