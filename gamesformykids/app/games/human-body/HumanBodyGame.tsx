'use client';

import React from 'react';
import { useHumanBodyGame } from './useHumanBodyGame';
import type { BodyCategory } from './data/body';
import HumanBodyMenuScreen from './components/HumanBodyMenuScreen';
import HumanBodyQuestion from './components/HumanBodyQuestion';
import HumanBodyResultScreen from './components/HumanBodyResultScreen';

export default function HumanBodyGame() {
  const {
    phase, category, currentQuestion,
    currentIndex, total, choices, selected, isCorrect,
    score, startGame, selectAnswer, nextQuestion, goToMenu,
  } = useHumanBodyGame();

  if (phase === 'menu') {
    return <HumanBodyMenuScreen onStart={(cat: BodyCategory) => startGame(cat)} />;
  }

  if (phase === 'finished') {
    return <HumanBodyResultScreen score={score} total={total} category={category} onRestart={startGame} onMenu={goToMenu} />;
  }

  if (!currentQuestion) return null;

  return (
    <HumanBodyQuestion
      phase={phase}
      currentIndex={currentIndex}
      total={total}
      score={score}
      currentQuestion={currentQuestion}
      choices={choices}
      selected={selected}
      isCorrect={isCorrect}
      onSelect={selectAnswer}
      onNext={nextQuestion}
      onMenu={goToMenu}
    />
  );
}
