'use client';
import { useEffect } from 'react';
import { useQuizGameStore } from '@/lib/stores/quizGameStore';
import { speakHebrew } from '@/lib/utils/speech/speaker';
import type { NikudQuestion, NikudOption } from '../nikudDragData';

interface Props {
  current: NikudQuestion;
  choices: NikudOption[];
  wrongFlash: boolean;
  onSelect: (nikudId: string) => void;
  onReplay: () => void;
}

export default function NikudDragQuestion({ current, choices, wrongFlash, onSelect, onReplay }: Props) {
  const index = useQuizGameStore((s) => s.index);
  const total = useQuizGameStore((s) => s.total);
  const score = useQuizGameStore((s) => s.score);
  const isCorrect = useQuizGameStore((s) => s.isCorrect);

  useEffect(() => {
    void speakHebrew(current.ttsText);
  }, [current.id, current.ttsText]);

  const feedback = isCorrect === true ? 'correct' : wrongFlash ? 'wrong' : null;

  return (
    <div className="min-h-screen flex flex-col items-center bg-linear-to-br from-violet-100 via-purple-50 to-indigo-100 p-4" dir="rtl">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="flex justify-between items-center mb-5 px-1">
          <span className="text-violet-600 text-sm font-bold">{index + 1}/{total}</span>
          <span className="text-violet-800 font-black text-lg">⭐ {score}</span>
        </div>

        {/* Consonant display */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-5 text-center">
          <p className="text-violet-400 text-sm mb-1">האות:</p>
          <div
            className={`text-9xl font-black leading-none transition-all ${
              feedback === 'correct' ? 'text-green-500' : 'text-violet-700'
            }`}
          >
            {feedback === 'correct' ? current.syllable : current.consonant}
          </div>

          {feedback && (
            <div className={`mt-3 text-xl font-bold ${
              feedback === 'correct' ? 'text-green-600' : 'text-red-500'
            }`}>
              {feedback === 'correct' ? `✅ ${current.syllable}! נכון!` : '❌ לא נכון, נסה שוב'}
            </div>
          )}

          {!feedback && (
            <p className="text-violet-500 text-sm mt-3">
              🔊 בחר את הניקוד שנאמר
            </p>
          )}
        </div>

        {/* Replay audio */}
        <button
          onClick={onReplay}
          className="w-full mb-4 bg-violet-100 hover:bg-violet-200 text-violet-700 font-bold py-3 rounded-2xl transition-all"
        >
          🔊 שמע שוב
        </button>

        {/* Nikud options */}
        <div className="grid grid-cols-5 gap-2">
          {choices.map((opt) => (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              disabled={!!feedback}
              className={`
                flex flex-col items-center justify-center py-3 px-1 rounded-2xl shadow-sm
                transition-all active:scale-90 font-black text-center
                ${feedback === 'correct' && opt.id === current.targetNikudId
                  ? 'bg-green-400 text-white scale-110'
                  : 'bg-white text-violet-700 hover:bg-violet-50'}
                ${feedback === 'wrong' && opt.id === current.targetNikudId
                  ? 'bg-green-100 border-2 border-green-400'
                  : ''}
                disabled:opacity-60
              `}
            >
              <span className="text-2xl leading-none">{opt.syllableWith('ב')}</span>
              <span className="text-xs mt-1 text-violet-500 font-normal">{opt.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
