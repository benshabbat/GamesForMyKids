'use client';
import { useState, useCallback } from 'react';

export function useShareScore() {
  const [copied, setCopied] = useState(false);

  const share = useCallback(async (text: string) => {
    const url = typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}?utm_source=share&utm_medium=native&utm_campaign=game_result`
      : '';
    const fullText = `${text}\n${url}`;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ text: text, url });
        return;
      } catch {
        // User cancelled or API unavailable — fall through to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }, []);

  const shareWhatsApp = useCallback((text: string, url?: string) => {
    const shareUrl = url ?? (typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}?utm_source=whatsapp&utm_medium=share&utm_campaign=game_result`
      : '');
    const fullText = `${text}\n${shareUrl}`;
    const waUrl = `https://wa.me/?text=${encodeURIComponent(fullText)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  }, []);

  return { share, copied, shareWhatsApp };
}
