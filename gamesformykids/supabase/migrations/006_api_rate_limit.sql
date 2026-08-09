-- Rate-limit ledger for the AI-backed API routes (story-agent, story image,
-- coloring generation). One row per accepted request; the limiter counts rows
-- inside a sliding window and rejects once the count reaches the limit.
--
-- `identity` is either "user:<uuid>" for a signed-in caller or "ip:<sha256>"
-- for an anonymous one. Anonymous callers are hashed with a server-side salt
-- so no raw IP address is ever stored — this is a children's site and the IP
-- is only needed to bound abuse, never to identify anybody.

CREATE TABLE IF NOT EXISTS public.api_rate_limit_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  bucket TEXT NOT NULL,
  identity TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Serves both the sliding-window count and the opportunistic cleanup delete.
CREATE INDEX IF NOT EXISTS idx_api_rate_limit_bucket_identity_created
  ON public.api_rate_limit_events (bucket, identity, created_at DESC);

-- Standalone created_at index so a bulk purge of old rows doesn't table-scan.
CREATE INDEX IF NOT EXISTS idx_api_rate_limit_created
  ON public.api_rate_limit_events (created_at);

-- RLS on with no policies at all: this table is only ever touched by the
-- service-role client in lib/server/rateLimit.ts, which bypasses RLS. Any
-- anon/authenticated client reaching it directly gets nothing, which is
-- exactly right — a caller must not be able to read or forge its own quota.
ALTER TABLE public.api_rate_limit_events ENABLE ROW LEVEL SECURITY;
