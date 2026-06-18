'use client';
import { useEscapeRoom } from './useEscapeRoom';
import RoomScene from './components/RoomScene';
import PuzzleOverlay from './components/PuzzleOverlay';
import DoorCodePanel from './components/DoorCodePanel';
import GameResultCard from '@/components/game/shared/GameResultCard';

export default function EscapeRoomClient() {
  const {
    phase, room, rooms, solvedIds, revealedDigits, activePuzzle,
    funMessage, score, hintsUsed, puzzleCount,
    handleStart, handleClickHotspot, handleAnswer, handleHint,
    dismissOverlay, resetGame,
  } = useEscapeRoom();

  if (phase === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center p-4" dir="rtl">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full flex flex-col items-center gap-6">
          <div className="text-6xl">🔐</div>
          <h1 className="text-3xl font-extrabold text-purple-800 text-center">בריחה מהחדר</h1>
          <p className="text-center text-gray-600 leading-relaxed">
            פתח חפצים, פתור חידות, גלה ספרות סודיות — ופרוץ את הדלת הנעולה!
          </p>
          <div className="flex flex-col gap-3 w-full">
            <p className="text-sm font-bold text-gray-500 text-center">בחר חדר:</p>
            {rooms.map(r => (
              <button
                key={r.id}
                onClick={() => handleStart(r.id)}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold text-lg rounded-2xl py-4 px-6 flex items-center gap-3 transition active:scale-95 shadow-md"
              >
                <span className="text-3xl">{r.emoji}</span>
                <span>{r.title}</span>
              </button>
            ))}
          </div>
          <div className="text-xs text-gray-400 text-center" dir="rtl">
            💡 לחץ על חפצים עם נקודה צהובה כדי לחשוף חידות
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'result' && room) {
    return (
      <GameResultCard
        emoji="🔓"
        title={`פרצת את ${room.title}!`}
        gradientClass="from-green-50 to-emerald-100"
        buttonClass="from-purple-500 to-indigo-600"
        onRestart={resetGame}
        restartLabel="חדר נוסף"
        score={score}
        gameType="escape-room"
        scorePercent={Math.round((revealedDigits.length / puzzleCount) * 100)}
      >
        <div className="flex flex-col items-center gap-2" dir="rtl">
          <p className="text-gray-600 text-center">פתרת {puzzleCount} חידות וגילית את קוד הדלת!</p>
          <p className="text-2xl font-bold text-purple-700">קוד: {revealedDigits.join('-')}</p>
          <p className="text-gray-500 text-sm">ניקוד: {score} נקודות</p>
        </div>
      </GameResultCard>
    );
  }

  if (!room) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex flex-col items-center justify-center p-3 gap-3" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-2xl">
        <button onClick={resetGame} className="text-white/70 hover:text-white text-sm font-bold px-3 py-1.5 rounded-xl bg-white/10 transition">
          ← חזור
        </button>
        <h2 className="text-white font-extrabold text-xl">{room.emoji} {room.title}</h2>
        <div className="text-white/80 text-sm font-bold">ניקוד: {score}</div>
      </div>

      {/* Room */}
      <div className="w-full max-w-2xl">
        <RoomScene room={room} solvedIds={solvedIds} onClickHotspot={handleClickHotspot} />
      </div>

      {/* Door code */}
      <DoorCodePanel revealedDigits={revealedDigits} puzzleCount={puzzleCount} />

      {/* Fun message */}
      {funMessage && (
        <div
          className="bg-white/90 rounded-2xl px-5 py-3 text-gray-700 font-semibold text-sm shadow-lg max-w-sm text-center cursor-pointer"
          onClick={dismissOverlay}
        >
          💬 {funMessage}
          <p className="text-xs text-gray-400 mt-1">לחץ לסגירה</p>
        </div>
      )}

      {/* Puzzle overlay */}
      {activePuzzle && (
        <PuzzleOverlay
          hotspot={activePuzzle.hotspot}
          puzzle={activePuzzle.puzzle}
          hintsUsed={hintsUsed}
          onAnswer={handleAnswer}
          onHint={handleHint}
          onDismiss={dismissOverlay}
        />
      )}
    </div>
  );
}
