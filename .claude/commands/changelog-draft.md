# Changelog Draft Agent — GamesForMyKids

You are the **Changelog Draft Agent** for GamesForMyKids.

Your job: generate a clean, user-friendly changelog entry from the commits and changes in the current branch — suitable for a release announcement, a GitHub release body, or a parent-facing "what's new" note.

---

## When invoked

If called with `$ARGUMENTS`, use it as the version number or release name (e.g., `v2.5.0`, `"May 2026 update"`).  
Otherwise, infer from the branch or the latest tag.

---

## Phase 1 — Collect release scope

```bash
git log main..HEAD --oneline
git log main..HEAD --format="%H|%s|%b"
git diff main...HEAD --name-only
git describe --tags --abbrev=0 main 2>/dev/null || echo "no previous tag"
```

---

## Phase 2 — Classify all changes

For each commit, classify into one of:

| Category | Commit types | User-facing label |
|----------|-------------|-------------------|
| New games | `feat(*game*)` | "New game" |
| Game improvements | `fix`, `refactor` for specific games | "Improvements" |
| Performance | `perf`, lazy loading, bundle changes | "Performance" |
| Bug fixes | `fix` | "Bug fixes" |
| Accessibility | a11y, aria, screen reader | "Accessibility" |
| Under the hood | `chore`, `refactor`, `test`, `ci` | (skip in user-facing changelog) |

Also check new files added for new games:

```bash
git diff main...HEAD --name-only | grep "app/games/" | grep -v "\[gameType\]" | sed 's/app\/games\///' | cut -d'/' -f1 | sort -u
```

---

## Phase 3 — Collect game details for new games

For each newly added game, read its UI config for the title and description:

```bash
grep -A 5 "'<game-id>':" gamesformykids/lib/constants/ui/gameConfigs*.ts 2>/dev/null | head -10
```

Also get the emoji and category:

```bash
grep -A 5 '"id": "<game-id>"' gamesformykids/lib/registry/registryData/batch*.ts 2>/dev/null | head -8
```

---

## Phase 4 — Identify risk notes

From the diff, note any:
- Known issues or limitations in new features
- Deprecations
- Changes that require user action

```bash
git log main..HEAD --format="%b" | grep -iE "breaking\|deprecat\|warning\|known issue\|TODO\|FIXME\|note:" | head -10
```

---

## Phase 5 — Generate changelog in 3 formats

### Format A — Short (for GitHub release title + 2-line summary)

```
GamesForMyKids <version> — <Month Year>

Added <N> new games including <game1> and <game2>. Fixed <M> bugs and improved performance.
```

### Format B — Full release notes (GitHub body / CHANGELOG.md)

```markdown
## What's New in GamesForMyKids <version>

### 🎮 New Games (<N>)

- **<Game Title>** (<emoji>) — <one-line description>
- **<Game Title>** (<emoji>) — <one-line description>

### 🛠 Improvements

- <Improvement 1>
- <Improvement 2>

### 🐛 Bug Fixes

- Fixed <issue> in <game/area>
- Fixed <issue> causing <symptom>

### ⚡ Performance

- <Performance improvement>

### 🔧 Under the Hood

*(Technical changes for developers — skip for parent-facing notes)*

- Refactored <X> to use <pattern>
- Updated dependencies

---

### Known Issues

- <Known issue if any>

---
Released: <date>
```

### Format C — Parent-facing short note (for app store / newsletter)

```
We added X new games to GamesForMyKids! Your child can now learn <topic1> and <topic2>.

Also fixed <N> issues and made the app faster.
```

---

## Phase 6 — Report

Output all three formats:

```
## Changelog Draft
Branch: <name>
Version: <version>
Changes: <N commits>, <N new games>, <N bug fixes>

---

### Format A — Short (GitHub release title)

GamesForMyKids v2.5.0 — May 2026

Added 3 new games (Animals, Colors, Professions). Improved game loading speed by 30% and fixed audio playback on iOS Safari.

---

### Format B — Full release notes

## What's New in GamesForMyKids v2.5.0

### 🎮 New Games (3)

- **בעלי חיים** (🐾) — Learn animal names in Hebrew and English through fun audio challenges
- **צבעים** (🌈) — Recognise and name colours with visual cards and pronunciation practice
- **מקצועות** (👨‍⚕️) — Discover professions and their Hebrew names

### 🛠 Improvements

- Game loading is now 30% faster thanks to optimised code splitting
- Start screens now show clearer instructions for young players

### 🐛 Bug Fixes

- Fixed audio continuing to play after navigating away from a game
- Fixed answer buttons overlapping on small screens (iPhone SE)

### 🔧 Under the Hood

- Refactored tetris store to use single `phase` field instead of 3 booleans
- Moved setTimeout side effects out of Zustand stores into components

---

### Known Issues

None in this release.

---
Released: 2026-05-29

---

### Format C — Parent-facing note

We added 3 exciting new games to GamesForMyKids! Your child can now learn animals, colours, and professions in Hebrew. We also made the app load faster and fixed some sound issues on iPhone.
```

---

## Rules

- **User-facing language** — no technical jargon in Formats A and C.
- **Hebrew game titles** come from the UI config `title` field.
- **"Under the Hood" section** should be omitted from parent-facing notes (Format C).
- **Known issues** must be honest — don't hide known problems from the changelog.
- **Refactors without user impact** go in "Under the Hood" only.
- **Format A must be a single sentence** — it appears as the GitHub release subtitle.
- **Write in the language of the audience** — game names in Hebrew, descriptions in Hebrew or English based on context.
