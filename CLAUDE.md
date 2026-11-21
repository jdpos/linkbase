# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

As of this writing the app is an unmodified `create-next-app` scaffold — `src/app/page.tsx` is still the default template page. There is no custom application code, routing, data layer, or test setup yet.

## Commands

- `npm run dev` — start the dev server (Turbopack) at http://localhost:3000
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — ESLint (flat config, `eslint.config.mjs`)

No test runner is configured.

## Next.js 16 — read before writing code

This project uses **Next.js 16.4.6**, which has breaking changes from earlier versions; APIs, conventions, and file structure may differ from older knowledge. Before writing or changing app code, read the relevant guide in `node_modules/next/dist/docs/`. This mirrors `AGENTS.md`, which `next dev` regenerates automatically — commit it alongside your changes rather than deleting it.

Conventions already in use that reflect Next 16:
- **Typed route props**: layouts/pages use generated helpers like `LayoutProps<"/">` (see `src/app/layout.tsx`) instead of hand-written prop types.
- **`next.config.ts`** enables `cacheComponents` and `partialPrefetching`, and wires the Tailwind Turbopack loader. Keep these in mind when reasoning about caching and prefetch behavior.

## Live Docs (Context7)

Before writing code that uses Next.js, Mongoose, NextAuth, Zod, or any other third-party library, pull its current docs through the Context7 MCP server (`resolve-library-id`, then `query-docs`). Do **not** rely on training data for API signatures, configuration options, or version-specific behavior. Match the query to the version in `package.json`.

- For Next.js, also check the bundled guides in `node_modules/next/dist/docs/` (see above). They match the installed version exactly, so they win if the two disagree.
- If Context7 has no entry for a library, or the entry doesn't cover the installed version, say so before going ahead. Then name the fallback you're using (bundled docs, the package's README/types in `node_modules`, or the official site).

## Styling

- **Tailwind CSS v4**, configured CSS-first in `src/app/globals.css` via `@import "tailwindcss"` and an `@theme inline { ... }` block. There is **no `tailwind.config.js`** — add theme tokens in `globals.css`.
- Dark mode is driven by `prefers-color-scheme` (CSS custom properties `--background` / `--foreground`).
- Fonts (Geist Sans/Mono) are loaded via `next/font/google` in `layout.tsx` and exposed as the `--font-sans` / `--font-mono` theme variables.

## Imports

TypeScript path alias `@/*` maps to `src/*` (see `tsconfig.json`).

## Claude Code Setup

Project config lives in `.claude/` and is committed, except `settings.local.json`. Launch Claude Code from this directory (`linkbase/`) so `$CLAUDE_PROJECT_DIR` resolves here and the hooks fire.

- `.claude/settings.json` — registers hooks and enabled plugins (`commit-commands`).
- `.claude/settings.local.json` — personal permission allowlist (gitignored, not shared). Put machine- or user-specific settings here, not in `settings.json`.
- `.claude/hooks/protect-env-files.js` — `PreToolUse` hook on Edit/MultiEdit/Write/NotebookEdit that blocks edits to `.env` and `.env.local`. Ask the user before touching env files.
- `.claude/skills/plan-feature/` — runs at the start of every new feature: Plan Mode, a docs-backed plan with QA scenarios, explicit approval, then saved to `plans/<branch>.md`.
- `.claude/skills/create-feature/` — runs after a plan is approved: reads `plans/<branch>.md`, the relevant `docs/`, and Context7 library docs, then writes the code only (no tests, QA, or commits) and reports in 2–3 lines.

## Doc Convention

Whenever a new file is created in `docs/`, add it to the **Project Docs** section below with one line on what it covers and when to read it.

## Project Docs

- `docs/design-system.md` — Design foundations: color tokens, neutrals, and semantic colors (with proposed Tailwind classes). Read before choosing colors or wiring up the Tailwind theme config.
- `docs/ui.md` — Component and pattern reference (Button, IconButton, Icon, etc.) with variants, states, and global UI rules. Read before building or styling UI components.
- `docs/architecture.md` — App Router structure: Server/Client Component split, `/lib` and `/components` layout, and naming conventions. Read before adding files or deciding where code lives.
- `docs/database.md` — Data layer: MongoDB + Mongoose, cached connection, models in `/lib/db/models`, per-user query scoping, and schema conventions. Read before writing queries or models.
- `docs/routing.md` — App Router route groups by access level (public, authenticated, auth), per-route files, and when to use API routes vs. Server Actions. Read before adding a route or page.
- `docs/auth.md` — NextAuth authentication, route protection, and the authorization model. Read before touching sign-in, sessions, protected routes, or ownership checks.
- `docs/data-fetching.md` — Reads in Server Components straight from the database, query scoping, caching, and Client Component data. Read before loading data for a page or component.
- `docs/data-mutations.md` — All writes via Server Actions: the standard action flow and return shape. Read before writing any create/update/delete logic.
- `docs/errors-and-validation.md` — Zod validation at the Server Action boundary, validation vs. unexpected errors, and what is exposed to the client. Read before handling input or errors.
- `docs/security.md` — Secrets and config, security headers, rate limiting, and handling user-generated content. Read before adding env vars, public endpoints, or rendering user input.
- `docs/coding-standards.md` — Strict TypeScript, formatting/linting, import order, component, async, and error-handling rules. Read before writing any code.
- `docs/git-conventions.md` — Commit message format, branch naming, and the branch/PR workflow. Read before creating a branch, committing, or opening a PR.
