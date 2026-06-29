'use client';
import { useJokesBrowser } from './useJokesBrowser';
import { JOKE_CATEGORY_LABELS, JOKE_CATEGORY_COLORS, type JokeCategory } from '@/lib/constants/jokes';

const CATEGORIES: JokeCategory[] = ['animals', 'school', 'food'];

export default function JokesBrowserClient() {
  const {
    phase, current, currentIndex, revealed, totalInCategory,
    selectCategory, revealPunchline, nextJoke, prevJoke, readSetup, backToMenu,
  } = useJokesBrowser();

  if (phase === 'menu') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4"
        style={{ background: 'linear-gradient(135deg, #fef9c3 0%, #dcfce7 100%)' }}
        dir="rtl">
        <div className="w-full max-w-sm space-y-6 text-center">
          <div className="text-7xl animate-bounce">😂</div>
          <h1 className="text-3xl font-extrabold text-yellow-800">ספריית בדיחות</h1>
          <p className="text-gray-600">בחר קטגוריה ותצחק!</p>
          <div className="space-y-3">
            {CATEGORIES.map((cat) => (
              <button key={cat} onClick={() => selectCategory(cat)}
                className={`w-full bg-linear-to-br ${JOKE_CATEGORY_COLORS[cat]} text-white font-bold py-4 rounded-2xl shadow-lg text-xl active:scale-95 transition-transform`}>
                {JOKE_CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!current) return null;

  const shareText = encodeURIComponent(`${current.setup}\n\n${current.punchline}\n\nבדיחות מצחיקות ב-GamesForMyKids! 😂`);
  const whatsappUrl = `https://wa.me/?text=${shareText}`;

  return (
    <div className="min-h-screen flex flex-col items-center p-4 pt-6"
      style={{ background: 'linear-gradient(135deg, #fef9c3 0%, #dcfce7 100%)' }}
      dir="rtl">

      {/* Header */}
      <div className="w-full max-w-sm flex justify-between items-center mb-4">
        <button onClick={backToMenu} className="text-gray-500 underline text-sm">⬅ קטגוריות</button>
        <span className="text-sm text-gray-400">{currentIndex + 1} / {totalInCategory}</span>
      </div>

      {/* Joke card */}
      <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl p-6 mb-4 text-center">
        <div className="text-6xl mb-4">{current.emoji}</div>
        <p className="text-xl font-bold text-gray-800 leading-relaxed mb-4">
          {current.setup}
        </p>
        <button onClick={readSetup}
          className="text-gray-400 text-sm underline mb-2">
          🔊 שמע שוב
        </button>

        {/* Punchline */}
        {revealed ? (
          <div className="mt-4 bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-4 animate-fade-in">
            <p className="text-2xl font-extrabold text-yellow-700 leading-relaxed">
              {current.punchline}
            </p>
          </div>
        ) : (
          <button onClick={revealPunchline}
            className="mt-4 w-full bg-linear-to-br from-yellow-400 to-orange-400 text-white font-bold py-4 rounded-2xl text-lg shadow-lg active:scale-95 transition-transform">
            🤔 גלה תשובה!
          </button>
        )}
      </div>

      {/* Navigation */}
      <div dir="ltr" className="flex gap-4 w-full max-w-sm mb-3">
        <button onClick={prevJoke}
          className="flex-1 bg-white border-2 border-gray-200 font-bold py-3 rounded-2xl text-xl active:scale-95 transition-transform shadow">
          ←
        </button>
        <button onClick={nextJoke}
          className="flex-1 bg-linear-to-br from-green-400 to-emerald-500 text-white font-bold py-3 rounded-2xl text-xl shadow-lg active:scale-95 transition-transform">
          → הבאה
        </button>
      </div>

      {/* WhatsApp share */}
      {revealed && (
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
          className="w-full max-w-sm block text-center bg-[#25d366] text-white font-bold py-3 rounded-2xl shadow-lg active:scale-95 transition-transform">
          📲 שתף בWhatsApp
        </a>
      )}
    </div>
  );
}
