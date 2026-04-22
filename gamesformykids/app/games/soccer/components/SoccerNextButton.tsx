'use client';

import { useSoccerQuestion } from '../hooks/useSoccerQuestion';

export default function SoccerNextButton() {
  const { phase, nextLabel, nextQuestion } = useSoccerQuestion();
  if (phase !== 'answered') return null;

  return (
    <button
      onClick={nextQuestion}
      className="mt-6 px-10 py-3 bg-yellow-400 text-green-900 rounded-xl font-black shadow-xl active:scale-95 text-lg"
    >
      {nextLabel}
    </button>
  );
}
