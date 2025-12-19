import { existsSync, statSync } from "node:fs";
import { join } from "node:path";

const outputDir = join(process.cwd(), ".open-next");
const assetsDir = join(outputDir, "assets");

function ensureDir(path, label) {
	if (!existsSync(path) || !statSync(path).isDirectory()) {
		console.error(`❌ Missing ${label} directory at ${path}. Make sure the OpenNext build ran.`);
		process.exit(1);
	}
}

ensureDir(outputDir, "OpenNext output");
ensureDir(assetsDir, "OpenNext assets");

console.log("✅ Verified OpenNext output at", outputDir);
