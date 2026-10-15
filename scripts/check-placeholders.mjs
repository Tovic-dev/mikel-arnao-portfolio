// Lists every place that still uses a placeholder image (docs/portfolio/09 §6).
//
//   node scripts/check-placeholders.mjs          report only
//   LAUNCH=1 node scripts/check-placeholders.mjs  exit 1 if any remain (14 §1)
//
// Looks for imports from content/media/_placeholder and `placeholder: true` in
// the content and app source.
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const roots = ["content", "app", "components"];
const hits = [];

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "media") continue;
      await walk(full);
    } else if (/\.(ts|tsx)$/.test(entry.name)) {
      const lines = (await readFile(full, "utf8")).split("\n");
      lines.forEach((line, i) => {
        if (
          line.includes("_placeholder") ||
          /placeholders\.\w+/.test(line) ||
          /placeholder:\s*true/.test(line)
        ) {
          hits.push(`${full.replaceAll("\\", "/")}:${i + 1}  ${line.trim()}`);
        }
      });
    }
  }
}

for (const root of roots) await walk(root);

if (hits.length === 0) {
  console.log("No placeholders left.");
  process.exit(0);
}
console.log(`${hits.length} placeholder reference(s):\n`);
console.log(hits.join("\n"));
if (process.env.LAUNCH === "1") {
  console.error("\nLaunch blocked: replace every placeholder first (14 §1).");
  process.exit(1);
}
