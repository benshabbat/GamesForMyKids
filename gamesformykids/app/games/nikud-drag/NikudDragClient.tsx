'use client';
import { useNikudDragStore } from './nikudDragStore';
import NikudDragScreen from './components/NikudDragScreen';

function NikudDragMenu({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-violet-100 to-indigo-100 p-6" dir="rtl">
      <div className="text-8xl mb-6">🔤</div>
      <h1 className="text-4xl font-black text-violet-800 mb-3 text-center">ניקוד חי</h1>
      <p className="text-lg text-violet-600 mb-2 text-center">שמע הברה — בחר את הניקוד הנכון!</p>
      <div className="bg-white rounded-2xl p-5 shadow-md mb-8 max-w-xs w-full">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🔊</span>
            <span className="text-gray-700 font-medium">שמע את ההברה</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">👆</span>
            <span className="text-gray-700 font-medium">בחר את הניקוד המתאים</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">✨</span>
            <span className="text-gray-700 font-medium">האות ועם הניקוד מתאחדים!</span>
          </div>
        </div>
      </div>
      <button
        onClick={onStart}
        className="bg-violet-500 hover:bg-violet-600 active:scale-95 text-white font-black text-xl px-10 py-4 rounded-2xl shadow-lg transition-all"
      >
        בואו נתחיל! 🔤
      </button>
    </div>
  );
}

function NikudDragResult({ score, total, onRestart }: { score: number; total: number; onRestart: () => void }) {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-violet-100 to-indigo-100 p-6" dir="rtl">
      <div className="text-7xl mb-4">{pct >= 80 ? '🎉' : '💪'}</div>
      <h2 className="text-3xl font-black text-violet-800 mb-2">כל הכבוד!</h2>
      <p className="text-violet-600 text-xl font-bold mb-6">{score} מתוך {total} הברות נכונות</p>
      <button
        onClick={onRestart}
        className="bg-violet-500 hover:bg-violet-600 active:scale-95 text-white font-black text-xl px-10 py-4 rounded-2xl shadow-lg transition-all"
      >
        שחק שוב! 🔄
      </button>
    </div>
  );
}

export default function NikudDragClient() {
  const { phase, score, questions, startGame, reset } = useNikudDragStore();
  if (phase === 'idle')   return <NikudDragMenu onStart={startGame} />;
  if (phase === 'result') return <NikudDragResult score={score} total={questions.length} onRestart={reset} />;
  return <NikudDragScreen />;
}
