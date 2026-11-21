# Coding Standards

## Language

- Code is written in **TypeScript** with **strict mode** enabled.
- No `any`. Use precise types, generics, or `unknown` with narrowing instead.
- No `@ts-ignore` / `@ts-expect-error` without an adjacent comment explaining
  exactly why the suppression is necessary.

## Formatting & linting

- Code is formatted with **Prettier**.
- Code is linted with **ESLint** using the **Next.js config**.

## Import order

Imports are grouped in this order, with a blank line between groups:

1. **External packages** (e.g. `react`, `next`, third-party libraries)
2. **Internal aliases** (e.g. `@/lib`, `@/components`)
3. **Relative imports** (e.g. `./utils`, `../types`)

```ts
import { useState } from "react";
import { z } from "zod";

import { db } from "@/lib/db";
import { Button } from "@/components/button";

import { formatHandle } from "./utils";
```

## Components

- Components are written as **function declarations** with **typed props**.
- **No default exports**, except for Next.js route files (e.g. `page.tsx`,
  `layout.tsx`, `route.ts`) where the framework requires them.

```tsx
interface ProfileCardProps {
  handle: string;
  bio: string | null;
}

export function ProfileCard({ handle, bio }: ProfileCardProps) {
  // ...
}
```

## Asynchronous code

- Async work uses **`async`/`await`**, never `.then()` chains.

```ts
// Good
const user = await getUser(id);

// Avoid
getUser(id).then((user) => { /* ... */ });
```

## Error handling

- Errors are thrown with **real `Error` objects**, never strings.

```ts
// Good
throw new Error("User not found");

// Avoid
throw "User not found";
```
