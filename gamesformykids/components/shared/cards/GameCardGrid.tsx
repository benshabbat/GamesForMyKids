'use client';

import { useState, useCallback, useRef } from 'react';
import { ComponentTypes } from "@/lib/types";
import { useGridFillers } from "@/hooks";

type GameItemType = ComponentTypes.GameItemType;
type GameCardGridProps<T extends GameItemType> = ComponentTypes.GameCardGridProps<T>;

export function GameCardGrid<T extends GameItemType>({
  items,
  onItemClick: propOnItemClick,
  currentChallenge,
  gridCols = "grid-cols-2 md:grid-cols-3",
  maxWidth = "max-w-3xl",
  gap = "gap-6",
  showSoundIcon = false,
  compareKey = 'name' as keyof T,
  renderCustomCard,
  cardClassName = "",
  focusedIdx,
}: GameCardGridProps<T>) {
  const fillerCount = useGridFillers(
    items.length,
    typeof gridCols === 'string' ? gridCols : { mobile: gridCols, tablet: gridCols, desktop: gridCols }
  );

  const [shakeKey, setShakeKey] = useState<string | null>(null);
  const [tooltipKey, setTooltipKey] = useState<string | null>(null);
  const longPressRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getTooltipHandlers = useCallback((key: string) => ({
    onMouseEnter: () => { hoverRef.current = setTimeout(() => setTooltipKey(key), 200); },
    onMouseLeave: () => { if (hoverRef.current) clearTimeout(hoverRef.current); setTooltipKey(null); },
    onTouchStart: () => { longPressRef.current = setTimeout(() => setTooltipKey(key), 500); },
    onTouchEnd: () => { if (longPressRef.current) clearTimeout(longPressRef.current); setTooltipKey(null); },
    onTouchMove: () => { if (longPressRef.current) clearTimeout(longPressRef.current); setTooltipKey(null); },
  }), []);

  const handleItemClick = useCallback((item: T) => {
    if (!propOnItemClick) return;
    propOnItemClick(item);
    const isCorrect = currentChallenge != null && (
      typeof item === 'object' && item !== null && typeof currentChallenge === 'object' && currentChallenge !== null &&
      compareKey in item && compareKey in currentChallenge
        ? item[compareKey] === currentChallenge[compareKey]
        : item === currentChallenge
    );
    if (!isCorrect) {
      const key = typeof item === 'object' && item !== null && 'name' in item
        ? String(item.name)
        : typeof item === 'object' && item !== null && compareKey in item
          ? String(item[compareKey])
          : String(item);
      setShakeKey(key);
      setTimeout(() => setShakeKey(null), 550);
    }
  }, [propOnItemClick, currentChallenge, compareKey]);

  const isCurrentItem = (item: T, challenge?: T | null): boolean => {
    if (!challenge) return false;
    if (typeof item === 'object' && item !== null && typeof challenge === 'object' && challenge !== null) {
      if (compareKey in item && compareKey in challenge) {
        return item[compareKey] === challenge[compareKey];
      }
    }
    return item === challenge;
  };

  const getItemKey = (item: T): string => {
    if (typeof item === 'object' && item !== null && 'name' in item) return String(item.name);
    if (typeof item === 'object' && item !== null && compareKey in item) return String(item[compareKey]);
    return String(item);
  };

  return (
    <div className={`grid ${gridCols} ${gap} ${maxWidth} mx-auto`}>
      {items.map((item, idx) => {
        const isCorrect = isCurrentItem(item, currentChallenge);
        const isFocused = typeof focusedIdx === 'number' && focusedIdx === idx;

        const itemKey = getItemKey(item);
        const itemObj = item as unknown as Record<string, unknown>;
        const hasEnglish = typeof item === 'object' && item !== null && 'english' in item;
        const englishLabel = hasEnglish ? String(itemObj.english) : null;
        const funFact = hasEnglish && 'funFact' in item ? String(itemObj.funFact) : null;

        return (
          <div
            key={itemKey}
            className={`relative ${isFocused ? 'ring-4 ring-blue-400 ring-offset-2 rounded-3xl' : ''}`}
            {...(englishLabel ? getTooltipHandlers(itemKey) : {})}
          >
            {tooltipKey === itemKey && englishLabel && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-20 pointer-events-none" dir="ltr">
                <div className="bg-gray-900 text-white text-sm rounded-lg px-3 py-1.5 text-center shadow-lg whitespace-nowrap">
                  <div className="font-semibold">{englishLabel}</div>
                  {funFact && <div className="text-xs text-gray-300 mt-0.5">{funFact}</div>}
                </div>
                <div className="w-2 h-2 bg-gray-900 rotate-45 mx-auto -mt-1" />
              </div>
            )}
            {renderCustomCard ? (
              renderCustomCard(item, isCorrect)
            ) : (
              <div
                onClick={() => handleItemClick(item)}
                className={`
                  aspect-square rounded-3xl cursor-pointer transition-[transform,box-shadow]
                  duration-300 hover:scale-110 shadow-xl hover:shadow-2xl
                  bg-linear-to-br from-gray-400 to-gray-600
                  border-8 border-white
                  ${isCorrect ? "ring-4 ring-green-400 ring-offset-4" : ""}
                  ${shakeKey === getItemKey(item) ? "animate-shake" : ""}
                  ${cardClassName}
                `}
              >
                <div className="w-full h-full flex flex-col items-center justify-center text-white">
                  {'hebrew' in item && (
                    <div className="text-4xl md:text-6xl font-bold mb-2">
                      {String(item.hebrew)}
                    </div>
                  )}
                  {'english' in item && (
                    <div className="text-lg md:text-xl font-semibold">
                      {String(item.english)}
                    </div>
                  )}
                  {'digit' in item && (
                    <div className="text-6xl md:text-8xl font-bold mb-2">
                      {String(item.digit)}
                    </div>
                  )}
                  {showSoundIcon && (
                    <div className="mt-2 opacity-70">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 mx-auto">
                        <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
      {Array.from({ length: fillerCount }).map((_, i) => (
        <div key={`filler-${i}`} aria-hidden="true" className="invisible" />
      ))}
    </div>
  );
}
