/**
 * Next.js instrumentation file — loaded once per server process startup.
 *
 * `register()` initialises Sentry for the correct runtime so error reports
 * include server-component stack traces and request context.
 *
 * `onRequestError()` feeds unhandled request errors directly to Sentry with
 * the route type and path — richer than the Webpack wrapper alone.
 *
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config');
  }
  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config');
  }
}

export async function onRequestError(
  err: unknown,
  request: { path: string; method: string; headers: Record<string, string | string[] | undefined> },
  context: { routerKind: string; routePath: string; routeType: string },
) {
  const { captureRequestError } = await import('@sentry/nextjs');
  await captureRequestError(err, request, context);
}
