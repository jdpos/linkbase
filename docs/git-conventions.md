# Git Conventions

A consistent Git workflow keeps history readable and makes every change
reviewable. Work happens on short-lived branches and lands on `main` only
through reviewed pull requests.

## Commit messages

Commits follow **[Conventional Commits](https://www.conventionalcommits.org/)**
with a short, imperative subject line (e.g. "add link reordering", not "added"
or "adds").

The type prefixes we use are:

- **feat** — a new feature
- **fix** — a bug fix
- **docs** — documentation only
- **refactor** — a code change that neither fixes a bug nor adds a feature
- **test** — adding or updating tests
- **chore** — tooling, dependencies, and other maintenance

Each message reads `type: subject`, for example `feat: add link reordering` or
`fix: redirect on expired session`.

## Branch naming

Branches are named by **type and feature**, using the same type prefixes as
commits:

- `feat/add-links`
- `fix/session-redirect`

The type communicates intent at a glance, and the short slug names the feature
or fix being worked on.

## Branching & pull requests

- **Each feature is built on its own branch.** Never commit straight to `main`.
- **Changes merge through a pull request.** `main` only ever advances via a
  reviewed PR.
- **PRs keep a clean history** — small, focused commits that tell a coherent
  story, squashed or rebased as needed before merge.
- **Human review is required before merge.** No PR lands without a person
  reviewing and approving it.
