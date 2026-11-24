import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line entry for make.fun's "The Funniest Toaster Error
// Message" bounty. The program writes a single line to
// /output/entry.txt (or $OUTPUT_DIR/entry.txt): the error a kitchen
// toaster shows its owner — the lever is depressed, in every sense,
// and the toast will be ready when one of them recovers. Pass 2
// note: an earlier draft blamed the crumbs for forming a union; the
// depressed lever won because the pun is the machine's own part.
// buildEntryLine() is the single source of truth for the exact text;
// nothing below duplicates the line.
const ERROR_BEATS = [
  "FATAL: Lever depressed. So am I.",
  "Your toast will be ready when one of us recovers.",
] as const;

export function buildEntryLine(): string {
  return ERROR_BEATS.join(" ");
}

export const ENTRY_LINE = buildEntryLine();

const MAX_CHARS = 120;

export function charCount(text: string): number {
  return [...text].length;
}

export function isValidEntry(text: string): boolean {
  const length = charCount(text);
  return length >= 1 && length <= MAX_CHARS && text.trim().length > 0;
}

if (!isValidEntry(ENTRY_LINE)) {
  throw new Error(
    `entry line must be 1–${MAX_CHARS} characters, got ${charCount(ENTRY_LINE)}`,
  );
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_LINE, "utf8");
