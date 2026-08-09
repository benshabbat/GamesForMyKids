import 'server-only';
import { createHash } from 'node:crypto';
import { createAdminClient } from '@/lib/supabase/adminClient';
import { logError, logWarning } from '@/lib/utils/errorUtils';

/**
 * ===============================================
 * Sliding-window rate limiter for the AI routes
 * ===============================================
 *
 * The Gemini/Imagen routes cost real money per call, so they can't be left
 * open to unbounded traffic. This limiter is backed by a Supabase table rather
 * than an in-process Map because route handlers run on serverless instances —
 * an in-memory counter would reset on every cold start and wouldn't be shared
 * between concurrent instances, which makes it worthless as a spend guard.
 *
 * Signed-in callers are limited per user id; anonymous callers per hashed IP,
 * so the story game stays playable without an account (its whole point) while
 * still being bounded.
 */

const TABLE = 'api_rate_limit_events';

export interface RateLimitRule {
  /** Namespace for the limit, e.g. 'story-agent'. Limits are counted per bucket. */
  bucket: string;
  /** Maximum number of requests allowed inside the window. */
  limit: number;
  /** Sliding window length in seconds. */
  windowSeconds: number;
}

export interface RateLimitResult {
  allowed: boolean;
  /** Seconds the caller should wait before retrying. Only meaningful when `allowed` is false. */
  retryAfterSeconds: number;
}

const ALLOWED: RateLimitResult = { allowed: true, retryAfterSeconds: 0 };

/**
 * Derives a stable, non-reversible identity for the caller.
 *
 * Anonymous callers are keyed on the client IP from the proxy headers, hashed
 * with a server-side salt. Without a salt the hash of an IPv4 address is
 * trivially brute-forced (there are only ~4 billion), so the salt is what
 * actually makes this non-reversible; when it's missing we still hash, but the
 * value is only ever used as a bucket key and never stored anywhere else.
 */
function resolveIdentity(request: Request, userId: string | null): string {
  if (userId) return `user:${userId}`;

  const forwardedFor = request.headers.get('x-forwarded-for');
  // x-forwarded-for is a comma-separated chain; the first entry is the client.
  const ip = forwardedFor?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';

  const salt = process.env.RATE_LIMIT_SALT ?? '';
  const hash = createHash('sha256').update(`${salt}:${ip}`).digest('hex').slice(0, 32);
  return `ip:${hash}`;
}

/**
 * Checks the caller against `rule` and records the request when it's allowed.
 *
 * Fails open. If Supabase isn't configured (local dev, CI, preview builds
 * without a service-role key) or the ledger query errors, the request is let
 * through — a limiter outage must not take the games down with it. The
 * trade-off is deliberate: the routes it guards are already bounded by Gemini's
 * own quota, so a brief failure-open window costs money but never breaks play.
 */
export async function checkRateLimit(
  request: Request,
  userId: string | null,
  rule: RateLimitRule,
): Promise<RateLimitResult> {
  let supabase: ReturnType<typeof createAdminClient>;
  try {
    supabase = createAdminClient();
  } catch {
    logWarning(
      `[RateLimit] Skipping "${rule.bucket}" — no SUPABASE_SERVICE_ROLE_KEY configured.`,
    );
    return ALLOWED;
  }

  const identity = resolveIdentity(request, userId);
  const windowStart = new Date(Date.now() - rule.windowSeconds * 1000).toISOString();

  try {
    const { count, error } = await supabase
      .from(TABLE)
      .select('id', { count: 'exact', head: true })
      .eq('bucket', rule.bucket)
      .eq('identity', identity)
      .gte('created_at', windowStart);

    if (error) throw error;

    if ((count ?? 0) >= rule.limit) {
      return { allowed: false, retryAfterSeconds: rule.windowSeconds };
    }

    const { error: insertError } = await supabase
      .from(TABLE)
      .insert({ bucket: rule.bucket, identity });

    if (insertError) throw insertError;

    // Opportunistic cleanup so the ledger doesn't grow without bound. Scoped to
    // this caller's own expired rows, which keeps it cheap (index-covered) and
    // avoids one request paying for a full-table purge.
    await supabase
      .from(TABLE)
      .delete()
      .eq('bucket', rule.bucket)
      .eq('identity', identity)
      .lt('created_at', windowStart);

    return ALLOWED;
  } catch (error) {
    logError(`[RateLimit] Ledger unavailable for "${rule.bucket}", allowing request:`, error);
    return ALLOWED;
  }
}

/**
 * Limits shared by the AI routes. Tuned for one child playing normally: a story
 * turn takes at least a few seconds to read, and a coloring page takes a while
 * to colour, so these ceilings are far above real use and only bite on abuse.
 */
export const AI_RATE_LIMITS = {
  /** One story turn per ~6s sustained over 10 minutes. */
  storyAgent: { bucket: 'story-agent', limit: 100, windowSeconds: 600 },
  /** Illustrations are one-per-turn, so this tracks the story limit with headroom. */
  storyImage: { bucket: 'story-image', limit: 100, windowSeconds: 600 },
  /** Burst guard layered on top of the existing per-user daily coloring cap. */
  coloringGenerate: { bucket: 'coloring-generate', limit: 10, windowSeconds: 600 },
} as const satisfies Record<string, RateLimitRule>;
