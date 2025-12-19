import { mkdirSync } from "fs";
import path from "path";

const dir = path.join(".vercel", "output");
mkdirSync(dir, { recursive: true });
console.log(`Created placeholder build output at ${dir}`);
