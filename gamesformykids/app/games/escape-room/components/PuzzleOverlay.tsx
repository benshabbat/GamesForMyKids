'use client';
import { useState, useMemo, useRef, useEffect } from 'react';
import type { Hotspot, Puzzle } from './puzzleData';

type Props = {
  hotspot: Hotspot;
  puzzle: Puzzle;
  hintsUsed: number;
  onAnswer: (answer: string) => boolean;
  onHint: () => string | null;
  onDismiss: () => void;
};

export default function PuzzleOverlay({ hotspot, puzzle, hintsUsed, onAnswer, onHint, onDismiss }: Props) {
  const [feedback, setFeedback] = useState<{ text: string; correct: boolean } | null>(null);
  const [hint, setHint] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  const dismissTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(dismissTimerRef.current), []);

  const choices = useMemo(
    () => [puzzle.answer, ...puzzle.wrongOptions].sort(() => Math.random() - 0.5),
    [puzzle],
  );

  const handleSelect = (choice: string) => {
    if (answered) return;
    const isCorrect = onAnswer(choice);
    setFeedback({ text: isCorrect ? puzzle.successMessage : 'לא נכון — נסה שוב! 💪', correct: isCorrect });
    if (isCorrect) {
      setAnswered(true);
      dismissTimerRef.current = setTimeout(onDismiss, 2000);
    }
  };

  const handleHint = () => {
    const h = onHint();
    if (h) setHint(h);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onDismiss}>
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 flex flex-col gap-4"
        onClick={e => e.stopPropagation()}
        dir="rtl"
      >
        <div className="flex items-center justify-between">
          <span className="text-3xl">{hotspot.emoji}</span>
          <button onClick={onDismiss} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
        </div>

        <p className="text-center font-bold text-gray-800 text-lg leading-relaxed">{puzzle.question}</p>

        {hint && (
          <p className="text-center text-sm text-amber-600 bg-amber-50 rounded-xl p-2">💡 {hint}</p>
        )}

        {feedback && (
          <p className={`text-center text-sm font-semibold rounded-xl p-2 ${feedback.correct ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {feedback.correct ? '✅' : '❌'} {feedback.text}
          </p>
        )}

        {!answered && (
          <div className="grid grid-cols-2 gap-2">
            {choices.map((choice) => (
              <button
                key={choice}
                onClick={() => handleSelect(choice)}
                className="bg-indigo-50 hover:bg-indigo-100 active:bg-indigo-200 border-2 border-indigo-200 hover:border-indigo-400 rounded-2xl p-3 font-bold text-indigo-800 text-base transition"
              >
                {choice}
              </button>
            ))}
          </div>
        )}

        {!answered && hintsUsed < 3 && (
          <button
            onClick={handleHint}
            className="text-xs text-amber-600 underline text-center"
          >
            💡 רמז ({3 - hintsUsed} נותרו)
          </button>
        )}
      </div>
    </div>
  );
}
