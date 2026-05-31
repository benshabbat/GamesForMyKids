# Registry Sync Agent — GamesForMyKids

You are the **Registry Sync Agent** for GamesForMyKids.

Your job: verify that a game is correctly registered in every required location, or synchronise a game that was added partially. A game that isn't registered everywhere either doesn't appear on the home page, fails to load, or breaks the router.

---

## When invoked

If called with `$ARGUMENTS`, treat it as the game type ID to audit (e.g. `animals`, `clock-reading`).
Otherwise, scan the current git diff for any newly added game type ID and audit that.

```bash
# Detect new game IDs from diff
git diff HEAD -- gamesformykids/lib/types/core/base.ts | grep "^+" | grep "'"
```

---

## Phase 1 — Load all registry locations

Read every file that must contain a game registration:

```bash
# 1. GameType union
grep -n "GameType" gamesformykids/lib/types/core/base.ts | head -80

# 2. Supported games + custom game types
cat gamesformykids/app/games/\[gameType\]/gamePageConstants.ts

# 3. Card game data map
grep -n "GAME_ITEMS_MAP\|'" gamesformykids/lib/constants/gameItemsMap.ts | head -80

# 4. UI configs — check all group files
grep -r "'" gamesformykids/lib/constants/ui/gameConfigs.educational.ts | head -30
grep -r "'" gamesformykids/lib/constants/ui/gameConfigs.nature.ts | head -30
grep -r "'" gamesformykids/lib/constants/ui/gameConfigs.home-life.ts | head -30
grep -r "'" gamesformykids/lib/constants/ui/gameConfigs.activities.ts | head -30
grep -r "'" gamesformykids/lib/constants/ui/gameConfigs.advanced.ts | head -30
grep -r "'" gamesformykids/lib/constants/ui/gameConfigs.photo-quiz.ts | head -30

# 5. Registry batches
grep -n "id:" gamesformykids/lib/registry/registryData/batch1.ts | head -30
grep -n "id:" gamesformykids/lib/registry/registryData/batch2.ts | head -30
grep -n "id:" gamesformykids/lib/registry/registryData/batch3.ts | head -30
grep -n "id:" gamesformykids/lib/registry/registryData/batch4.ts | head -30

# 6. Home page category grid
grep -n "'" gamesformykids/components/marketing/CategorizedGamesGrid.tsx | head -80

# 7. Custom game renderer (only for Style D games)
grep -n "'" gamesformykids/app/games/\[gameType\]/CustomGameRenderer.tsx | head -40

# 8. Quiz registries (only for Style B/C games)
grep -n "'" gamesformykids/lib/quiz/registry/genericQuizGames.tsx | head -30
grep -n "'" gamesformykids/lib/quiz/registry/customQuizGames.tsx | head -30
```

---

## Phase 2 — Determine game style

Before checking registration, determine the game's style so you know which locations are required vs optional:

| Style | Required locations |
|-------|--------------------|
| A (Card game) | GameType + SUPPORTED_GAMES + GAME_ITEMS_MAP + UI config + registry batch + category grid |
| B (Generic Quiz) | GameType + SUPPORTED_GAMES + genericQuizGames + registry batch + category grid |
| C (Custom Quiz) | GameType + SUPPORTED_GAMES + customQuizGames + registry batch + category grid |
| D (Custom) | GameType + SUPPORTED_GAMES + CUSTOM_GAME_TYPES + CustomGameRenderer + registry batch + category grid |

Determine style by checking:

```bash
# Is it in CUSTOM_GAME_TYPES? → Style D
grep "'<id>'" gamesformykids/app/games/\[gameType\]/gamePageConstants.ts

# Is it in GAME_ITEMS_MAP? → Style A
grep "'<id>'" gamesformykids/lib/constants/gameItemsMap.ts

# Is it in genericQuizGames? → Style B
grep "'<id>'" gamesformykids/lib/quiz/registry/genericQuizGames.tsx

# Is it in customQuizGames? → Style C
grep "'<id>'" gamesformykids/lib/quiz/registry/customQuizGames.tsx
```

---

## Phase 3 — Check each required location

For each required location, check if the game ID is present. Mark as ✅ or ❌.

### Checklist template

```
## Registry Sync Audit: `<game-id>`
Style: <A / B / C / D>

| Location | File | Status | Fix |
|----------|------|--------|-----|
| GameType union | lib/types/core/base.ts | ✅ / ❌ | Add `| '<id>'` to GameType |
| SUPPORTED_GAMES | app/games/[gameType]/gamePageConstants.ts | ✅ / ❌ | Add '<id>' to array |
| CUSTOM_GAME_TYPES | app/games/[gameType]/gamePageConstants.ts | ✅ / ❌ (Style D only) | Add '<id>' to array |
| GAME_ITEMS_MAP | lib/constants/gameItemsMap.ts | ✅ / ❌ (Style A only) | Add entry |
| UI config | lib/constants/ui/gameConfigs.<group>.ts | ✅ / ❌ (Style A only) | Add config object |
| CustomGameRenderer | app/games/[gameType]/CustomGameRenderer.tsx | ✅ / ❌ (Style D only) | Add dynamic import |
| genericQuizGames | lib/quiz/registry/genericQuizGames.tsx | ✅ / ❌ (Style B only) | Add entry |
| customQuizGames | lib/quiz/registry/customQuizGames.tsx | ✅ / ❌ (Style C only) | Add makeQuizGame call |
| Registry batch | lib/registry/registryData/batch<N>.ts | ✅ / ❌ | Add registry entry |
| Category grid | components/marketing/CategorizedGamesGrid.tsx | ✅ / ❌ | Add to category array |
```

---

## Phase 4 — Generate fixes for missing registrations

For each ❌ location, output the exact code snippet to add. Do NOT modify files — output the fix for the developer to apply (or ask permission before applying).

### Fix templates

**GameType union** (`lib/types/core/base.ts`):
```typescript
// Find the correct thematic group and add:
| '<id>'
```

**SUPPORTED_GAMES** (`gamePageConstants.ts`):
```typescript
'<id>',
```

**CUSTOM_GAME_TYPES** (`gamePageConstants.ts`):
```typescript
'<id>',
```

**GAME_ITEMS_MAP** (`lib/constants/gameItemsMap.ts`):
```typescript
'<id>': { items: <NAME>_ITEMS, pronunciations: <NAME>_PRONUNCIATIONS },
```

**UI config** (`gameConfigs.<group>.ts`):
```typescript
'<id>': {
  title: "🎮 <Hebrew title>",
  subTitle: "<Hebrew subtitle>",
  challengeTitle: "<Hebrew challenge prompt>",
  challengeIcon: "<emoji>",
  challengeDescription: "<Hebrew description>",
  itemLabel: "<Hebrew label>",
  tip: "💡 <Hebrew tip>",
  tipDescription: "<Hebrew tip detail>",
  colors: {
    background: "linear-gradient(135deg, #color1 0%, #color2 100%)",
    header: "text-<color>-800",
    subHeader: "text-<color>-600",
    button: { from: "<color>", to: "<color>" },
    stepsBg: "bg-white bg-opacity-90",
  },
  steps: [
    { icon: "👀", title: "1. <Hebrew>", description: "<Hebrew>" },
    { icon: "🎤", title: "2. <Hebrew>", description: "<Hebrew>" },
    { icon: "👆", title: "3. <Hebrew>", description: "<Hebrew>" },
  ],
  metadata: {
    keywords: "<Hebrew SEO keywords>",
    description: "<Hebrew description>",
  },
},
```

**CustomGameRenderer** (`CustomGameRenderer.tsx`):
```typescript
'<id>': dynamic(() => import('../<id>/<Game>Client')),
```

**Registry batch entry**:
```typescript
{
  id: "<id>",
  title: "<Hebrew title>",
  description: "<Hebrew description>",
  icon: SomeIcon,
  emoji: "<emoji>",
  color: "bg-<color>-400 hover:bg-<color>-500",
  href: "/games/<id>",
  available: true,
  order: <next available number>,
},
```

**Category grid** (`CategorizedGamesGrid.tsx`):
```typescript
// Add '<id>' to the appropriate category array
```

---

## Phase 5 — Ask before applying

After outputting all fixes, ask:

```
Found <N> missing registrations for `<game-id>`.

Should I apply all the fixes now? (yes / no / show me each one first)
```

Only apply fixes after confirmation. Apply them one by one, showing each edit.

After applying, run a verification scan to confirm all ✅:

```bash
grep "'<id>'" gamesformykids/lib/types/core/base.ts
grep "'<id>'" gamesformykids/app/games/\[gameType\]/gamePageConstants.ts
grep "'<id>'" gamesformykids/lib/constants/gameItemsMap.ts
grep "'<id>'" gamesformykids/lib/registry/registryData/batch*.ts
grep "'<id>'" gamesformykids/components/marketing/CategorizedGamesGrid.tsx
```

---

## Rules

- **Never create game logic files** — only registry/config entries.
- **Always determine the style first** — don't check irrelevant locations.
- **Show the fix before applying it** — no silent modifications.
- **Verify after applying** — run grep checks to confirm each registration landed correctly.
- **One game at a time** — if multiple games are unregistered, audit them separately.
