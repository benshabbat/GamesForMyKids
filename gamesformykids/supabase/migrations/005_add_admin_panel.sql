-- Admin panel: role column, admin-bypass RLS policies, and game visibility overrides

-- 1. Role column on profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin'));

-- 2. is_admin() — SECURITY DEFINER so it can read profiles without re-triggering
-- the RLS policy that itself calls is_admin() (avoids infinite recursion).
CREATE OR REPLACE FUNCTION public.is_admin(uid UUID)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles WHERE id = uid AND role = 'admin'
  );
$$;

-- 3. Prevent a non-admin from self-promoting via a direct client update.
-- The existing "Users can update own profile" policy has no column restriction,
-- so this trigger is the actual enforcement point regardless of which policy allowed the write.
CREATE OR REPLACE FUNCTION public.prevent_self_role_escalation()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.role IS DISTINCT FROM OLD.role THEN
    IF auth.role() <> 'service_role' AND NOT public.is_admin(auth.uid()) THEN
      NEW.role := OLD.role;
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE TRIGGER prevent_role_escalation
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.prevent_self_role_escalation();

-- 4. Admin-bypass read policies (additive — OR'd with the existing self-only policies)
CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update any profile" ON public.profiles
  FOR UPDATE USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can view all game progress" ON public.game_progress
  FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can view all achievements" ON public.achievements
  FOR SELECT USING (public.is_admin(auth.uid()));

-- 5. Game visibility overrides — global site config, not per-user data
CREATE TABLE IF NOT EXISTS public.game_overrides (
  game_id TEXT PRIMARY KEY,
  status TEXT NOT NULL DEFAULT 'visible' CHECK (status IN ('visible', 'hidden', 'featured')),
  updated_by UUID REFERENCES auth.users ON DELETE SET NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.game_overrides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view game overrides" ON public.game_overrides
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage game overrides" ON public.game_overrides
  FOR ALL USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

CREATE OR REPLACE TRIGGER update_game_overrides_updated_at BEFORE UPDATE ON public.game_overrides
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
