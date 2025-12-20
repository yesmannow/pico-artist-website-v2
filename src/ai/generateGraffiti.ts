"use server";

import OpenAI from "openai";

export interface GraffitiGenerationResult {
	imageUrl: string | null;
	prompt: string;
	error?: string;
}

/**
 * Generate graffiti art using AI image generation
 */
export async function generateGraffitiImage(prompt: string): Promise<GraffitiGenerationResult> {
	const apiKey = process.env.OPENAI_API_KEY;

	if (!apiKey) {
		return {
			imageUrl: null,
			prompt,
			error: "OpenAI API key not configured",
		};
	}

	try {
		const client = new OpenAI({ apiKey });

		const fullPrompt = `Graffiti art mural in urban hip-hop style with elements of ${prompt}.
			Style: vibrant spray paint, dripping paint effects, bold lettering, neon accents,
			street art aesthetic, concrete texture background, graffiti tags and throw-ups.
			High quality, detailed, professional street art.`;

		const result = await client.images.generate({
			model: "dall-e-3",
			prompt: fullPrompt,
			size: "1024x1024",
			quality: "standard",
			n: 1,
		});

		const imageUrl = result.data[0]?.url || null;

		return {
			imageUrl,
			prompt: fullPrompt,
		};
	} catch (error) {
		console.error("Failed to generate graffiti image:", error);
		return {
			imageUrl: null,
			prompt,
			error: error instanceof Error ? error.message : "Unknown error",
		};
	}
}

/**
 * Generate graffiti based on mood and keywords
 */
export async function generateMoodGraffiti(
	mood: string,
	keywords: string[]
): Promise<GraffitiGenerationResult> {
	const prompt = `${mood} mood with ${keywords.join(", ")}`;
	return generateGraffitiImage(prompt);
}

/**
 * Generate graffiti from lyrics or text input
 */
export async function generateLyricGraffiti(lyrics: string): Promise<GraffitiGenerationResult> {
	// Extract key themes from lyrics
	const cleanedLyrics = lyrics.slice(0, 200); // Limit length
	const prompt = `inspired by lyrics: "${cleanedLyrics}"`;
	return generateGraffitiImage(prompt);
}
