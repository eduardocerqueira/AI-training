# hf-qa-rag

Small **FastAPI** service: answers questions from a local **`knowledge/qa.txt`** file via **Hugging Face Inference**, plus a **Gradio** UI that calls the API for dev testing.

No vector DB for v1 — the full Q&A file is injected into the system prompt (fine for small files and low traffic).

## Prerequisites

- Python 3.11+
- [HF token](https://huggingface.co/settings/tokens) with access to your chosen chat model

## Setup

```bash
cd apps/python/hf-qa-rag
python -m venv .venv
source .venv/bin/activate
pip install -e ".[dev,ui]"
cp .env.example .env   # HF_TOKEN=hf_...
```

Optional: `hf auth login` (CLI); this app still reads **`HF_TOKEN`** from `.env`.

## Run

**Terminal 1 — API**

```bash
hf-qa-rag-api
# or: uvicorn hf_qa_rag.api:app --reload --port 8000
```

API docs: http://127.0.0.1:8000/docs

**Terminal 2 — Gradio UI**

```bash
hf-qa-rag-ui
```

Open http://127.0.0.1:7860

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
| `API_URL` | `http://127.0.0.1:8000` (Gradio only) |

## Test

```bash
pytest
```

## Next steps

- Replace `knowledge/qa.txt` with your real Q&A
- Deploy API; point Gradio or a static site at the public URL
- Add chunking + embeddings when the file outgrows the model context
