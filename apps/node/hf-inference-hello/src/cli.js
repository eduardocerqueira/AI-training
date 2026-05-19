import { classifySentiment, DEFAULT_MODEL, formatLabels } from "./inference.js";
import { getConfig, requireToken } from "./config.js";

const SAMPLES = [
  "I love learning Node.js!",
  "This stack trace is frustrating.",
  "Hugging Face Inference API works great from JavaScript.",
];

function parseArgs(argv) {
  let text = null;
  let model = null;
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === "--text" && argv[i + 1]) {
      text = argv[++i];
    } else if (argv[i] === "--model" && argv[i + 1]) {
      model = argv[++i];
    }
  }
  return { text, model };
}

async function main() {
  const { token, model: envModel } = getConfig();
  requireToken(token);
  const { text, model: argModel } = parseArgs(process.argv);
  const model = argModel || envModel || DEFAULT_MODEL;
  const texts = text ? [text] : SAMPLES;

  console.log(`Model: ${model}\n`);
  for (const t of texts) {
    const labels = await classifySentiment({ token, model, text: t });
    console.log(`${JSON.stringify(t)} -> ${formatLabels(labels)}`);
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
