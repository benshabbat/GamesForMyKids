import { DRAG_LEVELS } from '../dragSortData';

export function DragSortResultScreen({
  score, total, errors, levelIndex,
  onRestart, onNext, onMenu,
}: {
  score: number; total: number; errors: number; levelIndex: number;
  onRestart: () => void; onNext: () => void; onMenu: () => void;
}) {
  const perfect = errors === 0;
  const hasNext = levelIndex < DRAG_LEVELS.length - 1;
  return (
    <div
      dir="rtl"
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ background: 'linear-gradient(135deg, #a78bfa 0%, #f472b6 100%)' }}
    >
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center">
        <div className="text-6xl mb-2">{perfect ? '🏆' : '🎉'}</div>
        <h2 className="text-2xl font-black text-purple-800 mb-4">
          {perfect ? 'מושלם!' : 'כל הכבוד!'}
        </h2>
        <div className="bg-purple-50 rounded-2xl p-4 grid grid-cols-3 gap-3 mb-5">
          <div>
            <div className="text-2xl font-black text-purple-700">{score}</div>
            <div className="text-xs text-gray-500">נכון</div>
          </div>
          <div>
            <div className="text-2xl font-black text-gray-600">{total}</div>
            <div className="text-xs text-gray-500">סה&quot;כ</div>
          </div>
          <div>
            <div className="text-2xl font-black text-red-500">{errors}</div>
            <div className="text-xs text-gray-500">שגיאות</div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {hasNext && (
            <button
              onClick={onNext}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 rounded-xl transition-all active:scale-95"
            >
              ➡️ רמה הבאה
            </button>
          )}
          <button
            onClick={onRestart}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-all"
          >
            🔄 שחק שוב
          </button>
          <button
            onClick={onMenu}
            className="bg-gray-50 hover:bg-gray-100 text-gray-500 font-semibold py-2 rounded-xl transition-all text-sm"
          >
            ← תפריט
          </button>
        </div>
      </div>
    </div>
  );
}
