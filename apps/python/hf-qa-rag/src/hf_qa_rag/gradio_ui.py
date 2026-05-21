"""Gradio chat UI — calls the FastAPI backend (dev/testing)."""

from __future__ import annotations

import os

import gradio as gr
import httpx
from dotenv import load_dotenv

from hf_qa_rag.config import APP_ROOT, settings

load_dotenv(APP_ROOT / ".env")

API_URL = os.getenv("API_URL", settings.api_url).rstrip("/")


def chat_fn(message: str, history: list[tuple[str, str]]) -> str:
    payload_history = []
    for user_msg, assistant_msg in history:
        payload_history.append({"role": "user", "content": user_msg})
        if assistant_msg:
            payload_history.append({"role": "assistant", "content": assistant_msg})

    try:
        with httpx.Client(timeout=120.0) as client:
            response = client.post(
                f"{API_URL}/chat",
                json={"message": message, "history": payload_history},
            )
            response.raise_for_status()
            data = response.json()
    except httpx.ConnectError:
        return (
            f"Cannot reach API at {API_URL}. "
            "Start it first: hf-qa-rag-api"
        )
    except httpx.HTTPStatusError as exc:
        detail = exc.response.text
        try:
            detail = exc.response.json().get("detail", detail)
        except Exception:
            pass
        return f"API error ({exc.response.status_code}): {detail}"

    sources = ", ".join(data.get("sources", []))
    answer = data.get("answer", "")
    if sources:
        return f"{answer}\n\n_Sources: {sources}_"
    return answer


def main() -> None:
    demo = gr.ChatInterface(
        fn=chat_fn,
        title="HF Q&A RAG (dev)",
        description=(
            f"Talks to the FastAPI backend at **{API_URL}**. "
            "Run `hf-qa-rag-api` in another terminal first."
        ),
        examples=[
            "What is this project?",
            "How do I run the API?",
            "Where is the knowledge base stored?",
        ],
    )
    print(
        "\nGradio is a web UI — open the local URL in your browser.\n"
        "Press Ctrl+C to stop.\n"
    )
    demo.launch(server_name="127.0.0.1", server_port=7860)


if __name__ == "__main__":
    main()
