'use client';
import { useArithmeticGameStore } from '../arithmeticGameStore';
import { QUESTIONS_PER_GAME } from '../data/questions';

export default function ArithmeticResultScreen() {
  const level   = useArithmeticGameStore(s => s.level);
  const correct = useArithmeticGameStore(s => s.correct);
  const score   = useArithmeticGameStore(s => s.score);
  const startGame = useArithmeticGameStore(s => s.startGame);
  const goMenu    = useArithmeticGameStore(s => s.goMenu);

  const pct = Math.round((correct / QUESTIONS_PER_GAME) * 100);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center" dir="rtl">
      <div className="max-w-md mx-auto w-full bg-white rounded-3xl shadow-xl p-8 text-center">
        <div className="text-6xl mb-3">{pct >= 80 ? '🏆' : pct >= 50 ? '😊' : '💪'}</div>
        <h1 className="text-2xl font-bold mb-4">{level.label} — סיום!</h1>
        <div className="bg-indigo-50 rounded-2xl p-5 mb-6">
          <p className="text-4xl font-black text-indigo-700">{correct} / {QUESTIONS_PER_GAME}</p>
          <p className="text-indigo-500 text-sm mt-1">תשובות נכונות</p>
          <p className="text-xl font-bold text-indigo-600 mt-2">⭐ {score} נקודות</p>
          <div className="mt-2 h-3 bg-indigo-100 rounded-full">
            <div className="h-full bg-indigo-400 rounded-full" style={{ width: `${pct}%` }} />
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => startGame(level)} className="flex-1 py-4 rounded-2xl text-white font-bold bg-gradient-to-l from-indigo-500 to-blue-600 hover:opacity-90 active:scale-95 transition-all">🔄 שוב</button>
          <button onClick={goMenu} className="flex-1 py-4 rounded-2xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all">📋 רמות</button>
        </div>
      </div>
    </div>
  );
}
