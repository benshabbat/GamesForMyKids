'use client';

import { useTransportGame } from './useTransportGame';
import type { TransportType } from './data/transport';
import TransportMenuScreen from './components/TransportMenuScreen';
import TransportQuestion from './components/TransportQuestion';
import TransportResultScreen from './components/TransportResultScreen';

export default function TransportGame() {
  const {
    phase, transportType, types, currentQuestion,
    currentIndex, total, selected, isCorrect,
    score, startGame, selectAnswer, nextQuestion, goToMenu,
  } = useTransportGame();

  if (phase === 'menu') return (
    <TransportMenuScreen types={types as readonly TransportType[]} onStart={startGame} />
  );

  if (phase === 'finished') return (
    <TransportResultScreen
      score={score}
      total={total}
      transportType={transportType}
      onRestart={startGame}
      onMenu={goToMenu}
    />
  );

  if (!currentQuestion) return null;

  return (
    <TransportQuestion
      currentIndex={currentIndex}
      total={total}
      score={score}
      currentQuestion={currentQuestion}
      phase={phase}
      selected={selected}
      isCorrect={isCorrect}
      onSelect={selectAnswer}
      onNext={nextQuestion}
      onMenu={goToMenu}
    />
  );
}
