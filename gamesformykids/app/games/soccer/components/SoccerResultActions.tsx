'use client';

interface Props {
  onRestart: () => void;
}

export default function SoccerResultActions({ onRestart }: Props) {
  return (
    <div className="flex gap-4">
      <button
        onClick={onRestart}
        className="px-6 py-3 bg-yellow-400 text-green-900 rounded-xl font-black shadow-lg active:scale-95"
      >
        שחק שוב ⚽
      </button>
    </div>
  );
}
