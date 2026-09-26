import { spawnSync } from "node:child_process";

const result = spawnSync("git", ["config", "core.hooksPath", ".githooks"], {
  cwd: process.cwd(),
  stdio: "inherit",
  shell: process.platform === "win32",
});

if (result.error || result.status !== 0) {
  console.error(result.error?.message ?? "Failed to configure Git hooks.");
  process.exit(result.status ?? 1);
}

console.log("Git hooks enabled for this repository.");
