'use client';
import { useFindInScene } from './useFindInScene';
import SceneCanvas from './components/SceneCanvas';
import GameResultCard from '@/components/game/shared/GameResultCard';

export default function FindInSceneClient() {
  const {
    phase, scene, scenes, prompt, targetIds, foundIds, wrongId,
    timeLeft, score,
    handleStart, handleTap, resetGame,
  } = useFindInScene();

  if (phase === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-800 to-teal-700 flex items-center justify-center p-4" dir="rtl">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full flex flex-col items-center gap-6">
          <div className="text-6xl">🔍</div>
          <h1 className="text-3xl font-extrabold text-teal-800 text-center">מצא בסצנה</h1>
          <p className="text-center text-gray-600 leading-relaxed">
            האזן לרמז, מצא את החפצים הנסתרים בתוך 60 שניות!
          </p>
          <div className="flex flex-col gap-3 w-full">
            <p className="text-sm font-bold text-gray-500 text-center">בחר מיקום:</p>
            {scenes.map(s => (
              <button
                key={s.id}
                onClick={() => handleStart(s.id)}
                className="w-full bg-gradient-to-r from-teal-500 to-sky-600 hover:from-teal-600 hover:to-sky-700 text-white font-bold text-lg rounded-2xl py-4 px-6 flex items-center gap-3 transition-all active:scale-95 shadow-md"
              >
                <span className="text-3xl">{s.emoji}</span>
                <span>{s.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'result') {
    const won = foundIds.size >= targetIds.size;
    return (
      <GameResultCard
        emoji={won ? '🎉' : '⏰'}
        title={won ? 'מצאת את כולם!' : 'נגמר הזמן!'}
        gradientClass="from-teal-50 to-sky-100"
        buttonClass="from-teal-500 to-sky-600"
        onRestart={resetGame}
        restartLabel="משחק נוסף"
        score={score}
        gameType="find-in-scene"
        scorePercent={Math.round((foundIds.size / targetIds.size) * 100)}
      >
        <div className="flex flex-col items-center gap-2" dir="rtl">
          <p className="text-gray-600 text-center">{prompt.text}</p>
          <p className="text-gray-500 text-sm">
            מצאת {foundIds.size} מתוך {targetIds.size} חפצים
          </p>
          {score > 0 && <p className="text-teal-600 font-bold">ניקוד: {score} 🏆</p>}
        </div>
      </GameResultCard>
    );
  }

  // playing
  const remaining = targetIds.size - foundIds.size;
  const timerColor = timeLeft <= 10 ? 'text-red-400' : timeLeft <= 20 ? 'text-amber-300' : 'text-white';

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-800 to-teal-700 flex flex-col items-center justify-center p-3 gap-3" dir="rtl">
      {/* Header bar */}
      <div className="flex items-center justify-between w-full max-w-2xl">
        <button onClick={resetGame} className="text-white/70 hover:text-white text-sm font-bold px-3 py-1.5 rounded-xl bg-white/10">
          ← חזור
        </button>
        <div className={`font-extrabold text-2xl ${timerColor}`}>⏱ {timeLeft}</div>
        <div className="text-white font-bold text-sm">ניקוד: {score}</div>
      </div>

      {/* Prompt */}
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-3 text-center">
        <p className="text-white font-extrabold text-xl">{prompt.text}</p>
        <p className="text-white/70 text-sm">נותרו {remaining} חפצים</p>
      </div>

      {/* Scene */}
      <div className="w-full max-w-2xl">
        <SceneCanvas
          scene={scene}
          targetIds={targetIds}
          foundIds={foundIds}
          wrongId={wrongId}
          onTap={handleTap}
        />
      </div>

      {/* Found progress */}
      <div className="flex gap-2">
        {Array.from({ length: targetIds.size }, (_, i) => (
          <div
            key={i}
            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-lg transition-all ${
              i < foundIds.size
                ? 'border-green-400 bg-green-300'
                : 'border-white/30 bg-white/10'
            }`}
          >
            {i < foundIds.size ? '✓' : ''}
          </div>
        ))}
      </div>
    </div>
  );
}
