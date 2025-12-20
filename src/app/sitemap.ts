import type { MetadataRoute } from "next";

const baseUrl = "https://pico-artist-website-v2.pages.dev";

export default function sitemap(): MetadataRoute.Sitemap {
	const routes = ["", "/music", "/videos", "/events", "/contact", "/fan-wall", "/visualizer"];
	const now = new Date().toISOString();
	return routes.map((route) => ({
		url: `${baseUrl}${route}`,
		lastModified: now,
		changeFrequency: "weekly",
		priority: route === "" ? 1 : 0.7,
	}));
}

