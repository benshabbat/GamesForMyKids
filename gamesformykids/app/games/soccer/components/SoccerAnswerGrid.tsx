'use client';

import { useSoccerQuestion } from '../hooks/useSoccerQuestion';

export default function SoccerAnswerGrid() {
  const { phase, currentQuestion, answerClass, selectAnswer } = useSoccerQuestion();
  if (!currentQuestion) return null;

  return (
    <div className="grid grid-cols-2 gap-3 w-full max-w-md">
      {currentQuestion.answers.map((ans, idx) => (
        <button
          key={idx}
          onClick={() => selectAnswer(idx)}
          disabled={phase === 'answered'}
          className={answerClass(idx)}
        >
          {ans}
        </button>
      ))}
    </div>
  );
}
