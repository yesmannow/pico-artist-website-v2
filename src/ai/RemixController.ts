"use server";

import OpenAI from "openai";

export interface RemixPalette {
	primary: string;
	secondary: string;
	accent: string;
	lightColor: string;
	shaderMood: string;
}

export interface RemixPromptParams {
	mood: string;
	keywords: string[];
}

/**
 * Generate a graffiti-style color palette using AI
 */
export async function generateRemixPrompt({ mood, keywords }: RemixPromptParams): Promise<RemixPalette> {
	const apiKey = process.env.OPENAI_API_KEY;

	if (!apiKey) {
		// Return default palette if API key not configured
		return getDefaultPalette(mood);
	}

	try {
		const client = new OpenAI({ apiKey });

		const prompt = `
			Create a graffiti-style color palette and lighting description inspired by ${mood}.
			Keywords: ${keywords.join(", ")}.

			The palette should feel urban, vibrant, and suitable for a music artist website.
			Consider spray paint aesthetics, neon lights, and street art vibes.

			Return ONLY valid JSON with this exact structure:
			{
				"primary": "#hex",
				"secondary": "#hex",
				"accent": "#hex",
				"lightColor": "#hex",
				"shaderMood": "description string"
			}
		`;

		const response = await client.responses.create({
			model: "gpt-4o-mini",
			input: prompt,
		});

		const content = response.output_text;
		if (!content) {
			return getDefaultPalette(mood);
		}

		// Extract JSON from response
		const jsonMatch = content.match(/\{[\s\S]*\}/);
		if (!jsonMatch) {
			return getDefaultPalette(mood);
		}

		const palette = JSON.parse(jsonMatch[0]) as RemixPalette;
		return palette;
	} catch (error) {
		console.error("Failed to generate remix palette:", error);
		return getDefaultPalette(mood);
	}
}

/**
 * Get a default palette based on mood when API is unavailable
 */
function getDefaultPalette(mood: string): RemixPalette {
	const palettes: Record<string, RemixPalette> = {
		chill: {
			primary: "#6366f1",
			secondary: "#8b5cf6",
			accent: "#a78bfa",
			lightColor: "#c4b5fd",
			shaderMood: "relaxed lo-fi vibes with soft purple gradients",
		},
		hype: {
			primary: "#ef4444",
			secondary: "#f97316",
			accent: "#fbbf24",
			lightColor: "#fef08a",
			shaderMood: "energetic fire tones with explosive orange and yellow",
		},
		dark: {
			primary: "#1f2937",
			secondary: "#374151",
			accent: "#6b7280",
			lightColor: "#9ca3af",
			shaderMood: "moody industrial aesthetic with steel grays",
		},
		neon: {
			primary: "#e91e63",
			secondary: "#9c27b0",
			accent: "#00bcd4",
			lightColor: "#ffeb3b",
			shaderMood: "electric neon nightlife with pink and cyan",
		},
		experimental: {
			primary: "#10b981",
			secondary: "#14b8a6",
			accent: "#06b6d4",
			lightColor: "#22d3ee",
			shaderMood: "futuristic teal matrix with glitch effects",
		},
	};

	return palettes[mood] || palettes.neon;
}

/**
 * Generate palette from track metadata
 */
export async function generatePaletteFromTrack(track: {
	title: string;
	mood: string;
	tags: string[];
}): Promise<RemixPalette> {
	return generateRemixPrompt({
		mood: track.mood,
		keywords: [track.title, ...track.tags],
	});
}
