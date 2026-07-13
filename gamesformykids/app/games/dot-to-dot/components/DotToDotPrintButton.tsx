'use client';
import { Printer } from 'lucide-react';
import type { DotToDotPicture } from '../types';

function buildWorksheetHtml(picture: DotToDotPicture): string {
  const safeTitle = picture.title.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const dots = picture.points
    .map(
      (p, i) => `
      <circle cx="${p.x}" cy="${p.y}" r="6" fill="#fff" stroke="#4c1d95" stroke-width="2" />
      <text x="${p.x}" y="${p.y - 12}" text-anchor="middle" font-size="14" font-weight="bold" fill="#4c1d95">${i + 1}</text>`,
    )
    .join('');

  return `<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
  <meta charset="UTF-8">
  <title>דף עבודה — נקודה לנקודה — ${safeTitle}</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: Rubik, 'Segoe UI', Arial, sans-serif;
      direction: rtl;
      margin: 0;
      padding: 20px;
      background: #fff;
      color: #1a1a1a;
      text-align: center;
    }
    h1 { font-size: 24px; font-weight: 700; margin: 0 0 16px; color: #4f46e5; }
    svg { width: 100%; max-width: 500px; }
    @media print {
      @page { margin: 12mm; size: A4 portrait; }
      body { padding: 0; }
    }
  </style>
</head>
<body>
  <h1>${picture.emoji} נקודה לנקודה — ${safeTitle}</h1>
  <svg viewBox="${picture.viewBox}">${dots}</svg>
  <script>window.onload = function () { window.print(); };</script>
</body>
</html>`;
}

interface Props {
  picture: DotToDotPicture;
}

export default function DotToDotPrintButton({ picture }: Props) {
  const handlePrint = () => {
    const win = window.open('', '_blank', 'width=800,height=900');
    if (!win) return;
    win.document.write(buildWorksheetHtml(picture));
    win.document.close();
  };

  return (
    <button
      type="button"
      onClick={handlePrint}
      title="הדפס דף עבודה"
      aria-label="הדפס דף עבודה"
      className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-semibold transition-all border-2 bg-white border-purple-300 text-purple-700 hover:bg-purple-50 select-none"
    >
      <Printer className="w-4 h-4" aria-hidden="true" />
      <span>הדפס</span>
    </button>
  );
}
