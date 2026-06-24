-- Add family_group_id to profiles for sibling leaderboard feature
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS family_group_id UUID DEFAULT NULL;

-- Index for fast family group lookups
CREATE INDEX IF NOT EXISTS idx_profiles_family_group_id
  ON public.profiles (family_group_id)
  WHERE family_group_id IS NOT NULL;

-- Allow family members to view each other's profiles
CREATE POLICY "Family members can view each other's profiles"
  ON public.profiles
  FOR SELECT
  USING (
    family_group_id IS NOT NULL
    AND family_group_id = (
      SELECT p2.family_group_id
      FROM public.profiles p2
      WHERE p2.id = auth.uid()
      LIMIT 1
    )
  );

-- Allow family members to view each other's game progress
CREATE POLICY "Family members can view each other's game progress"
  ON public.game_progress
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM public.profiles me
      JOIN public.profiles them ON them.id = game_progress.user_id
      WHERE me.id = auth.uid()
        AND me.family_group_id IS NOT NULL
        AND me.family_group_id = them.family_group_id
    )
  );
