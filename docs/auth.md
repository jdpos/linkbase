# Authentication & Authorization

Authentication is handled by **NextAuth**, which manages sign-in, session
handling, and security following industry best practices (secure cookies,
CSRF protection, and signed/encrypted session tokens).

## Route protection

Access control is split into two layers:

### Protected routes

All routes under `/app/(dashboard)/*` are **protected by default** and require
an authenticated session. Middleware enforces this access check on every
request — unauthenticated users are redirected to sign-in before any dashboard
page or action runs.

### Public routes

The public profile at `/user/[handle]` stays **open to everyone**. No session
is required to view a user's public profile and their links.

## Authorization model

Authentication proves *who* a user is; authorization decides *what* they can do.

- **Users can only read and write their own links.** A user never has access to
  another user's private data.
- **Identity is enforced on the server.** Every Server Action re-derives the
  current user from the session rather than trusting any client-supplied
  identifier.
- **Ownership is enforced at the database level.** Every read and write is
  scoped by an ownership check on `userId`, so a request can only ever touch
  rows that belong to the authenticated user.

This defense-in-depth approach means that even if a client sends a crafted
request, the server and database independently reject access to resources the
user does not own.
