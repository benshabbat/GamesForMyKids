'use client';
import { useWordScrambleGame } from './useWordScrambleGame';
import WordScrambleMenuScreen from './components/WordScrambleMenuScreen';
import WordScramblePlayScreen from './components/WordScramblePlayScreen';
import WordScrambleResultScreen from './components/WordScrambleResultScreen';

export default function WordScrambleGame() {
  const { phase } = useWordScrambleGame();

  if (phase === 'menu') return <WordScrambleMenuScreen />;
  if (phase === 'results') return <WordScrambleResultScreen />;
  return <WordScramblePlayScreen />;
}
