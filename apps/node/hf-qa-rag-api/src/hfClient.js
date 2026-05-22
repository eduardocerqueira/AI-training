const CHAT_URL = "https://router.huggingface.co/v1/chat/completions";

/**
 * @param {{ token: string, model: string, messages: { role: string, content: string }[] }} opts
 * @returns {Promise<string>}
 */
export async function chatComplete({ token, model, messages }) {
  const res = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: 512,
      temperature: 0.2,
    }),
  });

  const raw = await res.text();
  if (!res.ok) {
    throw new Error(`inference API ${res.status}: ${raw.trim()}`);
  }

  const data = JSON.parse(raw);
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content === "string") {
    return content.trim();
  }
  if (Array.isArray(content)) {
    return content
      .filter((block) => block?.type === "text")
      .map((block) => block.text ?? "")
      .join("")
      .trim();
  }
  throw new Error(`unexpected chat response: ${raw.slice(0, 200)}`);
}
