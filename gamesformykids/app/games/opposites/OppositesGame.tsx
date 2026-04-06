'use client';
import { useOppositesGame } from './useOppositesGame';
import OppositesMenuScreen from './components/OppositesMenuScreen';
import OppositesQuestion from './components/OppositesQuestion';
import OppositesResultScreen from './components/OppositesResultScreen';

export default function OppositesGame() {
  const { phase, index, score, selected, isCorrect, current, choices, total, correctCount, startGame, selectAnswer, next, goMenu, restart } = useOppositesGame();

  if (phase === 'menu') return <OppositesMenuScreen onStart={startGame} />;

  if (phase === 'playing' && current) {
    return (
      <OppositesQuestion
        index={index}
        total={total}
        score={score}
        current={current}
        choices={choices as string[]}
        selected={selected as string | null}
        isCorrect={isCorrect ?? false}
        onSelect={selectAnswer}
        onNext={next}
        onMenu={goMenu}
      />
    );
  }

  return <OppositesResultScreen correctCount={correctCount} total={total} onRestart={restart} onMenu={goMenu} />;
}

