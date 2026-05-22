# hf-qa-rag-ui

TypeScript React chat UI for the Q&A RAG stack: **[assistant-ui ChatGPT clone](https://www.assistant-ui.com/examples/chatgpt)** layout + **shadcn/ui**, backed by the Node API [`hf-qa-rag-api`](../../node/hf-qa-rag-api/).

Inspired by [`hf-qa-rag`](../../python/hf-qa-rag/) (Python/FastAPI + Gradio).

## Prerequisites

- Node.js 20+
- [`hf-qa-rag-api`](../../node/hf-qa-rag-api/) running with `HF_TOKEN` set

## Setup

```bash
cd apps/typescript/hf-qa-rag-ui
npm install
cp .env.example .env
```

## Run

**Terminal 1 — API**

```bash
cd apps/node/hf-qa-rag-api
npm run dev
```

**Terminal 2 — UI**

```bash
cd apps/typescript/hf-qa-rag-ui
npm run dev
```

Open http://127.0.0.1:5173

## Config (`.env`)

| Variable | Default |
|----------|---------|
| `VITE_API_URL` | `http://127.0.0.1:8000` |

## Stack

| Layer | Choice |
|-------|--------|
| UI framework | React 19 + Vite |
| Chat UX | [@assistant-ui/react](https://www.assistant-ui.com/) ChatGPT example (`LocalRuntime` → `POST /chat`) |
| UI | Centered empty state, Tools menu, 4-state composer, full assistant action bar |
| Components | shadcn dropdown, tooltip, markdown |
| Styling | Tailwind CSS v4 |

## Build

```bash
npm run build
npm run preview
```
