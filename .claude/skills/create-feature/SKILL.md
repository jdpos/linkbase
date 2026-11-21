---
name: create-feature
description: Build a feature from an approved plan. Loads the approved plan from ./plans/<current-branch>.md, reads the /docs files it relies on, pulls current library docs through Context7, then writes the code the plan describes, and only that code. No tests, no QA, no commits. Stops with a 2–3 line report. Use this whenever the user starts building or implementing a feature that already has an approved plan, e.g. "build it", "implement the plan", "start building", "let's code it", "go ahead and implement", "execute the plan", or right after plan-feature saves a plan and the user says to proceed. If no approved plan exists yet, use plan-feature instead.
---

# Create Feature

Run this **after** a plan has been approved and saved by `plan-feature`. It turns the plan into code that follows the conventions in `docs/`.

## Hard rules

This skill **writes code only**. While it runs:
- **No tests.** Don't create or edit test files, test config, or fixtures.
- **No QA.** Don't run the plan's QA Scenarios, start the dev server, or open a browser to check the result.
- **No git.** Don't commit, stage, branch, push, or open a PR.
- **No scope creep.** Build what the plan lists. Don't add extra features, refactors, or "while I'm here" changes.
- **Don't touch `.env` / `.env.local`.** If the feature needs a new env var, name it in the report and let the user add it.

The user triggers `write-tests` and `run-qa-suite` themselves. Never invoke them from this skill, and don't offer to.

## Steps

### 1. Load the approved plan

1. Get the branch: `git branch --show-current`. Replace each `/` with `-` → `plans/<branch>.md`.
2. Read that file. If it doesn't exist, or the branch is empty/`main`/`master`, list `plans/` and ask which plan to build. If there is no plan at all, stop and tell the user to run `plan-feature` first.
3. If the plan in the conversation differs from the saved file, the saved file wins. Mention the difference.

### 2. Read the docs

Always read:
- `docs/coding-standards.md`
- `docs/architecture.md`

Then read every doc listed under **Docs consulted** in the plan, plus any other doc in `docs/` that matches what the code touches (the **Project Docs** section of `CLAUDE.md` says what each one covers). For example: pages or components → `ui.md`, `design-system.md`; writes → `data-mutations.md`, `errors-and-validation.md`; reads → `data-fetching.md`, `database.md`; protected routes → `auth.md`, `routing.md`; env vars or user input → `security.md`.

Also read the existing files the plan says to modify, and the nearby code, so new code matches what's already there.

### 3. Pull live library docs (Context7)

For each third-party library the code will use (Next.js, React, Mongoose, NextAuth, Zod, Tailwind, etc.):
1. Check the installed version in `package.json`.
2. `mcp__context7__resolve-library-id`, then `mcp__context7__query-docs` with a query for the specific APIs you're about to use, matched to that version. Load the tools with `ToolSearch` (`select:mcp__context7__resolve-library-id,mcp__context7__query-docs`) if they're deferred.
3. For Next.js, also read the matching guide in `node_modules/next/dist/docs/`. It matches the installed version exactly, so it wins if it disagrees with Context7.

If Context7 has no entry, or the entry doesn't cover the installed version, say so and name the fallback you're using (bundled docs, the package's README/types in `node_modules`, or the official site). Don't write library calls from memory.

### 4. Build

- Work through the plan's **Files** section: create the files under **Create**, make the changes under **Modify**, and follow the decisions in **Approach**.
- Follow the doc conventions for file placement, naming, the Server/Client split, query scoping, the Server Action flow and return shape, Zod validation, auth checks, and UI components/tokens.
- If the plan turns out to be wrong or incomplete (a missing file, an API that doesn't work as planned, a conflict with a doc convention), **stop and ask** with `AskUserQuestion` before you deviate. A trivial fix the plan clearly implies, like a missing import or a type export, is fine. Note it in the report.
- Make sure it compiles: run `npx tsc --noEmit` and `npm run lint` and fix any errors in the code you wrote. That's a build check, not QA. Don't go further than that.

### 5. Report and stop

Reply in **2–3 lines** and nothing more:
- What was built (the key files created and modified).
- Any deviation from the plan, Context7 gap, or new env var the user needs to add, if there was one.

Then stop and hand back to the user. Don't suggest next steps, offer tests, or start QA.
