'use client';

interface Props {
  best: number;
  onStart: () => void;
}

export default function JumperMenuOverlay({ best, onStart }: Props) {
  return (
    <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/70">
      <div className="bg-white rounded-3xl p-7 text-center shadow-2xl w-64">
        <div className="text-5xl mb-2">🦘</div>
        <h1 className="text-2xl font-black text-gray-700 mb-1">קפצן</h1>
        <p className="text-gray-500 text-sm mb-5">קפץ על הפלטפורמות וטפס גבוה!<br />הזז שמאלה/ימינה· אל תיפול</p>
        {best > 0 && <p className="text-yellow-600 font-bold mb-3">🏆 שיא: {best}m</p>}
        <button
          onClick={onStart}
          className="w-full py-4 rounded-2xl bg-indigo-600 text-white font-black text-xl hover:bg-indigo-500 active:scale-95 transition-all"
        >
          🦘 קפץ!
        </button>
      </div>
    </div>
  );
}
