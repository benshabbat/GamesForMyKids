'use client';
import { useCallback, useRef } from 'react';
import { useAvatarMakerStore } from './avatarMakerStore';
import { AVATAR_PARTS, type AvatarArea } from '@/lib/constants/avatarParts';
import { speakHebrew } from '@/lib/utils/speech/enhancedSpeechUtils';

export function useAvatarMaker() {
  const { selections, selectPart, reset } = useAvatarMakerStore();
  const previewRef = useRef<HTMLDivElement>(null);

  const handleSelect = useCallback((area: AvatarArea, partId: string) => {
    selectPart(area, partId);
    const part = AVATAR_PARTS[area].find(p => p.id === partId);
    if (part) speakHebrew(part.label);
  }, [selectPart]);

  const exportPNG = useCallback(async () => {
    const face        = AVATAR_PARTS.face.find(p => p.id === selections.face);
    const hair        = AVATAR_PARTS.hair.find(p => p.id === selections.hair);
    const clothing    = AVATAR_PARTS.clothing.find(p => p.id === selections.clothing);
    const accessory   = AVATAR_PARTS.accessories.find(p => p.id === selections.accessories);

    const W = 300, H = 380;
    const canvas = document.createElement('canvas');
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background gradient
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, '#fff9c4');
    bg.addColorStop(1, '#e1f5fe');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Hair semi-circle (top of head)
    const cx = W / 2, headY = 130, headR = 70;
    ctx.fillStyle = hair?.color ?? '#8B4513';
    ctx.beginPath();
    ctx.arc(cx, headY, headR + 12, Math.PI, 2 * Math.PI);
    ctx.fill();

    // Head circle
    ctx.fillStyle = '#FFDAB9';
    ctx.beginPath();
    ctx.arc(cx, headY, headR, 0, 2 * Math.PI);
    ctx.fill();

    // Draw emoji layers
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Face expression
    ctx.font = `${headR * 1.5}px serif`;
    ctx.fillText(face?.emoji ?? '😊', cx, headY + 5);

    // Accessory above face (if not "none")
    if (accessory && accessory.id !== 'a0') {
      ctx.font = '48px serif';
      ctx.fillText(accessory.emoji, cx + headR - 10, headY - headR + 10);
    }

    // Clothing below face
    ctx.font = '72px serif';
    ctx.fillText(clothing?.emoji ?? '👕', cx, headY + headR + 65);

    // Border
    ctx.strokeStyle = 'rgba(0,0,0,0.08)';
    ctx.lineWidth = 2;
    ctx.roundRect?.(4, 4, W - 8, H - 8, 16);
    ctx.stroke();

    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'הדמות-שלי.png';
    a.click();
  }, [selections]);

  const shareWhatsApp = useCallback(async () => {
    const face     = AVATAR_PARTS.face.find(p => p.id === selections.face);
    const clothing = AVATAR_PARTS.clothing.find(p => p.id === selections.clothing);
    const text = `הדמות שלי: ${face?.emoji ?? '😊'} ${clothing?.emoji ?? '👕'} — נוצר ב-GamesForMyKids 🎮`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  }, [selections]);

  return {
    selections,
    previewRef,
    handleSelect,
    exportPNG,
    shareWhatsApp,
    reset,
  };
}
