'use client';

import React from 'react';

interface CanvasDPadControlsProps {
  onUp: () => void;
  onDown: () => void;
  onLeft: () => void;
  onRight: () => void;
  buttonClass?: string;
  mt?: string;
  style?: React.CSSProperties;
}

export function CanvasDPadControls({
  onUp,
  onDown,
  onLeft,
  onRight,
  buttonClass = "bg-green-700/80 text-white rounded-xl py-3 text-xl font-bold active:bg-green-500 touch-none",
  mt = "mt-3",
  style = { width: 164 },
}: CanvasDPadControlsProps) {
  return (
    <div className={`${mt} grid grid-cols-3 gap-2`} style={style}>
      <div />
      <button onPointerDown={onUp} className={buttonClass}>▲</button>
      <div />
      <button onPointerDown={onLeft} className={buttonClass}>◀</button>
      <button onPointerDown={onDown} className={buttonClass}>▼</button>
      <button onPointerDown={onRight} className={buttonClass}>▶</button>
    </div>
  );
}
