'use client';
import { useDressUpGame } from './useDressUpGame';
import { speakHebrew } from '@/lib/utils/speech/speaker';

export default function DressUpClient() {
  const {
    phase, qIdx, choices, dressed, score, feedback,
    startGame, selectAnswer, current,
    ZONE_ORDER, ZONE_PLACEHOLDER, ZONE_LABEL, CATEGORY_LABELS, QUESTIONS_PER_GAME,
  } = useDressUpGame();

  if (phase === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-purple-200 flex flex-col items-center justify-center p-6 text-center">
        <div className="text-8xl mb-4 animate-bounce">👗</div>
        <h1 className="text-4xl font-bold text-purple-800 mb-3">לבוש את הדמות</h1>
        <p className="text-xl text-purple-600 mb-2">הקשב לשם הבגד ובחר את הנכון!</p>
        <div className="flex gap-4 text-lg text-purple-500 mb-8 flex-wrap justify-center">
          <span>👕 יומיומי</span>
          <span>🧥 עונתי</span>
          <span>🎓 מקצועי</span>
        </div>
        <button
          onClick={startGame}
          className="bg-purple-600 hover:bg-purple-700 text-white text-2xl font-bold px-12 py-5 rounded-2xl shadow-xl transform hover:scale-105 transition-transform"
        >
          🎮 התחל!
        </button>
      </div>
    );
  }

  if (phase === 'result') {
    const pct = Math.round((score / QUESTIONS_PER_GAME) * 100);
    const medal = pct === 100 ? '🥇' : pct >= 75 ? '🥈' : pct >= 50 ? '🥉' : '⭐';
    const msg = pct === 100 ? 'מושלם! לבשת הכל נכון!' : pct >= 75 ? 'כל הכבוד!' : pct >= 50 ? 'יפה מאוד!' : 'נסה שוב!';
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-purple-200 flex flex-col items-center justify-center p-6 text-center">
        <div className="text-8xl mb-4">{medal}</div>
        <h2 className="text-4xl font-bold text-purple-800 mb-2">{msg}</h2>
        <p className="text-2xl text-purple-600 mb-6">{score} מתוך {QUESTIONS_PER_GAME} נכון</p>
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8 max-w-sm w-full">
          <p className="text-purple-700 font-bold mb-4 text-lg">הדמות שלבשת:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {Object.values(dressed).map(item => (
              <div key={item.name} className="flex flex-col items-center gap-1">
                <span className="text-4xl">{item.emoji}</span>
                <span className="text-xs text-purple-600">{item.hebrew}</span>
              </div>
            ))}
            {Object.values(dressed).length === 0 && (
              <span className="text-gray-400">אין פריטים</span>
            )}
          </div>
        </div>
        <button
          onClick={startGame}
          className="bg-purple-600 hover:bg-purple-700 text-white text-xl font-bold px-10 py-4 rounded-2xl shadow-xl"
        >
          🔄 שחק שוב
        </button>
      </div>
    );
  }

  // Playing phase
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-purple-200 flex flex-col items-center p-4" dir="rtl">
      <div className="w-full max-w-md flex justify-between items-center mb-4 pt-2">
        <span className="bg-white rounded-full px-4 py-1 text-purple-700 font-bold text-lg shadow">
          {qIdx + 1} / {QUESTIONS_PER_GAME}
        </span>
        <span className="text-purple-600 text-sm font-medium">{CATEGORY_LABELS[current?.category ?? 'daily']}</span>
        <span className="bg-white rounded-full px-4 py-1 text-purple-700 font-bold text-lg shadow">
          ⭐ {score}
        </span>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-4 mb-4 w-full max-w-md">
        <div className="flex justify-center gap-6">
          <div className="flex flex-col gap-2 items-center">
            {ZONE_ORDER.map(zone => (
              <div key={zone} className="flex items-center gap-2">
                <span className="text-xs text-gray-400 w-12 text-left">{ZONE_LABEL[zone]}</span>
                <div className={`w-14 h-12 flex items-center justify-center rounded-xl border-2 transition-all ${
                  dressed[zone]
                    ? 'border-purple-300 bg-purple-50'
                    : 'border-dashed border-gray-200 bg-gray-50'
                }`}>
                  <span className="text-3xl">
                    {dressed[zone] ? dressed[zone]!.emoji : ZONE_PLACEHOLDER[zone]}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center text-6xl leading-none">
            <span>🧑</span>
          </div>
        </div>
      </div>

      <div className={`bg-white rounded-2xl shadow-lg p-4 mb-4 w-full max-w-md text-center border-4 transition-colors ${
        feedback === 'correct' ? 'border-green-400 bg-green-50' :
        feedback === 'wrong' ? 'border-red-300 bg-red-50' :
        'border-purple-200'
      }`}>
        <button
          onClick={() => current && speakHebrew(current.prompt)}
          className="text-2xl font-bold text-purple-700 flex items-center justify-center gap-2 w-full"
        >
          <span className="text-3xl">🔊</span>
          <span>{current?.prompt}</span>
        </button>
        {feedback === 'correct' && (
          <p className="text-green-600 font-bold mt-2 text-lg animate-bounce">✅ כן! {current?.hebrew}!</p>
        )}
        {feedback === 'wrong' && (
          <p className="text-red-500 font-bold mt-2">❌ לא נכון, נסה שוב!</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 w-full max-w-md">
        {choices.map(item => (
          <button
            key={item.name}
            onClick={() => selectAnswer(item)}
            disabled={feedback === 'correct'}
            className={`bg-white rounded-2xl shadow-md p-4 flex flex-col items-center gap-2 border-2 transition-all active:scale-95 ${
              feedback === 'correct' && item.name === current?.name
                ? 'border-green-500 bg-green-50 scale-105'
                : feedback === 'wrong' && item.name === current?.name
                ? 'border-purple-300'
                : 'border-purple-200 hover:border-purple-400 hover:bg-purple-50'
            }`}
          >
            <span className="text-5xl">{item.emoji}</span>
            <span className="text-base font-bold text-purple-800">{item.hebrew}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
