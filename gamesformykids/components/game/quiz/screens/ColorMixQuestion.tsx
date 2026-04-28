'use client';

import type { ColorMix } from '@/lib/quiz/data/color-mix';
import { answerButtonClass } from '@/lib/quiz/answerButtonClass';
import { useQuizProgress } from '@/hooks/quiz/useQuizProgress';

interface Props {
  mix: ColorMix;
  choices: string[];
  onSelect: (label: string) => void;
}

export default function ColorMixQuestion({ mix, choices, onSelect }: Props) {
  const { index, total, score, selected, isCorrect, next } = useQuizProgress();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 p-4" dir="rtl">
      <div className="max-w-lg mx-auto">
        <div className="flex justify-between items-center mb-4">
          <span className="font-bold text-purple-700">{index + 1} / {total}</span>
          <span className="font-bold text-purple-700">⭐ {score * 10}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full mb-5">
          <div className="h-full bg-purple-400 rounded-full transition-all" style={{ width: `${(index / total) * 100}%` }} />
        </div>
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-5">
          <p className="text-xl font-bold text-gray-700 text-center mb-5">מה מקבלים?</p>
          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full shadow-lg mx-auto mb-2 border-4 border-white ring-2 ring-gray-200" style={{ backgroundColor: mix.color1 }} />
              <span className="text-sm font-bold text-gray-600">{mix.label1}</span>
            </div>
            <div className="text-4xl font-black text-gray-400">+</div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full shadow-lg mx-auto mb-2 border-4 border-white ring-2 ring-gray-200" style={{ backgroundColor: mix.color2 }} />
              <span className="text-sm font-bold text-gray-600">{mix.label2}</span>
            </div>
            <div className="text-4xl font-black text-gray-400">=</div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full shadow-lg mx-auto mb-2 border-4 border-white ring-2 ring-gray-200 flex items-center justify-center"
                style={{ backgroundColor: selected ? mix.result : '#f3f4f6' }}>
                {!selected && <span className="text-3xl">❓</span>}
              </div>
              <span className="text-sm font-bold text-gray-600">{selected ? mix.resultLabel : '?'}</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {choices.map((label, i) => (
            <button key={i} onClick={() => onSelect(label)} disabled={!!selected}
              className={`py-4 px-3 rounded-2xl font-bold text-lg transition-all active:scale-95 ${answerButtonClass(
                label === mix.resultLabel, label === selected, !!selected,
                'bg-white border-2 border-gray-200 text-gray-700 hover:border-purple-400 hover:bg-purple-50',
              )}`}>
              {label}
            </button>
          ))}
        </div>
        {selected && (
          <div className="mt-4">
            <div className={`rounded-2xl p-3 mb-3 text-center font-bold ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
              {isCorrect ? `✅ נכון! ${mix.label1} + ${mix.label2} = ${mix.resultLabel}` : `💙 ${mix.label1} + ${mix.label2} = ${mix.resultLabel}`}
            </div>
            <button onClick={next} className="w-full py-4 rounded-2xl text-white font-bold text-xl bg-gradient-to-l from-pink-500 via-purple-500 to-indigo-500 shadow-lg hover:opacity-90 active:scale-95 transition-all">
              {index < total - 1 ? 'הבא ←' : 'תוצאות! 🎉'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
