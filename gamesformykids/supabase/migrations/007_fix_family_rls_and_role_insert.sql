-- Fixes for 003 (family policies) and 005 (admin role guard), plus achievement de-duplication.
-- Safe to run more than once.

-- 1. Family policies without self-referencing RLS.
-- 003's profiles policy selected from public.profiles inside a policy ON public.profiles.
-- Postgres evaluates that subquery under the same RLS, so every authenticated read of
-- profiles (and of game_progress, whose family policy joins profiles) failed with
-- "infinite recursion detected in policy for relation profiles". A SECURITY DEFINER
-- helper reads the caller's own family group without going through RLS.
CREATE OR REPLACE FUNCTION public.my_family_group_id()
RETURNS UUID
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT family_group_id FROM public.profiles WHERE id = auth.uid();
$$;

DROP POLICY IF EXISTS "Family members can view each other's profiles" ON public.profiles;
CREATE POLICY "Family members can view each other's profiles"
  ON public.profiles
  FOR SELECT
  USING (
    family_group_id IS NOT NULL
    AND family_group_id = public.my_family_group_id()
  );

DROP POLICY IF EXISTS "Family members can view each other's game progress" ON public.game_progress;
CREATE POLICY "Family members can view each other's game progress"
  ON public.game_progress
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM public.profiles them
      WHERE them.id = game_progress.user_id
        AND them.family_group_id IS NOT NULL
        AND them.family_group_id = public.my_family_group_id()
    )
  );

-- 2. Block self-promotion through INSERT as well as UPDATE.
-- 005's trigger only ran BEFORE UPDATE, and "Users can insert own profile" has no column
-- restriction, so a signed-in user without a profiles row could insert one with
-- role = 'admin' (or upsert into the insert path) and pass requireAdmin().
-- Same privilege rule as before: service_role and existing admins may set roles, and
-- sessions without a JWT (the SQL editor, handle_new_user) are left alone.
CREATE OR REPLACE FUNCTION public.prevent_self_role_escalation()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.role IS DISTINCT FROM 'user'
       AND auth.role() <> 'service_role'
       AND NOT public.is_admin(auth.uid()) THEN
      NEW.role := 'user';
    END IF;
  ELSIF NEW.role IS DISTINCT FROM OLD.role THEN
    IF auth.role() <> 'service_role' AND NOT public.is_admin(auth.uid()) THEN
      NEW.role := OLD.role;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS prevent_role_escalation ON public.profiles;
CREATE TRIGGER prevent_role_escalation
  BEFORE INSERT OR UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.prevent_self_role_escalation();

-- 3. Keep the signup name. Email signup used to send only `name` while this trigger
-- read `full_name`, so every email-registered profile had a NULL name. The client now
-- sends both; fall back to `name` for older clients and providers that only send it.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    new.id,
    COALESCE(NULLIF(new.raw_user_meta_data->>'full_name', ''), NULLIF(new.raw_user_meta_data->>'name', '')),
    new.raw_user_meta_data->>'avatar_url'
  );

  INSERT INTO public.user_settings (id)
  VALUES (new.id);

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 4. One row per achievement. The client checked-then-inserted with no constraint, so a
-- double save inserted twice, and the lookup (.single()) then failed on every later win
-- and inserted again. Remove existing duplicates (keeping the earliest) and enforce
-- uniqueness. Cross-game achievements have game_type NULL, hence the COALESCE.
DELETE FROM public.achievements
WHERE id IN (
  SELECT id FROM (
    SELECT id,
           row_number() OVER (
             PARTITION BY user_id, achievement_type, COALESCE(game_type, '')
             ORDER BY earned_at NULLS LAST, id
           ) AS rn
    FROM public.achievements
  ) ranked
  WHERE ranked.rn > 1
);

CREATE UNIQUE INDEX IF NOT EXISTS achievements_user_type_game_unique
  ON public.achievements (user_id, achievement_type, COALESCE(game_type, ''));
