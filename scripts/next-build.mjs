import { spawnSync } from "node:child_process";

// Cursor/Cloudflare dev tooling can set this internal Next env var. When it is
// present, Next loads config from JSON (functions stripped) which breaks builds
// that expect function-based defaults like generateBuildId.
delete process.env.__NEXT_PRIVATE_STANDALONE_CONFIG;

const args = ["node_modules/next/dist/bin/next", "build", ...process.argv.slice(2)];
const result = spawnSync(process.execPath, args, { stdio: "inherit", env: process.env });

process.exit(result.status ?? 1);


