'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useMapStore } from './mapStore';
import { LOCATIONS } from './data/locations';
import IsraelSVG from './components/IsraelSVG';
import GameResultCard from '@/components/game/shared/GameResultCard';
import { speakHebrew } from '@/lib/utils/speech/enhancedSpeechUtils';

const QUESTIONS_PER_GAME = 10;

export default function IsraelMapClient() {
  const {
    phase, level, current, foundIds, score, total, lastResult,
    startGame, checkTap, nextLocation, resetGame,
  } = useMapStore();

  const [feedback, setFeedback] = useState<string | null>(null);
  const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Announce current location via TTS whenever it changes
  useEffect(() => {
    if (current && phase === 'playing') {
      const msg = `לחץ על ${current.name}`;
      speakHebrew(msg);
    }
  }, [current, phase]);

  const handleTap = useCallback((svgX: number, svgY: number) => {
    if (!current || lastResult !== null) return;
    const hit = checkTap(svgX, svgY);

    if (hit) {
      useMapStore.setState((s) => ({
        score: s.score + 1,
        total: s.total + 1,
        foundIds: [...s.foundIds, current.id],
        lastResult: 'correct',
      }));
      setFeedback('correct');
      speakHebrew(`נכון! ${current.fact}`);
      feedbackTimerRef.current = setTimeout(() => {
        setFeedback(null);
        nextLocation();
      }, 2500);
    } else {
      useMapStore.setState((s) => ({ total: s.total + 1, lastResult: 'wrong' }));
      setFeedback('wrong');
      speakHebrew(`נסה שוב — לחץ על ${current.name}`);
      feedbackTimerRef.current = setTimeout(() => {
        setFeedback(null);
        useMapStore.setState({ lastResult: null });
      }, 1200);
    }
  }, [current, lastResult, checkTap, nextLocation]);

  useEffect(() => () => { if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current); }, []);

  if (phase === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-teal-100 flex flex-col items-center justify-center p-6">
        <div className="text-6xl mb-4">🗺️</div>
        <h1 className="text-3xl font-bold text-blue-900 mb-2">מפת ישראל</h1>
        <p className="text-blue-700 mb-8 text-center">לחץ על המקום הנכון במפה!</p>
        <div className="flex flex-col gap-4 w-full max-w-xs">
          <button
            onClick={() => startGame(1)}
            className="bg-blue-600 text-white py-4 rounded-2xl font-bold text-xl shadow-lg hover:bg-blue-700 transition-colors"
          >
            🏙️ ערים
          </button>
          <button
            onClick={() => startGame(2)}
            className="bg-teal-600 text-white py-4 rounded-2xl font-bold text-xl shadow-lg hover:bg-teal-700 transition-colors"
          >
            🌊 טבע ואזורים
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'result') {
    const pct = Math.round((score / QUESTIONS_PER_GAME) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center p-6">
        <GameResultCard
          emoji="🗺️"
          title="סיימת את מסע ישראל!"
          gradientClass="from-blue-400 to-teal-500"
          buttonClass="bg-blue-600 hover:bg-blue-700"
          onRestart={resetGame}
          restartLabel="שחק שוב"
          score={score}
          scorePercent={pct}
        >
          <p className="text-center text-blue-700 font-medium mt-2">
            מצאת {score} מתוך {QUESTIONS_PER_GAME} מקומות!
          </p>
        </GameResultCard>
      </div>
    );
  }

  const progressPct = Math.round((total / QUESTIONS_PER_GAME) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex flex-col items-center p-3">
      {/* Header */}
      <div className="w-full max-w-md flex items-center justify-between mb-3">
        <button onClick={resetGame} className="text-blue-500 text-2xl">←</button>
        <div className="text-center">
          <div className="text-lg font-bold text-blue-900">
            {current ? `🎯 לחץ על: ${current.name} ${current.emoji}` : '...'}
          </div>
          <div className="text-sm text-blue-600">{score} נכון מתוך {total} | {QUESTIONS_PER_GAME - total} נשארו</div>
        </div>
        <div className="w-8" />
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-md bg-gray-200 rounded-full h-2 mb-3">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Map */}
      <div className="w-full max-w-md relative">
        <IsraelSVG
          current={current}
          foundIds={foundIds}
          allLocations={LOCATIONS}
          onTap={handleTap}
          lastResult={lastResult}
        />

        {/* Feedback overlay */}
        {feedback === 'correct' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-green-500 text-white text-4xl font-bold py-4 px-8 rounded-2xl shadow-xl animate-bounce">
              ✅ נכון!
            </div>
          </div>
        )}
        {feedback === 'wrong' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-red-500 text-white text-2xl font-bold py-3 px-6 rounded-2xl shadow-xl">
              ❌ נסה שוב
            </div>
          </div>
        )}
      </div>

      {/* Repeat TTS button */}
      {current && phase === 'playing' && (
        <button
          onClick={() => speakHebrew(`לחץ על ${current.name}`)}
          className="mt-4 bg-white border-2 border-blue-400 text-blue-700 px-6 py-2 rounded-xl font-medium hover:bg-blue-50 transition-colors"
        >
          🔊 שמע שוב
        </button>
      )}
    </div>
  );
}
