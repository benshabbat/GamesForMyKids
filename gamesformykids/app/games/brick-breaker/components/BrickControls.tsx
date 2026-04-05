'use client';

interface Props {
  onNudgeLeft: () => void;
  onLaunch: () => void;
  onNudgeRight: () => void;
}

export default function BrickControls({ onNudgeLeft, onLaunch, onNudgeRight }: Props) {
  return (
    <div className="mt-3 flex gap-4">
      <button
        onPointerDown={onNudgeLeft}
        className="bg-purple-700/80 text-white rounded-xl px-7 py-3 text-xl font-bold active:bg-purple-500 touch-none"
      >◄</button>
      <button
        onPointerDown={onLaunch}
        className="bg-white/20 text-white rounded-xl px-6 py-3 text-sm font-bold active:bg-white/40 touch-none"
      >🏸 השק</button>
      <button
        onPointerDown={onNudgeRight}
        className="bg-purple-700/80 text-white rounded-xl px-7 py-3 text-xl font-bold active:bg-purple-500 touch-none"
      >►</button>
    </div>
  );
}
