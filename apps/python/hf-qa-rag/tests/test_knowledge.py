from hf_qa_rag.config import APP_ROOT, settings
from hf_qa_rag.rag import KnowledgeBase


def test_knowledge_loads() -> None:
    kb = KnowledgeBase(settings.knowledge_path)
    kb.load()
    assert kb.char_count > 0
    assert "Q:" in kb.content
    assert kb.path.is_relative_to(APP_ROOT)
