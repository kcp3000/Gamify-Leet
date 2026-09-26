import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { spawn } from "node:child_process";

const rootDir = resolve(import.meta.dirname, "..");
const pythonCandidates = process.platform === "win32"
  ? ["apps/api/.venv/Scripts/python.exe", "apps/api/.venv/Scripts/python"]
  : ["apps/api/.venv/bin/python"];

const pythonPath = pythonCandidates
  .map((candidate) => resolve(rootDir, candidate))
  .find((candidate) => existsSync(candidate));

if (!pythonPath) {
  console.error(
    "API virtual environment not found. Create it with: python -m venv apps/api/.venv",
  );
  process.exit(1);
}

const api = spawn(
  pythonPath,
  ["apps/api/manage.py", "runserver", "8000", ...process.argv.slice(2)],
  { cwd: rootDir, env: process.env, stdio: "inherit" },
);

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => api.kill(signal));
}

api.on("exit", (code, signal) => {
  process.exit(code ?? (signal ? 1 : 0));
});
