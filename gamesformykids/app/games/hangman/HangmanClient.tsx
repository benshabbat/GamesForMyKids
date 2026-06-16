'use client';
import { useHangman } from './useHangman';
import { CATEGORY_NAMES } from './data/wordCategories';
import GameResultCard from '@/components/game/shared/GameResultCard';

const DOODLE_STEPS = ['😐', '😟', '😨', '😰', '😱', '💀'];
const WRONG_PARTS = [
  { label: 'ראש', emoji: '🔵' },
  { label: 'גוף', emoji: '🟦' },
  { label: 'יד שמאל', emoji: '💪' },
  { label: 'יד ימין', emoji: '💪' },
  { label: 'רגל שמאל', emoji: '🦵' },
  { label: 'רגל ימין', emoji: '🦵' },
];

const CATEGORY_EMOJIS: Record<string, string> = {
  חיות: '🦁',
  אוכל: '🍎',
  ספורט: '⚽',
  משפחה: '👨‍👩‍👧',
};

export default function HangmanClient() {
  const {
    phase, categoryName, entry, wordDisplay, guessed, wrongCount, score, streak,
    alphabet, maxWrong,
    startGame, handleGuess, nextWord, resetGame,
  } = useHangman();

  if (phase === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-800 to-purple-700 flex items-center justify-center p-4" dir="rtl">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full flex flex-col items-center gap-6">
          <div className="text-6xl">🎯</div>
          <h1 className="text-3xl font-extrabold text-violet-800 text-center">תלייה עברית</h1>
          <p className="text-center text-gray-600">נחש את המילה לפני שהדמות מתמוטטת!</p>
          <div className="flex flex-col gap-3 w-full">
            <p className="text-sm font-bold text-gray-500 text-center">בחר קטגוריה:</p>
            {CATEGORY_NAMES.map(cat => (
              <button
                key={cat}
                onClick={() => startGame(cat)}
                className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-bold text-lg rounded-2xl py-4 px-6 flex items-center gap-3 transition-all active:scale-95 shadow-md"
              >
                <span className="text-3xl">{CATEGORY_EMOJIS[cat] ?? '📝'}</span>
                <span>{cat}</span>
              </button>
            ))}
          </div>
          {score > 0 && (
            <div className="text-violet-700 font-bold text-center">
              ניקוד: {score} | רצף: {streak} 🔥
            </div>
          )}
        </div>
      </div>
    );
  }

  if (phase === 'won') {
    return (
      <GameResultCard
        emoji="🎉"
        title={`כל הכבוד! המילה היא "${entry.word}"`}
        gradientClass="from-violet-50 to-purple-100"
        buttonClass="from-violet-500 to-purple-600"
        onRestart={resetGame}
        restartLabel="קטגוריה חדשה"
        score={score}
        gameType="hangman"
        scorePercent={Math.round(((maxWrong - wrongCount) / maxWrong) * 100)}
      >
        <div className="flex flex-col items-center gap-2" dir="rtl">
          <p className="text-gray-500 text-sm">טעויות: {wrongCount} מתוך {maxWrong}</p>
          {streak > 1 && <p className="text-violet-600 font-bold">רצף: {streak} מילים! 🔥</p>}
          <button
            onClick={nextWord}
            className="mt-2 px-8 py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold rounded-2xl shadow-lg hover:from-green-500 hover:to-emerald-600 active:scale-95 transition-all"
          >
            מילה נוספת מ{categoryName}
          </button>
        </div>
      </GameResultCard>
    );
  }

  if (phase === 'lost') {
    return (
      <GameResultCard
        emoji="💔"
        title={`המילה הייתה: ${entry.word}`}
        gradientClass="from-red-50 to-orange-100"
        buttonClass="from-red-400 to-orange-500"
        onRestart={resetGame}
        restartLabel="נסה שוב"
        score={score}
        gameType="hangman"
        scorePercent={0}
      >
        <div className="flex flex-col items-center gap-2" dir="rtl">
          <p className="text-gray-500 text-sm">רמז: {entry.hint}</p>
          <p className="text-gray-400 text-xs">הניחושים שלך: {Array.from(guessed).join(' ')}</p>
        </div>
      </GameResultCard>
    );
  }

  // playing
  const wrongLetters = Array.from(guessed).filter(l => !entry.word.includes(l));
  const faceParts = WRONG_PARTS.slice(0, wrongCount);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-800 to-purple-700 flex flex-col items-center justify-center gap-3 p-3" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-lg">
        <button onClick={resetGame} className="text-white/70 hover:text-white text-sm font-bold px-3 py-1.5 rounded-xl bg-white/10">
          ← תפריט
        </button>
        <div className="text-white font-bold text-sm">{CATEGORY_EMOJIS[categoryName]} {categoryName}</div>
        <div className="text-white font-bold text-sm">ניקוד: {score}</div>
      </div>

      {/* Doodle figure */}
      <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-4 flex flex-col items-center gap-2 w-full max-w-lg">
        <div className="flex items-center gap-3">
          <span className="text-5xl" role="img" aria-label="figure">{DOODLE_STEPS[wrongCount] ?? '😐'}</span>
          <div className="flex flex-wrap gap-1">
            {faceParts.map((p, i) => (
              <span key={i} className="text-2xl" title={p.label}>{p.emoji}</span>
            ))}
          </div>
        </div>
        <div className="flex gap-2 mt-1">
          {Array.from({ length: maxWrong }, (_, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full border-2 ${i < wrongCount ? 'border-red-400 bg-red-300' : 'border-white/30 bg-white/10'}`}
            />
          ))}
        </div>
        <p className="text-white/60 text-xs">{maxWrong - wrongCount} ניסיונות נותרו</p>
      </div>

      {/* Hint */}
      <p className="text-white/70 text-sm text-center">{entry.hint}</p>

      {/* Word display */}
      <div className="flex gap-2 flex-wrap justify-center">
        {wordDisplay.map((ch, i) => (
          <div
            key={i}
            className={`w-10 h-12 flex items-end justify-center border-b-4 font-extrabold text-2xl ${
              ch === '_' ? 'border-white/40 text-transparent' : 'border-white text-white'
            }`}
          >
            {ch === '_' ? '·' : ch}
          </div>
        ))}
      </div>

      {/* Wrong letters */}
      {wrongLetters.length > 0 && (
        <div className="text-white/50 text-sm text-center">
          שגוי: {wrongLetters.join(' ')}
        </div>
      )}

      {/* Alphabet */}
      <div className="flex flex-wrap justify-center gap-1.5 max-w-lg">
        {alphabet.map(letter => {
          const isGuessed = guessed.has(letter);
          const isWrong = isGuessed && !entry.word.includes(letter);
          const isCorrect = isGuessed && entry.word.includes(letter);
          return (
            <button
              key={letter}
              onClick={() => handleGuess(letter)}
              disabled={isGuessed}
              className={`w-10 h-10 rounded-xl font-bold text-lg transition-all ${
                isCorrect
                  ? 'bg-green-400 text-white cursor-default scale-95'
                  : isWrong
                  ? 'bg-red-400/50 text-white/40 cursor-default scale-90'
                  : 'bg-white/20 text-white hover:bg-white/40 active:scale-90 cursor-pointer'
              }`}
            >
              {letter}
            </button>
          );
        })}
      </div>
    </div>
  );
}
