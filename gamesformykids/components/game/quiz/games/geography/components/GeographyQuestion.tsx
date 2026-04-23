'use client';
import { useGeographyGame } from '../useGeographyGame';

export default function GeographyQuestion() {
  const { index, total, score, current, selected, isCorrect, selectAnswer, next } = useGeographyGame();

  if (!current) return null;

  const { country, mode, choices } = current;
  const prompt = mode === 'capital'
    ? `🏙️ מה הבירה של ${country.name} ${country.flag}?`
    : mode === 'flag'
    ? `🚩 לאיזו מדינה שייך הדגל ${country.flag}?`
    : `🌍 באיזו יבשת נמצאת ${country.name} ${country.flag}?`;

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
          {choices.map(c => {
            const val = mode === 'capital' ? c.capital : mode === 'flag' ? c.name : c.continent;
            const isRight = c.id === country.id;
            let style = 'bg-white border-2 border-gray-200 text-gray-700 hover:border-teal-400';
            if (selected) {
              if (isRight) style = 'bg-green-500 border-2 border-green-600 text-white';
              else if (c.id === selected && !isCorrect) style = 'bg-red-400 border-2 border-red-500 text-white';
              else style = 'bg-gray-100 border-2 border-gray-200 text-gray-400';
            }
            return (
              <button key={c.id} onClick={() => selectAnswer(c.id)} disabled={!!selected}
                className={`py-4 px-3 rounded-2xl font-semibold text-lg transition-all active:scale-95 ${style}`}>
                {mode === 'flag' ? `${c.flag} ${c.name}` : val}
              </button>
            );
          })}
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


