'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useDragSortStore } from './dragSortStore';
import { DRAG_LEVELS, type DragItem } from './dragSortData';
import { speakHebrew } from '@/lib/utils/speech/speaker';

type DragState = { item: DragItem; x: number; y: number };
type Toast = { text: string; ok: boolean };

// ─── Menu ─────────────────────────────────────────────────────────────────────

function MenuScreen({ onStart }: { onStart: (i: number) => void }) {
  return (
    <div
      dir="rtl"
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ background: 'linear-gradient(135deg, #a78bfa 0%, #f472b6 100%)' }}
    >
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center">
        <div className="text-6xl mb-3">🗂️</div>
        <h1 className="text-3xl font-black text-purple-800 mb-1">מיון גרירה</h1>
        <p className="text-gray-500 text-sm mb-6">גרור כל פריט לקטגוריה הנכונה!</p>
        <div className="flex flex-col gap-3">
          {DRAG_LEVELS.map((level, i) => (
            <button
              key={level.id}
              onClick={() => onStart(i)}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all active:scale-95"
            >
              {i + 1}. {level.title}
            </button>
          ))}
        </div>
        <Link href="/" className="mt-5 inline-block text-sm text-gray-400 hover:text-gray-600">
          ← חזרה לבית
        </Link>
      </div>
    </div>
  );
}

// ─── Result ───────────────────────────────────────────────────────────────────

function ResultScreen({
  score, total, errors, levelIndex,
  onRestart, onNext, onMenu,
}: {
  score: number; total: number; errors: number; levelIndex: number;
  onRestart: () => void; onNext: () => void; onMenu: () => void;
}) {
  const perfect = errors === 0;
  const hasNext = levelIndex < DRAG_LEVELS.length - 1;
  return (
    <div
      dir="rtl"
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ background: 'linear-gradient(135deg, #a78bfa 0%, #f472b6 100%)' }}
    >
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center">
        <div className="text-6xl mb-2">{perfect ? '🏆' : '🎉'}</div>
        <h2 className="text-2xl font-black text-purple-800 mb-4">
          {perfect ? 'מושלם!' : 'כל הכבוד!'}
        </h2>
        <div className="bg-purple-50 rounded-2xl p-4 grid grid-cols-3 gap-3 mb-5">
          <div>
            <div className="text-2xl font-black text-purple-700">{score}</div>
            <div className="text-xs text-gray-500">נכון</div>
          </div>
          <div>
            <div className="text-2xl font-black text-gray-600">{total}</div>
            <div className="text-xs text-gray-500">סה&quot;כ</div>
          </div>
          <div>
            <div className="text-2xl font-black text-red-500">{errors}</div>
            <div className="text-xs text-gray-500">שגיאות</div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {hasNext && (
            <button
              onClick={onNext}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 rounded-xl transition-all active:scale-95"
            >
              ➡️ רמה הבאה
            </button>
          )}
          <button
            onClick={onRestart}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-all"
          >
            🔄 שחק שוב
          </button>
          <button
            onClick={onMenu}
            className="bg-gray-50 hover:bg-gray-100 text-gray-500 font-semibold py-2 rounded-xl transition-all text-sm"
          >
            ← תפריט
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Playing ──────────────────────────────────────────────────────────────────

export default function DragSortClient() {
  const {
    phase, currentLevel, itemStates, score, errors, levelIndex,
    startLevel, placeItem, restart, goToMenu,
  } = useDragSortStore();

  const [drag, setDrag] = useState<DragState | null>(null);
  const [hoverZone, setHoverZone] = useState<string | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);

  const dragRef = useRef<DragState | null>(null);
  const hoverZoneRef = useRef<string | null>(null);
  const zoneRefs = useRef<Record<string, HTMLElement | null>>({});
  const ghostRef = useRef<HTMLDivElement>(null);

  // Keep refs in sync
  useEffect(() => { dragRef.current = drag; }, [drag]);
  useEffect(() => { hoverZoneRef.current = hoverZone; }, [hoverZone]);

  const showToast = useCallback((text: string, ok: boolean) => {
    setToast({ text, ok });
    setTimeout(() => setToast(null), 1000);
  }, []);

  // Document-level pointer listeners while dragging
  useEffect(() => {
    if (!drag) return;

    const findZone = (x: number, y: number): string | null =>
      Object.entries(zoneRefs.current).find(([, el]) => {
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
      })?.[0] ?? null;

    const onMove = (e: PointerEvent) => {
      // Update ghost directly (no re-render)
      if (ghostRef.current) {
        ghostRef.current.style.left = `${e.clientX - 44}px`;
        ghostRef.current.style.top  = `${e.clientY - 44}px`;
      }
      const zone = findZone(e.clientX, e.clientY);
      if (zone !== hoverZoneRef.current) {
        hoverZoneRef.current = zone;
        setHoverZone(zone);
      }
    };

    const onUp = (e: PointerEvent) => {
      const currentDrag = dragRef.current;
      if (!currentDrag) { setDrag(null); return; }
      const zone = findZone(e.clientX, e.clientY);
      if (zone) {
        const ok = placeItem(currentDrag.item.id, zone);
        const cat = currentLevel?.categories.find(c => c.id === zone);
        showToast(ok ? `✅ ${currentDrag.item.label} — ${cat?.label}!` : '❌ נסה שוב!', ok);
        if (ok) speakHebrew(`כל הכבוד! ${currentDrag.item.label}`);
      }
      setDrag(null);
      hoverZoneRef.current = null;
      setHoverZone(null);
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerup', onUp);
    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drag?.item.id]);

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>, item: DragItem) => {
    e.preventDefault();
    speakHebrew(item.label);
    setDrag({ item, x: e.clientX - 44, y: e.clientY - 44 });
  }, []);

  if (phase === 'menu') return <MenuScreen onStart={startLevel} />;

  if (phase === 'result') {
    return (
      <ResultScreen
        score={score}
        total={currentLevel?.items.length ?? 0}
        errors={errors}
        levelIndex={levelIndex}
        onRestart={restart}
        onNext={() => startLevel(levelIndex + 1)}
        onMenu={goToMenu}
      />
    );
  }

  if (!currentLevel) return null;

  const unplaced = currentLevel.items.filter(i => !itemStates[i.id]?.placed);
  const catCols = currentLevel.categories.length <= 3 ? `grid-cols-${currentLevel.categories.length}` : 'grid-cols-2 md:grid-cols-4';

  return (
    <div dir="rtl" className="min-h-screen flex flex-col select-none" style={{ background: 'linear-gradient(135deg, #ede9fe 0%, #fce7f3 100%)' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur">
        <span className="text-lg font-black text-purple-700">🗂️ {currentLevel.title}</span>
        <span className="text-sm font-semibold text-gray-500">✅ {score} / {currentLevel.items.length}</span>
      </div>

      {/* Toast feedback */}
      {toast && (
        <div className={`fixed top-16 left-1/2 -translate-x-1/2 z-50 px-5 py-2 rounded-full text-white font-bold text-sm shadow-lg transition-all ${toast.ok ? 'bg-green-500' : 'bg-red-400'}`}>
          {toast.text}
        </div>
      )}

      {/* Category zones */}
      <div className={`grid ${catCols} gap-3 p-3`}>
        {currentLevel.categories.map(cat => {
          const placedHere = currentLevel.items.filter(i => itemStates[i.id]?.placed && i.categoryId === cat.id);
          const isHover = hoverZone === cat.id;
          return (
            <div
              key={cat.id}
              ref={el => { zoneRefs.current[cat.id] = el; }}
              className={`rounded-2xl border-4 p-3 min-h-28 transition-all duration-150 ${cat.bg} ${isHover ? `${cat.border} scale-105 shadow-lg` : 'border-transparent'}`}
            >
              <div className="flex items-center gap-1 mb-2">
                <span className="text-xl">{cat.emoji}</span>
                <span className={`text-xs font-black ${cat.text}`}>{cat.label}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {placedHere.map(i => (
                  <span key={i.id} className="text-2xl leading-none animate-bounce" style={{ animationDuration: '0.4s', animationIterationCount: 1 }}>
                    {i.emoji}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Items to sort */}
      <div className="flex-1 p-3">
        <p className="text-xs text-gray-500 text-center mb-3 font-medium">גרור כל פריט לקטגוריה הנכונה</p>
        <div className="flex flex-wrap gap-3 justify-center">
          {unplaced.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md p-3 text-center w-20 cursor-grab active:cursor-grabbing"
              style={{ touchAction: 'none', userSelect: 'none' }}
              onPointerDown={e => handlePointerDown(e, item)}
            >
              <div className="text-3xl leading-none mb-1">{item.emoji}</div>
              <div className="text-xs font-bold text-gray-600 leading-tight">{item.label}</div>
            </div>
          ))}
          {unplaced.length === 0 && (
            <p className="text-gray-400 text-sm mt-4">כל הפריטים מוינו! 🎉</p>
          )}
        </div>
      </div>

      {/* Floating ghost */}
      {drag && (
        <div
          ref={ghostRef}
          className="fixed z-50 pointer-events-none bg-white rounded-2xl shadow-2xl p-3 text-center w-22"
          style={{ left: drag.x, top: drag.y, width: 88, opacity: 0.95, transform: 'scale(1.1)' }}
        >
          <div className="text-3xl leading-none mb-1">{drag.item.emoji}</div>
          <div className="text-xs font-bold text-gray-600 leading-tight">{drag.item.label}</div>
        </div>
      )}
    </div>
  );
}
