'use client';
import { useRef, useState, type ChangeEvent, type MouseEvent } from 'react';
import Image from 'next/image';
import { Upload, Wand2 } from 'lucide-react';
import { DOT_TO_DOT_THEMES } from '../data/pictures';
import type { DotPoint, DotToDotTheme } from '../types';
import { buildSilhouetteMask, resampleClosedPolygon, scaleToViewBox, simplifyPolygon, traceOuterContour } from './contourTrace';

const VIEW_SIZE = 300;
const DISPLAY_WIDTH = 500;
const MAX_WORKING_DIMENSION = 500;
const MIN_DOTS = 8;
const MAX_DOTS = 60;
const DEFAULT_DOTS = 20;
const SIMPLIFY_EPSILON_RATIO = 0.03;

function buildPictureCode(opts: {
  id: string;
  title: string;
  emoji: string;
  theme: DotToDotTheme;
  closed: boolean;
  points: DotPoint[];
}): string {
  const { id, title, emoji, theme, closed, points } = opts;
  const pointsStr = points.map((p) => `{ x: ${p.x}, y: ${p.y} }`).join(', ');
  return `{
    id: '${id || 'my-picture'}',
    title: '${title}',
    emoji: '${emoji}',
    theme: '${theme}',
    viewBox: '0 0 300 300',
    closed: ${closed},
    imageSrc: '/images/dot-to-dot/${id || 'my-picture'}.png',
    points: [${pointsStr}],
  },`;
}

export default function DotToDotEditorClient() {
  const inputRef = useRef<HTMLInputElement>(null);
  const imgElRef = useRef<HTMLImageElement | null>(null);
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [points, setPoints] = useState<DotPoint[]>([]);
  const [closed, setClosed] = useState(true);
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [emoji, setEmoji] = useState('');
  const [theme, setTheme] = useState<DotToDotTheme>('animals');
  const [copied, setCopied] = useState(false);

  const [rawContour, setRawContour] = useState<DotPoint[] | null>(null);
  const [rawSize, setRawSize] = useState<{ width: number; height: number } | null>(null);
  const [dotCount, setDotCount] = useState(DEFAULT_DOTS);
  const [isDetecting, setIsDetecting] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      const img = new window.Image();
      img.onload = () => {
        imgElRef.current = img;
        setImageDataUrl(dataUrl);
        setPoints([]);
        setRawContour(null);
        setRawSize(null);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleImageClick = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;
    const x = Math.round(relX * VIEW_SIZE);
    const y = Math.round(relY * VIEW_SIZE);
    setPoints((prev) => [...prev, { x, y }]);
  };

  const applyDotCount = (contour: DotPoint[], size: { width: number; height: number }, count: number) => {
    const resampled = resampleClosedPolygon(contour, count);
    setPoints(scaleToViewBox(resampled, size.width, size.height));
  };

  const handleAutoDetect = () => {
    const img = imgElRef.current;
    if (!img) return;
    setIsDetecting(true);
    try {
      const scale = Math.min(1, MAX_WORKING_DIMENSION / Math.max(img.naturalWidth, img.naturalHeight));
      const workW = Math.max(1, Math.round(img.naturalWidth * scale));
      const workH = Math.max(1, Math.round(img.naturalHeight * scale));
      const canvas = document.createElement('canvas');
      canvas.width = workW;
      canvas.height = workH;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, workW, workH);
      const imageData = ctx.getImageData(0, 0, workW, workH);
      const mask = buildSilhouetteMask(imageData);
      const rawTrace = traceOuterContour(mask, workW, workH);
      // Smooth away fine wiggly detail (e.g. a spiral antenna curl) whose
      // perimeter is disproportionately large for its size — otherwise even
      // arc-length resampling "spends" most of the dot budget there instead
      // of the main silhouette.
      const epsilon = Math.max(1, Math.hypot(workW, workH) * SIMPLIFY_EPSILON_RATIO);
      const contour = simplifyPolygon(rawTrace, epsilon);
      const size = { width: workW, height: workH };
      setRawContour(contour);
      setRawSize(size);
      setClosed(true);
      applyDotCount(contour, size, dotCount);
    } finally {
      setIsDetecting(false);
    }
  };

  const handleDotCountChange = (count: number) => {
    setDotCount(count);
    if (rawContour && rawSize) applyDotCount(rawContour, rawSize, count);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(buildPictureCode({ id, title, emoji, theme, closed, points }));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 p-6 flex flex-col items-center gap-6" dir="rtl">
      <h1 className="text-3xl font-black text-white">עורך נקודות — נקודה לנקודה</h1>
      <p className="text-indigo-200 text-sm max-w-md text-center">
        העלו תמונה, לחצו עליה בסדר כדי לסמן נקודות ממוספרות, ואז העתיקו את הקוד המיוצא לתוך <code>pictures.ts</code>.
      </p>

      <input type="file" accept="image/*" onChange={handleFileChange} ref={inputRef} className="hidden" />
      <button
        onClick={() => inputRef.current?.click()}
        className="inline-flex items-center gap-2 rounded-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 shadow-lg transition-transform active:scale-95"
      >
        <Upload className="w-5 h-5" />
        העלה תמונה
      </button>

      {imageDataUrl && (
        <>
          <div
            onClick={handleImageClick}
            className="relative bg-white rounded-2xl shadow-xl overflow-hidden cursor-crosshair"
            style={{ width: DISPLAY_WIDTH, height: DISPLAY_WIDTH }}
          >
            {/* Square, matching the real game board's aspect-square — object-contain
                letterboxes non-square source images exactly as they'll appear in-game,
                so the SVG overlay's 0-300 square viewBox lines up pixel-for-pixel. */}
            <Image src={imageDataUrl} alt="תמונת מקור" fill unoptimized className="object-contain pointer-events-none" />
            <svg viewBox={`0 0 ${VIEW_SIZE} ${VIEW_SIZE}`} className="absolute inset-0 w-full h-full pointer-events-none">
              {points.slice(1).map((p, i) => (
                <line
                  key={i}
                  x1={points[i]!.x} y1={points[i]!.y}
                  x2={p.x} y2={p.y}
                  stroke="#7c3aed" strokeWidth={3} strokeLinecap="round"
                />
              ))}
              {closed && points.length > 2 && (
                <line
                  x1={points[points.length - 1]!.x} y1={points[points.length - 1]!.y}
                  x2={points[0]!.x} y2={points[0]!.y}
                  stroke="#7c3aed" strokeWidth={2} strokeDasharray="6 4"
                />
              )}
              {points.map((p, i) => (
                <g key={i}>
                  <circle cx={p.x} cy={p.y} r={8} fill="#fff" stroke="#7c3aed" strokeWidth={2} />
                  <text x={p.x} y={p.y} textAnchor="middle" dominantBaseline="central" fontSize={10} fontWeight="bold" fill="#4c1d95">
                    {i + 1}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleAutoDetect}
              disabled={isDetecting}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white disabled:opacity-50 transition-all"
            >
              <Wand2 className="w-4 h-4" />
              {isDetecting ? 'מזהה...' : 'זיהוי קווי מתאר אוטומטי'}
            </button>
            <label className="flex items-center gap-2 text-sm text-indigo-200 px-2">
              כמות נקודות: {dotCount}
              <input
                type="range"
                min={MIN_DOTS}
                max={MAX_DOTS}
                value={dotCount}
                onChange={(e) => handleDotCountChange(Number(e.target.value))}
                className="w-32"
              />
            </label>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setPoints((prev) => prev.slice(0, -1))}
              disabled={points.length === 0}
              className="px-4 py-2 rounded-xl text-sm font-semibold bg-white/10 text-indigo-200 hover:bg-white/20 disabled:opacity-40 transition-all"
            >
              ↩️ בטל נקודה אחרונה
            </button>
            <button
              onClick={() => setPoints([])}
              disabled={points.length === 0}
              className="px-4 py-2 rounded-xl text-sm font-semibold bg-white/10 text-indigo-200 hover:bg-white/20 disabled:opacity-40 transition-all"
            >
              🗑️ נקה הכל
            </button>
            <label className="flex items-center gap-2 text-sm text-indigo-200 px-2">
              <input type="checkbox" checked={closed} onChange={(e) => setClosed(e.target.checked)} />
              צורה סגורה
            </label>
            <span className="text-sm text-indigo-300">{points.length} נקודות</span>
            <a
              href={imageDataUrl}
              download={`${id || 'picture'}.png`}
              className="px-4 py-2 rounded-xl text-sm font-semibold bg-white/10 text-indigo-200 hover:bg-white/20 transition-all"
            >
              💾 הורד תמונה (לשמירה ב-public/images/dot-to-dot/)
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-2xl">
            <input
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="id (kebab-case)"
              className="rounded-xl px-3 py-2 text-sm bg-white/90"
            />
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="כותרת בעברית"
              className="rounded-xl px-3 py-2 text-sm bg-white/90"
            />
            <input
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
              placeholder="אימוג'י"
              className="rounded-xl px-3 py-2 text-sm bg-white/90"
            />
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as DotToDotTheme)}
              className="rounded-xl px-3 py-2 text-sm bg-white/90"
            >
              {DOT_TO_DOT_THEMES.map((t) => (
                <option key={t.id} value={t.id}>{t.emoji} {t.title}</option>
              ))}
            </select>
          </div>

          <div className="w-full max-w-2xl flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-indigo-200 font-semibold">קוד מיוצא</span>
              <button
                onClick={handleCopy}
                disabled={points.length === 0}
                className="px-4 py-1.5 rounded-xl text-sm font-semibold bg-yellow-400 hover:bg-yellow-300 text-yellow-900 disabled:opacity-40 transition-all"
              >
                {copied ? '✅ הועתק' : '📋 העתק קוד'}
              </button>
            </div>
            <pre className="bg-black/40 text-indigo-100 text-xs rounded-xl p-4 overflow-x-auto whitespace-pre-wrap" dir="ltr">
              {buildPictureCode({ id, title, emoji, theme, closed, points })}
            </pre>
          </div>
        </>
      )}
    </div>
  );
}
