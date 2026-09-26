import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

const run = (command, args, label) => {
  console.log(`\n[pre-commit] ${label}`);
  const result = spawnSync(command, args, {
    cwd: process.cwd(),
    stdio: "inherit",
    shell: false,
  });

  if (result.error || result.status !== 0) {
    console.error(result.error?.message ?? `[pre-commit] ${label} failed.`);
    process.exit(result.status ?? 1);
  }
};

const node = process.execPath;
const prettier = resolve("node_modules/prettier/bin/prettier.cjs");
const tsc = resolve("apps/web/node_modules/typescript/bin/tsc");
const python =
  process.platform === "win32"
    ? ".\\apps\\api\\.venv\\Scripts\\python.exe"
    : "./apps/api/.venv/bin/python";

run(
  node,
  [
    prettier,
    "--check",
    "README.md",
    "package.json",
    "apps/web/**/*.{ts,tsx,json}",
    "packages/**/*.{ts,tsx,json}",
    "scripts/**/*.mjs",
    "eslint.config.mjs",
    "mprocs.yaml",
  ],
  "format check",
);

run(node, [resolve("node_modules/eslint/bin/eslint.js"), "."], "ESLint check");

run(
  node,
  [tsc, "--project", resolve("apps/web/tsconfig.json"), "--noEmit"],
  "frontend TypeScript check",
);

run(python, ["apps/api/manage.py", "check"], "Django system check");

console.log("\n[pre-commit] All fast checks passed.");
