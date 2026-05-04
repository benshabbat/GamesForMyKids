---
name: next-react-architect
description: "Architect and implement scalable Next.js 15+ (App Router), TypeScript, and React 19 solutions in GamesForMyKids. Use when: planning app architecture, designing folder/module boundaries, creating reusable hooks/components, selecting server vs client boundaries, improving performance, state strategy, routing/layout design, and production hardening."
argument-hint: "Optional: focus area (e.g. 'app-router', 'state-management', 'performance', 'server-client-boundaries', 'all')"
---

# Next.js 15+ + React 19 Architecture Skill

## When to Use
- Designing or refactoring feature architecture in `app/`, `components/`, `hooks/`, `lib/`
- Defining server/client component boundaries for App Router pages
- Planning state ownership (`zustand`, local component state, URL state, server state)
- Improving rendering performance, bundle size, and hydration behavior
- Establishing scalable TypeScript patterns and module contracts
- Reviewing large game feature additions before implementation

## Core Principles
1. App Router first: co-locate route concerns under `app/` and keep route segments minimal.
2. Server by default: render on the server unless browser APIs or interaction require a client boundary.
3. Thin client boundaries: isolate `"use client"` to the smallest interactive islands.
4. State at the right level: derive where possible, centralize only when cross-screen or persistent.
5. Types as contracts: define narrow, explicit interfaces for props, stores, and service functions.
6. Performance as a feature: avoid unnecessary re-renders, eagerly split heavy UI, and cache intentionally.

## Decision Framework

### 1) Server vs Client Components
Use Server Components when:
- Rendering static or data-driven UI that does not need browser-only APIs
- Composing layouts/pages and passing serializable props down

Use Client Components when:
- Using event handlers, refs, effects, browser APIs, canvas/audio controls
- Integrating Zustand stores or animation libraries in interactive game surfaces

Rule of thumb:
- Keep data shaping and route orchestration in Server Components
- Keep interaction and immediate UX feedback in Client Components

### 2) State Management Strategy
Prefer this order:
1. Derived render state in component scope
2. Lifted state in nearest shared parent
3. URL/search params for shareable navigation state
4. Zustand for cross-component runtime state or persisted gameplay/session state

For Zustand stores:
- Keep slices small and domain-based
- Expose selectors/hooks to avoid broad subscriptions
- Keep actions deterministic and testable
- Use a clear `INITIAL_STATE` and explicit `reset`

### 3) Data and Caching
- Fetch on server where possible
- Use explicit cache intent per use case (dynamic vs static expectations)
- Keep API wrappers in `lib/` and route handlers focused
- Validate data at boundaries and map to typed view models

### 4) Routing and Layouts
- Use nested layouts only when they own shared UI/state for a route subtree
- Keep route segment naming consistent and feature-oriented
- Use route groups to organize without affecting URL when needed
- Keep loading/error boundaries close to failure or latency hotspots

### 5) Performance Guardrails
- Prefer memoized selectors over broad store subscriptions
- Avoid passing unstable inline objects/functions through deep trees
- Split heavy game/client modules with lazy loading when practical
- Measure before/after with clear performance goals

## Implementation Checklist
- [ ] Feature boundaries are clear (`app` route, domain hooks, UI components, lib utilities)
- [ ] Server/client split is intentional and minimal
- [ ] State location follows ownership and sharing needs
- [ ] Types are explicit at module boundaries
- [ ] Error/loading UX paths are defined
- [ ] Tests cover core state/actions and critical rendering behavior

## Review Output Format
When using this skill, return:
1. Proposed architecture (short)
2. File-level plan (exact paths)
3. Key trade-offs and rationale
4. Risks/regressions to watch
5. Suggested tests to add/update

## Project-Specific Conventions (GamesForMyKids)
- Prefer reuse from shared domains before introducing new abstractions:
  - `hooks/games/`
  - `components/game/`
  - `lib/stores/`
  - `lib/registry/`
- Keep game-specific logic local to each game route unless at least 3 games share a stable pattern
- For new shared abstractions, define migration steps and avoid wide breaking changes in one PR
