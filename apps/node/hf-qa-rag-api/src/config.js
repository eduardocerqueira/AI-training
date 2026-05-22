import "dotenv/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const APP_ROOT = path.resolve(__dirname, "..");

export function getConfig() {
  const hfToken = process.env.HF_TOKEN?.trim() ?? "";
  const hfModel =
    process.env.HF_MODEL?.trim() || "Qwen/Qwen2.5-1.5B-Instruct";
  const port = process.env.PORT?.trim() || "8000";
  const knowledgePath = path.resolve(
    APP_ROOT,
    process.env.KNOWLEDGE_PATH?.trim() || "knowledge/qa.txt",
  );
  return { hfToken, hfModel, port, knowledgePath };
}
