'use client';
import { useSequencesGame } from './useSequencesGame';
import SequencesMenuScreen from './components/SequencesMenuScreen';
import SequencesQuestion from './components/SequencesQuestion';
import { QuizResultScreen } from '@/components/game/quiz';

export default function SequencesGame() {
  const { phase, level, levels, current, choices, selected, isCorrect, startGame, selectAnswer, next, restart } = useSequencesGame();

  if (phase === 'menu') return <SequencesMenuScreen levels={levels} onStart={startGame} />;

  if (phase === 'playing' && current) {
    return (
      <SequencesQuestion
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

  return <QuizResultScreen onRestart={restart} theme="sky" />;
}
