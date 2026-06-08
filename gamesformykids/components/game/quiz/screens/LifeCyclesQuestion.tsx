'use client';

import { useState, useEffect } from 'react';
import { useQuizGameStore } from '@/lib/stores';
import { QUIZ_THEMES } from '@/components/game/quiz/quizTheme';
import { QuizProgress } from '@/components/game/quiz/QuizProgress';
import type { LifeCycleQuestion } from '@/lib/quiz/data/life-cycles';

interface Props {
  current: LifeCycleQuestion;
  onComplete: () => void;
}

export default function LifeCyclesQuestion({ current, onComplete }: Props) {
  const [placed, setPlaced] = useState<number[]>([]);
  const [shuffled, setShuffled] = useState<number[]>([]);
  const [wrongIdx, setWrongIdx] = useState<number | null>(null);

  const isCorrect = useQuizGameStore(s => s.isCorrect);
  const nextQuestion = useQuizGameStore(s => s.nextQuestion);
  const t = QUIZ_THEMES['green'];

  // Reset state when lifecycle question changes
  useEffect(() => {
    const indices: number[] = [0, 1, 2, 3];
    setShuffled(indices.sort(() => Math.random() - 0.5));
    setPlaced([]);
    setWrongIdx(null);
  }, [current.id]);

  // Auto-advance after lifecycle completion
  useEffect(() => {
    if (isCorrect === true) {
      const t = setTimeout(nextQuestion, 1200);
      return () => clearTimeout(t);
    }
  }, [isCorrect, nextQuestion]);

  function tapStage(stageIndex: number) {
    if (isCorrect !== null) return;
    const nextExpected = placed.length;
    if (stageIndex === nextExpected) {
      const newPlaced = [...placed, stageIndex];
      setShuffled(prev => prev.filter(i => i !== stageIndex));
      setPlaced(newPlaced);
      if (newPlaced.length === 4) {
        setTimeout(onComplete, 300);
      }
    } else {
      setWrongIdx(stageIndex);
      setTimeout(() => setWrongIdx(null), 500);
    }
  }

  return (
    <div className={`min-h-screen bg-linear-to-br ${t.gradient} flex flex-col items-center justify-center p-4`} dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-md w-full">
        <QuizProgress theme="green" />

        {/* Header */}
        <div className="bg-green-50 rounded-2xl p-4 mb-4 text-center">
          <p className="text-sm text-green-600 font-semibold mb-1">סדר את מחזור החיים:</p>
          <p className="text-xl font-black text-green-800">{current.name}</p>
        </div>

        {/* Completed slots */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 text-center mb-2">סדר נכון:</p>
          <div className="flex gap-2 justify-center">
            {[0, 1, 2, 3].map(pos => {
              const stageIdx = placed[pos];
              const stage = stageIdx !== undefined ? current.stages[stageIdx] : undefined;
              return (
                <div
                  key={pos}
                  className={`flex flex-col items-center gap-0.5 w-16 h-20 rounded-xl border-2 transition-all duration-300 ${
                    stage
                      ? 'border-green-400 bg-green-50'
                      : 'border-dashed border-green-200 bg-gray-50'
                  }`}
                >
                  {stage ? (
                    <>
                      <span className="text-2xl mt-2">{stage.emoji}</span>
                      <span className="text-xs text-green-700 font-bold text-center leading-tight px-1">
                        {stage.label}
                      </span>
                    </>
                  ) : (
                    <span className="text-lg text-green-200 mt-4 font-bold">{pos + 1}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Available tiles */}
        {shuffled.length > 0 && (
          <div>
            <p className="text-xs text-gray-500 text-center mb-2">לחץ על השלב הראשון:</p>
            <div className="grid grid-cols-2 gap-2">
              {shuffled.map(stageIndex => {
                const stage = current.stages[stageIndex];
                if (!stage) return null;
                return (
                  <button
                    key={stageIndex}
                    onClick={() => tapStage(stageIndex)}
                    className={`p-3 rounded-xl border-2 flex flex-col items-center gap-1 transition-all duration-200 active:scale-95 ${
                      wrongIdx === stageIndex
                        ? 'border-red-400 bg-red-50 scale-95'
                        : 'border-gray-200 bg-gray-50 hover:bg-green-50 hover:border-green-300'
                    }`}
                  >
                    <span className="text-3xl">{stage.emoji}</span>
                    <span className="text-sm font-medium text-gray-700 text-center leading-tight">
                      {stage.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Success overlay when all placed */}
        {isCorrect === true && (
          <div className="mt-4 text-center animate-pulse">
            <p className="text-lg font-bold text-green-600">🎉 מעולה! המשך לחידה הבאה...</p>
          </div>
        )}

        {/* Progress dots */}
        <div className="mt-4 flex justify-center gap-1">
          {[0, 1, 2, 3].map(i => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                i < placed.length ? 'bg-green-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
