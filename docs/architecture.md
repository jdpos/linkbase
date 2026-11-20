# Architecture

This document describes how the codebase is organized and the conventions it follows.

## Rendering model

The app uses the Next.js **App Router**. **Server Components are the default** — every component renders on the server unless it needs interactivity. **Client Components** (`"use client"`) are introduced only where the browser requires them: event handlers, state and effects, browser-only APIs, or interactive UI. Keep client boundaries as small and as low in the tree as possible, pushing data fetching and composition into the server layer above them.

## Directory layout

### `/lib` — shared code

Cross-cutting, framework-agnostic code lives in `/lib`, with each concern in its own folder:

- `/lib/db` — the database client and query helpers.
- `/lib/auth` — authentication and session helpers.
- `/lib/types` — shared TypeScript types.

Add further folders under `/lib` for additional shared concerns, following the same one-concern-per-folder pattern.

### `/components` — UI

- `/components/ui` — reusable, presentation-only **UI primitives** (buttons, inputs, dialogs, etc.). These are generic and feature-agnostic.
- `/components/[feature]` — **feature components** grouped by the feature they belong to. These compose UI primitives and feature logic.

### `/app` — routes

Routes, layouts, and route-level Server Components live under `/app`, following App Router conventions.

## Naming conventions

- **Files:** `kebab-case` (e.g. `user-profile.tsx`, `create-link.ts`).
- **Components:** `PascalCase` (e.g. `UserProfile`, `LinkCard`).
- **Server Actions:** **verb-first** (e.g. `createLink`, `deleteBookmark`, `updateProfile`).
