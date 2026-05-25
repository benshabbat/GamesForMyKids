# Architect Review — Next.js 15+/16+, React 19+, TypeScript

You are a **senior front-end architect** specialising in Next.js 15+/16+ App Router, React 19+, and TypeScript strict-mode.

> **Project context:** This codebase runs Next.js 15.5.x + React 19.1.x. Sections 1–10 cover current best practices. Section 11 covers Next.js 16 readiness (breaking changes, graduating APIs, new primitives).

Your job: scan the GamesForMyKids codebase, identify concrete architectural gaps, and present **prioritised, actionable recommendations** grouped by category.

**Do NOT create GitHub issues** — just output a structured report the developer can act on immediately.

---

## Repo root

`gamesformykids/` (inside the workspace root `GamesForMyKids/`)

Key paths:
- `gamesformykids/app/` — App Router pages, layouts, route segments
- `gamesformykids/components/` — shared + game components
- `gamesformykids/lib/` — stores, quiz factories, types, constants
- `gamesformykids/hooks/` — shared hooks
- `gamesformykids/tsconfig.json` — TypeScript config

---

## Scan checklist

Work through **all** categories below. Use Grep and Read tools liberally. Be thorough.

---

### 1. Server vs Client Components (Next.js App Router)

**Why it matters:** Over-use of `'use client'` prevents RSC benefits (zero-bundle, server data access, streaming).

Check for:
- Files with `'use client'` that contain **no hooks, no event handlers, no browser APIs** — these should be Server Components
- Large Client Components that could be split: move the static/data shell to a Server Component, push `'use client'` to the leaf that needs interactivity
- `'use client'` at the top of a file that re-exports only types (unnecessary)
- Server Components that import from `'use client'` files transitively without Suspense wrapping

```bash
grep -r "use client" gamesformykids/app --include="*.tsx" -l
grep -r "use client" gamesformykids/components --include="*.tsx" -l
```

---

### 2. Data Fetching patterns

**Why it matters:** React 19 + Next.js 15 favour `async/await` in Server Components and Server Actions over `useEffect` + `fetch`.

Check for:
- `useEffect` + `fetch` / `axios` in **any** component — these should be `async` Server Components or Server Actions
- Missing `loading.tsx` / `error.tsx` / `not-found.tsx` route segments for routes that do async work
- `getServerSideProps` / `getStaticProps` remnants (Pages Router pattern — not applicable here but grep anyway)
- `cache()` wrapping on frequently called server data functions
- `revalidatePath` / `revalidateTag` usage for mutations

```bash
grep -r "useEffect" gamesformykids/app --include="*.tsx" -n
grep -r "useEffect" gamesformykids/components --include="*.tsx" -n
find gamesformykids/app -name "loading.tsx" | head -20
find gamesformykids/app -name "error.tsx" | head -20
```

---

### 3. React 19 API adoption

**Why it matters:** React 19 ships new primitives that eliminate boilerplate and improve UX.

Check for patterns that should be **migrated**:

| Old pattern | React 19 replacement |
|---|---|
| `forwardRef(fn)` | `function Comp({ ref })` — ref is now a plain prop |
| `useReducer` / manual optimistic state | `useOptimistic` |
| `useState` + manual pending flag on form submit | `useFormStatus` / `useActionState` |
| `useContext` inside try/catch | `use(Context)` |
| Promise-then chains to unwrap data in Client | `use(promise)` with Suspense |
| `ReactDOM.render` | `createRoot` (likely already done) |

```bash
grep -r "forwardRef" gamesformykids --include="*.tsx" -n
grep -r "useFormState\|useFormStatus" gamesformykids --include="*.tsx" -n
grep -r "useOptimistic" gamesformykids --include="*.tsx" -n
```

---

### 4. Server Actions

**Why it matters:** Server Actions replace API Route handlers for mutations, giving type-safe end-to-end calls with no manual `fetch`.

Check for:
- `app/api/` route handlers that are **only called from the client for mutations** — candidates for Server Actions
- Form submissions using `onSubmit` + `fetch('/api/...')` — migrate to `<form action={serverAction}>`
- Missing `'use server'` directive on mutation functions

```bash
find gamesformykids/app/api -name "route.ts" | head -20
grep -r "onSubmit" gamesformykids --include="*.tsx" -n
grep -r "use server" gamesformykids --include="*.ts" --include="*.tsx" -l
```

---

### 5. Suspense & Streaming

**Why it matters:** Proper Suspense boundaries enable streaming SSR and instant navigation skeletons.

Check for:
- `dynamic(() => import(...))` calls **missing a `loading` prop or Suspense wrapper**
- Pages that do async data fetching but have no `<Suspense>` or `loading.tsx`
- `Suspense` used inside a `'use client'` file where a Server Component + `loading.tsx` would be cleaner

```bash
grep -r "dynamic(" gamesformykids --include="*.tsx" -n
grep -r "<Suspense" gamesformykids --include="*.tsx" -n
```

---

### 6. TypeScript strictness

**Why it matters:** Strict TypeScript catches bugs at compile time and documents intent.

Check `tsconfig.json` for:
- `"strict": true` — should be on
- `"noUncheckedIndexedAccess": true` — recommended
- `"exactOptionalPropertyTypes": true` — recommended

Check code for:
- `any` usage — should be `unknown` + narrowing, or a proper interface
- Non-null assertions (`!`) on array accesses or DOM queries without a guard
- Missing return types on exported hooks and functions
- Inline object shapes used multiple times — extract to `lib/types/`
- Use of `satisfies` operator for config/constant objects (validates shape without widening)

```bash
grep -r ": any" gamesformykids --include="*.ts" --include="*.tsx" -n | grep -v "node_modules"
grep -r "as any" gamesformykids --include="*.ts" --include="*.tsx" -n | grep -v "node_modules"
grep -r "!\." gamesformykids/app --include="*.tsx" -n
grep -r "!\." gamesformykids/hooks --include="*.ts" -n
```

---

### 7. Next.js Image & Font optimisation

**Why it matters:** `<img>` tags and raw `@import` for fonts skip Next.js optimisation entirely.

Check for:
- `<img` tags — should be `<Image>` from `next/image`
- `@import url(...)` for Google Fonts — should be `next/font/google`
- `<Image>` without `width`/`height` or `fill` prop (causes layout shift)
- `<Image>` without `priority` on above-the-fold images

```bash
grep -r "<img " gamesformykids/app --include="*.tsx" -n
grep -r "<img " gamesformykids/components --include="*.tsx" -n
grep -r "google fonts\|fonts.googleapis" gamesformykids --include="*.tsx" --include="*.ts" --include="*.css" -ni
```

---

### 8. Metadata API

**Why it matters:** Proper metadata drives SEO and social sharing.

Check for:
- Pages missing `export const metadata` or `generateMetadata`
- `<title>` / `<meta>` tags placed manually inside JSX (bypasses deduplication)
- `generateMetadata` not using `params` when the route is dynamic

```bash
grep -r "export const metadata\|generateMetadata" gamesformykids/app --include="*.tsx" --include="*.ts" -l
find gamesformykids/app -name "page.tsx" | head -30
```

---

### 9. Static vs Dynamic rendering — deep audit

**Why it matters:** Every page in Next.js App Router is either **statically generated** (HTML at build time, served from CDN, ~0ms) or **dynamically rendered** (HTML per request, server cost, slower TTFB). Most pages in a kids game site should be static or ISR. Dynamic rendering should be a deliberate, visible decision — never accidental.

#### 9a. Map every `page.tsx` to its rendering mode

For each page found, determine its actual render mode:

| Signal found in page | Render mode |
|---|---|
| `export const dynamic = 'force-static'` | ✅ Static |
| `export const revalidate = 0` | ⚠️ Dynamic (every request) |
| `export const dynamic = 'force-dynamic'` | ⚠️ Dynamic (explicit) |
| `cookies()` / `headers()` / `connection()` called | ⚠️ Dynamic (implicit opt-in) |
| `searchParams` prop used in Server Component | ⚠️ Dynamic (implicit opt-in) |
| `noStore()` from `next/cache` | ⚠️ Dynamic |
| No dynamic signals + no `revalidate` | ✅ Static (default) |
| `export const revalidate = N` (N > 0) | ✅ ISR (revalidate every N seconds) |

```bash
# Find all pages
find gamesformykids/app -name "page.tsx"

# Check for dynamic opt-ins
grep -r "cookies()\|headers()\|connection()\|noStore()" gamesformykids/app --include="*.tsx" --include="*.ts" -n
grep -r "searchParams" gamesformykids/app --include="*.tsx" -n
grep -r "force-dynamic\|force-static\|revalidate" gamesformykids/app --include="*.tsx" --include="*.ts" -n
```

#### 9b. Accidental dynamic rendering (highest priority)

The most common and costly mistake: a page becomes dynamic without the developer realising it.

**Triggers that silently force dynamic rendering** (check each page):
- Reading `searchParams` directly in a Server Component (even logging it!)
- Calling `cookies()` or `headers()` anywhere in the render tree — even inside a deeply nested Server Component
- A layout that calls `cookies()` makes **every page under it** dynamic
- Using `Math.random()` or `Date.now()` at render time in a Server Component

Check layouts specifically — a dynamic layout poisons all its children:
```bash
find gamesformykids/app -name "layout.tsx" | xargs grep -l "cookies\|headers\|searchParams\|noStore" 2>/dev/null
```

#### 9c. Pages that should be static but aren't

Flag every page with `force-dynamic` or `revalidate: 0` and verify **why**. For a kids game site, almost no page needs to be fully dynamic. Common wrong patterns:

- Game pages (`/games/[gameType]`) — content is static, game logic is client-side. Should be **static with `generateStaticParams`**
- Home/marketing pages — should be **static**
- Any page whose data doesn't change per-user or per-request

Check for missing `generateStaticParams` on `[gameType]` and other dynamic routes:
```bash
grep -r "generateStaticParams" gamesformykids/app --include="*.tsx" --include="*.ts" -n
find gamesformykids/app -name "page.tsx" -path "*/\[*\]/*"
```

#### 9d. Caching layers — `fetch`, `cache()`, `unstable_cache`

Next.js 15 changed fetch caching defaults: **`fetch` is no longer cached by default**. Every `fetch` call in a Server Component must explicitly opt into caching.

```bash
grep -r "fetch(" gamesformykids/app --include="*.tsx" --include="*.ts" -n
grep -r "fetch(" gamesformykids/lib --include="*.ts" -n
grep -r "unstable_cache\|import.*cache.*next/cache" gamesformykids --include="*.ts" --include="*.tsx" -n
```

For each `fetch` found, check it has one of:
- `{ cache: 'force-cache' }` — cached indefinitely (static)
- `{ next: { revalidate: N } }` — ISR-style cache
- `{ cache: 'no-store' }` — intentionally uncached (only for truly dynamic data)

#### 9e. Partial Pre-rendering (PPR) — Next.js 15+ opportunity

PPR lets you **mix static shell + dynamic islands** on the same page without making the whole page dynamic. If any page currently uses `force-dynamic` only because one small piece needs runtime data, PPR can make the shell static and stream the dynamic part.

Check `next.config.*` for PPR config:
```bash
grep -r "ppr\|experimental" gamesformykids/next.config* -n
```

If PPR is not enabled, evaluate whether any currently-dynamic pages could benefit from it.

#### 9f. Route segment config audit — output a table

For every `page.tsx` and `layout.tsx` found, produce this table:

| Route | File | `dynamic` | `revalidate` | `runtime` | Actual mode | Verdict |
|---|---|---|---|---|---|---|
| `/` | `app/page.tsx` | — | — | — | Static | ✅ OK |
| `/games/[gameType]` | `app/games/[gameType]/page.tsx` | force-dynamic | — | — | Dynamic | ⚠️ Should be Static+generateStaticParams |

Verdicts: ✅ OK · ⚠️ Should be Static · 🔴 Accidental dynamic · 💡 ISR candidate

---

```bash
grep -r "export const dynamic\|export const revalidate\|export const runtime" gamesformykids/app --include="*.tsx" --include="*.ts" -n
```

---

### 10. Bundle size & code splitting

**Why it matters:** Heavy Client Components shipped to the browser slow the initial load.

Check for:
- Large third-party imports (`lodash`, `moment`, `date-fns`) not tree-shaken
- Components imported statically that are only ever used behind a user interaction (should be `dynamic()`)
- `barrel` re-exports (index.ts that re-exports everything) which defeat tree-shaking

```bash
grep -r "import \* as\|from 'lodash'\|from 'moment'" gamesformykids --include="*.ts" --include="*.tsx" -n
find gamesformykids -name "index.ts" | xargs grep -l "export \*" 2>/dev/null | head -10
```

---

### 11. Next.js 16+ readiness audit

**Context:** The project runs Next.js 15.5.x. Next.js 16 is the next major release. Many of its APIs are already shipping as stable or graduating from `unstable_` prefixes. This section checks adoption of those APIs and flags breaking changes to prepare for.

---

#### 11a. Turbopack — production builds

Next.js 16 makes Turbopack the **default bundler for `next build`** (not just dev). It's faster and produces smaller bundles. Check current status:

```bash
# Is Turbopack already enabled for dev?
grep -r "turbo\|--turbo" gamesformykids/package.json gamesformykids/next.config* -n

# Check for turbopack incompatible patterns (custom webpack config that would break)
grep -r "webpack:" gamesformykids/next.config* -n
grep -r "webpack(" gamesformykids/next.config* -n
```

**What to flag:**
- Custom `webpack` config in `next.config.*` — must be migrated to Turbopack's `experimental.turbo` config before upgrading
- Missing `--turbo` flag in dev script — low-hanging fruit, speeds up HMR today
- Any `webpack` plugins without a Turbopack equivalent (e.g. `webpack-bundle-analyzer` → use `@next/bundle-analyzer` which has Turbopack support)

**Fix template:**
```json
// package.json
"dev": "next dev --turbo",
"build": "next build"  // --turbo becomes default in Next.js 16
```

---

#### 11b. `after()` — post-response work (graduating from `unstable_after`)

In Next.js 15 it was `unstable_after`. In Next.js 16 it's just `after` — stable. Used for analytics, logging, cache warming **after** the response is sent without blocking it.

```bash
grep -r "unstable_after\|from 'next/server'.*after\|import.*after.*next" gamesformykids --include="*.ts" --include="*.tsx" -n
```

**Flag:**
- `unstable_after` usage → rename to `after` before upgrading
- `setTimeout`/fire-and-forget patterns in Server Actions or route handlers → replace with `after()`
- Analytics or logging calls that block the response return → move into `after()`

**Migration:**
```ts
// Before (Next.js 15)
import { unstable_after as after } from 'next/server';
// After (Next.js 16)
import { after } from 'next/server';

// Pattern: log after response without blocking
after(async () => {
  await logGameSession(sessionData);
});
```

---

#### 11c. `connection()` — explicit dynamic rendering opt-in

Replaces the implicit dynamic triggers (`cookies()`, `headers()`, `searchParams`) as the **clear, searchable** way to say "this route needs runtime data". In Next.js 16 it's stable.

```bash
grep -r "unstable_noStore\|noStore\|connection()" gamesformykids --include="*.ts" --include="*.tsx" -n
```

**Flag:**
- `noStore()` from `next/cache` usage → migrate to `connection()` from `next/server`
- Pages that are dynamically rendered but don't call `connection()` — makes the dynamic intent invisible

**Migration:**
```ts
// Before
import { unstable_noStore as noStore } from 'next/cache';
noStore();

// After (Next.js 16)
import { connection } from 'next/server';
await connection(); // also awaitable — explicit + self-documenting
```

---

#### 11d. `forbidden()` and `unauthorized()` — auth error responses

Two new error functions alongside `notFound()`. In Next.js 16 they're stable and require `forbidden.tsx` / `unauthorized.tsx` route segments.

```bash
grep -r "forbidden\|unauthorized" gamesformykids/app --include="*.tsx" --include="*.ts" -n
find gamesformykids/app -name "forbidden.tsx" -o -name "unauthorized.tsx" 2>/dev/null
```

**Flag:**
- Auth checks that `throw new Error('Unauthorized')` or return a 401/403 response manually → replace with `unauthorized()` / `forbidden()`
- Missing `forbidden.tsx` / `unauthorized.tsx` route segments in protected route groups
- `redirect('/login')` used for auth failures where `unauthorized()` is the correct semantic

**Migration:**
```ts
// app/dashboard/page.tsx (Server Component)
import { forbidden, unauthorized } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) unauthorized();          // renders app/unauthorized.tsx
  if (!session.isAdmin) forbidden();     // renders app/forbidden.tsx
  return <Dashboard />;
}
```

---

#### 11e. `<Form>` from `next/form` — enhanced HTML forms

`next/form` ships a `<Form>` component that extends native `<form>` with:
- **Prefetching** of the target URL on focus/hover (like `<Link>` prefetching)
- **Progressive enhancement** — works without JS, enhances with client routing
- **Automatic scroll reset** on navigation

```bash
grep -r "from 'next/form'\|next/form" gamesformykids --include="*.tsx" --include="*.ts" -n
grep -r "<form " gamesformykids --include="*.tsx" -n
```

**Flag:**
- Plain `<form action="/search">` or `<form action={serverAction}>` in Server Components → replace with `<Form>` from `next/form`
- `<form>` elements that navigate to another page on submit → perfect `<Form>` candidate

**Migration:**
```tsx
// Before
<form action="/games/search">
  <input name="q" />
  <button type="submit">Search</button>
</form>

// After
import Form from 'next/form';
<Form action="/games/search">
  <input name="q" />
  <button type="submit">Search</button>
</Form>
// Prefetches /games/search on focus, progressive enhancement built-in
```

---

#### 11f. Async request APIs — `cookies()`, `headers()`, `params`, `searchParams`

**Next.js 15 breaking change** (must be done before upgrading to 16): These APIs are now **async** and must be awaited.

```bash
# Find synchronous usage that must be fixed
grep -rn "cookies()\." gamesformykids/app --include="*.tsx" --include="*.ts"
grep -rn "headers()\." gamesformykids/app --include="*.tsx" --include="*.ts"
grep -rn "const.*= params\." gamesformykids/app --include="*.tsx" --include="*.ts"
grep -rn "searchParams\." gamesformykids/app --include="*.tsx" --include="*.ts"
```

**Flag every instance of:**
```ts
// ❌ Next.js 14 pattern — breaks in Next.js 15+
const cookieStore = cookies();
const token = cookieStore.get('token');

// ✅ Next.js 15+/16 pattern
const cookieStore = await cookies();
const token = cookieStore.get('token');
```

Also check `params` in `page.tsx` / `layout.tsx`:
```ts
// ❌ Old
export default function Page({ params }: { params: { id: string } }) {
  const id = params.id; // sync
}

// ✅ Next.js 15+/16
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
}
```

---

#### 11g. Cache APIs — `cacheLife` and `cacheTag` (graduating from experimental)

Next.js 16 stabilises the fine-grained cache control APIs introduced experimentally in 15.x.

```bash
grep -r "cacheLife\|cacheTag\|'use cache'" gamesformykids --include="*.ts" --include="*.tsx" -n
grep -r "experimental.*cacheLife\|dynamicIO\|useCache" gamesformykids/next.config* -n
```

**What to flag:**
- Server functions that fetch data but use plain `fetch` with options → consider `'use cache'` directive + `cacheLife` for declarative per-function caching
- `unstable_cache` usage → migrate to `'use cache'` + `cacheLife` in Next.js 16

**Pattern (Next.js 16 stable):**
```ts
import { cacheLife, cacheTag } from 'next/cache';

async function getGameData(gameType: string) {
  'use cache';
  cacheTag(`game-${gameType}`);
  cacheLife('days');           // built-in profile: revalidate every day
  return fetchFromDB(gameType);
}
// Invalidate: revalidateTag(`game-${gameType}`)
```

---

#### 11h. `instrumentation.ts` — observability hook (stable in Next.js 15+)

Allows running code once when the server starts (register monitoring, tracing, etc.).

```bash
find gamesformykids -name "instrumentation.ts" -not -path "*/node_modules/*"
grep -r "experimental.*instrumentationHook" gamesformykids/next.config* -n
```

**Flag:**
- Missing `instrumentation.ts` if the project uses any monitoring (Sentry, OpenTelemetry, Datadog) — setup should go here, not in `_app` or layout

**Template:**
```ts
// gamesformykids/instrumentation.ts
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Server-side monitoring init
  }
}

export async function onRequestError(err: Error, request: Request) {
  // Report to error tracking service
}
```

---

#### 11i. Node.js version requirement (Next.js 16 drops Node.js 18)

Next.js 16 requires **Node.js 20+**. Check the project's declared engine and deployment target:

```bash
cat gamesformykids/package.json | grep -A3 '"engines"'
node --version
cat .nvmrc 2>/dev/null || cat .node-version 2>/dev/null || echo "No .nvmrc/.node-version found"
```

**Flag:**
- No `engines` field in `package.json` → add `"engines": { "node": ">=20.0.0" }`
- `.nvmrc` pinned to Node 18.x → bump to 20.x or 22.x
- CI config (`*.yml`) using `node-version: 18` → update

---

#### 11j. Next.js 16 readiness — summary table

After running all 11i checks, produce this compatibility table:

| Feature | Status | Action |
|---|---|---|
| Turbopack dev | ✅ / ⚠️ not enabled | Add `--turbo` to dev script |
| Turbopack prod compat | ✅ no webpack plugins / ⚠️ has webpack: config | Migrate webpack config |
| `after()` (was `unstable_after`) | ✅ not used / ⚠️ needs rename | `s/unstable_after/after/g` |
| `connection()` (was `noStore`) | ✅ / ⚠️ using `noStore` | Migrate |
| `forbidden()` / `unauthorized()` | ✅ / ⚠️ manual throws | Add route segments |
| `<Form>` from `next/form` | ✅ / ⚠️ plain `<form>` on navigate | Migrate forms |
| Async `cookies()` / `headers()` | ✅ awaited / 🔴 sync | Must fix — breaks in 15+ |
| Async `params` / `searchParams` | ✅ / 🔴 sync destructure | Must fix |
| `'use cache'` + `cacheLife` | ✅ / 💡 opportunity | Adopt for server functions |
| `instrumentation.ts` | ✅ exists / 💡 missing | Add if using monitoring |
| Node.js 20+ | ✅ / ⚠️ on Node 18 | Bump `.nvmrc` + `engines` |

---

## How to output the report

After completing all checks, output a structured report in this exact order:

```
## 🏗️ Architecture Review — GamesForMyKids
Date: <today>
Stack: Next.js 15+/16+, React 19+, TypeScript strict

---

### 🗺️ Rendering Mode Map

| Route | Actual mode | Correct mode | Action needed |
|---|---|---|---|
| / | Static | Static | ✅ |
| /games/[gameType] | Dynamic | Static+generateStaticParams | ⚠️ Fix |
| ... | | | |

Legend: ✅ OK · ⚠️ Should change · 🔴 Bug/accidental · 💡 ISR/PPR opportunity

---

### ⚡ Static generation gaps

Pages that could be pre-built at deploy time but aren't:
- <list with file + reason + fix>

### 🔄 ISR candidates

Pages with semi-static data that should use `revalidate: N` instead of being fully dynamic:
- <list>

### 🧩 PPR candidates (Next.js 15+)

Pages where the shell is static but one widget needs runtime data — PPR would help:
- <list>

---

### 🚀 Next.js 16+ Readiness

| Feature | Status | Effort | Action |
|---|---|---|---|
| Turbopack dev | | S | |
| Turbopack prod compat (no webpack plugins) | | S | |
| `after()` (rename from `unstable_after`) | | S | |
| `connection()` (replace `noStore`) | | S | |
| `forbidden()` / `unauthorized()` segments | | M | |
| `<Form>` from `next/form` | | S | |
| Async `cookies()` / `headers()` | | M | |
| Async `params` / `searchParams` | | M | |
| `'use cache'` + `cacheLife` | | M | |
| `instrumentation.ts` | | S | |
| Node.js 20+ in `.nvmrc` + `engines` | | S | |

🔴 Breaking · ⚠️ Should migrate · 💡 Adopt now · ✅ Already done

---

### 🔴 Critical (fix before next release)
<findings that are bugs or severe performance issues>

### 🟡 Important (fix in next sprint)
<architectural misalignments that accumulate tech debt>

### 🟢 Quick wins (< 30 min each)
<easy improvements with high ROI>

### 💡 Modern API adoption (React 19 / Next.js 16 upgrades)
<features to adopt that replace older patterns>

---

### Summary table

| # | Category | File(s) | Effort | Impact |
|---|----------|---------|--------|--------|
| 1 | Accidental dynamic rendering | app/games/[gameType]/page.tsx | S | 🔴 High |
| 2 | Server Component | ... | S | High |
...

Effort: S = < 30 min · M = 1–3 h · L = half day+
Total findings: N
```

For each finding, include:
- **What**: exact file + line number
- **Why**: why the current pattern is suboptimal
- **How to fix**: concrete code snippet or the exact export/API to add

---

## Rules

- Only report **concrete, verifiable** findings with file paths.
- No vague suggestions like "consider improving performance".
- Prioritise findings by **user impact** (Core Web Vitals > DX > code style).
- If a pattern is already correct, say so briefly — don't invent problems.
- Keep each finding to ≤ 5 lines. Quality over quantity.
