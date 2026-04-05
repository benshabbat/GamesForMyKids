'use client';

import { useSoccerGame } from './useSoccerGame';
import type { SoccerCategory } from './data/soccer';
import SoccerMenuScreen from './components/SoccerMenuScreen';
import SoccerQuestion from './components/SoccerQuestion';
import SoccerResultScreen from './components/SoccerResultScreen';

export default function SoccerGame() {
  const {
    phase, category, categories, currentQuestion,
    currentIndex, total, selected, isCorrect, score, showGoal,
    startGame, selectAnswer, nextQuestion, goToMenu,
  } = useSoccerGame();

  if (phase === 'menu') {
    return <SoccerMenuScreen categories={categories as readonly SoccerCategory[]} onStart={startGame} />;
  }

  if (phase === 'finished') {
    return <SoccerResultScreen score={score} total={total} category={category} onRestart={startGame} onMenu={goToMenu} />;
  }

  if (!currentQuestion) return null;

  return (
    <SoccerQuestion
      currentIndex={currentIndex}
      total={total}
      score={score}
      currentQuestion={currentQuestion}
      phase={phase}
      selected={selected}
      isCorrect={isCorrect}
      showGoal={showGoal}
      onSelect={selectAnswer}
      onNext={nextQuestion}
      onMenu={goToMenu}
    />
  );
}

