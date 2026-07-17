import fs from "node:fs";
import path from "node:path";

export type KnowledgeChunk = { path: string; title: string; content: string };

export function loadKnowledge(): KnowledgeChunk[] {
  const root = path.join(process.cwd(), "knowledge");
  if (!fs.existsSync(root)) return [];

  return walk(root)
    .filter((file) => file.endsWith(".md") && path.basename(file).toLowerCase() !== "readme.md")
    .map((file) => {
      const content = fs.readFileSync(file, "utf8").trim();
      const relativePath = path.relative(process.cwd(), file).split(path.sep).join("/");
      const heading = content.match(/^#\s+(.+)$/m)?.[1]?.trim();
      return {
        path: relativePath,
        title: heading || path.basename(file, ".md").replace(/[-_]/g, " "),
        content,
      };
    })
    .filter((document) => document.content)
    .sort((a, b) => a.path.localeCompare(b.path));
}

function walk(directory: string): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(entryPath) : [entryPath];
  });
}
