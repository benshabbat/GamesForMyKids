---
description: GameDistribution Game Embedder — given a GD game UUID, creates an iframe-based page in GamesForMyKids, registers it in all required files, and opens a PR. Usage: /embed-game <gd-uuid> <slug> "<hebrew-title>" "<hebrew-description>" <category>
---

# GameDistribution Game Embedder

Embed a GameDistribution game into GamesForMyKids via a fullscreen iframe and wire it into the registry.

**Source:** GameDistribution (gamedistribution.com) — 9,000+ licensed HTML5 games.

**How to find the UUID:**
1. Log in to `publisher.gamedistribution.com`
2. Browse the game catalog → click the game you want
3. The UUID is the alphanumeric ID in the embed URL shown on the game's page
   e.g. `https://html5.gamedistribution.com/rvvASMiM/` → UUID = `rvvASMiM`

**Embed URL format:**
```
https://html5.gamedistribution.com/<UUID>/?gd_sdk_referrer_url=https://gamesformykids.vercel.app
```

---

**Arguments** (`$ARGUMENTS`): `<gd-uuid> <slug> "<hebrew-title>" "<hebrew-description>" <category>`

Example:
```
rvvASMiM subway-surfers "גולש המטרו" "משחק ריצה מהיר וכיף" arcade
```

Parse `$ARGUMENTS`:
- `GD_UUID` = first token (alphanumeric GD game ID, e.g. `rvvASMiM`)
- `SLUG` = second token (kebab-case, used as the game id and folder name)
- `HEBREW_TITLE` = third token (quoted string)
- `HEBREW_DESC` = fourth token (quoted string)
- `CATEGORY` = fifth token — one of: `basic` `creative` `math` `nature` `world` `culture` `arcade` `board` `language`

Derive `GAME_URL` = `https://html5.gamedistribution.com/<GD_UUID>/?gd_sdk_referrer_url=https://gamesformykids.vercel.app`

If any argument is missing, print usage and stop:
```
Usage: /embed-game <gd-uuid> <slug> "<hebrew-title>" "<hebrew-description>" <category>

  gd-uuid   — alphanumeric game ID from publisher.gamedistribution.com
              (found in the game embed URL on the GD publisher portal)
  slug      — kebab-case game id for this site (e.g. subway-surfers)
  category  — basic | creative | math | nature | world | culture | arcade | board | language

Example:
  /embed-game rvvASMiM subway-surfers "גולש המטרו" "משחק ריצה מהיר וכיף" arcade
```

---

## Phase 1 — Validate UUID & Duplicate Check

```bash
# Verify the GD embed URL is reachable
curl -s -o /dev/null -w "%{http_code}" \
  "https://html5.gamedistribution.com/<GD_UUID>/index.html"

# Check the slug is not already taken
grep -n "'<SLUG>'" gamesformykids/app/games/\[gameType\]/gamePageConstants.ts
ls gamesformykids/app/games/ | grep "^<SLUG>$"
```

If curl returns anything other than 200 or 301: print `⚠️  UUID '<GD_UUID>' not found on GameDistribution. Check the UUID in your publisher portal.` and stop.

If the slug already exists: print `⚠️  Game '<SLUG>' already exists. Choose a different slug.` and stop.

---

## Phase 2 — Confirm Plan

Print this summary and ask for confirmation:

```
📦 About to embed GameDistribution game:

  GD UUID:  <GD_UUID>
  Embed URL: https://html5.gamedistribution.com/<GD_UUID>/?gd_sdk_referrer_url=https://gamesformykids.vercel.app
  Slug:     <SLUG>
  Title:    <HEBREW_TITLE>
  Desc:     <HEBREW_DESC>
  Category: <CATEGORY>

Files to create/edit:
  ✨ app/games/<SLUG>/<PascalSlug>Client.tsx      (new — GD iframe wrapper)
  ✏️  app/games/[gameType]/CustomGameRenderer.tsx  (add entry)
  ✏️  app/games/[gameType]/gamePageConstants.ts    (add to SUPPORTED_GAMES + CUSTOM_GAME_TYPES)
  ✏️  lib/types/core/base.ts                       (add GameType)
  ✏️  lib/registry/registryData/batch<N>.ts        (add registry entry)
  ✏️  lib/constants/gameCategories.ts              (add to category)

Proceed? (yes / no)
```

Stop and wait for "yes" before continuing.

---

## Phase 3 — Read Files to Edit

Read these files before modifying them:

```bash
cat gamesformykids/app/games/\[gameType\]/CustomGameRenderer.tsx
cat gamesformykids/app/games/\[gameType\]/gamePageConstants.ts
cat gamesformykids/lib/types/core/base.ts | grep -n "GameType" | head -5
# find the GameType union line range
grep -n "GameType" gamesformykids/lib/types/core/base.ts | head -10
# find highest batch number
ls gamesformykids/lib/registry/registryData/batch*.ts | sort | tail -1
# read last batch file to find the last `order` value
tail -20 "$(ls gamesformykids/lib/registry/registryData/batch*.ts | sort | tail -1)"
# read game categories
cat gamesformykids/lib/constants/gameCategories.ts
```

---

## Phase 4 — Implement

### 4a. Create branch

```bash
git checkout main
git pull origin main
git checkout -b feat/embed-$SLUG
```

### 4b. Create the GD iframe client component

Derive `PascalSlug` from `SLUG` (e.g. `subway-surfers` → `SubwaySurfers`).

Create `gamesformykids/app/games/<SLUG>/<PascalSlug>Client.tsx`:

```tsx
'use client';

const GD_EMBED_URL =
  'https://html5.gamedistribution.com/<GD_UUID>/?gd_sdk_referrer_url=https://gamesformykids.vercel.app';

export default function <PascalSlug>Client() {
  return (
    <div style={{ width: '100%', height: '100svh', display: 'flex', flexDirection: 'column' }}>
      <iframe
        src={GD_EMBED_URL}
        style={{ width: '100%', flex: 1, border: 'none' }}
        allowFullScreen
        allow="autoplay; fullscreen; microphone; gamepad"
        title="<HEBREW_TITLE>"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-pointer-lock"
      />
    </div>
  );
}
```

### 4c. Edit CustomGameRenderer.tsx

Add to the `GAME_CLIENTS` record (keep alphabetical order):

```typescript
'<SLUG>': dynamic(() => import('../<SLUG>/<PascalSlug>Client'), { ssr: false }),
```

### 4d. Edit gamePageConstants.ts

Add `'<SLUG>'` to **both**:
- `SUPPORTED_GAMES` array (in the `// ── משחקים מותאמים` section)
- `CUSTOM_GAME_TYPES` constant

### 4e. Edit lib/types/core/base.ts

Add `| '<SLUG>'` to the `GameType` union (in the arcade/custom group).

### 4f. Edit registry batch file

Add to the last batch file (or whichever batch the `order` fits):

```typescript
{
  id: '<SLUG>',
  title: '<HEBREW_TITLE>',
  description: '<HEBREW_DESC>',
  icon: Gamepad2,
  emoji: '🎮',
  color: 'bg-indigo-400 hover:bg-indigo-500',
  href: '/games/<SLUG>',
  available: true,
  order: <next-order-number>,
},
```

Make sure `Gamepad2` is imported from `lucide-react` at the top of that batch file.

### 4g. Edit lib/constants/gameCategories.ts

Add `'<SLUG>'` to the `gameIds` array of the `<CATEGORY>` category object.

---

## Phase 5 — TypeScript Check

```bash
cd gamesformykids && npx tsc --noEmit 2>&1 | head -30
```

Fix any TypeScript errors before continuing. Common issues:
- `GameType` union not updated
- Missing import in registry batch file

---

## Phase 6 — Commit & PR

```bash
git add \
  gamesformykids/app/games/<SLUG>/<PascalSlug>Client.tsx \
  gamesformykids/app/games/\[gameType\]/CustomGameRenderer.tsx \
  gamesformykids/app/games/\[gameType\]/gamePageConstants.ts \
  gamesformykids/lib/types/core/base.ts \
  gamesformykids/lib/registry/registryData/batch*.ts \
  gamesformykids/lib/constants/gameCategories.ts

git commit -m "feat(game): embed <SLUG> — GameDistribution iframe

Adds <HEBREW_TITLE> as an iframe-embedded game via GameDistribution (GD UUID: <GD_UUID>).

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"

git push -u origin feat/embed-<SLUG>

gh pr create \
  --repo benshabbat/GamesForMyKids \
  --title "feat(game): embed <SLUG> — <HEBREW_TITLE>" \
  --body "## Summary
- Embeds **<HEBREW_TITLE>** (\`<SLUG>\`) as a fullscreen iframe game via GameDistribution
- GD UUID: \`<GD_UUID>\`
- Embed URL: \`https://html5.gamedistribution.com/<GD_UUID>/?gd_sdk_referrer_url=https://gamesformykids.vercel.app\`
- Category: <CATEGORY>

## What changed
- New GD iframe client: \`app/games/<SLUG>/<PascalSlug>Client.tsx\`
- Registered in CustomGameRenderer, gamePageConstants, GameType union, registry, and categories

## Test plan
- [ ] Visit \`/games/<SLUG>\` — game loads in iframe (no blank/blocked page)
- [ ] Game fills the full screen (no white borders)
- [ ] Game is playable (controls work, no console errors)
- [ ] Back button returns to home page
- [ ] Game appears in \`<CATEGORY>\` category grid on home page
- [ ] \`npx tsc --noEmit\` passes
- [ ] \`npm run build\` passes

Closes #<issue-number-if-any>"
```

After the PR is created, print:
```
✅ Done!
   PR: <pr-url>
   Test at: http://localhost:3000/games/<SLUG>

   GD Embed URL: https://html5.gamedistribution.com/<GD_UUID>/?gd_sdk_referrer_url=https://gamesformykids.vercel.app
```

---

## Rules

- **Validate the UUID first.** A bad UUID wastes time — curl check catches it early.
- **Never skip the slug duplicate check.** Two games with the same slug break routing.
- **Never skip TypeScript check.** A broken build blocks CI.
- **Never create the PR without user confirmation in Phase 2.**
- **Always include `gd_sdk_referrer_url`.** GameDistribution uses this to track publisher usage — omitting it may cause the game to show a warning or not load correctly.
- **Always include `sandbox` attribute.** Needed for GD games to function (scripts + pointer lock).
- **Do not wrap in GenericStartScreen or any game UI.** GD games are self-contained — just fullscreen iframe.
- **`100svh` not `100vh`** — avoids mobile browser toolbar overlap.
- **Keep `ssr: false`** in the dynamic import — iframes must be client-side only.
