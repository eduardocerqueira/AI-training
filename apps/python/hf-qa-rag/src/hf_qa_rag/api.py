from contextlib import asynccontextmanager
from typing import Literal

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from hf_qa_rag.config import APP_ROOT, settings
from hf_qa_rag.hf_client import HuggingFaceChat
from hf_qa_rag.rag import KnowledgeBase

knowledge = KnowledgeBase(settings.knowledge_path)
_hf_chat: HuggingFaceChat | None = None


def get_hf_chat() -> HuggingFaceChat:
    global _hf_chat
    if _hf_chat is None:
        _hf_chat = HuggingFaceChat()
    return _hf_chat


@asynccontextmanager
async def lifespan(_: FastAPI):
    knowledge.load()
    yield


app = FastAPI(
    title="HF Q&A RAG API",
    description="REST API: Q&A txt knowledge base + Hugging Face inference",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1)
    history: list[ChatMessage] = Field(default_factory=list)


class ChatResponse(BaseModel):
    answer: str
    sources: list[str]


class KnowledgeInfo(BaseModel):
    path: str
    char_count: int
    preview: str


@app.get("/health")
def health() -> dict:
    return {
        "ok": True,
        "model": settings.hf_model,
        "knowledge_loaded": bool(knowledge.content),
    }


@app.get("/knowledge", response_model=KnowledgeInfo)
def get_knowledge() -> KnowledgeInfo:
    preview = knowledge.content[:500]
    if len(knowledge.content) > 500:
        preview += "..."
    try:
        rel = knowledge.path.relative_to(APP_ROOT)
    except ValueError:
        rel = knowledge.path
    return KnowledgeInfo(
        path=str(rel),
        char_count=knowledge.char_count,
        preview=preview,
    )


@app.post("/knowledge/reload")
def reload_knowledge() -> dict:
    knowledge.load()
    return {"ok": True, "char_count": knowledge.char_count}


@app.post("/chat", response_model=ChatResponse)
def chat(body: ChatRequest) -> ChatResponse:
    try:
        client = get_hf_chat()
    except ValueError as exc:
        raise HTTPException(status_code=503, detail=str(exc)) from exc

    messages: list[dict[str, str]] = [
        {"role": "system", "content": knowledge.system_prompt()},
    ]
    for item in body.history[-10:]:
        messages.append({"role": item.role, "content": item.content})
    messages.append({"role": "user", "content": body.message})

    try:
        answer = client.complete(messages)
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(
            status_code=502,
            detail=f"Hugging Face inference failed: {exc}",
        ) from exc

    try:
        source = str(knowledge.path.relative_to(APP_ROOT))
    except ValueError:
        source = str(knowledge.path)

    return ChatResponse(answer=answer, sources=[source])


def run() -> None:
    """Console script: start the API with reload for local dev."""
    import uvicorn

    uvicorn.run(
        "hf_qa_rag.api:app",
        host="127.0.0.1",
        port=8000,
        reload=True,
    )
