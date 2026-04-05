'use client';
import FractionBar from './FractionBar';

interface Props {
  onStart: () => void;
}

export default function FractionsMenuScreen({ onStart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-100 flex flex-col items-center justify-center p-4" dir="rtl">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="text-8xl mb-6">🔢</div>
        <h1 className="text-3xl font-bold text-purple-700 mb-2">שברים פשוטים</h1>
        <p className="text-gray-500 mb-5">זהה את השבר לפי ייצוג ויזואלי!</p>
        <div className="bg-purple-50 rounded-2xl p-4 mb-6">
          <p className="text-sm text-purple-600 font-semibold mb-2">לדוגמה — מה השבר הזה?</p>
          <FractionBar numerator={1} denominator={2} />
          <p className="text-purple-800 font-bold mt-1">חצי (1/2) ✓</p>
        </div>
        <button onClick={onStart} className="w-full py-4 rounded-2xl bg-purple-600 text-white text-xl font-bold hover:bg-purple-700 transition-all shadow-lg">
          התחל לשחק! 🔢
        </button>
      </div>
    </div>
  );
}
