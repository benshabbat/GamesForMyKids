'use client';
import { useHebrewRacerStore } from './hebrewRacerStore';
import HebrewRacerScreen from './components/HebrewRacerScreen';

function HebrewRacerMenu({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sky-300 to-sky-100 p-6" dir="rtl">
      <div className="text-8xl mb-4">🏍️</div>
      <h1 className="text-4xl font-black text-sky-800 mb-2 text-center">מרוץ מכשולים עברי</h1>
      <p className="text-sky-600 text-lg mb-6 text-center">ענה נכון — קפץ מעל המכשול!</p>
      <div className="bg-white rounded-2xl p-5 shadow-md mb-8 max-w-xs w-full">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🪨</span>
            <span className="text-gray-700">מכשול מתקרב — שאלה עולה</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">✅</span>
            <span className="text-gray-700">תשובה נכונה = קפיצה!</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">❤️</span>
            <span className="text-gray-700">יש לך 3 חיים — בהצלחה!</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏆</span>
            <span className="text-gray-700">צלח 10 מכשולים כדי לנצח!</span>
          </div>
        </div>
      </div>
      <button
        onClick={onStart}
        className="bg-sky-500 hover:bg-sky-600 active:scale-95 text-white font-black text-xl px-10 py-4 rounded-2xl shadow-lg transition-all"
      >
        התחל לרוץ! 🏍️
      </button>
    </div>
  );
}

function HebrewRacerResult({
  score, checkpoint, won, onRestart,
}: {
  score: number; checkpoint: number; won: boolean; onRestart: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sky-300 to-sky-100 p-6" dir="rtl">
      <div className="text-7xl mb-4">{won ? '🏆' : '💥'}</div>
      <h2 className="text-3xl font-black text-sky-800 mb-2 text-center">
        {won ? 'ניצחת! כל המכשולים נצלחו!' : 'המרוץ נגמר'}
      </h2>
      <p className="text-sky-600 text-xl font-bold mb-1">ניקוד: {score}</p>
      <p className="text-sky-500 mb-8">צלחת {checkpoint} מכשולים</p>
      <button
        onClick={onRestart}
        className="bg-sky-500 hover:bg-sky-600 active:scale-95 text-white font-black text-xl px-10 py-4 rounded-2xl shadow-lg transition-all"
      >
        שחק שוב! 🔄
      </button>
    </div>
  );
}

export default function HebrewRacerClient() {
  const { phase, score, checkpoint, won, startGame, reset } = useHebrewRacerStore();

  if (phase === 'idle')   return <HebrewRacerMenu onStart={startGame} />;
  if (phase === 'result') return <HebrewRacerResult score={score} checkpoint={checkpoint} won={won} onRestart={reset} />;
  return <HebrewRacerScreen />;
}
