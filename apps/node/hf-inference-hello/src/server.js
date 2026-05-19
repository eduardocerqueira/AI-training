import http from "node:http";
import { classifySentiment, DEFAULT_MODEL } from "./inference.js";
import { getConfig, requireToken } from "./config.js";

function sendJson(res, status, payload) {
  res.writeHead(status, { "Content-Type": "application/json" });
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

function createServer({ token, model }) {
  const modelId = model || DEFAULT_MODEL;

  return http.createServer(async (req, res) => {
    try {
      if (req.method === "GET" && req.url === "/health") {
        return sendJson(res, 200, { status: "ok" });
      }

      if (req.method === "POST" && req.url === "/v1/sentiment") {
        const body = await readJson(req);
        const text = typeof body.text === "string" ? body.text.trim() : "";
        if (!text) {
          return sendJson(res, 400, { error: "text is required" });
        }
        const labels = await classifySentiment({ token, model: modelId, text });
        return sendJson(res, 200, { model: modelId, text, labels });
      }

      sendJson(res, 404, { error: "not found" });
    } catch (err) {
      const status = err instanceof SyntaxError ? 400 : 502;
      sendJson(res, status, { error: err.message });
    }
  });
}

const { token, model, port } = getConfig();
requireToken(token);

const server = createServer({ token, model });
server.listen(Number(port), () => {
  console.log(`hf-inference-hello (Node) listening on http://127.0.0.1:${port}`);
  console.log(`model: ${model || DEFAULT_MODEL}`);
  console.log('POST /v1/sentiment  body: {"text":"..."}');
});
