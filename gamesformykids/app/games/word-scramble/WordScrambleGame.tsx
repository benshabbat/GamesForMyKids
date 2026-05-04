'use client';
import { useWordScrambleGame } from './useWordScrambleGame';
import WordScrambleMenuScreen from './components/WordScrambleMenuScreen';
import WordScramblePlayScreen from './components/WordScramblePlayScreen';
import WordScrambleResultScreen from './components/WordScrambleResultScreen';

export default function WordScrambleGame() {
  const { phase, score, lives, startGame } = useWordScrambleGame();

  if (phase === 'menu') return <WordScrambleMenuScreen onStart={startGame} />;
  if (phase === 'results') return <WordScrambleResultScreen score={score} lives={lives} onRestart={startGame} />;
  return <WordScramblePlayScreen />;
}
