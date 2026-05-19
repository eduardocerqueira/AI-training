# Python apps

Primary home for most AI experiments: agents, RAG, Hugging Face, LangChain, CrewAI, FastAPI inference APIs, notebooks.

## New project

```bash
cp -r _template my-project-name
cd my-project-name
python -m venv .venv && source .venv/bin/activate
pip install -e ".[dev]"
python -m my_project_name
```

Prefer [uv](https://github.com/astral-sh/uv) if you use it: `uv sync` after copying the template.

## Ideas aligned with [learning resources](../../docs/learning-resources.md)

- Minimal OpenAI or Anthropic agent with tool calling
- RAG over local markdown with Chroma or LanceDB
- Hugging Face Agents course assignment spike
- FastAPI + Ollama proxy
