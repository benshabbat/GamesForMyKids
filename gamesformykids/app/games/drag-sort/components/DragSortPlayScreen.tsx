import type { DragLevel, DragItem } from '../dragSortData';
import type { ItemState } from '../dragSortStore';

type DragState = { item: DragItem; x: number; y: number };
type Toast = { text: string; ok: boolean };

export function DragSortPlayScreen({
  currentLevel, itemStates, score,
  drag, hoverZone, toast, zoneRefs, ghostRef, onPointerDown,
}: {
  currentLevel: DragLevel;
  itemStates: Record<string, ItemState>;
  score: number;
  drag: DragState | null;
  hoverZone: string | null;
  toast: Toast | null;
  zoneRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
  ghostRef: React.RefObject<HTMLDivElement | null>;
  onPointerDown: (e: React.PointerEvent<HTMLDivElement>, item: DragItem) => void;
}) {
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
              onPointerDown={e => onPointerDown(e, item)}
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
