# Getting started

## Prerequisites

Install only what you need for the language you are using:

| Language | Suggested version | Package manager |
|----------|-------------------|-----------------|
| Python | 3.11+ | `pip` + venv, or [uv](https://github.com/astral-sh/uv) |
| TypeScript / Node | Node 20+ | `npm` (or `pnpm`) |
| Go | 1.22+ | `go mod` |
| Java | JDK 21+ | Maven 3.9+ |

API keys (OpenAI, Anthropic, Hugging Face, etc.) go in each app’s `.env` file — never in git.

## Clone the repo

```bash
git clone git@github.com:eduardocerqueira/AI-training.git
# or: git clone https://github.com/eduardocerqueira/AI-training.git
cd AI-training
```

## Restore agent skills

Registry skills are pinned in [`skills-lock.json`](../skills-lock.json) but not committed under `.agents/`. Restore them once per clone:

```bash
npx skills experimental_install
```

See [skills.md](skills.md) for the full list, adding skills, and custom project skills.

## Create a new experiment

1. Pick a language under [`apps/`](../apps/).
2. Copy its `_template` folder to a new **kebab-case** name.

```bash
# Python example
cp -r apps/python/_template apps/python/my-rag-demo
cd apps/python/my-rag-demo
```

3. Rename packages and config inside the copy (`pyproject.toml`, module paths, etc.) — see that template’s README.
4. When done, list the project in [`apps/README.md`](../apps/README.md).

## Install and run

### Python

```bash
cd apps/python/my-rag-demo
python -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -e ".[dev]"
cp .env.example .env               # add your API keys
python -m my_project_name          # or: pytest
```

### TypeScript

```bash
cd apps/typescript/my-mcp-server
npm install
cp .env.example .env
npm run dev                        # watch mode; see package.json
```

### Node (JavaScript)

```bash
cd apps/node/my-script
npm install
cp .env.example .env
npm start
```

### Go

```bash
cd apps/go/my-cli
go mod tidy
go run .
```

### Java

```bash
cd apps/java/my-spike
mvn -q compile exec:java
```

## Secrets and artifacts

- Copy `.env.example` → `.env` and fill in keys locally.
- Do not commit `.env`, `node_modules/`, `.venv/`, model weights, or large datasets (see [`.gitignore`](../.gitignore)).

## Conventions

- **Naming:** `kebab-case` directories (e.g. `hf-agents-lab`, `mcp-filesystem`).
- **Isolation:** Prefer duplicating a few lines over shared coupling while learning.
- **Secrets:** Use `.env` / `.env.local`; only commit `.env.example` with placeholder keys.
- **Docs:** Every app gets a short README with prerequisites, setup, and how to run.

For the checklist when adding a project, see [CONTRIBUTING.md](../CONTRIBUTING.md).
