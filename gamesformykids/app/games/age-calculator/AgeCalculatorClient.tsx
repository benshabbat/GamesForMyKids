'use client';
import { useAgeCalculator } from './useAgeCalculator';

function plural(n: number, one: string, many: string) {
  return n === 1 ? `${n} ${one}` : `${n} ${many}`;
}

function formatBig(n: number) {
  return n.toLocaleString('he-IL');
}

export default function AgeCalculatorClient() {
  const { birthdayInput, setBirthdayInput, result, calculated, calculate, reset } = useAgeCalculator();

  const today = new Date().toISOString().split('T')[0];

  const shareText = result
    ? `אני בן/בת ${plural(result.years, 'שנה', 'שנים')}, ${plural(result.months, 'חודש', 'חודשים')} ו-${plural(result.days, 'יום', 'ימים')}! 🎂 זה ${formatBig(result.totalDays)} ימים! עוד ${result.daysUntilBirthday} ימים ליום ההולדת הבא!`
    : '';

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + '\n' + window.location.href)}`;

  return (
    <div
      dir="rtl"
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ background: 'linear-gradient(135deg, #fce4ec 0%, #e1f5fe 50%, #f3e5f5 100%)' }}
    >
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">🎂</div>
          <h1 className="text-3xl font-extrabold text-purple-800">כמה אני בן/בת?</h1>
          <p className="text-purple-600 mt-1">הזן את תאריך הלידה שלך וגלה!</p>
        </div>

        {!calculated ? (
          /* Input card */
          <div className="bg-white rounded-3xl shadow-xl p-6 space-y-5">
            <div className="space-y-2">
              <label className="block text-lg font-bold text-gray-700">תאריך לידה:</label>
              <input
                type="date"
                value={birthdayInput}
                onChange={(e) => setBirthdayInput(e.target.value)}
                max={today}
                className="w-full border-2 border-purple-300 rounded-xl px-4 py-3 text-lg focus:border-purple-500 focus:outline-none text-right"
              />
            </div>
            <button
              onClick={calculate}
              disabled={!birthdayInput}
              className="w-full bg-linear-to-br from-purple-500 to-pink-500 text-white text-xl font-bold py-4 rounded-2xl shadow-lg disabled:opacity-40 active:scale-95 transition-transform"
            >
              חשב! 🎉
            </button>
          </div>
        ) : result ? (
          /* Result card */
          <div className="space-y-4">
            {result.isBirthdayToday && (
              <div className="bg-yellow-100 border-2 border-yellow-400 rounded-2xl p-4 text-center text-xl font-bold text-yellow-700 animate-bounce">
                🎉 יום הולדת שמח! 🎉
              </div>
            )}

            <div className="bg-white rounded-3xl shadow-xl p-6 text-center space-y-4">
              <div className="text-5xl font-extrabold text-purple-700">
                {plural(result.years, 'שנה', 'שנים')}
              </div>
              <div className="text-2xl text-gray-600">
                {plural(result.months, 'חודש', 'חודשים')} ו-{plural(result.days, 'יום', 'ימים')}
              </div>

              <hr className="border-purple-100" />

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-purple-50 rounded-2xl p-3">
                  <div className="text-2xl font-bold text-purple-700">{formatBig(result.totalDays)}</div>
                  <div className="text-sm text-gray-500">ימים</div>
                </div>
                <div className="bg-pink-50 rounded-2xl p-3">
                  <div className="text-2xl font-bold text-pink-700">{formatBig(result.totalHours)}</div>
                  <div className="text-sm text-gray-500">שעות</div>
                </div>
              </div>

              {/* Live seconds */}
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-4">
                <div className="text-3xl font-extrabold text-purple-800 tabular-nums">
                  {formatBig(result.liveSeconds)}
                </div>
                <div className="text-sm text-purple-600 mt-1">⏱️ שניות חיות — ממשיכות לספור!</div>
              </div>

              {/* Birthday countdown */}
              {!result.isBirthdayToday && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3">
                  <div className="text-2xl font-bold text-amber-700">🎈 עוד {result.daysUntilBirthday} ימים</div>
                  <div className="text-sm text-amber-600">ליום ההולדת הבא!</div>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={reset}
                className="bg-white border-2 border-purple-300 text-purple-700 font-bold py-3 rounded-2xl active:scale-95 transition-transform"
              >
                חשב מחדש
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-green-500 text-white font-bold py-3 rounded-2xl text-center active:scale-95 transition-transform"
              >
                📤 שתף
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
