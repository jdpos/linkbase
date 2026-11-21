# Database

This document describes the data layer: how the app connects to the database, where models live, and the rules every query must follow.

## Stack

The app uses **MongoDB** with **Mongoose**. Mongoose is responsible for:

- **Schema definition** — the shape of each collection's documents.
- **Validation** — enforced at the schema level before writes reach the database.
- **Connection pooling** — managed by the underlying driver through Mongoose.

## Connection

A **single cached connection** is reused across invocations. Because Server Actions (and route handlers) can run many times within a single server instance, opening a new connection per call would exhaust the connection pool. Instead, the connection is created once and cached on the global object, then reused in both **development** and **production**.

- The connection helper lives in **`/lib/db`**.
- On each call it returns the existing cached connection if one is live, otherwise it establishes a new connection and caches it (including caching the in-flight promise so concurrent callers share one connect attempt).

Every data-accessing Server Action awaits this helper before running queries.

## Models

- Mongoose models live in **`/lib/db/models`**, one model per file.
- Models are defined so they are not re-compiled on hot reload (reuse an already-registered model if present, otherwise register it).

## User scoping

**Every query is scoped to the signed-in user's id.** A user can only ever read, write, or delete their own data:

- Reads filter on `userId` equal to the current session user.
- Writes set `userId` to the current session user.
- Updates and deletes match on both the document id **and** `userId`, so a document belonging to another user can never be touched.

The session user id comes from the auth helpers in `/lib/auth`; a query is never issued without it.

## Schema conventions

Every schema is defined with:

- **Strict mode** — fields not declared in the schema are stripped, not persisted.
- **Timestamps** — automatic `createdAt` and `updatedAt` fields.
- **Indexes** — on `userId` and on `handle`, supporting the per-user scoping and handle lookups that queries rely on.
