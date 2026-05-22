# PR steward

Reviews **open pull requests** and posts a summary comment. Does **not** merge (by design).

## v1 behavior

- **After PR Check finishes** on a PR (`workflow_run`): comments on **that PR only** — no maintainer approval (secrets are not exposed to untrusted `pull_request` runs).
- **On schedule / manual run**: reviews up to 5 open PRs.
- Posts a checklist comment: checks status, diff stat, optional OpenAI summary.
- Skips if a steward comment already exists (`<!-- pr-bot:steward -->`).

## Auto-merge

**Not enabled.** Merging requires a human (or a future v2 with explicit `automerge` label + branch protection).

## Workflow

[`.github/workflows/pr-bot.yml`](../../.github/workflows/pr-bot.yml) — Saturdays 08:00 UTC, and after [`pr-check.yml`](../../.github/workflows/pr-check.yml) completes on a PR.

Pending runs from other workflows are auto-approved by [`approve-pending-actions.yml`](../../.github/workflows/approve-pending-actions.yml) when possible.
