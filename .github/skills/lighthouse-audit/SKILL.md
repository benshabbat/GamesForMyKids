---
name: lighthouse-audit
description: "Run a Lighthouse performance and accessibility audit on GamesForMyKids, report scores, and identify regressions or quick wins. Use when: performance audit, lighthouse, slow page, accessibility issues, LCP, CLS, FID, TTI, score regression, bundle size, web vitals, a11y, WCAG."
argument-hint: "Optional: URL path to audit (e.g. '/', '/games/animals') — defaults to homepage"
---

# Lighthouse Audit

## When to Use
- "בצע audit", "run lighthouse", "check performance", "slow page", "accessibility issues"
- Before/after a PR that touches layouts, images, fonts, or large components
- Periodic health check

## Score Targets (from CI baseline)

| Metric | Target |
|---|---|
| Performance | ≥ 80 |
| Accessibility | ≥ 90 |
| Best Practices | ≥ 90 |
| SEO | ≥ 90 |

See `.github/workflows/lighthouse.yml` for the CI thresholds.

## Step 1 — Start Dev / Production Server

Lighthouse should run against the **production build** for accurate scores:

```bash
cd gamesformykids
npm run build
npm run start
# Server at http://localhost:3000
```

Or for a quick dev check (scores will be lower):
```bash
npm run dev
```

## Step 2 — Run Lighthouse CLI

```bash
npx lighthouse http://localhost:3000<PATH> \
  --output=json,html \
  --output-path=./lighthouse-report \
  --chrome-flags="--headless --no-sandbox" \
  --only-categories=performance,accessibility,best-practices,seo
```

Replace `<PATH>` with the argument (default: `/`).

## Step 3 — Parse and Report Scores

Read `lighthouse-report.report.json` and extract:
- `categories.performance.score`
- `categories.accessibility.score`
- `categories.best-practices.score`
- `categories.seo.score`

Multiply by 100 and present as a table.

## Step 4 — Identify Issues

For any category scoring below target, extract the top 3 failing audits from `audits` in the JSON (filter by `score < 1` and sort by `numericValue` descending).

### Common Performance Issues & Fixes

| Audit | Fix |
|---|---|
| `render-blocking-resources` | Move scripts to `next/script` with `strategy="lazyOnload"` |
| `uses-optimized-images` | Use `next/image` with `priority` and correct `sizes` |
| `unused-javascript` | Dynamic `import()` for heavy game components |
| `largest-contentful-paint` | Add `priority` to hero images; preload fonts |
| `total-blocking-time` | Split large client bundles; defer non-critical code |

### Common Accessibility Issues & Fixes

| Audit | Fix |
|---|---|
| `color-contrast` | Update Tailwind color classes to meet AA ratio |
| `button-name` | Add `aria-label` to icon-only buttons |
| `image-alt` | Add `alt` to all `<Image>` and `<img>` tags |
| `label` | Associate `<label>` with form inputs |
| `focus-visible` | Ensure `focus:ring` classes on interactive elements |

## Step 5 — Quick Wins vs. Tracked Issues

- **Quick win** (< 30 min fix, score gain ≥ 5): fix immediately.
- **Tracked issue**: open a GitHub issue with the audit name, current score, and suggested fix.

## Step 6 — Re-run After Fix

Re-run the audit to confirm score improvement before closing the issue.
