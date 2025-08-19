import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Export organized utilities
export * from './utils/game';
export * from './utils/speech';
export * from './utils/errorUtils';
