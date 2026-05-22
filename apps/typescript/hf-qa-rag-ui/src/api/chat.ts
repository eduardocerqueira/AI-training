const API_URL =
  import.meta.env.VITE_API_URL?.trim() || "http://127.0.0.1:8000";

export type ChatRole = "user" | "assistant";

export type ChatHistoryItem = {
  role: ChatRole;
  content: string;
};

export type ChatResponse = {
  answer: string;
  sources: string[];
};

export type HealthResponse = {
  ok: boolean;
  model: string;
  knowledge_loaded: boolean;
};

export async function fetchHealth(): Promise<HealthResponse> {
  const res = await fetch(`${API_URL}/health`);
  if (!res.ok) {
    throw new Error(`health check failed: ${res.status}`);
  }
  return res.json() as Promise<HealthResponse>;
}

export async function postChat(
  message: string,
  history: ChatHistoryItem[],
  signal?: AbortSignal,
): Promise<ChatResponse> {
  const res = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history }),
    signal,
  });

  const data = (await res.json()) as ChatResponse & { detail?: string };
  if (!res.ok) {
    throw new Error(data.detail ?? `chat failed: ${res.status}`);
  }
  return data;
}

export { API_URL };
