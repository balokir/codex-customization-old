import { readFile } from "node:fs/promises";

const POLICY_URL = new URL("./policy.json", import.meta.url);
const FALLBACK_GUIDANCE =
  "Hook policy could not be loaded, so the call was not blocked. Review the versioned hook files before relying on this guardrail.";
const FALLBACK_GUIDANCE_LIMIT = 240;

function writeGuidance(message, limit = FALLBACK_GUIDANCE_LIMIT) {
  const boundedLimit = Number.isSafeInteger(limit) && limit > 0
    ? Math.min(limit, FALLBACK_GUIDANCE_LIMIT)
    : FALLBACK_GUIDANCE_LIMIT;
  const additionalContext = String(message).slice(0, boundedLimit);

  process.stdout.write(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      additionalContext,
    },
  }));
}

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function validatePolicy(candidate) {
  if (!isRecord(candidate)
      || typeof candidate.engineVersion !== "string"
      || !Number.isSafeInteger(candidate.inputSchemaVersion)
      || !Number.isSafeInteger(candidate.maxInputBytes)
      || !Number.isSafeInteger(candidate.maxGuidanceChars)
      || !isRecord(candidate.supportedTools)
      || !Array.isArray(candidate.supportedTools.shell)
      || !candidate.supportedTools.shell.every((name) => typeof name === "string")
      || !Array.isArray(candidate.supportedTools.code)
      || !candidate.supportedTools.code.every((name) => typeof name === "string")
      || typeof candidate.supportedTools.mcpNamePattern !== "string"
      || !isRecord(candidate.guidance)) {
    throw new Error("Invalid policy");
  }

  for (const key of [
    "malformedJson",
    "oversizedInput",
    "missingField",
    "unsupportedSchema",
    "unknownTool",
    "invalidToolInput",
  ]) {
    if (typeof candidate.guidance[key] !== "string") {
      throw new Error("Invalid policy guidance");
    }
  }

  return {
    ...candidate,
    mcpNameRegex: new RegExp(candidate.supportedTools.mcpNamePattern, "u"),
  };
}

async function loadPolicy() {
  const text = await readFile(POLICY_URL, "utf8");
  return validatePolicy(JSON.parse(text));
}

async function readBoundedStdin(maxInputBytes) {
  const chunks = [];
  let bytes = 0;
  let oversized = false;

  for await (const chunk of process.stdin) {
    bytes += chunk.length;
    if (bytes > maxInputBytes) {
      oversized = true;
      continue;
    }
    chunks.push(chunk);
  }

  return {
    oversized,
    text: oversized ? "" : Buffer.concat(chunks).toString("utf8"),
  };
}

function normalizeToolCall(input, policy) {
  const schemaVersion = input.schema_version ?? policy.inputSchemaVersion;
  if (schemaVersion !== policy.inputSchemaVersion) {
    return { guidance: policy.guidance.unsupportedSchema };
  }

  if (typeof input.hook_event_name !== "string") {
    return { guidance: policy.guidance.missingField };
  }
  if (input.hook_event_name !== "PreToolUse") {
    return { irrelevant: true };
  }
  if (typeof input.tool_name !== "string" || input.tool_name.length === 0
      || !("tool_input" in input)) {
    return { guidance: policy.guidance.missingField };
  }

  const toolName = input.tool_name;
  const toolInput = input.tool_input;

  if (policy.supportedTools.shell.includes(toolName)) {
    if (!isRecord(toolInput) || typeof toolInput.command !== "string") {
      return { guidance: policy.guidance.invalidToolInput };
    }
    return { call: { kind: "shell", toolName, source: toolInput.command } };
  }

  if (policy.supportedTools.code.includes(toolName)) {
    if (typeof toolInput === "string") {
      return { call: { kind: "code", toolName, source: toolInput } };
    }
    if (isRecord(toolInput) && typeof toolInput.code === "string") {
      return { call: { kind: "code", toolName, source: toolInput.code } };
    }
    return { guidance: policy.guidance.invalidToolInput };
  }

  if (policy.mcpNameRegex.test(toolName)) {
    if (!isRecord(toolInput)) {
      return { guidance: policy.guidance.invalidToolInput };
    }
    return { call: { kind: "structured", toolName, arguments: toolInput } };
  }

  return { guidance: policy.guidance.unknownTool };
}

async function main() {
  let policy;
  try {
    policy = await loadPolicy();
  } catch {
    writeGuidance(FALLBACK_GUIDANCE);
    return;
  }

  const input = await readBoundedStdin(policy.maxInputBytes);
  if (input.oversized) {
    writeGuidance(policy.guidance.oversizedInput, policy.maxGuidanceChars);
    return;
  }

  let envelope;
  try {
    envelope = JSON.parse(input.text);
  } catch {
    writeGuidance(policy.guidance.malformedJson, policy.maxGuidanceChars);
    return;
  }

  if (!isRecord(envelope)) {
    writeGuidance(policy.guidance.missingField, policy.maxGuidanceChars);
    return;
  }

  const normalized = normalizeToolCall(envelope, policy);
  if (normalized.guidance) {
    writeGuidance(normalized.guidance, policy.maxGuidanceChars);
  }
}

await main();
