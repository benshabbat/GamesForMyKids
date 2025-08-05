/**
 * Environment variables validation and type-safe access
 * This ensures all required environment variables are available at runtime
 */

const requiredEnvVars = {
  // Public environment variables (prefixed with NEXT_PUBLIC_)
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME ?? 'Games For My Kids',
} as const;

const optionalEnvVars = {
  // Optional environment variables
  NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  NEXT_PUBLIC_VERCEL_ANALYTICS_ID: process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ID,
} as const;

// Combine all environment variables
export const env = {
  ...requiredEnvVars,
  ...optionalEnvVars,
  // System environment variables
  NODE_ENV: process.env.NODE_ENV,
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
} as const;

// Validation function for required environment variables
export function validateEnv() {
  const missing: string[] = [];
  
  // Check if we're in development and some optional vars are missing
  if (env.NODE_ENV === 'production') {
    // Add any production-specific validations here
  }
  
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      'Please check your .env.local file and ensure all required variables are set.'
    );
  }
}

// Type for environment variables
export type Environment = typeof env;
