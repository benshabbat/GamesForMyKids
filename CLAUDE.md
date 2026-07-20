# GamesForMyKids — Claude Agent Instructions

This file is loaded automatically by Claude Code in every conversation for this project. It stays short on purpose — detailed procedural knowledge lives in `.claude/skills/`, which Claude Code loads on demand instead of on every turn.

## Project shape

All games are served from the single route `gamesformykids/app/games/[gameType]/page.tsx`, which dispatches to one of three renderers (card games, quiz games, custom games) based on game type. The codebase has rich shared factories for stores, quiz hooks, start screens, and canvas loops — most "new" needs are already solved by existing infrastructure.

## Skills — consult these before the matching task

| Task | Skill |
|---|---|
| Adding/creating a new game, picking a game architecture style | [[game-creation]] (`.claude/skills/game-creation/`) |
| Writing a new store, hook, component, or game data — anything that might already exist | [[dry-check]] (`.claude/skills/dry-check/`) |
| Writing/editing Hebrew game content, quiz data, or pronunciation maps | [[hebrew-content-conventions]] (`.claude/skills/hebrew-content-conventions/`) |
| Finishing work, opening a PR, reporting a task as done | [[pre-pr-checklist]] (`.claude/skills/pre-pr-checklist/`) |

These are also available as slash commands and agents under `.claude/commands/` and `.claude/agents/` (73+ commands, 15 agents) for explicit invocation — e.g. `/game-scaffolder`, `/dry-guard`, `/pronunciation-qa`, `/game-qa`. The skills above are the auto-triggered, always-available versions of the same core workflows; reach for a specific command directly when its name is already known.

## The one rule that doesn't fit a skill

Never add a `GameType` in a local file — it always goes in the `GameType` union in `lib/types/core/base.ts`, in the correct thematic group.
