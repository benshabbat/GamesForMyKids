'use client';

import { useTypingRaceGame } from './useTypingRaceGame';
import TypingDisplay from './components/TypingDisplay';
import HebrewKeyboard from './components/HebrewKeyboard';
import Link from 'next/link';
import type { TypingLevel } from './typingWordBank';

const LEVEL_LABELS: Record<TypingLevel, string> = {
  easy: 'קל — מילים קצרות',
  medium: 'בינוני — מילים בינוניות',
  hard: 'קשה — מילים ארוכות',
};

const MEDAL_DATA = {
  gold:   { emoji: '🥇', label: 'זהב!',  bg: 'from-yellow-300 to-amber-400',  text: 'text-amber-900' },
  silver: { emoji: '🥈', label: 'כסף!',  bg: 'from-slate-300 to-slate-400',   text: 'text-slate-900' },
  bronze: { emoji: '🥉', label: 'ארד!',  bg: 'from-orange-300 to-orange-400', text: 'text-orange-900' },
} as const;

export default function TypingRaceClient() {
  const {
    phase, words, currentIndex, currentWord, typedCount,
    errorCount, wordTimes, hasError, avgTimeMs, medal,
    startGame, typeKey, restart, goToMenu,
  } = useTypingRaceGame();

  // ── Menu ──────────────────────────────────────────────────────────────────
  if (phase === 'menu') {
    return (
      <div
        dir="rtl"
        className="min-h-screen flex flex-col items-center justify-center p-6"
        style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' }}
      >
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center">
          <div className="text-6xl mb-4">⌨️</div>
          <h1 className="text-3xl font-black text-indigo-800 mb-2">קלדן מהיר</h1>
          <p className="text-gray-600 mb-6 text-sm">כתוב מילים עבריות כמה שיותר מהר — אות אחרי אות!</p>
          <div className="flex flex-col gap-3">
            {(Object.keys(LEVEL_LABELS) as TypingLevel[]).map((lv) => (
              <button
                key={lv}
                onClick={() => startGame(lv)}
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-xl transition-all active:scale-95"
              >
                {LEVEL_LABELS[lv]}
              </button>
            ))}
          </div>
          <Link href="/" className="mt-6 inline-block text-sm text-gray-400 hover:text-gray-600">
            ← חזרה לבית
          </Link>
        </div>
      </div>
    );
  }

  // ── Result ─────────────────────────────────────────────────────────────────
  if (phase === 'result') {
    const m = MEDAL_DATA[medal];
    const totalMs = wordTimes.reduce((a, b) => a + b, 0);
    const totalSec = (totalMs / 1000).toFixed(1);
    const avgSec = (avgTimeMs / 1000).toFixed(1);

    return (
      <div
        dir="rtl"
        className="min-h-screen flex flex-col items-center justify-center p-6"
        style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' }}
      >
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center">
          <div className={`text-6xl mb-2`}>{m.emoji}</div>
          <h2 className={`text-3xl font-black ${m.text} mb-1`}>מדלייה {m.label}</h2>
          <div className={`rounded-2xl bg-gradient-to-br ${m.bg} p-4 my-4 grid grid-cols-3 gap-3 text-center`}>
            <div>
              <div className="text-2xl font-black text-white">{words.length}</div>
              <div className="text-xs text-white/80">מילים</div>
            </div>
            <div>
              <div className="text-2xl font-black text-white">{totalSec}ש׳</div>
              <div className="text-xs text-white/80">סה"כ זמן</div>
            </div>
            <div>
              <div className="text-2xl font-black text-white">{errorCount}</div>
              <div className="text-xs text-white/80">שגיאות</div>
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-5">ממוצע {avgSec} שניות למילה</p>
          <div className="flex flex-col gap-3">
            <button
              onClick={restart}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 rounded-xl transition-all active:scale-95"
            >
              🔄 שחק שוב
            </button>
            <button
              onClick={goToMenu}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-all"
            >
              ← תפריט ראשי
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Playing ────────────────────────────────────────────────────────────────
  return (
    <div
      dir="rtl"
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' }}
    >
      <div className="bg-white rounded-3xl shadow-2xl p-5 max-w-lg w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-black text-indigo-700">⌨️ קלדן מהיר</span>
          <span className="text-sm font-semibold text-gray-400">שגיאות: {errorCount}</span>
        </div>

        {/* Word display */}
        <TypingDisplay
          word={currentWord}
          typedCount={typedCount}
          hasError={hasError}
          wordNumber={currentIndex + 1}
          total={words.length}
        />

        {/* Hebrew keyboard */}
        <HebrewKeyboard
          onKey={typeKey}
          targetLetter={currentWord[typedCount] ?? ''}
        />
      </div>
    </div>
  );
}
