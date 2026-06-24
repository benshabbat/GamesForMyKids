'use client';
import { useLetterMergeStore } from './letterMergeStore';
import LetterMergeScreen from './components/LetterMergeScreen';

function LetterMergeMenu({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-blue-100 to-purple-100 p-6" dir="rtl">
      <div className="text-8xl mb-6">🔤</div>
      <h1 className="text-4xl font-black text-blue-800 mb-3 text-center">מיזוג אותיות</h1>
      <p className="text-blue-600 text-lg mb-2 text-center">שחרר אותיות — שתי אותיות זהות מתמזגות לאות הבאה!</p>
      <div className="bg-white rounded-2xl p-5 shadow-md mb-8 max-w-xs w-full">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">👆</span>
            <span className="text-gray-700">לחץ עמודה כדי להוריד אות</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">🔤</span>
            <span className="text-gray-700">שתי זהות מתמזגות: א+א→ב</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏆</span>
            <span className="text-gray-700">הגע לתָּו כדי לנצח!</span>
          </div>
        </div>
      </div>
      <button
        onClick={onStart}
        className="bg-blue-500 hover:bg-blue-600 active:scale-95 text-white font-black text-xl px-10 py-4 rounded-2xl shadow-lg transition-all"
      >
        התחל! 🔤
      </button>
    </div>
  );
}

function LetterMergeResult({ score, won, onRestart }: { score: number; won: boolean; onRestart: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-blue-100 to-purple-100 p-6" dir="rtl">
      <div className="text-7xl mb-4">{won ? '🏆' : '😅'}</div>
      <h2 className="text-3xl font-black text-blue-800 mb-2">{won ? 'ניצחת! הגעת לתָּו!' : 'המשחק נגמר'}</h2>
      <p className="text-blue-600 text-xl font-bold mb-6">ניקוד: {score}</p>
      <button
        onClick={onRestart}
        className="bg-blue-500 hover:bg-blue-600 active:scale-95 text-white font-black text-xl px-10 py-4 rounded-2xl shadow-lg transition-all"
      >
        שחק שוב! 🔄
      </button>
    </div>
  );
}

export default function LetterMergeClient() {
  const { phase, score, won, startGame, reset } = useLetterMergeStore();
  if (phase === 'idle')   return <LetterMergeMenu onStart={startGame} />;
  if (phase === 'result') return <LetterMergeResult score={score} won={won} onRestart={reset} />;
  return <LetterMergeScreen />;
}
