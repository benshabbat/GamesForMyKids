'use client';

import { useSoccerQuestion } from '../hooks/useSoccerQuestion';
import type { SoccerQuestion } from '../data/soccer';

interface Props {
  current: SoccerQuestion;
  onSelect: (idx: number) => void;
}

export default function SoccerAnswerGrid({ current, onSelect }: Props) {
  const { isAnswered, currentQuestion, answerClass } = useSoccerQuestion(current);
  if (!currentQuestion) return null;

  return (
    <div className="grid grid-cols-2 gap-3 w-full max-w-md">
      {currentQuestion.answers.map((ans, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(idx)}
          disabled={isAnswered}
          className={answerClass(idx)}
        >
          {ans}
        </button>
      ))}
    </div>
  );
}
