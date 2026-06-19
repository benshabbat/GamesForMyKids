'use client';
import { useLetterRaceGame, GAME_TIME } from '../useLetterRaceGame';
import { speakHebrew } from '@/lib/utils/speech/speaker';

export default function LetterRacePlayScreen() {
  const { q, score, timeLeft, feedback, streak, correct, total, tap, accuracy } = useLetterRaceGame();

  const timeColor = timeLeft > 10 ? 'bg-violet-500' : timeLeft > 5 ? 'bg-yellow-400' : 'bg-orange-400';

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 to-purple-200 flex flex-col items-center justify-center p-4 select-none" dir="rtl">
      {/* HUD */}
      <div className="w-full max-w-sm mb-4">
        <div className="flex justify-between text-sm text-violet-700 font-bold mb-1">
          <span>⏱️ {timeLeft}s</span>
          <span>🏆 {score}</span>
          {streak >= 2 && <span className="text-yellow-500">🔥×{streak}</span>}
        </div>
        <div className="bg-white rounded-full h-3 shadow-inner">
          <div
            className={`h-3 rounded-full transition-[width] duration-1000 ${timeColor}`}
            style={{ width: `${(timeLeft / GAME_TIME) * 100}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className={`w-full max-w-sm bg-white rounded-3xl p-8 text-center shadow-2xl mb-5 transition duration-150 ${
        feedback === 'correct' ? 'bg-green-50 ring-4 ring-green-400 scale-105' :
        feedback === 'wrong'   ? 'bg-amber-50 ring-4 ring-amber-400' : ''
      }`}>
        <button
          onClick={() => speakHebrew(`באיזו אות מתחיל ${q.word}?`)}
          className="text-6xl mb-3 block mx-auto leading-none hover:scale-110 transition-transform"
          aria-label={`שמע: ${q.word}`}
        >
          {q.emoji}
        </button>
        <p className="text-2xl font-black text-gray-700 mb-1">{q.word}</p>
        <p className="text-base text-violet-500 font-semibold">באיזו אות מתחיל?</p>
        {feedback && (
          <p className={`text-2xl mt-3 font-bold ${feedback === 'correct' ? 'text-green-500' : 'text-amber-600'}`}>
            {feedback === 'correct' ? `✅ ${streak >= 3 ? 'בום! +20' : 'נכון! +10'}` : `❌ האות: ${q.answer}`}
          </p>
        )}
      </div>

      {/* Choices */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
        {q.choices.map((c) => (
          <button
            key={c}
            onClick={() => tap(c)}
            disabled={!!feedback}
            className="py-5 rounded-3xl bg-white font-black text-4xl text-violet-700 shadow-xl border-2 border-violet-200 active:scale-90 hover:border-violet-500 hover:text-violet-600 transition disabled:opacity-50"
          >
            {c}
          </button>
        ))}
      </div>

      <p className="mt-4 text-xs text-violet-400">{correct}/{total} נכון · {accuracy}% דיוק</p>
    </div>
  );
}
