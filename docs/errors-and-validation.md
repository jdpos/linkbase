# Errors & Validation

## Input validation

- All input is validated with **Zod** at the **Server Action boundary**, before
  anything touches the database.
- Shared schemas live in **`/lib/validation`** so the same schema can be reused
  across actions and, where helpful, on the client.

```ts
import { createLinkSchema } from "@/lib/validation";

export async function createLink(input: unknown) {
  const parsed = createLinkSchema.safeParse(input);
  // ...
}
```

## Validation errors

- Validation errors are **never thrown**. They return a **typed result object**
  that the form can render **inline next to the relevant fields**.

```ts
type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; fieldErrors: Record<string, string[]> };
```

This keeps expected, user-correctable problems (a missing field, a malformed
URL) in the normal data flow rather than the exception path.

## Unexpected errors

- Unexpected errors **are thrown**, caught by the **nearest `error.tsx`**, and
  **logged with enough context to debug** (action name, user id, relevant
  inputs).

## Client exposure

- **Never expose raw error messages or stack traces to the client.** The client
  sees a safe, generic message; full details stay in server logs only.
