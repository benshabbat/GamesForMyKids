#!/usr/bin/env node
/**
 * ===============================================
 * First-load JS budget check
 * ===============================================
 *
 * The CI bundle-size job used to run `ANALYZE=true next build` and upload the
 * analyzer HTML as an artifact — useful for a human who goes looking, but it
 * asserts nothing, so a change that doubles a route's JS passes CI green.
 *
 * This script turns that artifact into a gate. For each app route it unions
 * every client chunk the route pulls in on first load, sums their gzipped size,
 * and fails when a route exceeds its budget in bundle-budget.json.
 *
 * Usage:
 *   node scripts/check-bundle-size.mjs            # check against budgets
 *   node scripts/check-bundle-size.mjs --report   # print sizes, never fail
 *
 * Must run after `next build` — it reads .next/, it does not build.
 *
 * Measurement note: the number is an upper bound on first-load JS (route entry
 * chunks ∪ root chunks ∪ polyfills), not Next's own "First Load JS" column.
 * The two use different accounting, so don't expect them to match — what
 * matters for a gate is that this is computed identically on every run, so a
 * change in the number means a real change in what the browser downloads.
 */

import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const NEXT_DIR = join(ROOT, '.next');
const APP_DIR = join(NEXT_DIR, 'server', 'app');
const BUDGET_FILE = join(ROOT, 'bundle-budget.json');
const REPORT_ONLY = process.argv.includes('--report');

const KB = 1024;

function fail(message) {
  console.error(`\n✖ ${message}\n`);
  process.exit(1);
}

/** Every `*_client-reference-manifest.js` under .next/server/app, recursively. */
function findRouteManifests(dir) {
  const found = [];

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      found.push(...findRouteManifests(path));
    } else if (entry.name.endsWith('_client-reference-manifest.js')) {
      found.push(path);
    }
  }

  return found;
}

/**
 * The manifest is a JS file that assigns onto `globalThis.__RSC_MANIFEST`, so
 * it has to be executed rather than parsed. It's our own build output, run in a
 * throwaway scope with only the globals it touches.
 */
function loadRouteManifest(path) {
  const source = readFileSync(path, 'utf8');
  const scope = { __RSC_MANIFEST: {} };
  scope.self = scope;
  scope.globalThis = scope;

  new Function('globalThis', 'self', source)(scope, scope);

  return scope.__RSC_MANIFEST;
}

const gzipCache = new Map();

/** Gzipped size on disk, in bytes — gzip because that's what users download. */
function gzippedSize(relativePath) {
  if (gzipCache.has(relativePath)) return gzipCache.get(relativePath);

  const absolute = join(NEXT_DIR, relativePath);
  let size = 0;

  if (existsSync(absolute) && statSync(absolute).isFile()) {
    size = gzipSync(readFileSync(absolute)).length;
  }
  // A manifest entry with no file on disk is normal for some virtual chunks;
  // counting it as 0 is right, since there's nothing to download.

  gzipCache.set(relativePath, size);
  return size;
}

/** Chunks every route pays for, regardless of which route it is. */
function sharedChunks() {
  const manifestPath = join(NEXT_DIR, 'build-manifest.json');
  if (!existsSync(manifestPath)) return [];

  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  return [...(manifest.rootMainFiles ?? []), ...(manifest.polyfillFiles ?? [])];
}

/** "/games/[gameType]/page" -> "/games/[gameType]"; "/page" -> "/" */
function routeName(manifestKey) {
  const withoutSuffix = manifestKey.replace(/\/(page|route)$/, '');
  return withoutSuffix === '' ? '/' : withoutSuffix;
}

function readBudgets() {
  if (!existsSync(BUDGET_FILE)) fail(`No budget file at ${BUDGET_FILE}.`);

  const budget = JSON.parse(readFileSync(BUDGET_FILE, 'utf8'));

  if (typeof budget.default !== 'number') {
    fail('bundle-budget.json must define a numeric "default" budget in KB.');
  }

  return { defaultKb: budget.default, routes: budget.routes ?? {} };
}

function measureRoutes() {
  if (!existsSync(APP_DIR)) {
    fail(`No app build output at ${APP_DIR}.\n  Run \`npm run build\` before this script.`);
  }

  const shared = sharedChunks();
  const byRoute = new Map();

  for (const manifestPath of findRouteManifests(APP_DIR)) {
    const manifest = loadRouteManifest(manifestPath);

    for (const [key, entry] of Object.entries(manifest)) {
      // Route handlers (/api/**, sitemap.xml, opengraph-image) ship no client
      // JS — measuring them just reports the shared root chunks under an API
      // path, which is noise in a first-load-JS table.
      if (!key.endsWith('/page')) continue;

      // Union, not sum: a chunk shared between two entries of the same route is
      // downloaded once, so counting it twice would overstate the route.
      const chunks = new Set(shared);

      for (const files of Object.values(entry.entryJSFiles ?? {})) {
        for (const file of files) {
          if (typeof file === 'string' && file.endsWith('.js')) chunks.add(file);
        }
      }

      const bytes = [...chunks].reduce((total, file) => total + gzippedSize(file), 0);
      const route = routeName(key);

      // Static params mean many manifests can map to one dynamic route; keep
      // the largest, since that's the one that has to fit the budget.
      const previous = byRoute.get(route);
      if (!previous || bytes > previous) byRoute.set(route, bytes);
    }
  }

  if (byRoute.size === 0) {
    fail(
      'Found no client-reference manifests to measure.\n' +
        '  The Next.js build output shape likely changed — update this script.',
    );
  }

  return [...byRoute.entries()]
    .map(([route, bytes]) => ({ route, kb: bytes / KB }))
    .sort((a, b) => b.kb - a.kb);
}

function main() {
  const { defaultKb, routes: routeBudgets } = readBudgets();
  const measured = measureRoutes().map((entry) => ({
    ...entry,
    budgetKb: routeBudgets[entry.route] ?? defaultKb,
  }));

  const width = Math.max(...measured.map((entry) => entry.route.length), 'route'.length);

  console.log('\nFirst-load JS (gzipped)\n');
  console.log(`  ${'route'.padEnd(width)}  ${'size'.padStart(9)}  ${'budget'.padStart(9)}`);
  console.log(`  ${'-'.repeat(width)}  ${'-'.repeat(9)}  ${'-'.repeat(9)}`);

  const over = [];

  for (const entry of measured) {
    const isOver = entry.kb > entry.budgetKb;
    if (isOver) over.push(entry);

    console.log(
      `${isOver ? '✖' : ' '} ${entry.route.padEnd(width)}  ` +
        `${`${entry.kb.toFixed(1)} KB`.padStart(9)}  ${`${entry.budgetKb} KB`.padStart(9)}`,
    );
  }

  const largest = measured[0];
  console.log(
    `\n  ${measured.length} routes, largest is ${largest.route} at ${largest.kb.toFixed(1)} KB.`,
  );

  if (REPORT_ONLY) {
    console.log('  (--report: budgets not enforced)\n');
    return;
  }

  if (over.length > 0) {
    const details = over
      .map((entry) => `    ${entry.route}: ${entry.kb.toFixed(1)} KB > ${entry.budgetKb} KB`)
      .join('\n');

    fail(
      `${over.length} route(s) over budget:\n${details}\n\n` +
        '  Either trim the route (dynamic import, drop a dependency) or, if the\n' +
        '  growth is intentional, raise its entry in bundle-budget.json in the\n' +
        '  same commit so the increase is reviewed rather than silent.',
    );
  }

  console.log('  All routes within budget.\n');
}

main();
