---
name: plan-feature
description: Plan a new feature before writing any code. Enters Plan Mode, reads the project's /docs (architecture, database, and the docs for the feature's area), drafts a short technical plan listing the files to create or change plus QA scenarios, waits for explicit approval, then saves the approved plan to ./plans/<current-branch>.md. Use this whenever the user starts planning, scoping, designing, or kicking off a new feature, page, route, model, endpoint, or capability — e.g. "let's build X", "I want to add Y", "plan the Z feature", "how should we implement…", "scope out…", "new feature:" — even if they don't say "plan". Run it before any implementation code is written.
---

# Plan Feature

Run this at the start of every new feature, **before any code is written**. The output is a short technical plan that follows the project conventions in `docs/` and has the user's explicit approval.

## Hard rule

**Write no code until the user approves the plan.** That means no edits to `src/`, no new components, models, or routes, and no config changes. Reading files is fine. If the user asks for code before approving, remind them the plan is still waiting for approval and ask whether they approve it as written or want changes.

## Steps

### 1. Enter Plan Mode

Call the `EnterPlanMode` tool first. If it is deferred, load it with `ToolSearch` (`select:EnterPlanMode,ExitPlanMode`). Do all the research and drafting below inside Plan Mode.

### 2. Understand the request

Restate the feature in one or two sentences. If something that changes the file list is unclear (who can use it, what data it stores, which route it lives on), ask with `AskUserQuestion`. Don't ask about things the docs already decide.

### 3. Read the relevant docs

Always read:
- `docs/architecture.md`: where code lives, the Server/Client Component split, naming conventions
- `docs/database.md`: models, connection, per-user scoping, schema conventions

Then list `docs/` and read every file that matches the feature's area, for example:
- UI or pages → `docs/ui.md`, `docs/design-system.md`
- Login, sessions, or protected routes → auth / security docs, if present
- Forms, Server Actions, or validation → data-mutation / validation docs, if present

The list of docs grows over time, so check the folder rather than relying on this list. The **Project Docs** section of `CLAUDE.md` says what each doc covers. Also look at the existing code in the areas the feature touches so the plan names real paths.

### 4. Draft the plan

Keep it short, about one screen. Use this structure:

```markdown
# Plan: <Feature name>

**Branch:** <current branch>
**Summary:** <1–2 sentences: what the feature does and for whom>

## Docs consulted
- `docs/architecture.md`: <the convention that shaped this plan>
- `docs/database.md`: <…>
- `docs/<area>.md`: <…>

## Files
### Create
- `src/…/file.ts`: <purpose, one line>
### Modify
- `src/…/file.tsx`: <what changes, one line>

## Approach
- <3–6 bullets on key technical decisions: data model, Server vs Client components, actions/queries, auth checks, validation. Name the doc convention each one follows.>

## Out of scope
- <anything deliberately left out, if relevant>

## QA Scenarios
1. **Happy path:** <what the user does> → <what should happen>
2. **Auth boundary:** <e.g. signed-out user, or user B touching user A's data> → <expected result>
3. **Validation:** <bad or missing input> → <expected error or behavior>
4. **Edge case:** <empty state, duplicate, limit, etc.> → <expected result>
```

QA Scenarios rules:
- Write 3–6 scenarios, one line each, in the form *user action → expected outcome*.
- Always cover the happy path, an auth boundary, validation, and at least one edge case.
- Make them concrete: use real routes, field names, and values, not "it works correctly".

If the plan would break a convention in `docs/`, say so explicitly in **Approach** and explain why. Never break one silently.

### 5. Get explicit approval

Show the plan with `ExitPlanMode`. Treat it as approved only on a clear "yes", "approved", "go ahead", or similar. If the user asks for changes, revise the plan and present it again. Silence or an unrelated reply is not approval.

### 6. Save the approved plan

Once approved:
1. Get the branch name: `git branch --show-current`.
   - If the name contains `/` (e.g. `feat/link-tags`), replace each `/` with `-` in the filename → `plans/feat-link-tags.md`.
   - If the output is empty (detached HEAD) or the branch is `main`/`master`, tell the user and ask whether to create a feature branch first (see the branch naming rules in the git-conventions doc, if present). Otherwise ask for a filename.
2. Create `./plans/` at the repo root if it doesn't exist.
3. Write the approved plan, exactly as approved, to `./plans/<branch>.md`. If the file already exists, show the user what's in it and ask whether to overwrite it or append the new plan.
4. Tell the user the path, then hand off to implementation.
