from huggingface_hub import InferenceClient

from hf_qa_rag.config import settings


class HuggingFaceChat:
    def __init__(self) -> None:
        if not settings.hf_token:
            raise ValueError(
                "HF_TOKEN is not set. Copy .env.example to .env and add your token."
            )
        self._client = InferenceClient(token=settings.hf_token)
        self.model = settings.hf_model

    def complete(self, messages: list[dict[str, str]]) -> str:
        response = self._client.chat_completion(
            model=self.model,
            messages=messages,
            max_tokens=512,
            temperature=0.2,
        )
        choice = response.choices[0]
        content = choice.message.content
        if isinstance(content, str):
            return content.strip()
        parts: list[str] = []
        for block in content or []:
            if getattr(block, "type", None) == "text":
                parts.append(getattr(block, "text", ""))
        return "".join(parts).strip()
