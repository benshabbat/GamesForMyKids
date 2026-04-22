'use client';

import { useSoccerQuestion } from '../hooks/useSoccerQuestion';

export default function SoccerQuestionCard() {
  const { phase, isCorrect, currentQuestion } = useSoccerQuestion();
  if (!currentQuestion) return null;

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mb-5 text-center">
      <div className="text-6xl mb-3">{currentQuestion.emoji}</div>
      <p className="text-lg font-bold text-gray-800 leading-relaxed">{currentQuestion.question}</p>
      {phase === 'answered' && (
        <div className={`mt-4 p-3 rounded-xl text-sm leading-relaxed ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
          <p className="font-bold">
            {isCorrect ? '✅ שאל אחד!' : `❌ התשובה: ${currentQuestion.answers[currentQuestion.correctIndex]}`}
          </p>
          <p className="text-xs mt-1">💡 {currentQuestion.funFact}</p>
        </div>
      )}
    </div>
  );
}
