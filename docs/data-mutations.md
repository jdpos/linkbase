# Data Mutations

All writes go through **Server Actions**, never API routes.

## The standard action flow

Every Server Action follows the same sequence:

1. **Check the session first.** Reject unauthenticated callers before doing any
   work.
2. **Validate input** with the matching **Zod schema** from `/lib/validation`.
3. **Scope the query to the signed-in user's id**, so a write can only ever
   affect data the user owns.
4. **Perform the write.**
5. **Revalidate** affected views with **`revalidatePath`** or
   **`revalidateTag`**.

```ts
"use server";

import { auth } from "@/lib/auth";
import { updateLinkSchema } from "@/lib/validation";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateLink(input: unknown): Promise<ActionResult<Link>> {
  // 1. session
  const session = await auth();
  if (!session) return { ok: false, fieldErrors: { _: ["Not authenticated"] } };

  // 2. validate
  const parsed = updateLinkSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }

  // 3 + 4. scope to the user's id, then write
  const link = await db.link.update({
    where: { id: parsed.data.id, userId: session.user.id },
    data: parsed.data.values,
  });

  // 5. revalidate
  revalidatePath("/dashboard");

  return { ok: true, data: link };
}
```

## Return shape

- Actions return a **typed result** with either **data** or a **validation
  error**.
- They **do not throw for expected failures** (auth failures, validation
  errors). Only genuinely unexpected errors throw and bubble to `error.tsx`.

```ts
type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; fieldErrors: Record<string, string[]> };
```
