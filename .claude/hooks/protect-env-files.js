#!/usr/bin/env node
// PreToolUse hook: blocks edits to .env and .env.local files.

const path = require("path");

const PROTECTED = new Set([".env", ".env.local"]);

let raw = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => (raw += chunk));
process.stdin.on("end", () => {
  let input;
  try {
    input = JSON.parse(raw);
  } catch {
    process.exit(0); // Unparseable input: don't block.
  }

  const toolInput = input.tool_input || {};
  const target = toolInput.file_path || toolInput.notebook_path || "";
  const name = path.basename(target.replace(/\\/g, "/")).toLowerCase();

  if (PROTECTED.has(name)) {
    // Exit code 2 tells Claude Code to block the tool call; stderr is shown to Claude as the reason.
    process.stderr.write(`Blocked: ${target} is a protected environment file. Ask the user first before editing it.\n`);
    process.exit(2);
  }

  process.exit(0);
});
