'use client';
import { useSpellingGame } from './useSpellingGame';
import SpellingMenuScreen from './components/SpellingMenuScreen';
import SpellingQuestion from './components/SpellingQuestion';
import SpellingResultScreen from './components/SpellingResultScreen';

export default function SpellingGame() {
  const { phase, correctCount, total, startGame, restart, goMenu } = useSpellingGame();

  if (phase === 'menu') return <SpellingMenuScreen onStart={startGame} />;
  if (phase === 'playing') return <SpellingQuestion />;
  return <SpellingResultScreen correctCount={correctCount} total={total} onRestart={restart} onMenu={goMenu} />;
}
