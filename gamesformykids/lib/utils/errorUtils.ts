/**
 * ===============================================
 * Error Handling Utilities
 * ===============================================
 * 
 * Utilities for clean error handling throughout the app
 */

/**
 * Safely logs errors only in development mode
 */
export function logError(message: string, error?: unknown): void {
  if (process.env.NODE_ENV === 'development') {
    console.error(message, error);
  }
}

/**
 * Safely logs warnings only in development mode
 */
export function logWarning(message: string, data?: unknown): void {
  if (process.env.NODE_ENV === 'development') {
    console.warn(message, data);
  }
}

