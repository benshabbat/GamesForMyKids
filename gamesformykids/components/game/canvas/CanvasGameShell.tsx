'use client';

import { type ReactNode, type RefObject, type CanvasHTMLAttributes } from 'react';
import { useCanvasReady } from '@/hooks/canvas/useCanvasReady';

interface Props {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  width: number;
  height: number;
  /** Full class string for the outer wrapper div */
  className?: string;
  /** Extra classes on the <canvas> element (border, rounded, shadow) */
  canvasClassName?: string;
  /** Extra inline styles merged after touchAction + opacity */
  canvasStyle?: React.CSSProperties;
  /** Any canvas event handlers (onMouseMove, onTouchStart, onClick, …) */
  canvasProps?: CanvasHTMLAttributes<HTMLCanvasElement>;
  /** Rendered above the canvas (score bar, lives, timer) */
  hud?: ReactNode;
  /** Rendered absolutely over the canvas (menu / result overlays) */
  overlays?: ReactNode;
  /** Rendered below the canvas (on-screen touch controls) */
  controls?: ReactNode;
}

export default function CanvasGameShell({
  canvasRef, width, height,
  className = 'min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 flex flex-col items-center justify-center p-4 select-none',
  canvasClassName = '',
  canvasStyle,
  canvasProps,
  hud,
  overlays,
  controls,
}: Props) {
  const ready = useCanvasReady();

  return (
    <div className={className} dir="rtl">
      {hud}

      <div className="relative">
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className={canvasClassName}
          style={{
            touchAction: 'none',
            opacity: ready ? 1 : 0,
            transition: 'opacity 0.2s',
            ...canvasStyle,
          }}
          {...canvasProps}
        />
        {overlays}
      </div>

      {controls}
    </div>
  );
}
