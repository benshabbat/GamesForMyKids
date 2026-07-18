'use client';
import type { ChangeEvent } from 'react';
import { DOT_TO_DOT_THEMES } from '../../data/pictures';
import type { DotToDotTheme } from '../../types';

interface Props {
  id: string;
  title: string;
  emoji: string;
  theme: DotToDotTheme;
  onIdChange: (value: string) => void;
  onTitleChange: (value: string) => void;
  onEmojiChange: (value: string) => void;
  onThemeChange: (value: DotToDotTheme) => void;
}

export default function MetadataForm({ id, title, emoji, theme, onIdChange, onTitleChange, onEmojiChange, onThemeChange }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl">
      <input
        value={id}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onIdChange(e.target.value)}
        placeholder="id (kebab-case)"
        className="rounded-xl px-3 py-2 text-sm bg-white/90"
      />
      <input
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onTitleChange(e.target.value)}
        placeholder="כותרת בעברית"
        className="rounded-xl px-3 py-2 text-sm bg-white/90"
      />
      <input
        value={emoji}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onEmojiChange(e.target.value)}
        placeholder="אימוג'י"
        className="rounded-xl px-3 py-2 text-sm bg-white/90"
      />
      <select
        value={theme}
        onChange={(e) => onThemeChange(e.target.value as DotToDotTheme)}
        className="rounded-xl px-3 py-2 text-sm bg-white/90"
      >
        {DOT_TO_DOT_THEMES.map((t) => (
          <option key={t.id} value={t.id}>{t.emoji} {t.title}</option>
        ))}
      </select>
    </div>
  );
}
