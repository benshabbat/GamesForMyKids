'use client';
import { useSequencesGame } from './useSequencesGame';
import SequencesMenuScreen from './components/SequencesMenuScreen';
import SequencesQuestion from './components/SequencesQuestion';
import SequencesResultScreen from './components/SequencesResultScreen';

export default function SequencesGame() {
  const { phase, level, index, score, selected, isCorrect, current, choices, total, levels, startGame, selectAnswer, next, goMenu, restart } = useSequencesGame();

  if (phase === 'menu') return <SequencesMenuScreen levels={levels} onStart={startGame} />;

  if (phase === 'playing' && current) {
    return (
      <SequencesQuestion
        index={index}
        total={total}
        score={score}
        level={level}
        current={current}
        choices={choices as number[]}
        selected={selected as number | null}
        isCorrect={isCorrect ?? false}
        onSelect={selectAnswer}
        onNext={next}
        onMenu={goMenu}
      />
    );
  }

  return <SequencesResultScreen level={level} score={score} total={total} onRestart={restart} onMenu={goMenu} />;
}

