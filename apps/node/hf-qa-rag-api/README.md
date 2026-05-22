# hf-qa-rag-api

Node.js REST API: answers questions from a local **`knowledge/qa.txt`** file via **Hugging Face chat inference**. Companion UI: [`hf-qa-rag-ui`](../../typescript/hf-qa-rag-ui/).

Same contract as [`hf-qa-rag`](../../python/hf-qa-rag/) (Python/FastAPI) — no vector DB in v1; the full Q&A file is injected into the system prompt.

## Prerequisites

- Node.js 20+
- [HF token](https://huggingface.co/settings/tokens) with access to your chosen chat model

## Setup

```bash
cd apps/node/hf-qa-rag-api
npm install
cp .env.example .env   # HF_TOKEN=hf_...
```

## Run

```bash
npm run dev
# or: npm start
```

API: http://127.0.0.1:8000

## API

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Status |
| `GET` | `/knowledge` | KB preview |
| `POST` | `/knowledge/reload` | Reload `qa.txt` |
| `POST` | `/chat` | `{ "message", "history" }` → `{ "answer", "sources" }` |

```bash
curl -s http://127.0.0.1:8000/chat \
  -H 'Content-Type: application/json' \
  -d '{"message": "How do I run the API?"}'
```

## Config (`.env`)

| Variable | Default |
|----------|---------|
| `HF_TOKEN` | required for `/chat` |
| `HF_MODEL` | `Qwen/Qwen2.5-1.5B-Instruct` |
| `KNOWLEDGE_PATH` | `knowledge/qa.txt` |
| `PORT` | `8000` |

## Test

```bash
npm test
```
