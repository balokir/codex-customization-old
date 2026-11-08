import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir, homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const diagnostic = join(repoRoot, "hooks", "post_tool_use_probe.mjs");
const root = join(tmpdir(), "codex-posttooluse-isolated");
const home = join(root, "codex-home");
const workspace = join(root, "workspace");
const configPath = join(home, "hooks.json");

function checkAncestors() {
  let at = workspace;
  for (;;) {
    for (const name of ["AGENTS.md", "AGENTS.override.md"]) {
      if (existsSync(join(at, name))) {
        throw new Error("Instruction file in workspace ancestry: " + join(at, name));
      }
    }
    // The normal user-level ~/.codex is not project-local configuration.
    // This lab uses its own CODEX_HOME, so the user's profile is ignored.
    const userHome = resolve(homedir());
    const isUserHome = process.platform === "win32"
      ? at.toLowerCase() === userHome.toLowerCase()
      : at === userHome;
    if (!isUserHome && (existsSync(join(at, ".codex", "hooks.json"))
        || existsSync(join(at, ".codex", "config.toml")))) {
      throw new Error("Project-local Codex config in: " + at);
    }
    const parent = dirname(at);
    if (parent === at) break;
    at = parent;
  }
}

if (process.argv.length !== 2) throw new Error("No arguments accepted");
if (!existsSync(diagnostic)) throw new Error("PostToolUse handler missing");
if (existsSync(configPath)) throw new Error("Lab already exists: " + configPath);
checkAncestors();

const quotePwsh = (s) => String.fromCharCode(34) + s + String.fromCharCode(34);
const quotePosix = (s) => String.fromCharCode(39) + s.replaceAll(String.fromCharCode(39), String.fromCharCode(39) + "\\" + String.fromCharCode(39) + String.fromCharCode(39)) + String.fromCharCode(39);
const hook = {
  type: "command",
  command: quotePosix(process.execPath) + " " + quotePosix(diagnostic),
  commandWindows: "& " + quotePwsh(process.execPath) + " " + quotePwsh(diagnostic),
  timeout: 5,
  statusMessage: "Isolated PostToolUse truncation probe",
};
const definition = {
  description: "Isolated non-blocking PostToolUse experiment",
  hooks: { PostToolUse: [{ matcher: "^Bash$", hooks: [hook] }] },
};

mkdirSync(home, { recursive: true });
mkdirSync(workspace, { recursive: true });
writeFileSync(configPath, JSON.stringify(definition, null, 2) + "\n", {
  encoding: "utf8", flag: "wx",
});
console.log("Isolated CODEX_HOME: " + home);
console.log("Clean workspace: " + workspace);
console.log("Only a non-blocking PostToolUse is installed in this lab.");
console.log("Existing Codex configuration was not changed.");
console.log("You may need to sign in independently in this isolated profile.");
