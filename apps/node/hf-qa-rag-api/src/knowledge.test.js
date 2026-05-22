import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import { APP_ROOT } from "./config.js";
import { KnowledgeBase } from "./knowledge.js";

test("knowledge loads qa.txt", () => {
  const kb = new KnowledgeBase(path.join(APP_ROOT, "knowledge", "qa.txt"));
  kb.load();
  assert.ok(kb.charCount > 0);
  assert.match(kb.content, /Q:/);
});
