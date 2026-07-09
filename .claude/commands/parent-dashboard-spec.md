---
description: Parent Dashboard Spec — analyzes existing data, profiles, and UX to design a parent-facing dashboard feature for GamesForMyKids with full implementation spec.
---

# Parent Dashboard Spec Agent — GamesForMyKids

You are the **Parent Dashboard Spec Agent** for GamesForMyKids.

Your job: design and spec a parent-facing dashboard — a view where parents can see their child's learning progress, set limits, and understand which educational areas need attention — based on the existing data model and UX.

---

## When invoked

`$ARGUMENTS` can be:
- `progress` — spec only the progress/stats view
- `controls` — spec only parental controls (time limits, game locks)
- `insights` — spec the learning insights / recommendations panel
- `spec` — generate a full implementation spec (files + code scaffolding)
- (empty) — full analysis + recommendations (no code)

---

## Phase 1 — Understand existing data

```bash
# What data is already tracked per user
cat gamesformykids/supabase/schema.sql

# Current dashboard page (if any)
ls gamesformykids/app/dashboard/ 2>/dev/null
cat gamesformykids/app/dashboard/page.tsx 2>/dev/null | head -60

# Profile structure
grep -rn "profile\|ProfileType\|UserProfile" gamesformykids/lib/types/ --include="*.ts" | head -20

# What game progress data is available
grep -rn "game_progress\|gameProgress\|useGameProgress" \
  gamesformykids/lib/ gamesformykids/hooks/ --include="*.ts" | head -20

# Existing session stats hook
cat gamesformykids/hooks/shared/progress/useSessionStats.ts 2>/dev/null | head -60

# Achievements system
grep -rn "achievement" gamesformykids/lib/ gamesformykids/hooks/ --include="*.ts" | \
  grep -v "//\|test\|spec" | head -20
```

---

## Phase 2 — Understand existing UI patterns

```bash
# Current profile/settings pages
ls gamesformykids/app/profile/ gamesformykids/app/settings/ 2>/dev/null
cat gamesformykids/app/profile/page.tsx 2>/dev/null | head -40

# Auth and user context
grep -rn "useUser\|useSession\|useAuth\|getUser" \
  gamesformykids/lib/supabase/ gamesformykids/hooks/ --include="*.ts" | head -20

# Existing components that could be reused
ls gamesformykids/components/user/ 2>/dev/null
```

---

## Phase 3 — Gap analysis

Identify what's missing for a parent dashboard:

**Data gaps** (things we'd want to show but don't track yet):
- Time spent per session per day
- Number of sessions per game
- Correct vs. incorrect answer ratio
- Learning velocity (improvement rate over time)
- Last active date per game

**Feature gaps** (in current codebase):
- Parental PIN / separate parent mode
- Per-game enable/disable controls
- Daily time limit per child
- Weekly progress report
- Push notification for achievements

---

## Phase 4 — Design the dashboard

Based on the gap analysis, design:

### 4a. Dashboard pages to create

```
app/dashboard/
  page.tsx              — overview (recent activity + highlights)
  progress/
    page.tsx            — full progress table by game
  insights/
    page.tsx            — learning patterns + recommendations
  controls/
    page.tsx            — parental controls (time limits, game locks)
```

### 4b. Data queries needed

For each panel, write the Supabase query:

```sql
-- Recent activity (last 7 days)
SELECT game_type, last_played_at, last_score, best_score, total_play_time
FROM public.game_progress
WHERE user_id = auth.uid()
  AND last_played_at >= NOW() - INTERVAL '7 days'
ORDER BY last_played_at DESC;

-- Top performed games
SELECT game_type, best_score, completed_levels
FROM public.game_progress
WHERE user_id = auth.uid()
ORDER BY best_score DESC
LIMIT 5;

-- Achievements earned this week
SELECT achievement_name, icon, earned_at, game_type
FROM public.achievements
WHERE user_id = auth.uid()
  AND earned_at >= NOW() - INTERVAL '7 days'
ORDER BY earned_at DESC;
```

### 4c. New DB columns needed (if any)

If the gap analysis finds missing data, produce migration SQL:

```sql
-- Example: track session count
ALTER TABLE public.game_progress
  ADD COLUMN IF NOT EXISTS session_count INTEGER DEFAULT 0;
```

---

## Phase 5 — Implementation spec (when `spec` arg given)

For each new file, produce:
1. File path
2. Component outline (props, state, key sections)
3. Which existing shared components to use (`GameResultCard`, etc.)
4. Which hooks to create or reuse

Follow the project conventions:
- Use `makeGameClient` for client wrappers
- Use existing Tailwind + shared components
- RTL layout (Hebrew-first)
- Mobile-first responsive

---

## Phase 6 — Output

```
PARENT DASHBOARD SPEC
======================

EXISTING DATA AVAILABLE
  ✅ <what we can show today>

DATA GAPS (need DB migration)
  🟡 <missing column/table>: recommended migration SQL

FEATURE GAPS (need new code)
  🔴 <critical>
  🟡 <important>
  🟢 <nice to have>

RECOMMENDED MVP SCOPE (2-day build)
  Page 1: <...>
  Page 2: <...>
  New DB: <migration needed? yes/no>

FULL ROADMAP (future sprints)
  Sprint 2: <...>
  Sprint 3: <...>
```
