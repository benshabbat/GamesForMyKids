import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Next.js 15 Enhanced Utility Functions
 * Modern utilities for performance, accessibility, and developer experience
 */

// ========================================
// CSS & Styling Utilities
// ========================================

/**
 * Utility function to merge Tailwind CSS classes with clsx
 * Handles conflicts between classes intelligently
 * Enhanced for Next.js 15 with better TypeScript support
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generate responsive class names based on breakpoints
 */
export function responsive(base: string, sm?: string, md?: string, lg?: string, xl?: string) {
  return cn(
    base,
    sm && `sm:${sm}`,
    md && `md:${md}`,
    lg && `lg:${lg}`,
    xl && `xl:${xl}`
  );
}

/**
 * Create CSS variable based class names
 */
export function cssVar(property: string, value: string | number) {
  return { [`--${property}`]: value } as React.CSSProperties;
}

// ========================================
// Performance Utilities
// ========================================

/**
 * Sleep utility for creating delays
 * Enhanced with AbortController support for cancellation
 */
export function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException('Aborted', 'AbortError'));
      return;
    }
    
    const timeout = setTimeout(resolve, ms);
    
    signal?.addEventListener('abort', () => {
      clearTimeout(timeout);
      reject(new DOMException('Aborted', 'AbortError'));
    });
  });
}

/**
 * Enhanced debounce utility with immediate execution option
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number,
  immediate = false
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return (...args: Parameters<T>) => {
    const callNow = immediate && !timeout;
    
    if (timeout) clearTimeout(timeout);
    
    timeout = setTimeout(() => {
      timeout = null;
      if (!immediate) func(...args);
    }, wait);
    
    if (callNow) func(...args);
  };
}

/**
 * Throttle utility to limit function execution rate
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Request animation frame utility with fallback
 */
export function raf(callback: () => void): number {
  if (typeof requestAnimationFrame !== 'undefined') {
    return requestAnimationFrame(callback);
  }
  return setTimeout(callback, 16) as unknown as number;
}

// ========================================
// Array & Object Utilities
// ========================================

/**
 * Shuffle array utility using Fisher-Yates algorithm
 * Enhanced for immutability and TypeScript
 */
export function shuffle<T>(array: readonly T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Get random item from array
 */
export function randomItem<T>(array: readonly T[]): T | undefined {
  if (array.length === 0) return undefined;
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Create array of specified length with fill value or generator
 */
export function createArray<T>(
  length: number, 
  fillValue?: T | ((index: number) => T)
): T[] {
  return Array.from({ length }, (_, i) => 
    typeof fillValue === 'function' 
      ? (fillValue as (index: number) => T)(i)
      : fillValue as T
  );
}

/**
 * Deep clone utility for simple objects
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T;
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as unknown as T;
  if (typeof obj === 'object') {
    const clonedObj = {} as T;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
  return obj;
}

// ========================================
// Validation Utilities
// ========================================

/**
 * Check if value is defined and not null
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Check if string is not empty
 */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

/**
 * Safe number parsing with fallback
 */
export function safeParseInt(value: string | number, fallback = 0): number {
  if (typeof value === 'number') return Math.floor(value);
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? fallback : parsed;
}

// ========================================
// Browser & Environment Utilities
// ========================================

/**
 * Check if code is running in browser
 */
export const isBrowser = typeof window !== 'undefined';

/**
 * Check if browser supports given feature
 */
export function supportsFeature(feature: string): boolean {
  if (!isBrowser) return false;
  
  switch (feature) {
    case 'localStorage':
      try {
        const test = '__test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
      } catch {
        return false;
      }
    case 'serviceWorker':
      return 'serviceWorker' in navigator;
    case 'webp':
      const canvas = document.createElement('canvas');
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    case 'touchscreen':
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    case 'reducedMotion':
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    default:
      return false;
  }
}

/**
 * Get viewport dimensions
 */
export function getViewportSize() {
  if (!isBrowser) return { width: 0, height: 0 };
  
  return {
    width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
    height: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0),
  };
}

// ========================================
// Accessibility Utilities
// ========================================

/**
 * Announce to screen readers
 */
export function announceToScreenReader(message: string) {
  if (!isBrowser) return;
  
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.setAttribute('class', 'sr-only');
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

/**
 * Focus management utility
 */
export function focusElement(selector: string, delay = 0) {
  if (!isBrowser) return;
  
  setTimeout(() => {
    const element = document.querySelector(selector) as HTMLElement;
    if (element && typeof element.focus === 'function') {
      element.focus();
    }
  }, delay);
}

/**
 * Trap focus within element
 */
export function trapFocus(element: HTMLElement) {
  const focusableElements = element.querySelectorAll(
    'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
  );
  
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
  
  const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  };
  
  element.addEventListener('keydown', handleKeydown);
  
  return () => {
    element.removeEventListener('keydown', handleKeydown);
  };
}

// ========================================
// Game-Specific Utilities
// ========================================

/**
 * Generate unique game session ID
 */
export function generateSessionId(): string {
  return `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Calculate game score with bonuses
 */
export function calculateScore(
  baseScore: number, 
  timeBonus = 0, 
  streakBonus = 0, 
  perfectBonus = 0
): number {
  return Math.max(0, Math.floor(baseScore + timeBonus + streakBonus + perfectBonus));
}

/**
 * Format time for display (MM:SS)
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Generate difficulty-appropriate content
 */
export function getDifficultyMultiplier(difficulty: 'easy' | 'medium' | 'hard'): number {
  switch (difficulty) {
    case 'easy': return 0.8;
    case 'medium': return 1.0;
    case 'hard': return 1.3;
    default: return 1.0;
  }
}

// ========================================
// Error Handling Utilities
// ========================================

/**
 * Safe async operation with error handling
 */
export async function safeAsync<T>(
  operation: () => Promise<T>,
  fallback?: T
): Promise<T | undefined> {
  try {
    return await operation();
  } catch (error) {
    console.error('Safe async operation failed:', error);
    return fallback;
  }
}

/**
 * Retry operation with exponential backoff
 */
export async function retryOperation<T>(
  operation: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;
      
      if (i < maxRetries) {
        await sleep(delay * Math.pow(2, i));
      }
    }
  }
  
  throw lastError!;
}
