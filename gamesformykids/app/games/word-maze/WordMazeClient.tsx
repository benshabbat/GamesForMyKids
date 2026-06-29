'use client';
import { useWordMaze } from './useWordMaze';
import WordMazeCanvas from './components/WordMazeCanvas';
import type { MazeDifficulty } from '@/lib/constants/wordMazeWords';

const LEVEL_LABELS: Record<MazeDifficulty, string> = {
  easy: 'קל (3 אותיות)',
  medium: 'בינוני (4 אותיות)',
  hard: 'קשה (5 אותיות)',
};

export default function WordMazeClient() {
  const {
    phase, targetWord, nextLetterIndex, score, wordsCompleted, bouncing,
    gridRef, playerRef, lettersRef,
    startGame, movePlayer, nextLevel, restart, backToMenu,
  } = useWordMaze();

  const letters = Array.from(targetWord);

  if (phase === 'menu') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4"
        style={{ background: 'linear-gradient(135deg, #fef3c7 0%, #d1fae5 100%)' }}
        dir="rtl">
        <div className="w-full max-w-sm space-y-6 text-center">
          <div className="text-7xl">🗺️</div>
          <h1 className="text-3xl font-extrabold text-amber-800">מבוך מילים</h1>
          <p className="text-gray-600">נווט במבוך ואסוף אותיות בסדר הנכון כדי לאיית מילה!</p>
          <div className="space-y-3">
            {(['easy', 'medium', 'hard'] as MazeDifficulty[]).map((lvl) => (
              <button key={lvl} onClick={() => startGame(lvl)}
                className="w-full bg-linear-to-br from-amber-400 to-orange-500 text-white font-bold py-3 rounded-2xl shadow-lg active:scale-95 transition-transform">
                {LEVEL_LABELS[lvl]}
              </button>
            ))}
          </div>
          {wordsCompleted > 0 && (
            <div className="text-gray-500">✅ השלמת {wordsCompleted} מילים עד כה!</div>
          )}
        </div>
      </div>
    );
  }

  if (phase === 'win') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4"
        style={{ background: 'linear-gradient(135deg, #d1fae5 0%, #fef3c7 100%)' }}
        dir="rtl">
        <div className="w-full max-w-sm space-y-6 text-center">
          <div className="text-7xl animate-bounce">🎉</div>
          <h2 className="text-3xl font-extrabold text-green-700">כל הכבוד!</h2>
          <div className="bg-white rounded-3xl shadow-xl p-6">
            <div className="text-4xl font-extrabold text-purple-700 mb-2">{targetWord}</div>
            <div className="text-gray-500">ניקוד: {score}</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={restart}
              className="bg-white border-2 border-amber-400 text-amber-700 font-bold py-3 rounded-2xl active:scale-95 transition-transform">
              שוב! 🎮
            </button>
            <button onClick={nextLevel}
              className="bg-linear-to-br from-amber-400 to-orange-500 text-white font-bold py-3 rounded-2xl shadow-lg active:scale-95 transition-transform">
              הבא! →
            </button>
          </div>
          <button onClick={backToMenu} className="text-gray-500 underline text-sm">חזרה לתפריט</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-3 pt-4"
      style={{ background: 'linear-gradient(135deg, #fef3c7 0%, #d1fae5 100%)' }}
      dir="rtl">
      {/* Target word display */}
      <div className="w-full max-w-sm mb-3">
        <div className="bg-white rounded-2xl shadow p-3 flex gap-2 justify-center flex-wrap">
          {letters.map((ch, i) => (
            <div key={i}
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl font-bold border-2 transition-all ${
                i < nextLetterIndex
                  ? 'bg-green-100 border-green-500 text-green-700'
                  : i === nextLetterIndex
                  ? 'bg-purple-100 border-purple-500 text-purple-700 scale-110'
                  : 'bg-gray-100 border-gray-300 text-gray-400'
              }`}>
              {ch}
            </div>
          ))}
        </div>
        <div className="text-center text-xs text-gray-500 mt-1">
          {bouncing ? '❌ סדר שגוי — אסוף קודם את האות המודגשת!' : `אסוף: ${letters[nextLetterIndex] || '✅'}`}
        </div>
      </div>

      {/* Canvas */}
      <WordMazeCanvas
        gridRef={gridRef}
        playerRef={playerRef}
        lettersRef={lettersRef}
        bouncing={bouncing}
        onMove={movePlayer}
      />

      {/* Mobile arrow buttons — always LTR so arrows match canvas direction */}
      <div dir="ltr" className="mt-4 grid grid-cols-3 gap-2 w-36">
        <div />
        <button onClick={() => movePlayer(-1, 0)}
          className="bg-white border-2 border-amber-400 rounded-xl h-12 text-xl font-bold active:scale-90 transition-transform shadow">
          ↑
        </button>
        <div />
        <button onClick={() => movePlayer(0, -1)}
          className="bg-white border-2 border-amber-400 rounded-xl h-12 text-xl font-bold active:scale-90 transition-transform shadow">
          ←
        </button>
        <button onClick={() => movePlayer(1, 0)}
          className="bg-white border-2 border-amber-400 rounded-xl h-12 text-xl font-bold active:scale-90 transition-transform shadow">
          ↓
        </button>
        <button onClick={() => movePlayer(0, 1)}
          className="bg-white border-2 border-amber-400 rounded-xl h-12 text-xl font-bold active:scale-90 transition-transform shadow">
          →
        </button>
      </div>

      <button onClick={backToMenu} className="mt-3 text-gray-400 underline text-xs">תפריט</button>
    </div>
  );
}
