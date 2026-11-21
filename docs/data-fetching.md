# Data Fetching

## Reads happen in Server Components

- Reads happen in **Server Components** by calling the **database directly**.
- Never `fetch` to internal API routes to read data — that adds a network hop
  and loses type safety for no benefit.

## Query scoping

Queries are always scoped to the owner of the data:

- **Private data** is scoped to the **signed-in user's id**.
- **Public profile pages** are scoped to the **handle**.

```ts
// Private: scoped to the current user
const links = await db.link.findMany({ where: { userId: session.user.id } });

// Public: scoped to the profile handle
const profile = await db.user.findUnique({ where: { handle } });
```

## Caching

- Cache with the **Next.js fetch cache** or **`unstable_cache`** where it helps.
- **Tag** cached reads so **`revalidateTag`** can clear them after mutations.

```ts
import { unstable_cache, revalidateTag } from "next/cache";

const getPublicProfile = (handle: string) =>
  unstable_cache(
    () => db.user.findUnique({ where: { handle } }),
    ["public-profile", handle],
    { tags: [`profile:${handle}`] },
  )();

// After a mutation:
revalidateTag(`profile:${handle}`);
```

## Client Components

- Client Components **never query the database directly**.
- They receive data as **props from a Server Component**.
