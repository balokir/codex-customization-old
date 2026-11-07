import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ENGINE_URL = new URL("../pre_tool_use.mjs", import.meta.url);
const ENGINE_PATH = fileURLToPath(ENGINE_URL);
const SECRET_PAYLOAD = "E1_SECRET_PAYLOAD_7391";
const SECRET_METADATA = "E1_SECRET_METADATA_1842";

function invoke(input) {
  const result = spawnSync(process.execPath, [ENGINE_PATH], {
    input: typeof input === "string" ? input : JSON.stringify(input),
    encoding: "utf8",
    windowsHide: true,
  });

  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stderr, "");
  return result.stdout;
}

function assertEmpty(name, input) {
  assert.equal(invoke(input), "", `${name} should produce empty output`);
}

function assertGuidance(name, input) {
  const stdout = invoke(input);
  assert.notEqual(stdout, "", `${name} should produce guidance`);

  const output = JSON.parse(stdout);
  assert.deepEqual(Object.keys(output), ["hookSpecificOutput"]);
  assert.deepEqual(Object.keys(output.hookSpecificOutput), [
    "hookEventName",
    "additionalContext",
  ]);
  assert.equal(output.hookSpecificOutput.hookEventName, "PreToolUse");
  assert.equal(typeof output.hookSpecificOutput.additionalContext, "string");
  assert.ok(output.hookSpecificOutput.additionalContext.length > 0);
  assert.ok(output.hookSpecificOutput.additionalContext.length <= 240);
  assert.equal("permissionDecision" in output.hookSpecificOutput, false);
  assert.equal(stdout.includes(SECRET_PAYLOAD), false);
  assert.equal(stdout.includes(SECRET_METADATA), false);
}

function assertDeny(name, input) {
  const stdout = invoke(input);
  assert.notEqual(stdout, "", `${name} should produce a deny decision`);

  const output = JSON.parse(stdout);
  assert.deepEqual(Object.keys(output), ["hookSpecificOutput"]);
  assert.deepEqual(Object.keys(output.hookSpecificOutput), [
    "hookEventName",
    "permissionDecision",
    "permissionDecisionReason",
  ]);
  assert.equal(output.hookSpecificOutput.hookEventName, "PreToolUse");
  assert.equal(output.hookSpecificOutput.permissionDecision, "deny");
  assert.equal(typeof output.hookSpecificOutput.permissionDecisionReason, "string");
  assert.ok(output.hookSpecificOutput.permissionDecisionReason.length > 0);
  assert.ok(output.hookSpecificOutput.permissionDecisionReason.length <= 240);
  assert.equal(stdout.includes(SECRET_PAYLOAD), false);
  assert.equal(stdout.includes(SECRET_METADATA), false);
}

const safeEnvelope = {
  session_id: "fixture-session",
  transcript_path: null,
  cwd: "C:\\fixture",
  hook_event_name: "PreToolUse",
  model: "fixture-model",
  permission_mode: "default",
  turn_id: "fixture-turn",
  tool_name: "Bash",
  tool_use_id: "fixture-tool-use",
  tool_input: { command: "Write-Output 'bounded fixture'" },
};

assertEmpty("recognized safe documented envelope", safeEnvelope);
assertEmpty("irrelevant event", {
  ...safeEnvelope,
  hook_event_name: "PostToolUse",
});
assertEmpty("supported code freeform shape", {
  ...safeEnvelope,
  tool_name: "functions.exec",
  tool_input: "text('bounded fixture')",
});
assertEmpty("supported code object shape", {
  ...safeEnvelope,
  tool_name: "functions.exec",
  tool_input: { code: "text('bounded fixture')" },
});
assertEmpty("supported structured shape", {
  ...safeEnvelope,
  tool_name: "mcp__fixture__read_file",
  tool_input: { path: "fixture.txt", offset: 0, limit: 10 },
});

assertGuidance("unknown tool", {
  ...safeEnvelope,
  tool_name: "UnknownFixtureTool",
  tool_input: { payload: SECRET_PAYLOAD },
  private_metadata: SECRET_METADATA,
});
assertGuidance("missing event", {
  tool_name: "Bash",
  tool_input: { command: SECRET_PAYLOAD },
  private_metadata: SECRET_METADATA,
});
assertGuidance("missing tool name", {
  ...safeEnvelope,
  tool_name: undefined,
  tool_input: { command: SECRET_PAYLOAD },
  private_metadata: SECRET_METADATA,
});
assertGuidance("missing tool input", {
  ...safeEnvelope,
  tool_input: undefined,
  private_metadata: SECRET_METADATA,
});
assertGuidance("malformed JSON", `{not-json:${SECRET_PAYLOAD}:${SECRET_METADATA}`);
assertGuidance("newer unsupported schema", {
  ...safeEnvelope,
  schema_version: 2,
  tool_input: { command: SECRET_PAYLOAD },
  private_metadata: SECRET_METADATA,
});
assertGuidance("invalid supported tool input", {
  ...safeEnvelope,
  tool_input: { command: { payload: SECRET_PAYLOAD } },
  private_metadata: SECRET_METADATA,
});
assertGuidance("oversized envelope", "x".repeat(65537) + SECRET_PAYLOAD + SECRET_METADATA);

assertEmpty("size probe", {
  ...safeEnvelope,
  tool_input: {
    command: "Get-Item -LiteralPath 'C:\\fixtures\\build.log' | Select-Object Length",
  },
});
assertEmpty("line-count probe", {
  ...safeEnvelope,
  tool_input: {
    command: "(Get-Content -LiteralPath 'C:\\fixtures\\build.log').Count",
  },
});
assertEmpty("producer-bounded quoted read", {
  ...safeEnvelope,
  tool_input: {
    command: "Get-Content -LiteralPath 'C:\\fixtures\\build.log' -TotalCount 40",
  },
});
assertEmpty("producer-bounded range read", {
  ...safeEnvelope,
  tool_input: {
    command: "(Get-Content -LiteralPath 'C:\\fixtures\\build.log')[20..39]",
  },
});
assertEmpty("structured bounded read", {
  ...safeEnvelope,
  tool_name: "mcp__fixture__read_file",
  tool_input: {
    path: "C:\\fixtures\\build.log",
    offset: 20,
    limit: 20,
  },
});
assertEmpty("unrelated structured tool", {
  ...safeEnvelope,
  tool_name: "mcp__fixture__write_file",
  tool_input: {
    path: "C:\\fixtures\\build.log",
    content: "bounded fixture",
  },
});
assertGuidance("missing file with unknown size", {
  ...safeEnvelope,
  tool_input: {
    command: "Get-Content -LiteralPath 'C:\\fixtures\\missing.txt'",
  },
  private_metadata: SECRET_METADATA,
});
assertGuidance("dynamic shell path", {
  ...safeEnvelope,
  tool_input: {
    command: `Get-Content -LiteralPath $fixturePath # ${SECRET_PAYLOAD}`,
  },
  private_metadata: SECRET_METADATA,
});
assertGuidance("unknown complete read with unavailable probe history", {
  ...safeEnvelope,
  tool_input: {
    command: `Get-Content -LiteralPath 'C:\\fixtures\\notes.txt' # ${SECRET_PAYLOAD}`,
  },
  private_metadata: SECRET_METADATA,
});
assertDeny("quoted complete known-large read", {
  ...safeEnvelope,
  tool_input: {
    command: `Get-Content -LiteralPath "C:\\fixtures\\build.log" # ${SECRET_PAYLOAD}`,
  },
  private_metadata: SECRET_METADATA,
});
assertDeny("multiple complete reads", {
  ...safeEnvelope,
  tool_input: {
    command: `Get-Content 'first.txt'; Get-Content 'second.txt' # ${SECRET_PAYLOAD}`,
  },
  private_metadata: SECRET_METADATA,
});
assertDeny("mixed bounded and unbounded multi-read", {
  ...safeEnvelope,
  tool_input: {
    command: `Get-Content 'first.log' -TotalCount 10; Get-Content 'second.log' # ${SECRET_PAYLOAD}`,
  },
  private_metadata: SECRET_METADATA,
});
assertDeny("multi-path complete read", {
  ...safeEnvelope,
  tool_input: {
    command: `Get-Content -LiteralPath 'first.log','second.log' # ${SECRET_PAYLOAD}`,
  },
  private_metadata: SECRET_METADATA,
});
assertDeny("broad search", {
  ...safeEnvelope,
  tool_input: {
    command: `rg -n '${SECRET_PAYLOAD}' .`,
    max_output_tokens: 20,
  },
  private_metadata: SECRET_METADATA,
});
assertGuidance("unbounded scoped search", {
  ...safeEnvelope,
  tool_input: {
    command: `rg -n '${SECRET_PAYLOAD}' 'C:\\fixtures\\notes.txt'`,
  },
  private_metadata: SECRET_METADATA,
});
assertDeny("consumer-only limit does not bound known-large read", {
  ...safeEnvelope,
  tool_input: {
    command: `Get-Content -LiteralPath 'C:\\fixtures\\build.log' # ${SECRET_PAYLOAD}`,
    max_output_tokens: 20,
  },
  private_metadata: SECRET_METADATA,
});
assertDeny("unrelated later size probe does not authorize read", {
  ...safeEnvelope,
  tool_input: {
    command: "Get-Content 'AGENTS.md'; Get-Item 'other.txt' | Select-Object Length",
  },
});
assertDeny("unrelated later output limit does not authorize read", {
  ...safeEnvelope,
  tool_input: {
    command: "Get-Content 'AGENTS.md'; Write-Output x | Select-Object -First 10",
  },
});
assertDeny("unrelated pipeline size probe does not authorize read", {
  ...safeEnvelope,
  tool_input: {
    command: "Get-Content 'AGENTS.md' | Get-Item 'other.txt' | Select-Object Length",
  },
});
assertDeny("non-adjacent pipeline limit does not authorize read", {
  ...safeEnvelope,
  tool_input: {
    command: "Get-Content 'AGENTS.md' | Write-Output x | Select-Object -First 10",
  },
});
assertGuidance("known-high-volume name outside read statement is ignored", {
  ...safeEnvelope,
  tool_input: {
    command: "Write-Output 'AGENTS.md'; Get-Content 'notes.txt'",
  },
});
assertGuidance("structured read missing path", {
  ...safeEnvelope,
  tool_name: "mcp__fixture__read_file",
  tool_input: { offset: 0, secret: SECRET_PAYLOAD },
  private_metadata: SECRET_METADATA,
});
assertGuidance("structured dynamic path", {
  ...safeEnvelope,
  tool_name: "mcp__fixture__read_file",
  tool_input: { path: `C:\\fixtures\\${SECRET_PAYLOAD}\\*.log` },
  private_metadata: SECRET_METADATA,
});
assertDeny("structured multiple reads", {
  ...safeEnvelope,
  tool_name: "mcp__fixture__read_file",
  tool_input: { path: ["first.txt", "second.txt"], secret: SECRET_PAYLOAD },
  private_metadata: SECRET_METADATA,
});
assertEmpty("read tokens inside quoted output are not commands", {
  ...safeEnvelope,
  tool_input: {
    command: "Write-Output \"Get-Content AGENTS.md; rg -n secret .\"",
  },
});

function codeEnvelope(source) {
  return {
    ...safeEnvelope,
    tool_name: "functions.exec",
    tool_input: { code: source },
    private_metadata: SECRET_METADATA,
  };
}

assertEmpty("exact-name availability check", codeEnvelope(`
  const available = ALL_TOOLS.some(
    x => x.name === "mcp__fixture__read_file"
  );
  text({ available });
`));
assertEmpty("exact-name names-only discovery at limit 100", codeEnvelope(`
  const names = ALL_TOOLS
    .map(x => x.name)
    .filter(name => name === "mcp__fixture__read_file");
  text({ count: names.length, names: names.slice(0, 100) });
`));
assertEmpty("explicit-prefix names-only discovery at limit 100", codeEnvelope(`
  const names = ALL_TOOLS
    .map(item => item.name)
    .filter(name => name.startsWith("mcp__fixture__") || name.startsWith("mcp__safe__"));
  text({ count: names.length, names: names.slice(0, 100) });
`));
assertEmpty("explicit-prefix names-only discovery at limit zero", codeEnvelope(`
  const names = ALL_TOOLS
    .map(item => item.name)
    .filter(name => name.startsWith("mcp__fixture__"));
  text({ count: names.length, names: names.slice(0, 0) });
`));
assertEmpty("pipeline-bounded names-only discovery", codeEnvelope(`
  const names = ALL_TOOLS
    .map(item => item.name)
    .filter(name => name.startsWith("mcp__fixture__"))
    .slice(0, 100);
  text({ count: names.length, names });
`));

assertDeny("direct ALL_TOOLS serialization", codeEnvelope(`
  text(JSON.stringify(ALL_TOOLS)); // ${SECRET_PAYLOAD}
`));
assertDeny("direct ALL_TOOLS emission", codeEnvelope(`
  text(ALL_TOOLS); // ${SECRET_PAYLOAD}
`));
assertDeny("descriptor description filtering", codeEnvelope(`
  const matches = ALL_TOOLS.filter(item => item.description.includes("fixture"));
  text(matches); // ${SECRET_PAYLOAD}
`));
assertDeny("descriptor schema mapping", codeEnvelope(`
  const schemas = ALL_TOOLS.map(item => item.inputSchema);
  text(schemas); // ${SECRET_PAYLOAD}
`));
assertDeny("complete descriptor mapping", codeEnvelope(`
  const descriptors = ALL_TOOLS.map(item => item);
  text(descriptors); // ${SECRET_PAYLOAD}
`));
assertDeny("unrestricted names inventory without filter", codeEnvelope(`
  const names = ALL_TOOLS.map(item => item.name);
  text({ count: names.length, names: names.slice(0, 100) });
`));
assertDeny("filtered names inventory without output limit", codeEnvelope(`
  const names = ALL_TOOLS
    .map(item => item.name)
    .filter(name => name.startsWith("mcp__fixture__"));
  text({ count: names.length, names });
`));
assertDeny("names output limit 101", codeEnvelope(`
  const names = ALL_TOOLS
    .map(item => item.name)
    .filter(name => name.startsWith("mcp__fixture__"));
  text({ count: names.length, names: names.slice(0, 101) });
`));
assertDeny("generic descriptor search term", codeEnvelope(`
  const names = ALL_TOOLS
    .map(item => item.name)
    .filter(name => name.includes("tool"));
  text({ count: names.length, names: names.slice(0, 100) });
`));
assertDeny("generic exact discovery term", codeEnvelope(`
  const names = ALL_TOOLS
    .map(item => item.name)
    .filter(name => name === "memory");
  text({ count: names.length, names: names.slice(0, 100) });
`));
assertDeny("descriptor filtering before name reduction", codeEnvelope(`
  const names = ALL_TOOLS
    .filter(item => item.name.startsWith("mcp__fixture__"))
    .map(item => item.name)
    .slice(0, 100);
  text({ count: names.length, names });
`));
assertDeny("descriptor find before name reduction", codeEnvelope(`
  const descriptor = ALL_TOOLS.find(
    item => item.name === "mcp__fixture__read_file"
  );
  text(descriptor); // ${SECRET_PAYLOAD}
`));
assertDeny("descriptor findIndex before name reduction", codeEnvelope(`
  const descriptorIndex = ALL_TOOLS.findIndex(
    item => item.name === "mcp__fixture__read_file"
  );
  text({ descriptorIndex }); // ${SECRET_PAYLOAD}
`));
assertDeny("summary with an extra metadata field", codeEnvelope(`
  const names = ALL_TOOLS
    .map(item => item.name)
    .filter(name => name.startsWith("mcp__fixture__"));
  text({ count: names.length, names: names.slice(0, 100), metadata: ${JSON.stringify(SECRET_PAYLOAD)} });
`));
assertDeny("names summary plus second output sink", codeEnvelope(`
  const names = ALL_TOOLS
    .map(item => item.name)
    .filter(name => name.startsWith("mcp__fixture__"));
  text({ count: names.length, names: names.slice(0, 100) });
  console.log(${JSON.stringify(SECRET_PAYLOAD)});
`));
assertDeny("unrelated filter and slice do not authorize inventory", codeEnvelope(`
  const names = ALL_TOOLS.map(item => item.name);
  const other = values
    .filter(name => name.startsWith("mcp__fixture__"))
    .slice(0, 100);
  text({ count: names.length, names }); // ${SECRET_PAYLOAD}
`));
assertDeny("unrelated slice does not bound filtered names", codeEnvelope(`
  const names = ALL_TOOLS
    .map(item => item.name)
    .filter(name => name.startsWith("mcp__fixture__"));
  const other = values.slice(0, 100);
  text({ count: names.length, names }); // ${SECRET_PAYLOAD}
`));

assertGuidance("dynamic explicit-prefix value", codeEnvelope(`
  const prefix = "mcp__fixture__";
  const names = ALL_TOOLS
    .map(item => item.name)
    .filter(name => name.startsWith(prefix));
  text({ count: names.length, names: names.slice(0, 100) });
  // ${SECRET_PAYLOAD}
`));
assertGuidance("computed name-field access", codeEnvelope(`
  const names = ALL_TOOLS
    .map(item => item["name"])
    .filter(name => name.startsWith("mcp__fixture__"));
  text({ count: names.length, names: names.slice(0, 100) });
  // ${SECRET_PAYLOAD}
`));
assertGuidance("obfuscated ALL_TOOLS global reference", codeEnvelope(`
  const catalog = globalThis["ALL_" + "TOOLS"];
  text(catalog); // ${SECRET_PAYLOAD}
`));
assertGuidance("aliased ALL_TOOLS source", codeEnvelope(`
  const catalog = ALL_TOOLS;
  text(catalog); // ${SECRET_PAYLOAD}
`));
assertGuidance("computed descriptor metadata access", codeEnvelope(`
  const descriptions = ALL_TOOLS.map(item => item["description"]);
  text(descriptions); // ${SECRET_PAYLOAD}
`));
assertGuidance("ALL_TOOLS token in regular expression source", codeEnvelope(`
  const pattern = /ALL_TOOLS/u;
  text({ matched: pattern.test("fixture") }); // ${SECRET_PAYLOAD}
`));
assertGuidance(
  "ALL_TOOLS template interpolation",
  codeEnvelope("text(`${ALL_TOOLS}`); // " + SECRET_PAYLOAD),
);

console.log("E1/E2/E3: 67 fixture cases passed");
