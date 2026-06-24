"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  getNextGameInCategory,
  getPrevGameInCategory,
  type NextGameInfo,
} from "@/lib/utils/game/getNextGameInCategory";

const SWIPE_THRESHOLD = 60;   // px horizontal movement required
const SWIPE_MAX_VERT = 120;   // max vertical movement to still count as a swipe
const HINT_DURATION  = 4000;  // ms to show the hint arrow on first visit

function useFirstVisit() {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const k = "gfk_swipe_hint_seen";
    if (!localStorage.getItem(k)) {
      setSeen(true);
      localStorage.setItem(k, "1");
    }
  }, []);
  return seen;
}

export default function SwipeNavigator() {
  const router = useRouter();
  const params = useParams<{ gameType?: string }>();
  const gameType = params.gameType ?? "";

  const next = getNextGameInCategory(gameType);
  const prev = getPrevGameInCategory(gameType);

  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const [hint, setHint] = useState<null | "next" | "prev">(null);
  const isFirstVisit = useFirstVisit();

  // Show a brief arrow hint on first visit
  useEffect(() => {
    if (!isFirstVisit || !next) return;
    setHint("next");
    const t = setTimeout(() => setHint(null), HINT_DURATION);
    return () => clearTimeout(t);
  }, [isFirstVisit, next]);

  const navigate = useCallback(
    (info: NextGameInfo) => {
      router.push(info.href);
    },
    [router],
  );

  useEffect(() => {
    function onTouchStart(e: TouchEvent) {
      const t = e.touches[0];
      if (!t) return;
      touchStart.current = { x: t.clientX, y: t.clientY };
    }
    function onTouchEnd(e: TouchEvent) {
      if (!touchStart.current) return;
      const touch = e.changedTouches[0];
      if (!touch) return;
      const dx = touch.clientX - touchStart.current.x;
      const dy = Math.abs(touch.clientY - touchStart.current.y);
      touchStart.current = null;
      if (dy > SWIPE_MAX_VERT) return; // too vertical
      if (Math.abs(dx) < SWIPE_THRESHOLD) return; // too short
      // RTL: swipe right (dx > 0) = forward = next game
      if (dx > 0 && next) navigate(next);
      if (dx < 0 && prev) navigate(prev);
    }
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [next, prev, navigate]);

  if (!hint) return null;

  const hintGame = hint === "next" ? next : prev;
  if (!hintGame) return null;

  return (
    <div
      className="fixed bottom-24 inset-x-0 flex justify-center pointer-events-none z-40 animate-pulse"
      aria-hidden
    >
      <div className="bg-black/60 text-white rounded-2xl px-4 py-2 text-sm flex items-center gap-2">
        <span>←</span>
        <span>החלק ימינה: {hintGame.emoji} {hintGame.title}</span>
        <span>→</span>
      </div>
    </div>
  );
}
