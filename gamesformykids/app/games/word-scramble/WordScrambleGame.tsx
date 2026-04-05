'use client';
import { useWordScrambleGame } from './useWordScrambleGame';
import WordScrambleMenuScreen from './components/WordScrambleMenuScreen';
import WordScramblePlayScreen from './components/WordScramblePlayScreen';
import WordScrambleResultScreen from './components/WordScrambleResultScreen';

export default function WordScrambleGame() {
  const { phase, words, wIdx, letters, picked, score, lives, shake, correct, startGame, pickLetter, unpick } = useWordScrambleGame();

  if (phase === 'menu') return <WordScrambleMenuScreen onStart={startGame} />;

  if (phase === 'results') return <WordScrambleResultScreen score={score} lives={lives} onRestart={startGame} />;

  return (
    <WordScramblePlayScreen
      words={words}
      wIdx={wIdx}
      letters={letters}
      picked={picked}
      score={score}
      lives={lives}
      shake={shake}
      correct={correct}
      onPickLetter={pickLetter}
      onUnpick={unpick}
    />
  );
}
