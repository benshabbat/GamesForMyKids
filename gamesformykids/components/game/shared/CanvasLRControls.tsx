'use client';

import React from 'react';

interface CenterAction {
  label: React.ReactNode;
  onAction: () => void;
  className?: string;
}

interface CanvasLRControlsProps {
  onLeft: () => void;
  onRight: () => void;
  onLeftRelease?: () => void;
  onRightRelease?: () => void;
  center?: CenterAction;
  buttonClass?: string;
  mt?: string;
  gap?: string;
}

export function CanvasLRControls({
  onLeft,
  onRight,
  onLeftRelease,
  onRightRelease,
  center,
  buttonClass = "bg-violet-700/80 text-white rounded-xl px-8 py-3 text-xl font-bold active:bg-violet-500 touch-none",
  mt = "mt-3",
  gap = "gap-4",
}: CanvasLRControlsProps) {
  return (
    <div className={`${mt} flex ${gap}`}>
      <button
        onPointerDown={onLeft}
        onPointerUp={onLeftRelease}
        onPointerLeave={onLeftRelease}
        className={buttonClass}
      >◄</button>
      {center && (
        <button
          onPointerDown={center.onAction}
          className={center.className ?? "bg-white/20 text-white rounded-xl px-6 py-3 text-sm font-bold active:bg-white/40 touch-none"}
        >{center.label}</button>
      )}
      <button
        onPointerDown={onRight}
        onPointerUp={onRightRelease}
        onPointerLeave={onRightRelease}
        className={buttonClass}
      >▶</button>
    </div>
  );
}
