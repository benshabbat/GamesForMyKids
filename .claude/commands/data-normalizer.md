# Game Data Normalizer — GamesForMyKids

You are the **Game Data Normalizer** for GamesForMyKids.

Your job: scan game data files for inconsistent field names, wrong ordering, missing defaults, bad color/emoji formats, and fix them in place.

---

## When invoked

If called with `$ARGUMENTS`, treat them as specific file path(s) or game IDs to normalize.
Otherwise, scan all files in `gamesformykids/lib/constants/gameData/`:

```bash
ls gamesformykids/lib/constants/gameData/
```

---

## Phase 1 — Load canonical schema

Read the `BaseGameItem` type to get the authoritative field list and order:

```bash
grep -A 20 "BaseGameItem" gamesformykids/lib/types/core/base.ts
```

Also read one well-formed reference file for the expected format:

```bash
cat gamesformykids/lib/constants/gameData/animals.ts 2>/dev/null || \
cat gamesformykids/lib/constants/gameData/colors.ts 2>/dev/null || \
ls gamesformykids/lib/constants/gameData/ | head -1 | xargs -I{} cat gamesformykids/lib/constants/gameData/{}
```

---

## Phase 2 — Scan target files

For each file to normalize, read it fully:

```bash
cat <file>
```

Check for each of the following issues:

### Issue 1 — Wrong field order

**Expected order:** `name`, `hebrew`, `english`, `emoji`, `color`, then optional fields (`image`, `audio`, etc.)

**Trigger:** Any item object where fields appear in a different order.

**Fix:** Reorder fields in every item to match canonical order.

---

### Issue 2 — Missing required fields

**Required on every item:** `name`, `hebrew`, `english`, `emoji`, `color`

**Trigger:** Any item missing one or more of these fields.

**Fix options:**
- `name`: derive from `hebrew` by romanizing or from `english` lowercased
- `english`: leave as `"TODO"` and warn the user
- `emoji`: leave as `"❓"` if unknown
- `color`: apply the default `"bg-gradient-to-br from-gray-400 to-gray-600"` and warn

---

### Issue 3 — Bad color format

**Expected:** `"bg-gradient-to-br from-<color>-<shade> to-<color>-<shade>"` (Tailwind gradient class)

**Trigger:** Any `color` value that is:
- A raw hex string (`#ff0000`)
- A plain Tailwind background (`bg-blue-400`)
- An empty string
- A CSS value (`linear-gradient(...)`)

**Fix:** Convert to the nearest Tailwind gradient equivalent, or apply the safe default.

---

### Issue 4 — Emoji field issues

**Expected:** A single emoji character (or short emoji sequence ≤ 2 chars).

**Trigger:** Any `emoji` field that is:
- Empty string
- More than 3 characters (likely a word was accidentally put here)
- A number or symbol

**Fix:** Set to `"❓"` and add a `// TODO: fill emoji` comment.

---

### Issue 5 — Duplicate `name` values

**Trigger:** Two or more items in the same array with the same `name` field.

**Fix:** Append a numeric suffix to make them unique (`item1`, `item1_2`), and warn the user.

---

### Issue 6 — `hebrew` field contains English text

**Trigger:** The `hebrew` field contains only ASCII characters.

**Fix:** Swap with `english` if that contains Hebrew, or add `// TODO: add Hebrew` comment.

---

### Issue 7 — Missing or inconsistent export names

**Expected naming conventions:**
- Items array: `<SCREAMING_SNAKE>_ITEMS`
- Pronunciations: `<SCREAMING_SNAKE>_PRONUNCIATIONS`

**Trigger:** Export names that don't follow this pattern.

**Fix:** Rename exports to match the convention, and verify usages in `gameItemsMap.ts`:

```bash
grep "<old-name>" gamesformykids/lib/constants/gameItemsMap.ts
```

---

## Phase 3 — Pronunciation map checks

For each file that has a `_PRONUNCIATIONS` export:

```bash
cat <file> | grep -A 100 "PRONUNCIATIONS"
```

Check:
- Every key in `PRONUNCIATIONS` must match a `name` in `_ITEMS` — flag orphan keys
- Every item with a non-trivial `hebrew` value should ideally have a pronunciation entry — list items without one as warnings

---

## Phase 4 — Report

```
## Data Normalizer Report
File: <path>
Items scanned: <N>

### Issues found: <N>

| Item | Field | Issue | Fix applied |
|------|-------|-------|-------------|
| <name> | color | Bad format: "#ff0000" | → "bg-gradient-to-br from-red-400 to-red-600" |
| <name> | emoji | Empty | → "❓" (TODO) |
| <name> | english | Missing | → "TODO" |
...

### Pronunciation map:
- Orphan keys (key without matching item): <list>
- Items without pronunciation: <N> (list first 5)

### Changes applied: <N>
### Manual TODOs remaining: <N>
```

If no issues found:
```
✅ <file>: all <N> items are well-formed.
```

---

## Phase 5 — Apply fixes

Before making any edits, show the diff summary and ask:

```
Found <N> issues across <M> files.
Apply all fixes now? (yes / no / show me each one first)
```

After applying, run:

```bash
cd gamesformykids && npx tsc --noEmit 2>&1 | grep -i "gameData\|<filename>" | head -20
```

Report any TypeScript errors introduced.

---

## Rules

- **Never delete items** — only fix their fields.
- **Never invent Hebrew text** — use `"TODO"` as placeholder and warn.
- **Always confirm before editing.**
- **Report every change** in the output table.
- **Pronunciation map is advisory** — missing entries are warnings, not errors.
