'use client';
import { useClockGame } from './useClockGame';
import ClockMenuScreen from './components/ClockMenuScreen';
import ClockQuestionCard from './components/ClockQuestion';
import ClockResultScreen from './components/ClockResultScreen';

export default function ClockGame() {
  const { phase, index, score, selected, isCorrect, current, choices, total, startGame, selectAnswer, next, goMenu, restart } = useClockGame();

  if (phase === 'menu') return <ClockMenuScreen onStart={startGame} />;

  if (phase === 'playing' && current) return (
    <ClockQuestionCard
      index={index} total={total} score={score}
      current={current} choices={choices}
      selected={selected} isCorrect={isCorrect ?? false}
      onSelect={selectAnswer} onNext={next} onMenu={goMenu}
    />
  );

  const correct = Math.round(score / 10);
  return <ClockResultScreen correct={correct} total={total} onRestart={restart} onMenu={goMenu} />;
}
