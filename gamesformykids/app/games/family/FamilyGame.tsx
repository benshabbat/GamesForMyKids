'use client';

import React from 'react';
import { useFamilyGame } from './useFamilyGame';
import FamilyMenuScreen from './components/FamilyMenuScreen';
import FamilyQuestion from './components/FamilyQuestion';
import FamilyResultScreen from './components/FamilyResultScreen';

export default function FamilyGame() {
  const {
    phase, currentQuestion, currentIndex, total,
    selected, isCorrect, score,
    startGame, selectAnswer, nextQuestion,
  } = useFamilyGame();

  if (phase === 'menu') return <FamilyMenuScreen onStart={startGame} />;

  if (phase === 'result') return (
    <FamilyResultScreen score={score} total={total} onRestart={startGame} />
  );

  if (!currentQuestion) return null;

  return (
    <FamilyQuestion
      phase={phase} currentIndex={currentIndex} total={total} score={score}
      question={currentQuestion} selected={selected} isCorrect={isCorrect ?? false}
      onSelect={selectAnswer} onNext={nextQuestion}
    />
  );
}
