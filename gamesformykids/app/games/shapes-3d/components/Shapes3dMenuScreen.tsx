'use client';

interface Props {
  onStart: () => void;
}

const PREVIEW_SHAPES = [
  { shape: 'קובייה', emoji: '🎲' },
  { shape: 'כדור',   emoji: '⚽' },
  { shape: 'גליל',   emoji: '🥫' },
  { shape: 'חרוט',   emoji: '🍦' },
  { shape: 'פירמידה', emoji: '🔺' },
  { shape: 'תיבה',   emoji: '📦' },
  { shape: 'מנסרה',  emoji: '🔷' },
  { shape: 'ספירה',  emoji: '🌐' },
];

export default function Shapes3dMenuScreen({ onStart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="text-8xl mb-6">📐</div>
        <h1 className="text-3xl font-bold text-indigo-700 mb-2">גופים גיאומטריים</h1>
        <p className="text-gray-500 mb-5">למד גופים תלת-ממדיים!</p>
        <div className="grid grid-cols-4 gap-2 mb-6">
          {PREVIEW_SHAPES.map(({ shape, emoji }) => (
            <div key={shape} className="bg-indigo-50 rounded-xl p-2 text-center">
              <div className="text-2xl">{emoji}</div>
              <div className="text-xs font-semibold text-indigo-700">{shape}</div>
            </div>
          ))}
        </div>
        <button onClick={onStart} className="w-full py-4 rounded-2xl bg-indigo-600 text-white text-xl font-bold hover:bg-indigo-700 transition-all shadow-lg">
          התחל לשחק! 📐
        </button>
      </div>
    </div>
  );
}
