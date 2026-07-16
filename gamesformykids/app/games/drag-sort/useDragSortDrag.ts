'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { useDragSortStore } from './dragSortStore';
import type { DragItem } from './dragSortData';
import { speakHebrew } from '@/lib/utils/speech/speaker';

type DragState = { item: DragItem; x: number; y: number };
type Toast = { text: string; ok: boolean };

export function useDragSortDrag() {
  const { currentLevel, placeItem } = useDragSortStore();

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
        ghostRef.current.style.top = `${e.clientY - 44}px`;
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
        if (ok) speakHebrew(`כָּל הַכָּבוֹד! ${currentDrag.item.label}`);
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

  return { drag, hoverZone, toast, zoneRefs, ghostRef, handlePointerDown };
}
