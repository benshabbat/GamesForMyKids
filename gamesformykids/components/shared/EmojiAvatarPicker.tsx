'use client';

import { AVATAR_LIST } from '@/hooks/shared/user/useAvatarEmoji';

interface Props {
  current: string;
  onSelect: (emoji: string) => void;
  onClose: () => void;
}

export default function EmojiAvatarPicker({ current, onSelect, onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      dir="rtl"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl p-6 max-w-xs w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-black text-center text-gray-800 mb-4">בחר אוואטר</h3>
        <div className="grid grid-cols-5 gap-2">
          {AVATAR_LIST.map((e) => (
            <button
              key={e}
              type="button"
              onClick={() => { onSelect(e); onClose(); }}
              className={`
                text-3xl p-2 rounded-2xl transition-all duration-150 active:scale-90
                ${current === e
                  ? 'bg-purple-100 ring-2 ring-purple-500 scale-110'
                  : 'hover:bg-gray-100'}
              `}
              aria-label={e}
            >
              {e}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-4 w-full py-2 rounded-2xl border-2 border-gray-200 text-gray-500 font-semibold text-sm hover:bg-gray-50"
        >
          ביטול
        </button>
      </div>
    </div>
  );
}
