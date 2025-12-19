import { existsSync } from "fs";
import path from "path";

const candidates = [
  { label: ".vercel/output", target: path.resolve(".vercel/output") },
  { label: ".open-next/output", target: path.resolve(".open-next/output") },
  { label: "dist", target: path.resolve("dist") },
  { label: "out", target: path.resolve("out") },
];

const found = candidates.find((entry) => existsSync(entry.target));

if (found) {
  console.log(`✅ Build output detected at "${found.label}" (${found.target})`);
  process.exit(0);
}

console.error("❌ No build output directory found.");
console.error(
  `Checked: ${candidates.map((entry) => `"${entry.label}"`).join(", ")}`
);
console.error(
  "Verify Cloudflare Pages build settings (build command + output directory) and re-run `npm run verify:output`."
);
process.exit(1);
