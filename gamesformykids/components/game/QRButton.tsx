'use client';
import { useState, useCallback, useRef } from 'react';
import QRCode from 'react-qr-code';
import { QrCode, X, Copy, Download, Check } from 'lucide-react';

interface Props {
  gameType: string;
}

export default function QRButton({ gameType }: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const gameUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/games/${gameType}?utm_source=qr`
    : `https://games-for-my-kids.vercel.app/games/${gameType}?utm_source=qr`;

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(gameUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [gameUrl]);

  const handleDownload = useCallback(() => {
    const svg = wrapperRef.current?.querySelector('svg');
    if (!svg) return;
    const xml = new XMLSerializer().serializeToString(svg);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 256, 256);
      ctx.drawImage(img, 0, 0, 256, 256);
      const link = document.createElement('a');
      link.download = `game-${gameType}-qr.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(xml)))}`;
  }, [gameType]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 left-4 z-40 bg-white/90 backdrop-blur-sm rounded-full p-2.5 shadow-lg border border-gray-200 hover:bg-indigo-50 hover:border-indigo-300 transition-all"
        aria-label="הצג קוד QR"
        title="קוד QR לשיתוף"
      >
        <QrCode className="w-5 h-5 text-indigo-600" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div className="bg-white rounded-3xl p-6 max-w-xs w-full shadow-2xl text-center" dir="rtl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-indigo-900">שתף את המשחק</h2>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div ref={wrapperRef} className="bg-indigo-50 rounded-2xl p-3 inline-block mb-4">
              <QRCode
                value={gameUrl}
                size={220}
                fgColor="#1e1b4b"
                bgColor="#eef2ff"
              />
            </div>

            <p className="text-xs text-gray-500 mb-4 break-all">{gameUrl}</p>

            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-indigo-100 text-indigo-700 text-sm font-medium hover:bg-indigo-200 transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'הועתק!' : 'העתק'}
              </button>
              <button
                onClick={handleDownload}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                הורד PNG
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
