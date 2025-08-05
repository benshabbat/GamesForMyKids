/**
 * Utility functions for handling touch events safely
 * These functions provide null-safe access to touch properties
 */

// Touch event helper types
export interface TouchPoint {
  x: number;
  y: number;
}

export interface DragPosition {
  x: number;
  y: number;
}

/**
 * Safely get touch coordinates from a touch event
 */
export function getTouchCoordinates(
  e: TouchEvent,
  rect: DOMRect,
  touchIndex: number = 0
): TouchPoint | null {
  const touch = e.touches[touchIndex];
  if (!touch) return null;

  return {
    x: touch.clientX - rect.left,
    y: touch.clientY - rect.top,
  };
}

/**
 * Safely get touch coordinates for drag position
 */
export function getTouchDragPosition(
  e: TouchEvent,
  touchIndex: number = 0
): DragPosition | null {
  const touch = e.touches[touchIndex];
  if (!touch) return null;

  return {
    x: touch.clientX,
    y: touch.clientY,
  };
}

/**
 * Safely get changed touch coordinates
 */
export function getChangedTouchCoordinates(
  e: TouchEvent,
  touchIndex: number = 0
): TouchPoint | null {
  const touch = e.changedTouches[touchIndex];
  if (!touch) return null;

  return {
    x: touch.clientX,
    y: touch.clientY,
  };
}

/**
 * Safely get changed touch coordinates with rect offset
 */
export function getChangedTouchWithRect(
  e: TouchEvent,
  rect: DOMRect,
  touchIndex: number = 0
): TouchPoint | null {
  const touch = e.changedTouches[touchIndex];
  if (!touch) return null;

  return {
    x: touch.clientX - rect.left,
    y: touch.clientY - rect.top,
  };
}

/**
 * Get element from touch point
 */
export function getElementFromTouch(
  e: TouchEvent,
  touchIndex: number = 0
): Element | null {
  const touch = e.touches[touchIndex];
  if (!touch) return null;

  return document.elementFromPoint(touch.clientX, touch.clientY);
}

/**
 * Get element from changed touch point
 */
export function getElementFromChangedTouch(
  e: TouchEvent,
  touchIndex: number = 0
): Element | null {
  const touch = e.changedTouches[touchIndex];
  if (!touch) return null;

  return document.elementFromPoint(touch.clientX, touch.clientY);
}

/**
 * Convert touch event to mouse-like coordinates
 */
export function touchToCanvasCoordinates(
  e: TouchEvent,
  canvas: HTMLCanvasElement,
  touchIndex: number = 0
): TouchPoint | null {
  const touch = e.touches[touchIndex];
  if (!touch) return null;

  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  return {
    x: (touch.clientX - rect.left) * scaleX,
    y: (touch.clientY - rect.top) * scaleY,
  };
}

/**
 * Check if touch event has valid touch data
 */
export function hasValidTouch(e: TouchEvent, touchIndex: number = 0): boolean {
  return e.touches && e.touches[touchIndex] !== undefined;
}

/**
 * Check if touch event has valid changed touch data
 */
export function hasValidChangedTouch(e: TouchEvent, touchIndex: number = 0): boolean {
  return e.changedTouches && e.changedTouches[touchIndex] !== undefined;
}
