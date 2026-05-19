# Agent skills

This repo uses [Agent Skills](https://skills.sh/) to give Cursor (and other agents) domain-specific guidance for AI experiments — LangChain, CrewAI, Hugging Face, FastAPI, OpenAI Agents SDK, and similar.

## What lives where

| Path | Purpose | Committed to git? |
|------|---------|-------------------|
| [`skills-lock.json`](../skills-lock.json) | Pinned list of installed registry skills | **Yes** |
| [`.agents/skills/`](../.agents/skills/) | Generated copies from `npx skills add` | **No** (gitignored) |
| [`.cursor/skills/`](../.cursor/skills/) | Skills you write for this monorepo | **Yes** (when you add them) |

Treat `.agents/` like `node_modules/`: reproducible from the lockfile, not vendored in git.

## After cloning

Restore project skills from the lockfile:

```bash
cd AI-training
npx skills experimental_install
```

Verify:

```bash
npx skills list
```

You should see the skills listed in [Installed skills](#installed-skills) below.

## Installed skills

These are defined in `skills-lock.json` and aligned with the [learning catalog](learning-resources.md):

| Skill | Source | Use when |
|-------|--------|----------|
| `langchain-fundamentals` | [langchain-ai/langchain-skills](https://skills.sh/langchain-ai/langchain-skills/langchain-fundamentals) | Building LangChain agents |
| `langchain-rag` | langchain-ai/langchain-skills | RAG pipelines (loaders, embeddings, vector stores) |
| `langgraph-fundamentals` | langchain-ai/langchain-skills | LangGraph graphs, state, nodes, edges |
| `getting-started` | [crewaiinc/skills](https://skills.sh/crewaiinc/skills/getting-started) | New CrewAI projects |
| `design-agent` | crewaiinc/skills | Designing CrewAI agents |
| `hf-cli` | [huggingface/skills](https://skills.sh/huggingface/skills/hf-cli) | Hugging Face Hub CLI |
| `huggingface-datasets` | huggingface/skills | Datasets library |
| `openai-knowledge` | [openai/openai-agents-python](https://skills.sh/openai/openai-agents-python/openai-knowledge) | OpenAI Agents SDK |
| `fastapi` | [fastapi/fastapi](https://skills.sh/fastapi/fastapi/fastapi) | FastAPI inference APIs |

Browse more at [skills.sh](https://skills.sh/).

## Add or remove a skill

**Add** (updates `skills-lock.json` and `.agents/` locally):

```bash
npx skills add langchain-ai/langchain-skills@langgraph-persistence -y
```

**Remove:**

```bash
npx skills remove langgraph-persistence -y
```

**Update** installed skills to latest versions:

```bash
npx skills update -y
```

After adding or removing skills, commit the updated `skills-lock.json`. Do not commit `.agents/`.

## Search for new skills

```bash
npx skills find rag
npx skills find crewai
```

Prefer official sources (`langchain-ai`, `huggingface`, `crewaiinc`, `openai`) and skills with higher install counts. See [skills.sh](https://skills.sh/) for details and security audits.

## Custom project skills

For conventions specific to *this* monorepo (layout, naming, docs links), add hand-written skills under `.cursor/skills/`:

```
.cursor/skills/
└── ai-training-sandbox/
    └── SKILL.md
```

Commit those to git. They complement registry skills; they do not replace them.

**Do not** put custom skills in `~/.cursor/skills-cursor/` — that directory is reserved for Cursor built-ins.

## Per-app skills

Most skills belong at the **repo root** so every experiment can use them.

Only add skills inside an app (e.g. `apps/python/my-lab/.agents/`) when that project needs specialized guidance. Never copy skills into `apps/**/_template/` — templates should stay minimal.

## Global vs project install

| Scope | Flag | Location |
|-------|------|----------|
| Project (this repo) | default | `.agents/skills/` + `skills-lock.json` |
| Global (all repos) | `-g` | user-level agent dirs |

This sandbox uses **project** skills only so the learning stack travels with the repo via the lockfile.

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Agent doesn’t use a skill | Run `npx skills list`; restore with `npx skills experimental_install` |
| Skill missing after clone | You need `npx skills experimental_install` — `.agents/` is not in git |
| Wrong skills under `_template` | Delete `apps/**/_template/.agents/`; skills belong at repo root |
| Lockfile out of sync | Re-run `npx skills add` / `remove` and commit `skills-lock.json` |
