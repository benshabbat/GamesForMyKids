'use client';
import { useClockGame } from './useClockGame';
import ClockMenuScreen from './components/ClockMenuScreen';
import ClockQuestionCard from './components/ClockQuestion';
import ClockResultScreen from './components/ClockResultScreen';

export default function ClockGame() {
  const { phase, current, choices, startGame, selectAnswer, restart } = useClockGame();

  if (phase === 'menu') return <ClockMenuScreen onStart={startGame} />;
  if (phase === 'playing' && current) return <ClockQuestionCard current={current} choices={choices} onSelect={selectAnswer} />;
  return <ClockResultScreen onRestart={restart} />;
}
