'use client';
import { useMemo } from 'react';
import type { SNLQuestion } from '../data/questions';
import { LADDERS, SNAKES } from '../snakesLaddersStore';

interface Props {
  question: SNLQuestion;
  square: number;
  specialType: 'ladder' | 'snake';
  playerName: string;
  playerEmoji: string;
  isAI: boolean;
  onAnswer: (answer: string) => void;
}

export default function QuizPopup({ question, square, specialType, playerName, playerEmoji, isAI, onAnswer }: Props) {
  const choices = useMemo(() => {
    const all = [question.answer, ...question.wrongOptions];
    return all.sort(() => Math.random() - 0.5);
  }, [question]);

  const destination = specialType === 'ladder' ? LADDERS[square] : SNAKES[square];
  const hint = specialType === 'ladder'
    ? `ענה נכון ↑ עלה לריבוע ${destination}!`
    : `ענה נכון ↓ הימנע מריבוע ${destination}!`;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 flex flex-col items-center gap-4">
        <div className="text-4xl">{specialType === 'ladder' ? '🪜' : '🐍'}</div>
        <p className="text-xs text-center text-gray-500 font-medium" dir="rtl">{hint}</p>

        <div className="bg-gray-50 rounded-xl p-4 w-full text-center">
          <div className="text-3xl mb-2">{question.emoji}</div>
          <p className="text-lg font-bold text-gray-800" dir="rtl">{question.question}</p>
        </div>

        {isAI ? (
          <div className="text-center">
            <div className="text-2xl mb-1">🤔</div>
            <p className="text-sm text-gray-500">{playerEmoji} {playerName} חושב...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 w-full">
            {choices.map((choice) => (
              <button
                key={choice}
                onClick={() => onAnswer(choice)}
                className="py-3 px-2 bg-indigo-100 hover:bg-indigo-200 active:bg-indigo-300 text-indigo-900 font-bold rounded-xl transition-colors text-base"
              >
                {choice}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
