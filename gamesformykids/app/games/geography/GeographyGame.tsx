'use client';
import { useGeographyGame } from './useGeographyGame';
import { QuestionMode } from './data/countries';
import GeographyMenuScreen from './components/GeographyMenuScreen';
import GeographyQuestion from './components/GeographyQuestion';
import GeographyResultScreen from './components/GeographyResultScreen';

export default function GeographyGame() {
  const { phase, index, score, selected, isCorrect, current, total, startGame, selectAnswer, next, goMenu, restart } = useGeographyGame();

  if (phase === 'menu') {
    return <GeographyMenuScreen onStart={(mode: QuestionMode) => startGame(mode)} />;
  }

  if (phase === 'playing' && current) {
    return (
      <GeographyQuestion
        index={index}
        total={total}
        score={score}
        current={current}
        selected={selected}
        isCorrect={isCorrect}
        onSelect={selectAnswer}
        onNext={next}
        onMenu={goMenu}
      />
    );
  }

  return <GeographyResultScreen score={score} total={total} onRestart={restart} onMenu={goMenu} />;
}
