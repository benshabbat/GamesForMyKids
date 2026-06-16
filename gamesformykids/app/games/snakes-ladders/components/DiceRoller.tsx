'use client';

const DICE_FACES = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

interface Props {
  diceValue: number;
  canRoll: boolean;
  onRoll: () => void;
  playerName: string;
  playerEmoji: string;
}

export default function DiceRoller({ diceValue, canRoll, onRoll, playerName, playerEmoji }: Props) {
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-sm font-bold text-gray-700" dir="rtl">
        {playerEmoji} תור {playerName}
      </p>
      <div className="text-5xl">{diceValue > 0 ? DICE_FACES[diceValue] : '🎲'}</div>
      {diceValue > 0 && (
        <p className="text-xs text-gray-500">הטלת {diceValue}</p>
      )}
      <button
        onClick={onRoll}
        disabled={!canRoll}
        className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors text-sm"
      >
        {canRoll ? '🎲 הטל קוביה!' : '⏳ ממתין...'}
      </button>
    </div>
  );
}
