import assert from "node:assert/strict";
import test from "node:test";
import { chatComplete } from "./hfClient.js";

global.fetch = async (url, options) => {
  if (url === "https://router.huggingface.co/v1/chat/completions") {
    return {
      ok: true,
      text: async () => JSON.stringify({
        choices: [{ message: { content: "Hello, world!" } }]
      }),
    };
  }
  return { ok: false, status: 404, text: async () => "Not Found" };
};

test("chatComplete returns trimmed content from valid response", async () => {
  const result = await chatComplete({
    token: "dummy_token",
    model: "dummy_model",
    messages: [{ role: "user", content: "Hello?" }],
  });
  assert.strictEqual(result, "Hello, world!");
});

test("chatComplete throws error on non-ok response", async () => {
  global.fetch = async () => ({
    ok: false,
    status: 500,
    text: async () => "Internal Server Error",
  });

  await assert.rejects(
    async () => {
      await chatComplete({
        token: "dummy_token",
        model: "dummy_model",
        messages: [{ role: "user", content: "Hello?" }],
      });
    },
    { message: /inference API 500: Internal Server Error/ }
  );
});

test("chatComplete throws error on unexpected response format", async () => {
  global.fetch = async () => ({
    ok: true,
    text: async () => JSON.stringify({ choices: [{}] }),
  });

  await assert.rejects(
    async () => {
      await chatComplete({
        token: "dummy_token",
        model: "dummy_model",
        messages: [{ role: "user", content: "Hello?" }],
      });
    },
    { message: /unexpected chat response:/ }
  );
});
