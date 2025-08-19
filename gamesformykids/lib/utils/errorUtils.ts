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

/**
 * Safely logs info only in development mode
 */
export function logInfo(message: string, data?: unknown): void {
  if (process.env.NODE_ENV === 'development') {
    console.log(message, data);
  }
}

/**
 * Extracts error message from unknown error
 */
export function getErrorMessage(error: unknown, fallback = 'שגיאה לא ידועה'): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return fallback;
}

/**
 * Safe async wrapper that doesn't throw
 */
export async function safeAsync<T>(
  asyncFn: () => Promise<T>,
  fallback: T
): Promise<T> {
  try {
    return await asyncFn();
  } catch (error) {
    logError('Safe async operation failed:', error);
    return fallback;
  }
}
