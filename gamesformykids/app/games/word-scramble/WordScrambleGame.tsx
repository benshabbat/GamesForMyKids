'use client';
import { useWordScrambleGame } from './useWordScrambleGame';
import GameMenuCard from '@/components/game/shared/GameMenuCard';
import WordScramblePlayScreen from './components/WordScramblePlayScreen';
import WordScrambleResultScreen from './components/WordScrambleResultScreen';

export default function WordScrambleGame() {
  const { phase, score, lives, startGame } = useWordScrambleGame();

  if (phase === 'menu') return (
    <GameMenuCard
      emoji="🔡"
      title="מילים מבולבלות"
      description="לחצו על האותיות בסדר הנכון כדי לכתוב את המילה!"
      gradientClass="from-green-100 to-emerald-200"
      buttonClass="from-green-500 to-emerald-600"
      onStart={startGame}
      startLabel="🔡 התחל!"
    />
  );
  if (phase === 'results') return <WordScrambleResultScreen score={score} lives={lives} onRestart={startGame} />;
  return <WordScramblePlayScreen />;
}
