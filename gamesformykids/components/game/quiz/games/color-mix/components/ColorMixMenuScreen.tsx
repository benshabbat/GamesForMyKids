'use client';

interface Props {
  onStart: () => void;
}

export default function ColorMixMenuScreen({ onStart }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 p-4 flex items-center" dir="rtl">
      <div className="max-w-md mx-auto w-full text-center">
        <div className="text-7xl mb-4">🎨</div>
        <h1 className="text-3xl font-bold text-purple-800 mb-3">ערבוב צבעים</h1>
        <p className="text-purple-600 mb-8">מה מקבלים כשמערבבים שני צבעים?</p>
        <button onClick={onStart}
          className="w-full py-5 rounded-2xl text-white font-bold text-2xl bg-gradient-to-l from-pink-500 via-purple-500 to-indigo-500 shadow-xl hover:opacity-90 active:scale-95 transition-all">
          🖌️ בואו נערבב!
        </button>
      </div>
    </div>
  );
}
