'use client';
import { useSoundQuiz } from './useSoundQuiz';
import { CATEGORY_LABELS, SOUND_CATEGORIES } from './data/soundClips';

export default function SoundQuizClient() {
  const { phase, current, choices, choicesRevealed, score, total, lastCorrect, startGame, playSound, replaySound, selectAnswer, reset } = useSoundQuiz();

  if (phase === 'menu') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6" dir="rtl"
        style={{ background: 'linear-gradient(135deg, #e8f5e9 0%, #e3f2fd 100%)' }}>
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-sm w-full text-center">
          <div className="text-6xl mb-3">🔊</div>
          <h1 className="text-3xl font-extrabold text-teal-800 mb-2">מה הצליל?</h1>
          <p className="text-teal-600 mb-6">שמע את הצליל ובחר מה עשה אותו!</p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => startGame('all')}
              className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold py-3 rounded-2xl text-lg shadow-md hover:opacity-90 active:scale-95 transition-all"
            >
              🎲 כל הצלילים!
            </button>
            {SOUND_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => startGame(cat)}
                className="bg-white border-2 border-teal-200 hover:border-teal-400 hover:bg-teal-50 text-gray-700 font-bold py-3 rounded-2xl transition-all active:scale-95"
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'result') {
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6" dir="rtl"
        style={{ background: 'linear-gradient(135deg, #e8f5e9 0%, #e3f2fd 100%)' }}>
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-sm w-full text-center">
          <div className="text-6xl mb-4">{pct >= 80 ? '🏆' : pct >= 60 ? '⭐' : '🎵'}</div>
          <h2 className="text-2xl font-extrabold text-teal-800 mb-2">כל הכבוד!</h2>
          <p className="text-lg text-gray-600 mb-4">ענית נכון על <span className="font-bold text-teal-600">{score}</span> מתוך <span className="font-bold">{total}</span> צלילים</p>
          <div className="text-4xl font-extrabold text-teal-700 mb-6">{pct}%</div>
          <button
            onClick={reset}
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold py-3 rounded-2xl shadow hover:opacity-90 active:scale-95 transition-all"
          >
            🔄 שחק שוב
          </button>
        </div>
      </div>
    );
  }

  // Playing phase
  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-6 p-4" dir="rtl"
      style={{ background: 'linear-gradient(135deg, #e8f5e9 0%, #e3f2fd 100%)' }}>
      {/* HUD */}
      <div className="flex items-center justify-between w-full max-w-sm mb-4">
        <span className="text-sm font-bold text-teal-700 bg-white rounded-xl px-3 py-1 shadow">
          שאלה {total + 1} / 15
        </span>
        <span className="text-sm font-bold text-teal-700 bg-white rounded-xl px-3 py-1 shadow">
          ✅ {score}
        </span>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-6 w-full max-w-sm flex flex-col items-center gap-4">
        {/* Mystery card */}
        <div className="text-7xl">{choicesRevealed && current ? current.emoji : '❓'}</div>
        <p className="text-gray-500 text-sm">{choicesRevealed ? 'בחר את מקור הצליל:' : 'לחץ כדי לשמוע את הצליל'}</p>

        {/* Sound button */}
        {!choicesRevealed ? (
          <button
            onClick={playSound}
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-extrabold py-5 rounded-2xl text-2xl shadow-lg hover:opacity-90 active:scale-95 transition-all"
          >
            ▶ שמע!
          </button>
        ) : (
          <button
            onClick={replaySound}
            className="text-teal-600 text-sm font-bold border border-teal-200 rounded-xl px-4 py-1.5 hover:bg-teal-50 active:scale-95 transition-all"
          >
            🔄 שמע שוב
          </button>
        )}

        {/* Choices grid */}
        {choicesRevealed && (
          <div className="grid grid-cols-2 gap-3 w-full">
            {choices.map(clip => {
              let cls = 'flex flex-col items-center gap-1 p-3 rounded-2xl border-2 font-bold text-gray-700 transition-all active:scale-95 ';
              if (lastCorrect !== null) {
                if (clip.id === current?.id) cls += 'border-green-400 bg-green-50 text-green-800';
                else cls += 'border-gray-200 bg-gray-50 opacity-60';
              } else {
                cls += 'border-gray-200 hover:border-teal-300 hover:bg-teal-50 bg-white';
              }
              return (
                <button
                  key={clip.id}
                  onClick={() => lastCorrect === null && selectAnswer(clip)}
                  disabled={lastCorrect !== null}
                  className={cls}
                >
                  <span className="text-4xl">{clip.emoji}</span>
                  <span className="text-sm">{clip.name}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Feedback */}
        {lastCorrect !== null && (
          <div className={`text-lg font-extrabold ${lastCorrect ? 'text-green-600' : 'text-red-500'}`}>
            {lastCorrect ? '✅ נכון!' : `❌ הצליל היה: ${current?.name}`}
          </div>
        )}
      </div>
    </div>
  );
}
