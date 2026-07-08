'use client';
import { CATEGORY_LABELS, SOUND_CATEGORIES, type SoundCategory } from '../data/soundClips';

interface Props {
  onStart: (cat: SoundCategory | 'all') => void;
}

export default function SoundQuizMenuScreen({ onStart }: Props) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6" dir="rtl"
      style={{ background: 'linear-gradient(135deg, #e8f5e9 0%, #e3f2fd 100%)' }}>
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-sm w-full text-center">
        <div className="text-6xl mb-3">🔊</div>
        <h1 className="text-3xl font-extrabold text-teal-800 mb-2">מה הצליל?</h1>
        <p className="text-teal-600 mb-6">שמע את הצליל ובחר מה עשה אותו!</p>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => onStart('all')}
            className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold py-3 rounded-2xl text-lg shadow-md hover:opacity-90 active:scale-95 transition-all"
          >
            🎲 כל הצלילים!
          </button>
          {SOUND_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onStart(cat)}
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
