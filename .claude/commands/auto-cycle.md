# Auto-Cycle Agent — GamesForMyKids

You are the **Auto-Cycle Agent** for the GamesForMyKids project (`benshabbat/GamesForMyKids`).

You run **three phases** in sequence every invocation:

1. **Review** — scan the codebase and create new GitHub issues for findings not yet tracked
2. **Implement** — for every open issue without a PR, create a branch, fix it, and open a PR
3. **Save state** — update `.claude/issue-tracker-state.json`

---

## Phase 1 — Review & Create Issues

### 1a. Fetch existing open issues

```bash
gh issue list --repo benshabbat/GamesForMyKids --state open --limit 100 \
  --json number,title,labels,body > /tmp/issues_open.json
```

### 1b. Scan the codebase for new findings

Work through each category. For every finding that is **concrete, verifiable, and not already tracked** in an open issue, create a GitHub issue.

#### Categories to check

| # | Category | Where to look | Label |
|---|----------|---------------|-------|
| 1 | Duplicate / near-duplicate code not using shared factories | `app/games/`, `lib/`, `components/` | `refactor` |
| 2 | Oversized files >300 lines mixing concerns | `app/games/*/`, `lib/stores/`, `hooks/` | `refactor` |
| 3 | `any` types / missing return types / inline shapes | `lib/types/`, `hooks/`, `components/` | `types` |
| 4 | Dead code — exported but never imported | `lib/`, `components/`, `app/games/` | `dead-code` |
| 5 | Performance — missing `useCallback`/`useMemo`, recreated objects in loops | `hooks/`, `app/games/` | `performance` |
| 6 | Architecture violations — game logic in shared components, raw `fetch` for game data | `components/shared/`, `app/games/` | `architecture` |
| 7 | Missing registry entries — game folder exists but not in `SUPPORTED_GAMES`/`GAMES_REGISTRY` | `app/games/[gameType]/gamePageConstants.ts`, `lib/registry/` | `bug` |

Use Grep and Read tools to investigate. Cross-reference every finding with `/tmp/issues_open.json` — skip duplicates.

**Aim for 3–10 new issues per run. Quality over quantity.**

### 1c. Create each new issue

```bash
gh issue create \
  --repo benshabbat/GamesForMyKids \
  --title "<concise title>" \
  --body "## Problem
<One clear paragraph describing what is wrong and why it matters.>

## Location
<File path(s) and line numbers.>

## Suggested fix
<Concrete action: what to extract, what factory to use, what to delete, etc.>" \
  --label "<label>"
```

### 1d. Print Phase 1 summary table

| # | Title | Label |
|---|-------|-------|

---

## Phase 2 — Implement Open Issues (create PRs)

### 2a. Fetch all open issues + recent PRs

```bash
gh issue list --repo benshabbat/GamesForMyKids --state open --limit 100 \
  --json number,title,labels,body,createdAt > /tmp/issues_open.json

gh pr list --repo benshabbat/GamesForMyKids --state all --limit 50 \
  --json number,title,state,headRefName,body,closedAt,mergedAt,url > /tmp/prs_all.json
```

### 2b. Load saved state

Read `.claude/issue-tracker-state.json`. If missing, treat all issues as new and all PR states as unknown.

State schema:
```json
{
  "lastRun": "ISO timestamp",
  "issues": {
    "<number>": { "title": "...", "hasPR": false, "prNumber": null, "prState": null, "label": null }
  },
  "prs": {
    "<number>": { "title": "...", "state": "open|merged|closed", "linkedIssue": null }
  }
}
```

### 2c. Print status report

#### 🆕 New issues (first seen this run)
| # | Title | Label |

#### 🔄 PR status changes
| PR # | Title | Old → New | Linked Issue |

#### ✅ Issues that now have a PR
| Issue # | Title | PR # |

#### 📋 Still open, no PR
| # | Title | Label |

### 2d. For each "Still open, no PR" — implement one at a time

**Safety check — only proceed automatically if ALL are true:**
- Label is one of: `refactor`, `types`, `dead-code`, `architecture`
- Change is isolated to ≤ 3 files
- The file(s) exist at the stated path

If the issue involves `performance` or `bug` without a clear mechanical fix, or requires changes across >3 files, **skip it** and mark "requires human review".

**For each safe issue:**

#### Create branch

```bash
ISSUE_NUM=<number>
SLUG=$(echo "<title>" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | cut -c1-50)
LABEL=<refactor|fix|types|chore|dead-code|architecture>
BRANCH="${LABEL}/${ISSUE_NUM}-${SLUG}"

cd gamesformykids
git checkout main
git pull origin main
git checkout -b "$BRANCH"
```

#### Implement the fix

- **Grep first** — always check the CLAUDE.md anti-duplicate checklist before writing new code
- Follow exact factory patterns (`makeQuizGame`, `createChallengeStore`, `createPhaseGameHook`, etc.)
- Keep changes minimal and focused on exactly what the issue asks
- After changes: run `npx tsc --noEmit` inside `gamesformykids/` — fix all errors before continuing

#### Commit and push

```bash
git add -A
git commit -m "<label>: <issue title>

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
git push origin "$BRANCH"
```

#### Open PR

```bash
gh pr create \
  --repo benshabbat/GamesForMyKids \
  --title "<label>: <issue title>" \
  --body "## Summary
<One paragraph describing what was changed and why.>

## Changes
- <bullet list of changed files and what changed>

## Testing
- [ ] \`npx tsc --noEmit\` passes
- [ ] Manually verified at \`http://localhost:3000/games/<affected-game>\` (if applicable)

Closes #<issue-number>

🤖 Generated with [Claude Code](https://claude.com/claude-code)" \
  --base main \
  --head "$BRANCH"
```

#### Check CI

```bash
gh pr checks --repo benshabbat/GamesForMyKids <pr-number> --watch
```

If CI fails, fix the errors, amend the commit, and push again before moving to the next issue.

---

## Phase 3 — Save State

Write the updated snapshot to `.claude/issue-tracker-state.json` using the Write tool.

Fields to update:
- `lastRun`: current ISO timestamp
- `issues`: full map of all currently open issues + any new PR links discovered or created this run
- `prs`: full map of all PRs seen this run with their current state

---

## Hard Rules

- **Never push to `main`** — always create a feature branch.
- **Never open a duplicate PR** — check `/tmp/prs_all.json` for existing PRs mentioning `#<issue-number>` before creating one.
- **Never skip `tsc --noEmit`** — a PR with TypeScript errors must not be opened.
- **One PR per issue** — if a PR already exists (open or merged), do not create another.
- **Never create a vague issue** — only concrete, file-level, verifiable findings.
- **Follow CLAUDE.md** — all anti-duplicate and factory rules apply here too.

---

## Final Summary

```
## Auto-Cycle Run — <timestamp>

### Phase 1 — Issues Created
- N new issues created
- (table: #, title, label)

### Phase 2 — PRs Opened
- N PRs opened
- (table: PR #, issue #, title)

### Skipped (require human review)
- Issue #N: <title> — <reason>

### State saved ✅
```
