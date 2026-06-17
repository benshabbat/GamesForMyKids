'use client';
import { useState, useRef, useEffect } from 'react';
import type { SongData, ComprehensionQuestion } from '../data/songs';

interface Props {
  song: SongData;
  question: ComprehensionQuestion;
  questionNum: number;
  onAnswer: (idx: number) => void;
}

export default function SongQuiz({ song, question, questionNum, onAnswer }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const submitTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(submitTimerRef.current), []);

  const handleSubmit = () => {
    if (selected === null) return;
    setSubmitted(true);
    submitTimerRef.current = setTimeout(() => onAnswer(selected), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 flex flex-col items-center p-6" dir="rtl">
      <div className="w-full max-w-md mt-6">
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">{song.emoji}</div>
          <h2 className="text-xl font-bold text-purple-700">{song.title}</h2>
          <p className="text-purple-500 mt-1">שאלה {questionNum} מתוך 2</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <p className="text-xl font-bold text-center text-purple-800 mb-6">{question.question}</p>
          <div className="grid grid-cols-2 gap-3">
            {question.options.map((option, idx) => {
              let cls =
                'p-4 rounded-xl border-2 font-semibold text-center transition-all text-base cursor-pointer ';
              if (!submitted) {
                cls +=
                  selected === idx
                    ? 'border-purple-500 bg-purple-100 text-purple-800'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:bg-purple-50';
              } else {
                if (idx === question.correctIndex) {
                  cls += 'border-green-500 bg-green-100 text-green-800';
                } else if (idx === selected && idx !== question.correctIndex) {
                  cls += 'border-red-400 bg-red-100 text-red-700';
                } else {
                  cls += 'border-gray-100 bg-white text-gray-400';
                }
              }
              return (
                <button
                  key={idx}
                  className={cls}
                  onClick={() => !submitted && setSelected(idx)}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={selected === null}
            className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold text-lg shadow hover:bg-purple-700 disabled:opacity-40 transition-colors"
          >
            אישור
          </button>
        ) : (
          <div
            className={`text-center text-2xl font-bold ${
              selected === question.correctIndex ? 'text-green-600' : 'text-red-500'
            }`}
          >
            {selected === question.correctIndex
              ? '✅ כל הכבוד!'
              : `❌ הנכון: ${question.options[question.correctIndex]}`}
          </div>
        )}
      </div>
    </div>
  );
}
