import http from "node:http";
import path from "node:path";
import { APP_ROOT, getConfig } from "./config.js";
import { chatComplete } from "./hfClient.js";
import { KnowledgeBase } from "./knowledge.js";

const { hfToken, hfModel, port, knowledgePath } = getConfig();
const knowledge = new KnowledgeBase(knowledgePath);

try {
  knowledge.load();
} catch (err) {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
}

function sendJson(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(JSON.stringify(payload));
}

async function readJson(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const body = Buffer.concat(chunks).toString("utf8");
  return body ? JSON.parse(body) : {};
}

function relativeKnowledgePath() {
  try {
    return path.relative(APP_ROOT, knowledge.path);
  } catch {
    return knowledge.path;
  }
}

function knowledgeInfo() {
  const preview =
    knowledge.content.length > 500
      ? `${knowledge.content.slice(0, 500)}...`
      : knowledge.content;
  return {
    path: relativeKnowledgePath(),
    char_count: knowledge.charCount,
    preview,
  };
}

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    return sendJson(res, 204, {});
  }

  try {
    const url = new URL(req.url ?? "/", `http://${req.headers.host}`);

    if (req.method === "GET" && url.pathname === "/health") {
      return sendJson(res, 200, {
        ok: true,
        model: hfModel,
        knowledge_loaded: Boolean(knowledge.content),
      });
    }

    if (req.method === "GET" && url.pathname === "/knowledge") {
      return sendJson(res, 200, knowledgeInfo());
    }

    if (req.method === "POST" && url.pathname === "/knowledge/reload") {
      knowledge.load();
      return sendJson(res, 200, { ok: true, char_count: knowledge.charCount });
    }

    if (req.method === "POST" && url.pathname === "/chat") {
      if (!hfToken) {
        return sendJson(res, 503, {
          detail:
            "HF_TOKEN is not set. Copy .env.example to .env and add your token.",
        });
      }

      const body = await readJson(req);
      const message = typeof body.message === "string" ? body.message.trim() : "";
      if (!message) {
        return sendJson(res, 400, { detail: "message is required" });
      }

      const history = Array.isArray(body.history) ? body.history : [];
      const messages = [{ role: "system", content: knowledge.systemPrompt() }];

      for (const item of history.slice(-10)) {
        if (
          item &&
          (item.role === "user" || item.role === "assistant") &&
          typeof item.content === "string"
        ) {
          messages.push({ role: item.role, content: item.content });
        }
      }
      messages.push({ role: "user", content: message });

      try {
        const answer = await chatComplete({
          token: hfToken,
          model: hfModel,
          messages,
        });
        return sendJson(res, 200, {
          answer,
          sources: [relativeKnowledgePath()],
        });
      } catch (err) {
        const detail =
          err instanceof Error ? err.message : "Hugging Face inference failed";
        return sendJson(res, 502, {
          detail: `Hugging Face inference failed: ${detail}`,
        });
      }
    }

    sendJson(res, 404, { detail: "not found" });
  } catch (err) {
    const status = err instanceof SyntaxError ? 400 : 500;
    sendJson(res, status, {
      detail: err instanceof Error ? err.message : "internal error",
    });
  }
});

server.listen(Number(port), () => {
  console.log(`hf-qa-rag-api (Node) http://127.0.0.1:${port}`);
  console.log(`model: ${hfModel}`);
  console.log(`knowledge: ${relativeKnowledgePath()} (${knowledge.charCount} chars)`);
  console.log("GET /health  GET /knowledge  POST /knowledge/reload  POST /chat");
});
