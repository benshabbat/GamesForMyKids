'use client';
import { useCallback } from 'react';

interface ShareCardOptions {
  gameEmoji: string;
  gameTitle: string;
  score: number;
  masteryStars?: number | undefined;
  pct?: number | undefined;
}

export function useShareCard() {
  const generateCard = useCallback((opts: ShareCardOptions): Promise<Blob | null> => {
    return new Promise((resolve) => {
      if (typeof document === 'undefined') { resolve(null); return; }

      const W = 600, H = 340;
      const canvas = document.createElement('canvas');
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext('2d');
      if (!ctx) { resolve(null); return; }

      // Background gradient (RTL purple-to-pink)
      const grad = ctx.createLinearGradient(W, 0, 0, H);
      grad.addColorStop(0, '#667eea');
      grad.addColorStop(1, '#f093fb');
      ctx.fillStyle = grad;
      ctx.roundRect(0, 0, W, H, 24);
      ctx.fill();

      // White inner card
      ctx.fillStyle = 'rgba(255,255,255,0.15)';
      ctx.roundRect(20, 20, W - 40, H - 40, 16);
      ctx.fill();

      // Emoji (large, center-top)
      ctx.font = '80px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(opts.gameEmoji, W / 2, 40);

      // Game title
      ctx.font = 'bold 28px "Rubik", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.direction = 'rtl';
      ctx.textBaseline = 'top';
      ctx.fillText(opts.gameTitle, W / 2, 140);

      // Score line
      ctx.font = 'bold 48px "Rubik", sans-serif';
      ctx.fillStyle = '#ffe066';
      ctx.fillText(String(opts.score), W / 2, 180);

      // "נקודות" label
      ctx.font = '20px "Rubik", sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.fillText('נקודות', W / 2, 236);

      // Mastery stars
      if (opts.masteryStars && opts.masteryStars > 0) {
        ctx.font = '30px serif';
        ctx.fillText('⭐'.repeat(opts.masteryStars), W / 2, 268);
      }

      // Site watermark
      ctx.font = '14px "Rubik", sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.6)';
      ctx.fillText('gamesformykids.com', W / 2, H - 30);

      canvas.toBlob((blob) => resolve(blob), 'image/png');
    });
  }, []);

  const shareCard = useCallback(async (opts: ShareCardOptions) => {
    const blob = await generateCard(opts);
    if (!blob) return;

    const siteUrl = typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}?utm_source=whatsapp&utm_medium=share_card&utm_campaign=game_result`
      : '';
    const shareText = `${opts.gameEmoji} השגתי ${opts.score} נקודות ב${opts.gameTitle}! 🎮\n${siteUrl}`;

    // Try Web Share API with file
    if (typeof navigator !== 'undefined' && navigator.canShare) {
      const file = new File([blob], 'result.png', { type: 'image/png' });
      if (navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({ files: [file], text: shareText });
          return;
        } catch {
          // cancelled — fall through
        }
      }
    }

    // Fallback: WhatsApp with text link
    const waUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  }, [generateCard]);

  const downloadCard = useCallback(async (opts: ShareCardOptions) => {
    const blob = await generateCard(opts);
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${opts.gameTitle}-result.png`;
    a.click();
    URL.revokeObjectURL(url);
  }, [generateCard]);

  return { shareCard, downloadCard };
}
