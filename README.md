# AI Training — developer sandbox

Personal monorepo for **small, isolated AI experiments** while learning frameworks and tools (Hugging Face, NVIDIA NeMo, CrewAI, LangChain, agents, MCP, RAG, and similar).

Each app under [`apps/`](apps/) is self-contained: its own dependencies, env vars, and README.

## Layout

```
.
├── apps/          # Experiments by language (python, typescript, node, go, java)
├── docs/          # Guides and learning catalog
├── skills-lock.json   # Pinned agent skills (see docs/skills.md)
└── CONTRIBUTING.md
```

## Documentation

| | |
|---|---|
| **Start here** | [docs/getting-started.md](docs/getting-started.md) |
| **Agent skills** | [docs/skills.md](docs/skills.md) |
| **All docs** | [docs/README.md](docs/README.md) |
| **Courses & certs** | [docs/learning-resources.md](docs/learning-resources.md) |

**New app:** copy `apps/<language>/_template/` → follow [getting-started](docs/getting-started.md) and [CONTRIBUTING.md](CONTRIBUTING.md).
