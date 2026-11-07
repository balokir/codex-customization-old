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

function writeDeny(reason, limit = FALLBACK_GUIDANCE_LIMIT) {
  const boundedLimit = Number.isSafeInteger(limit) && limit > 0
    ? Math.min(limit, FALLBACK_GUIDANCE_LIMIT)
    : FALLBACK_GUIDANCE_LIMIT;
  const permissionDecisionReason = String(reason).slice(0, boundedLimit);

  process.stdout.write(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "deny",
      permissionDecisionReason,
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
      || !Number.isSafeInteger(candidate.maxDecisionReasonChars)
      || !isRecord(candidate.supportedTools)
      || !Array.isArray(candidate.supportedTools.shell)
      || !candidate.supportedTools.shell.every((name) => typeof name === "string")
      || !Array.isArray(candidate.supportedTools.code)
      || !candidate.supportedTools.code.every((name) => typeof name === "string")
      || typeof candidate.supportedTools.mcpNamePattern !== "string"
      || !isRecord(candidate.guidance)
      || !isRecord(candidate.boundedReads)
      || !Array.isArray(candidate.boundedReads.knownHighVolumeNames)
      || !candidate.boundedReads.knownHighVolumeNames.every(
        (name) => typeof name === "string",
      )
      || !Array.isArray(candidate.boundedReads.knownHighVolumeExtensions)
      || !candidate.boundedReads.knownHighVolumeExtensions.every(
        (extension) => typeof extension === "string",
      )
      || !isRecord(candidate.boundedReads.denyReasons)) {
    throw new Error("Invalid policy");
  }

  for (const key of [
    "malformedJson",
    "oversizedInput",
    "missingField",
    "unsupportedSchema",
    "unknownTool",
    "invalidToolInput",
    "ambiguousRead",
    "dynamicRead",
    "ambiguousSearch",
  ]) {
    if (typeof candidate.guidance[key] !== "string") {
      throw new Error("Invalid policy guidance");
    }
  }

  for (const key of ["knownHighVolume", "multipleReads", "broadSearch"]) {
    if (typeof candidate.boundedReads.denyReasons[key] !== "string") {
      throw new Error("Invalid bounded-read decision reason");
    }
  }

  return {
    ...candidate,
    mcpNameRegex: new RegExp(candidate.supportedTools.mcpNamePattern, "u"),
  };
}

function countMatches(source, pattern) {
  return Array.from(source.matchAll(pattern)).length;
}

function maskShellQuotedAndCommentText(source) {
  let masked = "";
  let quote = null;
  let comment = false;

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    const previous = index > 0 ? source[index - 1] : "";

    if (comment) {
      if (character === "\n" || character === "\r") {
        comment = false;
        masked += character;
      } else {
        masked += " ";
      }
      continue;
    }
    if (quote !== null) {
      if (character === quote && previous !== "`") {
        quote = null;
      }
      masked += " ";
      continue;
    }
    if (character === "'" || character === "\"") {
      quote = character;
      masked += " ";
      continue;
    }
    if (character === "#") {
      comment = true;
      masked += " ";
      continue;
    }
    masked += character;
  }

  return masked;
}

function commandInvocationPattern(command, global = false) {
  return new RegExp(
    `(?:^|[;|&=(\\r\\n])\\s*(?:&\\s*)?${command}\\b`,
    global ? "giu" : "iu",
  );
}

function hasCommandInvocation(source, command) {
  return commandInvocationPattern(command).test(source);
}

function countCommandInvocations(source, command) {
  return countMatches(source, commandInvocationPattern(command, true));
}

function splitShellSegments(source, executableSource, separatorKind) {
  const segments = [];
  let start = 0;

  for (let index = 0; index < executableSource.length; index += 1) {
    const character = executableSource[index];
    const next = executableSource[index + 1] ?? "";
    let separatorLength = 0;

    if (separatorKind === "statement") {
      if (character === ";" || character === "\n" || character === "\r") {
        separatorLength = character === "\r" && next === "\n" ? 2 : 1;
      } else if ((character === "&" && next === "&")
          || (character === "|" && next === "|")) {
        separatorLength = 2;
      }
    } else if (separatorKind === "pipeline"
        && character === "|" && next !== "|") {
      separatorLength = 1;
    }

    if (separatorLength === 0) {
      continue;
    }

    segments.push({
      source: source.slice(start, index),
      executableSource: executableSource.slice(start, index),
    });
    index += separatorLength - 1;
    start = index + 1;
  }

  segments.push({
    source: source.slice(start),
    executableSource: executableSource.slice(start),
  });
  return segments.filter((segment) => segment.executableSource.trim().length > 0);
}

function splitShellStatements(source, executableSource) {
  return splitShellSegments(source, executableSource, "statement");
}

function splitPipelineStages(statement) {
  return splitShellSegments(
    statement.source,
    statement.executableSource,
    "pipeline",
  );
}

function hasDynamicShellTarget(source) {
  return /(?:\$\{|\$[A-Za-z_(]|%[A-Za-z_][A-Za-z0-9_]*%)/u.test(source);
}

function hasKnownHighVolumeTarget(source, policy) {
  const lowerSource = source.toLowerCase();
  return policy.boundedReads.knownHighVolumeNames.some(
    (name) => lowerSource.includes(name.toLowerCase()),
  ) || policy.boundedReads.knownHighVolumeExtensions.some(
    (extension) => lowerSource.includes(extension.toLowerCase()),
  );
}

function isSizeOrLineCountProbe(source) {
  return /\bGet-Content\b[\s\S]*\)\.Count\b/iu.test(source);
}

function isProducerBoundedRead(source) {
  return /\bGet-Content\b[\s\S]*-(?:TotalCount|Tail)\s+\d+\b/iu.test(source)
    || /\bGet-Content\b[\s\S]*\[[ ]*\d+[ ]*\.\.[ ]*\d+[ ]*\]/iu.test(source)
    || /\b(?:head|tail)\b[\s\S]*\s-[nc]\s*\d+\b/iu.test(source);
}

function isProducerBoundedSearch(source) {
  return /\brg\b[\s\S]*(?:\s-m\s*\d+\b|\s--max-count(?:=|\s+)\d+\b)/iu.test(source);
}

function isImmediateOutputBound(source) {
  return /^\s*Select-Object\b[\s\S]*-(?:First|Last)\s+\d+\b/iu.test(source);
}

function isImmediateLineCount(source) {
  return /^\s*Measure-Object\b[\s\S]*-Line\b/iu.test(source);
}

function isBroadSearch(source) {
  return /\brg\b[\s\S]*(?:\s(?:\.|\/|[A-Za-z]:\\)[\s'"]*$|\s--files(?:\s|$))/iu.test(source);
}

function hasMultipleLiteralPaths(commandSource) {
  return /\bGet-Content\b[\s\S]*['"][^'"]+['"]\s*,\s*['"][^'"]+['"]/iu.test(commandSource);
}

function classifyShellRead(source, policy) {
  const executableSource = maskShellQuotedAndCommentText(source);
  const statements = splitShellStatements(source, executableSource);
  const classifiedStatements = statements.map((statement) => ({
    statement,
    contentReadCount: countCommandInvocations(
      statement.executableSource,
      "(?:Get-Content|head|tail)",
    ),
    searchCount: countCommandInvocations(statement.executableSource, "rg"),
  }));
  const operationCount = classifiedStatements.reduce(
    (total, candidate) => total + candidate.contentReadCount + candidate.searchCount,
    0,
  );

  if (operationCount === 0) {
    return { safe: true };
  }
  if (operationCount > 1) {
    return { deny: policy.boundedReads.denyReasons.multipleReads };
  }

  const classified = classifiedStatements.find(
    (candidate) => candidate.contentReadCount + candidate.searchCount === 1,
  );
  const { statement } = classified;
  const isContentRead = classified.contentReadCount === 1;
  const isSearch = classified.searchCount === 1;
  const pipelineStages = splitPipelineStages(statement);
  const commandStageIndex = pipelineStages.findIndex((stage) => (
    isContentRead
      ? hasCommandInvocation(stage.executableSource, "(?:Get-Content|head|tail)")
      : hasCommandInvocation(stage.executableSource, "rg")
  ));
  const commandStage = pipelineStages[commandStageIndex];
  const nextStage = pipelineStages[commandStageIndex + 1];

  if (hasMultipleLiteralPaths(commandStage.source)) {
    return { deny: policy.boundedReads.denyReasons.multipleReads };
  }
  if (isContentRead
      && (isSizeOrLineCountProbe(commandStage.executableSource)
        || isProducerBoundedRead(commandStage.executableSource)
        || (nextStage !== undefined
          && (isImmediateOutputBound(nextStage.executableSource)
            || isImmediateLineCount(nextStage.executableSource))))) {
    return { safe: true };
  }
  if (isSearch
      && (isProducerBoundedSearch(commandStage.executableSource)
        || (nextStage !== undefined
          && isImmediateOutputBound(nextStage.executableSource)))
      && !isBroadSearch(commandStage.source)) {
    return { safe: true };
  }
  if (hasDynamicShellTarget(commandStage.source)) {
    return { guidance: policy.guidance.dynamicRead };
  }
  if (isSearch) {
    if (isBroadSearch(commandStage.source)) {
      return { deny: policy.boundedReads.denyReasons.broadSearch };
    }
    return { guidance: policy.guidance.ambiguousSearch };
  }
  if (hasKnownHighVolumeTarget(commandStage.source, policy)) {
    return { deny: policy.boundedReads.denyReasons.knownHighVolume };
  }
  return { guidance: policy.guidance.ambiguousRead };
}

function structuredPath(argumentsValue) {
  for (const key of ["path", "file", "filePath", "filename"]) {
    if (key in argumentsValue) {
      return argumentsValue[key];
    }
  }
  return undefined;
}

function hasStructuredBound(argumentsValue) {
  if (Number.isSafeInteger(argumentsValue.limit) && argumentsValue.limit > 0) {
    return true;
  }
  if (Number.isSafeInteger(argumentsValue.length) && argumentsValue.length > 0) {
    return true;
  }
  if (Number.isSafeInteger(argumentsValue.startLine)
      && Number.isSafeInteger(argumentsValue.endLine)
      && argumentsValue.startLine >= 0
      && argumentsValue.endLine >= argumentsValue.startLine) {
    return true;
  }
  return isRecord(argumentsValue.range)
    && Number.isSafeInteger(argumentsValue.range.start)
    && Number.isSafeInteger(argumentsValue.range.end)
    && argumentsValue.range.start >= 0
    && argumentsValue.range.end >= argumentsValue.range.start;
}

function isStructuredReadTool(toolName) {
  const tokens = toolName.toLowerCase().split(/__|_/u);
  return tokens.includes("read")
    || ((tokens.includes("get") || tokens.includes("fetch"))
      && tokens.some((token) => ["file", "content", "text"].includes(token)));
}

function classifyStructuredRead(call, policy) {
  if (!isStructuredReadTool(call.toolName)) {
    return { safe: true };
  }

  const path = structuredPath(call.arguments);
  if (path === undefined) {
    return { guidance: policy.guidance.ambiguousRead };
  }
  if (Array.isArray(path)) {
    return path.length > 1
      ? { deny: policy.boundedReads.denyReasons.multipleReads }
      : { guidance: policy.guidance.ambiguousRead };
  }
  if (typeof path !== "string" || path.length === 0) {
    return { guidance: policy.guidance.ambiguousRead };
  }
  if (/[${}*?]/u.test(path)) {
    return { guidance: policy.guidance.dynamicRead };
  }
  if (hasStructuredBound(call.arguments)) {
    return { safe: true };
  }
  if (hasKnownHighVolumeTarget(path, policy)) {
    return { deny: policy.boundedReads.denyReasons.knownHighVolume };
  }
  return { guidance: policy.guidance.ambiguousRead };
}

function classifyBoundedRead(call, policy) {
  if (call.kind === "shell") {
    return classifyShellRead(call.source, policy);
  }
  if (call.kind === "structured") {
    return classifyStructuredRead(call, policy);
  }
  return { safe: true };
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
    return;
  }
  if (normalized.irrelevant) {
    return;
  }

  const boundedRead = classifyBoundedRead(normalized.call, policy);
  if (boundedRead.deny) {
    writeDeny(boundedRead.deny, policy.maxDecisionReasonChars);
  } else if (boundedRead.guidance) {
    writeGuidance(boundedRead.guidance, policy.maxGuidanceChars);
  }
}

await main();
