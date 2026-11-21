# Routing

Routing follows the Next.js App Router conventions, organized into route groups
by access level.

## Public routes

Open to everyone, no authentication required:

- `/` — the landing page
- `/user/[handle]` — the public profile

## Authenticated routes

Protected pages live under a **`(dashboard)`** route group, covering:

- the dashboard
- add-links

All routes in this group are protected by **middleware** that redirects
unauthenticated users to sign-in before the page or its actions run.

## Auth routes

Sign-in and related pages sit under an **`(auth)`** route group.

## Per-route files

Each route owns its own `layout.tsx`, `loading.tsx`, and `error.tsx` where
needed, so loading and error states are scoped to the part of the UI they
belong to.

## API vs. Server Actions

- **Route Handlers** in `/app/api` are reserved for **webhooks and third-party
  callbacks only**.
- **Everything else goes through Server Actions.**
