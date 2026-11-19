// Fails if a source map is present under .next/static (productionBrowserSourceMaps must stay false).
// Runs after `next build` via the postbuild script. Usage: node scripts/check-no-sourcemaps.mjs [dir]
import { readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.argv[2] ?? ".next/static";
if (!existsSync(root)) {
  console.error(`check-no-sourcemaps: ${root} not found (run next build first)`);
  process.exit(1);
}
const maps = [];
const walk = (dir) => {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith(".map")) maps.push(p);
  }
};
walk(root);
if (maps.length) {
  console.error(`check-no-sourcemaps: ${maps.length} source map(s) in ${root}:\n${maps.join("\n")}`);
  process.exit(1);
}
console.log(`check-no-sourcemaps: no .map files in ${root}`);
