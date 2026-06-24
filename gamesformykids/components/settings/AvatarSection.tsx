'use client';

import { useState } from 'react';
import { useAvatarEmoji } from '@/hooks/shared/user/useAvatarEmoji';
import EmojiAvatarPicker from '@/components/shared/EmojiAvatarPicker';
import { SectionContainer } from './SectionContainer';

export function AvatarSection() {
  const { emoji, setEmoji, clearEmoji } = useAvatarEmoji();
  const [showPicker, setShowPicker] = useState(false);

  return (
    <SectionContainer title="אוואטר" emoji="🦁">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-medium text-gray-800">האוואטר שלי</p>
          <p className="text-sm text-gray-500 mt-0.5">
            מופיע בחגיגות ובבאנר ההמשך
          </p>
        </div>
        <div className="flex items-center gap-2">
          {emoji && (
            <span className="text-4xl">{emoji}</span>
          )}
          <button
            type="button"
            onClick={() => setShowPicker(true)}
            className="px-3 py-2 rounded-xl bg-purple-100 text-purple-700 font-semibold text-sm hover:bg-purple-200 transition-colors"
          >
            {emoji ? 'שנה' : 'בחר אוואטר'}
          </button>
          {emoji && (
            <button
              type="button"
              onClick={clearEmoji}
              className="px-3 py-2 rounded-xl bg-gray-100 text-gray-500 font-semibold text-sm hover:bg-gray-200 transition-colors"
            >
              הסר
            </button>
          )}
        </div>
      </div>
      {showPicker && (
        <EmojiAvatarPicker
          current={emoji}
          onSelect={setEmoji}
          onClose={() => setShowPicker(false)}
        />
      )}
    </SectionContainer>
  );
}
