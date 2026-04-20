'use client';
import { useQuizGameStore } from '@/lib/stores';
import { useAnimalsStore } from '@/lib/stores/animalsStore';

export default function AnimalsResultScreen() {
  const score   = useQuizGameStore(s => s.score);
  const total   = useQuizGameStore(s => s.total);
  const goToMenu = useQuizGameStore(s => s.goToMenu);
  const restart  = useAnimalsStore(s => s.restart);

  const pct = Math.round((score / total) * 100);
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 p-4 flex items-center" dir="rtl">
      <div className="max-w-md mx-auto w-full bg-white rounded-3xl shadow-xl p-8 text-center">
        <div className="text-6xl mb-3 animate-bounce">🐘</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">כל הכבוד!</h1>
        <div className="bg-green-50 rounded-2xl p-5 mb-6">
          <p className="text-4xl font-black text-green-700">{score} / {total}</p>
          <div className="mt-2 h-3 bg-green-100 rounded-full">
            <div className="h-full bg-green-400 rounded-full" style={{ width: `${pct}%` }} />
          </div>
          <p className="text-green-500 text-sm mt-1">{pct}%</p>
        </div>
        <div className="flex gap-3">
          <button onClick={restart} className="flex-1 py-4 rounded-2xl text-white font-bold bg-gradient-to-l from-green-500 to-teal-600 hover:opacity-90 active:scale-95 transition-all">🔄 שוב</button>
          <button onClick={goToMenu} className="flex-1 py-4 rounded-2xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-all">📋 קטגוריות</button>
        </div>
      </div>
    </div>
  );
}
