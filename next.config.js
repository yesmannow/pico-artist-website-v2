const { randomUUID } = require("node:crypto");
const { initOpenNextCloudflareForDev } = require("@opennextjs/cloudflare");

/** @type {import('next').NextConfig} */
const nextConfig = {
	// Explicit build ID generator to avoid undefined config defaults.
	generateBuildId: () => randomUUID().replace(/-/g, ""),
};

module.exports = nextConfig;

// Enable calling `getCloudflareContext()` in `next dev`.
// See https://opennext.js.org/cloudflare/bindings#local-access-to-bindings.
if (process.env.NODE_ENV === "development") {
	initOpenNextCloudflareForDev();
}
