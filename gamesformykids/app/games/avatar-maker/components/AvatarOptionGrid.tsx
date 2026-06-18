'use client';
import { AVATAR_PARTS, type AvatarArea } from '@/lib/constants/avatarParts';

interface Props {
  area: AvatarArea;
  selectedId: string;
  onSelect: (area: AvatarArea, id: string) => void;
}

export default function AvatarOptionGrid({ area, selectedId, onSelect }: Props) {
  const parts = AVATAR_PARTS[area];

  return (
    <div className="grid grid-cols-4 gap-2 p-2">
      {parts.map(part => (
        <button
          key={part.id}
          onClick={() => onSelect(area, part.id)}
          title={part.label}
          className={`flex flex-col items-center justify-center rounded-2xl p-2 transition-all active:scale-95 border-2 ${
            selectedId === part.id
              ? 'border-amber-400 bg-amber-50 shadow-md scale-105'
              : 'border-transparent bg-white hover:border-amber-200 hover:bg-amber-50'
          }`}
          style={{ minHeight: 64 }}
        >
          {area === 'hair' && part.color ? (
            <div
              className="rounded-full mb-1 border border-gray-200"
              style={{ width: 28, height: 28, backgroundColor: part.color }}
            />
          ) : (
            <span style={{ fontSize: 28, lineHeight: 1 }}>{part.emoji}</span>
          )}
          <span className="text-xs text-gray-600 mt-1 leading-tight text-center">{part.label}</span>
        </button>
      ))}
    </div>
  );
}
