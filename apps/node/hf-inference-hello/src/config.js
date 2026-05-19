import "dotenv/config";

export function getConfig() {
  const token = process.env.HF_TOKEN?.trim();
  const model = process.env.HF_MODEL?.trim();
  const port = process.env.PORT?.trim() || "3000";
  return { token, model, port };
}

export function requireToken(token) {
  if (!token) {
    console.error("HF_TOKEN is not set. Add to .env or: export HF_TOKEN=hf_...");
    console.error("  hf auth login && export HF_TOKEN=...");
    process.exit(1);
  }
  return token;
}
