'use client';

import React from 'react';
import { useHealthyFoodGame } from './useHealthyFoodGame';
import { FOOD_ITEMS } from './data/food';
import HealthyFoodMenuScreen from './components/HealthyFoodMenuScreen';
import HealthyFoodQuestion from './components/HealthyFoodQuestion';
import HealthyFoodResultScreen from './components/HealthyFoodResultScreen';

export default function HealthyFoodGame() {
  const {
    phase, currentQuestion, currentIndex, total,
    selected, isCorrect, score,
    startGame, selectAnswer, nextQuestion, goToMenu,
  } = useHealthyFoodGame();

  if (phase === 'menu') {
    return <HealthyFoodMenuScreen preview={FOOD_ITEMS.slice(0, 8)} onStart={startGame} />;
  }

  if (phase === 'finished') {
    return <HealthyFoodResultScreen score={score} total={total} onRestart={startGame} onMenu={goToMenu} />;
  }

  if (!currentQuestion) return null;

  return (
    <HealthyFoodQuestion
      phase={phase}
      currentIndex={currentIndex}
      total={total}
      score={score}
      currentQuestion={currentQuestion}
      selected={selected}
      isCorrect={isCorrect}
      onSelect={selectAnswer}
      onNext={nextQuestion}
      onMenu={goToMenu}
    />
  );
}
