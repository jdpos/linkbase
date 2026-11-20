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

## Styling

- **Tailwind CSS v4**, configured CSS-first in `src/app/globals.css` via `@import "tailwindcss"` and an `@theme inline { ... }` block. There is **no `tailwind.config.js`** — add theme tokens in `globals.css`.
- Dark mode is driven by `prefers-color-scheme` (CSS custom properties `--background` / `--foreground`).
- Fonts (Geist Sans/Mono) are loaded via `next/font/google` in `layout.tsx` and exposed as the `--font-sans` / `--font-mono` theme variables.

## Imports

TypeScript path alias `@/*` maps to `src/*` (see `tsconfig.json`).
