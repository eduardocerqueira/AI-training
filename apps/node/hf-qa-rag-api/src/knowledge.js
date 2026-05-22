import fs from "node:fs";

const SYSTEM_PROMPT_TEMPLATE = `You are a helpful assistant that answers questions using ONLY the Q&A knowledge base below.
If the answer is not in the knowledge base, say clearly that you do not know and do not invent facts.
Keep answers concise.

--- KNOWLEDGE BASE ---
{knowledge}
--- END KNOWLEDGE BASE ---
`;

export class KnowledgeBase {
  /** @param {string} filePath */
  constructor(filePath) {
    this.path = filePath;
    this._content = "";
  }

  load() {
    if (!fs.existsSync(this.path)) {
      throw new Error(`Knowledge file not found: ${this.path}`);
    }
    this._content = fs.readFileSync(this.path, "utf8").trim();
  }

  get content() {
    return this._content;
  }

  get charCount() {
    return this._content.length;
  }

  systemPrompt() {
    if (!this._content) {
      throw new Error("Knowledge base not loaded");
    }
    return SYSTEM_PROMPT_TEMPLATE.replace("{knowledge}", this._content);
  }
}
