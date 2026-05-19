/** @typedef {{ label: string, score: number }} SentimentLabel */

export const DEFAULT_MODEL =
  "distilbert/distilbert-base-uncased-finetuned-sst-2-english";

const ROUTER_BASE = "https://router.huggingface.co/hf-inference/models";

/**
 * @param {unknown} data
 * @returns {SentimentLabel[]}
 */
export function parseSentimentResponse(data) {
  if (Array.isArray(data) && Array.isArray(data[0])) {
    return data[0];
  }
  if (Array.isArray(data) && data[0]?.label) {
    return data;
  }
  throw new Error(`unexpected response: ${JSON.stringify(data)}`);
}

/**
 * @param {{ token: string, model?: string, text: string }} opts
 * @returns {Promise<SentimentLabel[]>}
 */
export async function classifySentiment({ token, model = DEFAULT_MODEL, text }) {
  const url = `${ROUTER_BASE}/${model}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: text }),
  });

  const raw = await res.text();
  if (!res.ok) {
    throw new Error(`inference API ${res.status}: ${raw.trim()}`);
  }

  return parseSentimentResponse(JSON.parse(raw));
}

/**
 * @param {SentimentLabel[]} labels
 */
export function formatLabels(labels) {
  return labels.map((l) => `${l.label} (${l.score.toFixed(3)})`).join(", ");
}
