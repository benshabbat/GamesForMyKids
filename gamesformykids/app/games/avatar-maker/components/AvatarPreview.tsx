'use client';
import type { RefObject } from 'react';
import { AVATAR_PARTS, type AvatarArea } from '@/lib/constants/avatarParts';

interface Props {
  selections: Record<AvatarArea, string>;
  previewRef: RefObject<HTMLDivElement | null>;
}

export default function AvatarPreview({ selections, previewRef }: Props) {
  const face      = AVATAR_PARTS.face.find(p => p.id === selections.face);
  const hair      = AVATAR_PARTS.hair.find(p => p.id === selections.hair);
  const clothing  = AVATAR_PARTS.clothing.find(p => p.id === selections.clothing);
  const accessory = AVATAR_PARTS.accessories.find(p => p.id === selections.accessories);
  const showAccessory = accessory && accessory.id !== 'a0';

  return (
    <div
      ref={previewRef}
      className="relative mx-auto flex flex-col items-center justify-center rounded-3xl shadow-2xl overflow-hidden select-none"
      style={{
        width: 200, height: 260,
        background: 'linear-gradient(160deg, #fff9c4 0%, #e1f5fe 100%)',
      }}
    >
      {/* Hair blob behind head */}
      <div
        className="absolute rounded-full"
        style={{
          width: 110, height: 65,
          top: 28,
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: hair?.color ?? '#8B4513',
          borderRadius: '50% 50% 0 0',
        }}
      />

      {/* Head circle */}
      <div
        className="absolute rounded-full flex items-center justify-center"
        style={{
          width: 100, height: 100,
          top: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#FFDAB9',
          fontSize: 68,
          lineHeight: 1,
        }}
      >
        {face?.emoji ?? '😊'}
      </div>

      {/* Accessory (top-right of head) */}
      {showAccessory && (
        <div
          className="absolute"
          style={{ top: 20, left: '50%', transform: 'translateX(18px)', fontSize: 36 }}
        >
          {accessory.emoji}
        </div>
      )}

      {/* Clothing below head */}
      <div
        className="absolute"
        style={{ top: 148, left: '50%', transform: 'translateX(-50%)', fontSize: 64, lineHeight: 1 }}
      >
        {clothing?.emoji ?? '👕'}
      </div>
    </div>
  );
}
