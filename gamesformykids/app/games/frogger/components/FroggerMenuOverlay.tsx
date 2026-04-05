'use client';

interface Props {
  onStart: () => void;
}

export default function FroggerMenuOverlay({ onStart }: Props) {
  return (
    <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/75">
      <div className="bg-white rounded-3xl p-7 text-center shadow-2xl w-72">
        <div className="text-5xl mb-2">🐸</div>
        <h1 className="text-2xl font-black text-gray-700 mb-1">צפרדע חוצה</h1>
        <p className="text-gray-500 text-sm mb-5">עזור לצפרדע לחצות את הכביש!<br />הימנע מהרכבים — הגע לדגלים 🏁</p>
        <button
          onClick={onStart}
          className="w-full py-4 rounded-2xl bg-green-500 text-white font-black text-xl hover:bg-green-600 active:scale-95 transition-all"
        >
          🐸 התחל!
        </button>
      </div>
    </div>
  );
}
