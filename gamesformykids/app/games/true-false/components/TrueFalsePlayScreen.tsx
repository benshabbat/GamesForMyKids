'use client';
import { useTrueFalseGame, TIME_PER_Q } from '../useTrueFalseGame';
import LivesDisplay from '@/components/game/shared/LivesDisplay';
import { useKeyboardControls } from '@/hooks/shared/game-controls/useKeyboardControls';
import { KeyboardHint } from '@/components/game/shared/KeyboardHint';

export default function TrueFalsePlayScreen() {
  const { score, lives, timeLeft, feedback, q, answer } = useTrueFalseGame();

  useKeyboardControls(
    { '1': () => answer(true), '2': () => answer(false) },
    !feedback,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-cyan-200 flex flex-col items-center justify-center p-4 select-none" dir="rtl">
      <div className="flex gap-6 mb-5 text-center">
        <div><p className="text-2xl font-black text-teal-600">{score}</p><p className="text-xs text-teal-400">ניקוד</p></div>
        <div className="flex gap-1 items-center">
          <LivesDisplay lives={lives} />
        </div>
        <div>
          <p className={`font-black transition-all ${timeLeft <= 2 ? 'text-orange-500 text-3xl scale-110' : 'text-cyan-600 text-2xl'}`}>{timeLeft}</p>
          <p className="text-xs text-cyan-400">שניות</p>
        </div>
      </div>
      <div className={`w-full max-w-sm bg-white rounded-3xl p-6 text-center shadow-2xl mb-6 transition-all duration-200 ${
        feedback === 'correct' ? 'ring-4 ring-green-400 bg-green-50' :
        feedback === 'wrong'   ? 'ring-4 ring-amber-400 bg-amber-50' : ''
      }`}>
        <div className="text-5xl mb-4">{q?.emoji}</div>
        <p className="text-xl font-bold text-gray-700 leading-relaxed">{q?.fact}</p>
        {feedback && (
          <p className={`text-3xl mt-3 ${feedback === 'correct' ? 'text-green-500' : 'text-amber-600'}`}>
            {feedback === 'correct' ? '✅ נכון!' : q?.answer ? '❌ אוי! זה נכון' : '❌ אוי! זה לא נכון'}
          </p>
        )}
        <div className="mt-4 bg-gray-100 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-teal-400 to-cyan-500 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${(timeLeft / TIME_PER_Q) * 100}%` }}
          />
        </div>
      </div>
      <div className="flex gap-5 w-full max-w-sm">
        <button
          onClick={() => answer(true)}
          disabled={!!feedback}
          className="flex-1 py-6 rounded-3xl bg-green-500 text-white font-black text-5xl shadow-xl active:scale-90 hover:bg-green-400 transition-all disabled:opacity-60"
        >✅</button>
        <button
          onClick={() => answer(false)}
          disabled={!!feedback}
          className="flex-1 py-6 rounded-3xl bg-red-500 text-white font-black text-5xl shadow-xl active:scale-90 hover:bg-red-400 transition-all disabled:opacity-60"
        >❌</button>
      </div>
      <KeyboardHint
        hints={[
          { key: '1', label: '✅ נכון' },
          { key: '2', label: '❌ לא נכון' },
        ]}
      />
    </div>
  );
}
