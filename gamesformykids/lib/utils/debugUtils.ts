/**
 * Debug utilities for production optimization
 */

const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Console log that only works in development
 */
export const debugLog = isDevelopment 
  ? console.log.bind(console)
  : () => {};

/**
 * Console warn that only works in development
 */
export const debugWarn = isDevelopment 
  ? console.warn.bind(console)
  : () => {};

/**
 * Console error (always works)
 */
export const debugError = console.error.bind(console);

/**
 * Performance measurement wrapper
 */
export const measurePerformance = <T>(
  label: string,
  fn: () => T
): T => {
  if (!isDevelopment) {
    return fn();
  }
  
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  
  debugLog(`[Performance] ${label}: ${end - start}ms`);
  return result;
};

/**
 * Async performance measurement wrapper
 */
export const measurePerformanceAsync = async <T>(
  label: string,
  fn: () => Promise<T>
): Promise<T> => {
  if (!isDevelopment) {
    return fn();
  }
  
  const start = performance.now();
  const result = await fn();
  const end = performance.now();
  
  debugLog(`[Performance] ${label}: ${end - start}ms`);
  return result;
};
