'use client';

interface Props {
  onNudgeLeft: () => void;
  onShoot: () => void;
  onNudgeRight: () => void;
}

export default function SpaceDefenderControls({ onNudgeLeft, onShoot, onNudgeRight }: Props) {
  return (
    <div className="mt-3 flex gap-3">
      <button
        onPointerDown={onNudgeLeft}
        className="bg-indigo-700/80 text-white rounded-xl px-6 py-3 text-xl font-bold active:bg-indigo-500 touch-none"
      >
        ◄
      </button>
      <button
        onPointerDown={onShoot}
        className="bg-yellow-500/90 text-white rounded-xl px-8 py-3 text-xl font-bold active:bg-yellow-400 touch-none"
      >
        💥 ירה!
      </button>
      <button
        onPointerDown={onNudgeRight}
        className="bg-indigo-700/80 text-white rounded-xl px-6 py-3 text-xl font-bold active:bg-indigo-500 touch-none"
      >
        ▶
      </button>
    </div>
  );
}
