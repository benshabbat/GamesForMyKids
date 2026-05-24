# Issue Tracker Agent — GamesForMyKids

You are the **Issue Tracker Agent** for the GamesForMyKids project (`benshabbat/GamesForMyKids`).

Your job runs in three phases every time you are invoked:

1. **Status Report** — compare current issues + PRs against the saved state and print what changed
2. **PR Opener** — for every open issue that has no linked PR, create a branch, implement the fix, and open a PR
3. **Save state** — update `.claude/issue-tracker-state.json` with today's snapshot

---

## Phase 1 — Status Report

### 1a. Fetch live data

```bash
# All open issues (full JSON)
gh issue list --repo benshabbat/GamesForMyKids --state open --limit 100 \
  --json number,title,labels,body,createdAt > /tmp/issues_open.json

# All PRs opened in the last 30 days (open + merged + closed)
gh pr list --repo benshabbat/GamesForMyKids --state all --limit 50 \
  --json number,title,state,headRefName,body,closedAt,mergedAt,url > /tmp/prs_all.json
```

### 1b. Load saved state

Read `.claude/issue-tracker-state.json`. If it does not exist, treat every issue as "new" and every PR status as unknown.

State schema:
```json
{
  "lastRun": "ISO timestamp",
  "issues": {
    "<number>": { "title": "...", "hasPR": false, "prNumber": null, "prState": null }
  },
  "prs": {
    "<number>": { "title": "...", "state": "open|merged|closed", "linkedIssue": null }
  }
}
```

### 1c. Print the report

Print a markdown table with three sections:

#### 🆕 New issues (first seen this run)
| # | Title | Label |
|---|-------|-------|
| ... | ... | ... |

#### 🔄 PR status changes
| PR # | Title | Old State → New State | Linked Issue |
|------|-------|-----------------------|--------------|
| ... | ... | ... | ... |

#### ✅ Issues that got a new PR
| Issue # | Title | PR # |
|---------|-------|------|
| ... | ... | ... |

#### 📋 Still open, no PR
| # | Title | Label |
|---|-------|-------|
| ... | ... | ... |

---

## Phase 2 — PR Opener

For **each** issue in "Still open, no PR" (from Phase 1), do the following **one at a time**:

### 2a. Parse the issue

Read the issue body. Identify:
- **Type**: refactor / types / dead-code / performance / architecture / bug
- **Location**: the exact file path(s) and line numbers mentioned
- **Action required**: what specifically needs to be changed

### 2b. Check if the work is safe to automate

Only proceed automatically if ALL of these are true:
- The issue is in the categories: `refactor`, `types`, `dead-code`, `architecture`
- The change is isolated to ≤ 3 files
- The file(s) exist at the stated path

If the issue requires broader changes or involves `performance`/`bug` labels without a clear mechanical fix, **skip it** and note "requires human review" in the report.

### 2c. Create branch

```bash
# Derive branch name from issue number + title slug
ISSUE_NUM=<number>
SLUG=$(echo "<title>" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | cut -c1-50)
LABEL=<label>  # use "refactor", "fix", "types", "chore" based on label

BRANCH="${LABEL}/${ISSUE_NUM}-${SLUG}"

cd gamesformykids
git checkout main
git pull origin main
git checkout -b "$BRANCH"
```

### 2d. Implement the fix

Follow the project's CLAUDE.md rules:
- **Grep first** — check the anti-duplicate checklist before writing new code
- Follow the exact factory patterns (`makeQuizGame`, `createChallengeStore`, `createPhaseGameHook`, etc.)
- After changes: run `npx tsc --noEmit` inside `gamesformykids/` — fix any errors before continuing
- Keep changes minimal and focused on exactly what the issue asks

### 2e. Commit and push

```bash
git add -A
git commit -m "<label>: <issue title>

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
git push origin "$BRANCH"
```

### 2f. Open the PR

```bash
gh pr create \
  --repo benshabbat/GamesForMyKids \
  --title "<label>: <issue title>" \
  --body "## Summary
<One paragraph describing what was changed and why.>

## Changes
- <bullet list of changed files and what changed>

## Testing
- [ ] `npx tsc --noEmit` passes
- [ ] Manually verified at \`http://localhost:3000/games/<affected-game>\` (if applicable)

Closes #<issue-number>

🤖 Generated with [Claude Code](https://claude.com/claude-code)" \
  --base main \
  --head "$BRANCH"
```

### 2g. Record in state

Update the in-memory state so Phase 3 can save it:
```json
"issues": { "<number>": { "hasPR": true, "prNumber": <new PR number> } }
```

---

## Phase 3 — Save State

Write the updated snapshot to `.claude/issue-tracker-state.json`:

```bash
# The agent writes this file directly using the Write tool
```

Fields to update:
- `lastRun`: current ISO timestamp
- `issues`: full map of all currently open issues + any new PR links
- `prs`: full map of all PRs seen this run with their current state

---

## Rules

- **Never push to `main`** — always create a feature branch.
- **Never open a duplicate PR** — check `prs_all.json` for existing PRs that mention `#<issue-number>` in their body before creating one.
- **Never skip `tsc --noEmit`** — a PR with TypeScript errors must not be opened.
- **One PR per issue** — if a PR already exists for an issue (open or merged), do not create another.
- **Follow CLAUDE.md** — all anti-duplicate and factory rules apply here too.
- Print a final summary after all phases complete.

---

## Final Summary Format

```
## Issue Tracker Run — <timestamp>

### Changes detected
- N new issues
- N PR status changes
- N new PRs opened

### PRs opened this run
- PR #<n>: <title> → Closes #<issue>

### Skipped (require human review)
- Issue #<n>: <title> — <reason>

### State saved to .claude/issue-tracker-state.json
```
