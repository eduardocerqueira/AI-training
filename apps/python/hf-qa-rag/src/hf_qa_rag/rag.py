from pathlib import Path

SYSTEM_PROMPT_TEMPLATE = """You are a helpful assistant that answers questions using ONLY the Q&A knowledge base below.
If the answer is not in the knowledge base, say clearly that you do not know and do not invent facts.
Keep answers concise.

--- KNOWLEDGE BASE ---
{knowledge}
--- END KNOWLEDGE BASE ---
"""


class KnowledgeBase:
    def __init__(self, path: Path) -> None:
        self.path = path
        self._content: str = ""

    def load(self) -> None:
        if not self.path.is_file():
            raise FileNotFoundError(f"Knowledge file not found: {self.path}")
        self._content = self.path.read_text(encoding="utf-8").strip()

    @property
    def content(self) -> str:
        return self._content

    @property
    def char_count(self) -> int:
        return len(self._content)

    def system_prompt(self) -> str:
        if not self._content:
            raise RuntimeError("Knowledge base not loaded")
        return SYSTEM_PROMPT_TEMPLATE.format(knowledge=self._content)
