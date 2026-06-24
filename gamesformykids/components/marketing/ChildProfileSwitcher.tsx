'use client';

import { useState, useRef, useEffect } from 'react';
import { useChildProfileStore, type ChildProfile } from '@/lib/stores/childProfileStore';
import { AVATAR_LIST } from '@/hooks/shared/user/useAvatarEmoji';

const MAX_PROFILES = 4;

function AddProfileModal({ onAdd, onClose }: { onAdd: (name: string, emoji: string) => void; onClose: () => void }) {
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState(AVATAR_LIST[0]!);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim(), emoji);
      onClose();
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40"
      onClick={onClose}
      dir="rtl"
    >
      <div
        className="w-full sm:max-w-sm bg-white dark:bg-gray-800 rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">הוסף פרופיל ילד</h2>
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            placeholder="שם הילד"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={20}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-2 mb-4 text-right bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">בחר אייקון</p>
          <div className="grid grid-cols-6 gap-2 mb-5">
            {AVATAR_LIST.map((av) => (
              <button
                key={av}
                type="button"
                onClick={() => setEmoji(av)}
                className={`text-2xl p-1 rounded-xl transition-transform active:scale-90 ${
                  emoji === av
                    ? 'ring-2 ring-purple-500 bg-purple-50 dark:bg-purple-900'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {av}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={!name.trim()}
              className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white font-bold py-2.5 rounded-xl transition-colors"
            >
              הוסף
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-bold py-2.5 rounded-xl transition-colors"
            >
              ביטול
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface ProfileBubbleProps {
  profile: ChildProfile | null;
  isActive: boolean;
  isManaging: boolean;
  onClick: () => void;
  onDelete?: () => void;
}

function ProfileBubble({ profile, isActive, isManaging, onClick, onDelete }: ProfileBubbleProps) {
  const emoji = profile?.emoji ?? '👨‍👩‍👧';
  const name = profile?.name ?? 'הכל';

  return (
    <div className="relative flex flex-col items-center gap-1 shrink-0">
      <button
        onClick={onClick}
        className={`w-12 h-12 rounded-full text-2xl flex items-center justify-center transition-all active:scale-90 ${
          isActive
            ? 'ring-4 ring-purple-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 scale-110 shadow-md'
            : 'ring-2 ring-gray-200 dark:ring-gray-600 hover:ring-purple-300'
        } bg-white dark:bg-gray-700 shadow`}
        aria-label={`עבור לפרופיל ${name}`}
        aria-pressed={isActive}
      >
        {emoji}
      </button>
      <span className={`text-xs font-medium truncate max-w-14 text-center ${isActive ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400'}`}>
        {name}
      </span>
      {isManaging && onDelete && (
        <button
          onClick={onDelete}
          className="absolute -top-1 -left-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center shadow hover:bg-red-600 active:scale-90"
          aria-label={`מחק פרופיל ${name}`}
        >
          ×
        </button>
      )}
    </div>
  );
}

export default function ChildProfileSwitcher() {
  const { profiles, activeProfileId, addProfile, removeProfile, switchProfile } = useChildProfileStore();
  const [showAdd, setShowAdd] = useState(false);
  const [isManaging, setIsManaging] = useState(false);

  if (profiles.length === 0 && !showAdd) {
    return (
      <div className="flex justify-center my-2" dir="rtl">
        <button
          onClick={() => setShowAdd(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300 text-sm font-medium hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
        >
          <span>+</span>
          <span>הוסף פרופיל ילד</span>
        </button>
        {showAdd && (
          <AddProfileModal onAdd={(n, e) => addProfile(n, e)} onClose={() => setShowAdd(false)} />
        )}
      </div>
    );
  }

  return (
    <>
      <div className="px-4 my-3" dir="rtl">
        <div className="flex items-center gap-1 mb-2">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">מי משחק עכשיו?</span>
          {profiles.length > 0 && (
            <button
              onClick={() => setIsManaging((m) => !m)}
              className="mr-auto text-xs text-purple-500 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
            >
              {isManaging ? 'סיים עריכה' : '✏️ ערוך'}
            </button>
          )}
        </div>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-1">
          {/* Default / parent bubble */}
          <ProfileBubble
            profile={null}
            isActive={activeProfileId === null}
            isManaging={false}
            onClick={() => { switchProfile(null); setIsManaging(false); }}
          />
          {profiles.map((p) => (
            <ProfileBubble
              key={p.id}
              profile={p}
              isActive={p.id === activeProfileId}
              isManaging={isManaging}
              onClick={() => { switchProfile(p.id); setIsManaging(false); }}
              onDelete={() => removeProfile(p.id)}
            />
          ))}
          {profiles.length < MAX_PROFILES && !isManaging && (
            <div className="flex flex-col items-center gap-1 shrink-0">
              <button
                onClick={() => setShowAdd(true)}
                className="w-12 h-12 rounded-full text-2xl flex items-center justify-center ring-2 ring-dashed ring-gray-300 dark:ring-gray-600 hover:ring-purple-400 bg-gray-50 dark:bg-gray-800 transition-all active:scale-90 text-gray-400 dark:text-gray-500"
                aria-label="הוסף פרופיל"
              >
                +
              </button>
              <span className="text-xs text-gray-400 dark:text-gray-500">הוסף</span>
            </div>
          )}
        </div>
      </div>
      {showAdd && (
        <AddProfileModal onAdd={(n, e) => { addProfile(n, e); }} onClose={() => setShowAdd(false)} />
      )}
    </>
  );
}
