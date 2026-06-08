---
description: Senior Next.js 16 + TypeScript advisor — scans the codebase for Next.js 16 anti-patterns and applies fixes automatically on every invocation.
---

You are a **senior Next.js 16 architect**. Every time this skill runs, you:
1. Scan the GamesForMyKids codebase for Next.js 16 anti-patterns
2. Apply every fix you find
3. Report a concise summary of what changed and what was already correct

**Repo root:** `gamesformykids/` inside the workspace root `GamesForMyKids/`

---

## Step 1 — Run all scans in parallel

Run these grep commands before touching any file:

```bash
# A. Deprecated cache/server APIs
grep -rn "unstable_after\|unstable_cache\|unstable_noStore\|noStore(" \
  gamesformykids --include="*.ts" --include="*.tsx" | grep -v node_modules

# B. Dynamic pages missing connection()
#    Find pages that call cookies/headers/supabase but have no connection()
grep -rn "createClient\|cookies()\|headers()" \
  gamesformykids/app --include="*.tsx" | grep -v node_modules

grep -rn "connection()" \
  gamesformykids/app --include="*.tsx" | grep -v node_modules

# C. Auth errors done manually (should be unauthorized()/forbidden())
grep -rn "Response.*401\|Response.*403\|redirect.*login\|throw.*Unauthorized\|throw.*Forbidden" \
  gamesformykids/app --include="*.ts" --include="*.tsx" | grep -v node_modules

# D. Plain <form> that navigates on submit (should be <Form> from next/form)
grep -rn "<form " gamesformykids/app gamesformykids/components \
  --include="*.tsx" | grep -v node_modules

# E. Turbopack — check dev script
grep -n "\"dev\"" gamesformykids/package.json

# F. Node engines field
grep -A2 "\"engines\"" gamesformykids/package.json

# G. Missing unauthorized.tsx / forbidden.tsx
ls gamesformykids/app/unauthorized.tsx gamesformykids/app/forbidden.tsx 2>/dev/null || echo "MISSING"

# H. webpack config (should be migrated to turbo)
grep -n "webpack:" gamesformykids/next.config* 2>/dev/null

# I. unstable_cache still in use
grep -rn "unstable_cache" gamesformykids --include="*.ts" --include="*.tsx" | grep -v node_modules
```

---

## Step 2 — Apply every fix found

For each finding, apply the fix immediately using Edit. Do not ask for confirmation.

### Fix A — Deprecated APIs

| Old | New | Import from |
|---|---|---|
| `unstable_after` | `after` | `next/server` |
| `unstable_cache(...)` | `'use cache'` + `cacheLife` + `cacheTag` | `next/cache` |
| `noStore()` / `unstable_noStore()` | `await connection()` | `next/server` |

### Fix B — Dynamic pages missing `connection()`

Any Server Component page that calls `createClient()`, `cookies()`, or `headers()` is implicitly dynamic.
Add `await connection()` as the **first line** of the page function, and add the import.

```tsx
import { connection } from 'next/server';

export default async function SomePage() {
  await connection(); // ← first line — explicit dynamic intent
  const supabase = await createClient();
  // ...
}
```

### Fix C — Manual auth errors

Replace `redirect('/login')` / manual 401-403 Response / thrown errors inside Server Components with:
```tsx
import { unauthorized, forbidden } from 'next/navigation';
if (!session) unauthorized();
if (!session.isAdmin) forbidden();
```
Only do this inside Server Components — not in middleware (middleware redirect to /login is correct there).

### Fix D — Plain `<form>` that navigates

If a `<form action="/some-path">` navigates to another page on submit, replace with:
```tsx
import Form from 'next/form';
<Form action="/some-path">...</Form>
```
Skip: forms that submit to Server Actions (those stay as `<form action={serverAction}>`).

### Fix E — Dev script

If the dev script is missing `--turbopack` or `--turbo`, add it:
```json
"dev": "next dev --turbopack"
```

### Fix F — Node engines

If `"engines"` is missing from `package.json`, add:
```json
"engines": { "node": ">=20.0.0" }
```

### Fix G — Missing route segments

If `app/unauthorized.tsx` or `app/forbidden.tsx` is missing and `unauthorized()`/`forbidden()` is used anywhere, create minimal route segments:

```tsx
// app/unauthorized.tsx
export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">401</h1>
        <p className="text-lg text-gray-600">אין הרשאה לצפות בעמוד זה</p>
      </div>
    </div>
  );
}
```

### Fix H — webpack config in next.config

If `webpack:` exists, flag it as a comment in the report — do NOT delete it automatically (requires manual migration to `experimental.turbo`).

---

## Step 3 — TypeScript check

After all edits:
```bash
cd gamesformykids && npx tsc --noEmit
```
Fix any TypeScript errors introduced by the changes.

---

## Step 4 — Output a concise report

```
## Next.js 16 Sweep — <date>

### Fixed
- [file:line] description of what changed

### Already correct
- brief list of patterns already using Next.js 16 APIs

### Manual action needed
- anything that requires human judgment (e.g. webpack migration)

TypeScript: ✅ clean / 🔴 N errors
```

Keep findings to one line each. No verbose explanations — the code speaks.

---

## Reference — Next.js 16 stable APIs (for fixes above)

| API | Import | Replaces |
|---|---|---|
| `after()` | `next/server` | `unstable_after`, setTimeout fire-and-forget |
| `connection()` | `next/server` | `noStore()`, implicit dynamic |
| `unauthorized()` | `next/navigation` | manual 401, redirect('/login') in pages |
| `forbidden()` | `next/navigation` | manual 403 |
| `<Form>` | `next/form` | `<form>` on navigation submits |
| `'use cache'` + `cacheLife` | `next/cache` | `unstable_cache`, fetch cache options |
| `cacheTag` | `next/cache` | manual cache keys |
