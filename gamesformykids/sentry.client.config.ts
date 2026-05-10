import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,

  // Capture 10% of traces in production, 100% in dev for debugging
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,

  // Only send errors in production
  enabled: process.env.NODE_ENV === "production",

  // Filter noisy browser errors not actionable for the app
  ignoreErrors: [
    "ResizeObserver loop limit exceeded",
    "ResizeObserver loop completed",
    /^Network Error$/,
    /^Loading chunk \d+ failed/,
    /^ChunkLoadError/,
  ],
});
