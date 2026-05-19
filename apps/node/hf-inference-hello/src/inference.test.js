import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  DEFAULT_MODEL,
  formatLabels,
  parseSentimentResponse,
} from "./inference.js";

describe("parseSentimentResponse", () => {
  it("parses nested array", () => {
    const labels = parseSentimentResponse([
      [{ label: "POSITIVE", score: 0.99 }],
    ]);
    assert.equal(labels[0].label, "POSITIVE");
  });

  it("parses flat array", () => {
    const labels = parseSentimentResponse([{ label: "NEGATIVE", score: 0.8 }]);
    assert.equal(labels[0].label, "NEGATIVE");
  });
});

describe("formatLabels", () => {
  it("formats scores", () => {
    const out = formatLabels([{ label: "POSITIVE", score: 0.991 }]);
    assert.match(out, /POSITIVE/);
    assert.match(out, /0.991/);
  });
});

describe("DEFAULT_MODEL", () => {
  it("uses namespaced hub id", () => {
    assert.match(DEFAULT_MODEL, /\//);
  });
});
