'use client';

import type { GeoQuestion } from '@/lib/quiz/useGeographyGame';
import { getGeoPrompt, getChoiceLabel } from '@/lib/quiz/data/geography';
import { answerButtonClass } from '@/lib/quiz/answerButtonClass';
import { useQuizProgress } from '@/hooks/quiz/useQuizProgress';

interface Props {
  current: GeoQuestion;
  onSelect: (id: string) => void;
}

export default function GeographyQuestion({ current, onSelect }: Props) {
  const { index, total, score, selected, isCorrect, next } = useQuizProgress();

  const { country, mode, choices } = current;
  const prompt = getGeoPrompt(country, mode);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 p-4" dir="rtl">
      <div className="max-w-xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <span className="font-bold text-teal-700">שאלה {index + 1} / {total}</span>
          <span className="font-bold text-teal-700">⭐ {score}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full mb-5">
          <div className="h-full bg-teal-400 rounded-full transition-all" style={{ width: `${(index / total) * 100}%` }} />
        </div>
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-5 text-center">
          <p className="text-xl font-bold text-gray-800">{prompt}</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {choices.map(c => (
            <button key={c.id} onClick={() => onSelect(c.id)} disabled={!!selected}
              className={`py-4 px-3 rounded-2xl font-semibold text-lg transition-all active:scale-95 ${answerButtonClass(
                c.id === country.id,
                c.id === selected,
                !!selected,
                'bg-white border-2 border-gray-200 text-gray-700 hover:border-teal-400',
              )}`}>
              {getChoiceLabel(c, mode)}
            </button>
          ))}
        </div>
        {selected && (
          <div className="mt-4">
            <div className={`rounded-2xl p-3 mb-3 text-center font-bold ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
              {isCorrect ? `✅ נכון! ${country.flag} ${country.name} — ${country.capital}` : `💙 ${country.flag} ${country.name} — ${country.capital}, ${country.continent}`}
            </div>
            <button onClick={next} className="w-full py-4 rounded-2xl text-white font-bold text-xl bg-gradient-to-l from-teal-500 to-cyan-600 hover:opacity-90 active:scale-95 transition-all">
              {index < total - 1 ? 'שאלה הבאה ←' : 'תוצאות! 🎉'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
