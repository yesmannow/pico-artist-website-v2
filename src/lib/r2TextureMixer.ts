import { TextureLoader, Texture } from "three";

const textureCache = new Map<string, Texture>();

/**
 * Load textures from R2 bucket with caching
 */
export async function loadR2Textures(fileNames: string[]): Promise<Texture[]> {
	const r2BucketUrl = process.env.NEXT_PUBLIC_R2_BUCKET_URL || "";

	if (!r2BucketUrl) {
		console.warn("R2_BUCKET_URL not configured, using fallback textures");
		return [];
	}

	const loader = new TextureLoader();

	const loadPromises = fileNames.map(async (file) => {
		const url = `${r2BucketUrl}/${file}`;

		// Check cache first
		if (textureCache.has(url)) {
			return textureCache.get(url)!;
		}

		try {
			const texture = await loader.loadAsync(url);
			textureCache.set(url, texture);
			return texture;
		} catch (error) {
			console.error(`Failed to load texture: ${url}`, error);
			throw error;
		}
	});

	return Promise.all(loadPromises);
}

/**
 * Load a single texture from R2
 */
export async function loadR2Texture(fileName: string): Promise<Texture | null> {
	try {
		const textures = await loadR2Textures([fileName]);
		return textures[0] || null;
	} catch {
		return null;
	}
}

/**
 * Preload common graffiti textures
 */
export async function preloadGraffitiTextures(): Promise<void> {
	const commonTextures = [
		"graffiti-bg.jpg",
		"graffiti-overlay.jpg",
		"spray-texture.png",
		"vinyl-texture.jpg",
	];

	try {
		await loadR2Textures(commonTextures);
	} catch {
		// Silently fail - textures will load on demand
	}
}

/**
 * Clear the texture cache
 */
export function clearTextureCache(): void {
	textureCache.forEach((texture) => texture.dispose());
	textureCache.clear();
}

/**
 * Get texture from cache
 */
export function getCachedTexture(fileName: string): Texture | undefined {
	const r2BucketUrl = process.env.NEXT_PUBLIC_R2_BUCKET_URL || "";
	const url = `${r2BucketUrl}/${fileName}`;
	return textureCache.get(url);
}

