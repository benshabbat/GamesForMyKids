'use client';
import { useRef, useState, type ChangeEvent, type MouseEvent } from 'react';
import type { DotPoint, DotToDotTheme } from '../types';
import { buildPictureCode } from './buildPictureCode';
import { buildSilhouetteMask, resampleClosedPolygon, scaleToViewBox, simplifyPolygon, traceOuterContour } from './contourTrace';
import { DEFAULT_DOTS, MAX_WORKING_DIMENSION, SIMPLIFY_EPSILON_RATIO, VIEW_SIZE } from './editorConstants';

export function useDotToDotEditor() {
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

  return {
    inputRef,
    imageDataUrl,
    points,
    setPoints,
    closed,
    setClosed,
    id,
    setId,
    title,
    setTitle,
    emoji,
    setEmoji,
    theme,
    setTheme,
    copied,
    dotCount,
    isDetecting,
    handleFileChange,
    handleImageClick,
    handleAutoDetect,
    handleDotCountChange,
    handleCopy,
  };
}
