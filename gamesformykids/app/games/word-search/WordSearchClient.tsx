'use client';
import { useCallback } from 'react';
import { useWordSearchStore } from './wordSearchStore';
import SearchGrid from './components/SearchGrid';
import GameResultCard from '@/components/game/shared/GameResultCard';
import { WORD_SETS } from './data/wordSets';
import { speakHebrew } from '@/lib/utils/speech/enhancedSpeechUtils';

export default function WordSearchClient() {
  const {
    phase, theme, grid, placed, found, score,
    startGame, submitSelection, resetGame,
  } = useWordSearchStore();

  const handleSelect = useCallback((cells: Array<[number, number]>) => {
    const ok = submitSelection(cells);
    if (ok) {
      const { found: newFound, placed: ps } = useWordSearchStore.getState();
      const justFound = ps.find(pw => newFound.has(pw.word) && !found.has(pw.word));
      if (justFound) speakHebrew(justFound.word);
    }
    return ok;
  }, [submitSelection, found]);

  if (phase === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-800 to-teal-700 flex items-center justify-center p-4" dir="rtl">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full flex flex-col items-center gap-6">
          <div className="text-6xl">🔎</div>
          <h1 className="text-3xl font-extrabold text-emerald-800 text-center">חיפוש מילים</h1>
          <p className="text-center text-gray-600">גרור לאורך המילה כדי למצוא אותה בגריד!</p>
          <div className="grid grid-cols-2 gap-3 w-full">
            {WORD_SETS.map((ws, i) => (
              <button
                key={ws.name}
                onClick={() => startGame(i)}
                className="bg-gradient-to-br from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white font-bold rounded-2xl py-4 px-3 flex flex-col items-center gap-1 transition-all active:scale-95 shadow-md"
              >
                <span className="text-3xl">{ws.emoji}</span>
                <span className="text-sm">{ws.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'result') {
    return (
      <GameResultCard
        emoji="🎉"
        title="מצאת את כל המילים!"
        gradientClass="from-emerald-50 to-teal-100"
        buttonClass="from-emerald-500 to-teal-600"
        onRestart={resetGame}
        restartLabel="נושא חדש"
        score={score}
        gameType="word-search"
        scorePercent={100}
      >
        <div className="flex flex-wrap justify-center gap-2 max-w-xs" dir="rtl">
          {placed.map(pw => (
            <span key={pw.word} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full font-bold text-sm">
              ✓ {pw.word}
            </span>
          ))}
        </div>
      </GameResultCard>
    );
  }

  const remaining = placed.length - found.size;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-800 to-teal-700 flex flex-col items-center gap-3 p-3" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-md">
        <button onClick={resetGame} className="text-white/70 hover:text-white text-sm font-bold px-3 py-1.5 rounded-xl bg-white/10">
          ← תפריט
        </button>
        <div className="text-white font-bold">{theme.emoji} {theme.name}</div>
        <div className="text-white font-bold text-sm">ניקוד: {score}</div>
      </div>

      {/* Word list */}
      <div className="flex flex-wrap justify-center gap-1.5 max-w-md w-full">
        {placed.map(pw => (
          <span
            key={pw.word}
            className={`px-2 py-0.5 rounded-full text-sm font-bold transition-all ${
              found.has(pw.word)
                ? 'bg-green-300 text-green-900 line-through opacity-60'
                : 'bg-white/20 text-white'
            }`}
          >
            {pw.word}
          </span>
        ))}
      </div>

      {/* Grid */}
      <div className="w-full max-w-sm">
        <SearchGrid
          grid={grid}
          placed={placed}
          found={found}
          onSelect={handleSelect}
        />
      </div>

      <p className="text-white/70 text-sm">
        {remaining === 0 ? '🎉 מצאת את כולם!' : `נותרו ${remaining} מילים`}
      </p>
    </div>
  );
}
