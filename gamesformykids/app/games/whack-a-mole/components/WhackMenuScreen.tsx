'use client';

interface Props {
  bgColor: string;
  best: number;
  onStart: () => void;
}

export default function WhackMenuScreen({ bgColor, best, onStart }: Props) {
  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgColor} flex items-center justify-center p-4`} dir="rtl">
      <div className="max-w-sm w-full text-center">
        <div className="text-7xl mb-4 animate-bounce">🐹</div>
        <h1 className="text-4xl font-black text-amber-800 mb-2">חבט על החפרפרת!</h1>
        <p className="text-amber-600 mb-6">הקש על החפרפרות לפני שהן נעלמות<br />הימנע מהפצצות 💣</p>
        {best > 0 && <p className="text-yellow-600 font-bold mb-4">🏆 שיא: {best}</p>}
        <button
          onClick={onStart}
          className="w-full py-5 rounded-2xl bg-gradient-to-l from-amber-500 to-orange-500 text-white font-black text-2xl shadow-xl hover:opacity-90 active:scale-95 transition-all"
        >
          🔨 התחל!
        </button>
      </div>
    </div>
  );
}
