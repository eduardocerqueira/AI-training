# Apps

Each subdirectory is a **language workspace**. Projects are sibling folders inside that language directory.

| Directory | Runtime | Use for |
|-----------|---------|---------|
| [python/](python/) | Python 3.11+ | LangChain, CrewAI, Hugging Face, FastAPI, NeMo, notebooks |
| [typescript/](typescript/) | Node 20+ | MCP servers, LangChain.js, agent SDKs |
| [node/](node/) | Node 20+ | Plain JavaScript experiments |
| [go/](go/) | Go 1.22+ | CLIs, small services, performance probes |
| [java/](java/) | JDK 21+ | JVM integrations, enterprise-style spikes |

## Current projects

| Project | Description |
|---------|-------------|
| `python/hf-pipeline-hello` | Hugging Face `transformers` sentiment pipeline on sample text |
| `python/hf-smolagent-intro` | smolagents agent, Hub + learning-path tools, optional Gradio UI |
| `python/hf-agents-lab` | Multi-tool agents lab + calculator + example prompts |
| `python/hf-qa-rag` | FastAPI Q&A over `qa.txt` + HF inference + Gradio test UI |
| `node/hf-qa-rag-api` | Node REST API: Q&A over `qa.txt` + HF chat inference |
| `typescript/hf-qa-rag-ui` | React chat UI (assistant-ui + shadcn) → Node API |
| `go/hf-inference-hello` | HF Inference API sentiment CLI (stdlib `net/http`) |
| `go/hf-sentiment-server` | HTTP server: `POST /v1/sentiment` via HF Inference API |
| `node/hf-inference-hello` | Node CLI + HTTP server for HF sentiment (native `fetch`) |

## Creating a project

See [../docs/getting-started.md](../docs/getting-started.md) and [../CONTRIBUTING.md](../CONTRIBUTING.md).

<!-- docs-bot:start -->
## Current projects (auto-synced)

| Project                     | Language  |
|-----------------------------|-----------|
| `go/hf-inference-hello`     | Go-based inference example |
| `go/hf-sentiment-server`    | Go server for sentiment analysis |
| `node/hf-inference-hello`   | Node.js inference example |
| `node/hf-qa-rag-api`        | Node.js API for question answering with RAG |
| `python/hf-agents-lab`      | Python lab for experimenting with agents |
| `python/hf-pipeline-hello`  | Python example for pipeline usage |
| `python/hf-qa-rag`          | Python implementation of RAG for question answering |
| `python/hf-smolagent-intro` | Introductory project for small agents in Python |
| `typescript/hf-qa-rag-ui`   | TypeScript UI for question answering with RAG |

_Last synced: 2026-05-25_
<!-- docs-bot:end -->
