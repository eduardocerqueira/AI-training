# hf-inference-hello (Node)

First **Node.js** experiment: Hugging Face **Inference API** for sentiment — CLI and optional HTTP server (same idea as the [Go apps](../../go/)).

| Mode | Command |
|------|---------|
| CLI | `npm start` |
| Server | `npm run serve` |

## Prerequisites

- Node.js 20+ (native `fetch`)
- `HF_TOKEN` in `.env` or environment

## Setup

```bash
cd apps/node/hf-inference-hello
npm install
cp .env.example .env   # add HF_TOKEN
```

### Hugging Face token

```env
HF_TOKEN=hf_your_token_here
```

```bash
hf auth login
hf auth whoami
```

## CLI

```bash
npm start
node src/cli.js --text "Node is fun!"
node src/cli.js --model distilbert/distilbert-base-uncased-finetuned-sst-2-english
```

Use full Hub ids (`org/model`) from [hf-inference models](https://huggingface.co/models?inference_provider=hf-inference&pipeline_tag=text-classification).

## HTTP server

```bash
npm run serve
# default http://127.0.0.1:3000
```

```bash
curl -s http://127.0.0.1:3000/health

curl -s -X POST http://127.0.0.1:3000/v1/sentiment \
  -H "Content-Type: application/json" \
  -d '{"text":"I love learning Node!"}'
```

Env: `PORT` (default `3000`), `HF_MODEL` (optional).

## Test

```bash
npm test
```

Tests parse JSON only (no live API).

## Compare

| App | Language | Style |
|-----|----------|--------|
| [hf-pipeline-hello](../../python/hf-pipeline-hello/) | Python | Local `transformers` |
| [hf-inference-hello](../../go/hf-inference-hello/) | Go | CLI |
| [hf-sentiment-server](../../go/hf-sentiment-server/) | Go | HTTP only |
| **this project** | Node | CLI + HTTP |

## Next steps

- Add the Go server as a tool in [hf-agents-lab](../../python/hf-agents-lab/)
- TypeScript variant under `apps/typescript/` with types + MCP
