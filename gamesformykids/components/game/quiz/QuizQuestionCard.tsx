'use client';

import { answerButtonClass } from '@/lib/quiz/answerButtonClass';

interface Props {
  question: string;
  answers: string[];
  correctIndex: number;
  selected: number | null;
  isCorrect: boolean | null;
  onSelect: (idx: number) => void;
  onNext: () => void;
  isLast: boolean;
  accentGradient: string;
  correctMessage?: string;
  idleButtonClass?: string;
}

export default function QuizQuestionCard({
  question,
  answers,
  correctIndex,
  selected,
  isCorrect,
  onSelect,
  onNext,
  isLast,
  accentGradient,
  correctMessage = '🌟 כל הכבוד! תשובה נכונה!',
  idleButtonClass = 'bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-400 hover:bg-blue-50',
}: Props) {
  const answered = selected !== null;

  return (
    <>
      <div className="bg-white rounded-2xl shadow p-5 mb-4 text-center">
        <p className="text-xl font-bold text-gray-800 leading-relaxed">{question}</p>
      </div>

      <div className="space-y-3 mb-4">
        {answers.map((answer, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(idx)}
            disabled={answered}
            className={`w-full text-start py-4 px-5 rounded-2xl font-semibold text-lg transition-[transform,colors] duration-200 active:scale-95 ${answerButtonClass(
              idx === correctIndex,
              idx === selected,
              answered,
              idleButtonClass,
            )}`}
          >
            {answered && idx === correctIndex ? '✅ ' : answered && idx === selected && !isCorrect ? '❌ ' : ''}
            {answer}
          </button>
        ))}
      </div>

      {answered && (
        <div className={`rounded-2xl p-4 mb-5 text-center font-bold text-lg ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
          {isCorrect ? correctMessage : `💙 התשובה הנכונה: "${answers[correctIndex]}"`}
        </div>
      )}

      {answered && (
        <button
          onClick={onNext}
          className={`w-full py-4 rounded-2xl text-white font-bold text-xl shadow-lg bg-gradient-to-l ${accentGradient} hover:opacity-90 active:scale-95 transition-[transform,opacity] duration-200`}
        >
          {isLast ? 'לתוצאות! 🎉' : 'שאלה הבאה ←'}
        </button>
      )}
    </>
  );
}
