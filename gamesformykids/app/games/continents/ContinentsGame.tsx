'use client';

import React from 'react';
import { useContinentsGame } from './useContinentsGame';
import ContinentsMenuScreen from './components/ContinentsMenuScreen';
import ContinentsQuestion from './components/ContinentsQuestion';
import ContinentsResultScreen from './components/ContinentsResultScreen';

export default function ContinentsGame() {
  const {
    phase, continents, currentQuestion, currentIndex, total,
    selected, isCorrect, score,
    startGame, selectAnswer, nextQuestion, goToMenu,
  } = useContinentsGame();

  if (phase === 'menu') return <ContinentsMenuScreen continents={continents} onStart={startGame} />;

  if (phase === 'finished') return (
    <ContinentsResultScreen score={score} total={total} onRestart={startGame} onMenu={goToMenu} />
  );

  if (!currentQuestion) return null;

  return (
    <ContinentsQuestion
      phase={phase} currentIndex={currentIndex} total={total} score={score}
      question={currentQuestion} selected={selected} isCorrect={isCorrect ?? false}
      onSelect={selectAnswer} onNext={nextQuestion} onMenu={goToMenu}
    />
  );
}
