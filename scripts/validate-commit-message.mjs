import { readFileSync } from "node:fs";

const messagePath = process.argv[2];

if (!messagePath) {
  console.error("Commit message path was not provided.");
  process.exit(1);
}

const firstLine = readFileSync(messagePath, "utf8")
  .split(/\r?\n/, 1)[0]
  .trim();

const conventionalCommitPattern = /^(feat|fix|docs|refactor|test|chore)(\([a-z0-9][a-z0-9._/-]*\))?: (.+)$/;
const match = firstLine.match(conventionalCommitPattern);

if (!match) {
  console.error("Invalid commit message format.");
  console.error("Expected: <type>(<scope>): <summary>");
  console.error("Allowed types: feat, fix, docs, refactor, test, chore");
  process.exit(1);
}

const summary = match[3];

if (summary.length > 72) {
  console.error("Commit summary must be 72 characters or fewer.");
  process.exit(1);
}

if (summary.endsWith(".")) {
  console.error("Commit summary must not end with a period.");
  process.exit(1);
}

if (!/[a-zA-Z]/.test(summary)) {
  console.error("Commit summary must contain at least one letter.");
  process.exit(1);
}
