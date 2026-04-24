'use client';
import { useSequencesGame } from './useSequencesGame';
import SequencesMenuScreen from './components/SequencesMenuScreen';
import SequencesQuestion from './components/SequencesQuestion';
import { QuizResultScreen } from '@/components/game/quiz';

export default function SequencesGame() {
  const { phase, level, index, score, selected, isCorrect, current, choices, total, levels, startGame, selectAnswer, next, restart } = useSequencesGame();

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
      />
    );
  }

  return <QuizResultScreen correctCount={Math.round(score / 10)} total={total} score={score} onRestart={restart} theme="sky" />;
}
